import React from 'react';

// TODO: Dont output head. Instead, add script tags to existing head element?
export function Head() {
  return (
    <head>
      {generateHeadScripts()}
    </head>
  );
}

function generateHeadScripts() {
  return (
    <>
      <script src="static/client.js" type="module"></script>
    </>
  )
}
