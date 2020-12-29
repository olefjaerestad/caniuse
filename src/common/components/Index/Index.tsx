import React from 'react';

export function Index() {
  // TODO: Remove this.
  function run(prop) {
    console.log('Index:run()');
  }

  return (
    <>
      <h1 onClick={run}>Index component</h1>
    </>
  );
}
