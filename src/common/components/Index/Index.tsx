import React from 'react';

export function Index() {
  // TODO: Remove this.
  function run() {
    console.log('run()');
  }

  return (
    <>
      <h1 onClick={run}>Index component</h1>
    </>
  );
}
