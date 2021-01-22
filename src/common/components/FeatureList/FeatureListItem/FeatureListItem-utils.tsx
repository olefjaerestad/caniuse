import React, { ReactElement } from 'react';

export function getSupportStatus(supportStatus: string): string {
  return supportStatus.split(' #')[0];
}

export function mapSupportStatusToNoteAnchors(supportStatus: string, featureName: string): ReactElement[] {
  const hashIndex = supportStatus.indexOf('#');
  
  if (hashIndex === -1) {
    return null;
  }

  return supportStatus.substring(hashIndex).split(' ').map((note: string) => {
    return <a href={`#feature--${featureName}--note--${note.replace('#', '')}`}>{note}</a>;
  });
}
