import { useEffect, useState } from "react";

const events = {
  progresschange: 'fetch.progresschange',
};
let fetchIsRedefined: boolean = false;

/**
 * Get the progress of current fetch event(s).
 * Handy for loading spinners etc.
 * 
 * Usage from within a React functional component:
 * const progress = useFetchProgress(0);
 */
export function useFetchProgress(defaultProgress: number) {
  const [progress, setProgress] = useState<number>(defaultProgress);

  function handleProgressChange(e: CustomEvent) {
    setProgress(e.detail.progress);
  }

  if (__IS_BROWSER__ && !fetchIsRedefined) {
    redefineFetch();
  }

  useEffect(() => {
    globalThis.addEventListener(events.progresschange, handleProgressChange);
    return () => globalThis.removeEventListener(events.progresschange, handleProgressChange);
  }, []);

  return progress;
}

/**
 * Redfine fetch() so we can emit a CustomEvent whenever fetch progress changes.
 * 
 * https://stackoverflow.com/questions/44728723/hook-all-fetch-api-ajax-requests
 * https://twitter.com/umaar/status/917789464658890753
 * https://github.com/SitePen/javascript-streams-blog-examples/blob/master/streaming-fetch/main.js
 * https://streams.spec.whatwg.org/#locking
 * https://developer.mozilla.org/en-US/docs/Web/API/Response/clone
 * https://stackoverflow.com/questions/35711724/upload-progress-indicators-for-fetch
 * https://jakearchibald.com/2016/streams-ftw/
 */
function redefineFetch() {
  // let taperFunction = (response: Response) => response;
  let originalFetch = globalThis.fetch;

  // Rewrite window.fetch to suit our needs:
  globalThis.fetch = (input: RequestInfo, init: RequestInit) => originalFetch(input, init)
    .then(response => new Promise(async (resolve) => {
      const response2 = response.clone();
      const reader = response2.body.getReader();
      const contentLengthHeader = response2.headers.get('Content-Length');
      const resourceSize = parseInt(contentLengthHeader, 10);
      await readStream(reader, resourceSize);

      // resolve(taperFunction(response));
      resolve(response);
    }));

  fetchIsRedefined = true;
}

async function readStream(reader: ReadableStreamDefaultReader, resourceSize = 0, totalChunkSize = 0, chunkCount = 0): Promise<number> {
  const {value: {length} = {}, done} = await reader.read();

  if (done) {
    reader.releaseLock();
    return chunkCount;
  }

  const runningTotal = totalChunkSize + length;
  // const percentComplete = Math.round((runningTotal / resourceSize) * 100);
  // const progress = `${percentComplete}% (chunk ${chunkCount})`;
  const progress = Math.round((runningTotal / resourceSize) * 100);
  const event = new CustomEvent(events.progresschange, {detail: {progress}})

  window.dispatchEvent(event);

  return readStream(reader, resourceSize, runningTotal, chunkCount + 1);
}
