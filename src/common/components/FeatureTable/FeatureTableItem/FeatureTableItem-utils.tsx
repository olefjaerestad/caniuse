import React, { ReactElement } from 'react';
import { TCanIUseSupportString } from './FeatureTableItem-types';
import { TSupportStatusString } from '../../../types/feature-types';

export function getSupportStatus(supportStatus: string): TCanIUseSupportString {
  return supportStatus.split(' #')[0] as TCanIUseSupportString;
}

export function mapSupportStatusToNoteAnchors(supportStatus: string, featureName: string): ReactElement[] {
  const hashIndex = supportStatus.indexOf('#');
  
  if (hashIndex === -1) {
    return null;
  }

  return supportStatus.substring(hashIndex).split(' ').map((note: string, i: number) => {
    return <a 
      key={i}
      href={`#feature--${featureName}--note--${note.replace('#', '')}`} 
      title={`Go to note ${note.replace('#', '')} about ${featureName}`}>
        {note}
      </a>;
  });
}

export function mapSupportStatusToReadableString(s: string) {
  return s.replace(/_/g, ' ').replace(/^./, (m) => `${m}`.toUpperCase());
}

export function mapCanIUseSupportStatusToReadableString(s: TCanIUseSupportString) {
  const mappings: {[key in TCanIUseSupportString]: TSupportStatusString} = {
    a: 'partial_support',
    'a d': 'partial_support',
    'a x': 'partial_support',
    n: 'not_supported',
    p: 'partial_support',
    u: 'partial_support',
    y: 'supported',
    'y x': 'supported',
  }

  return mapSupportStatusToReadableString(mappings[s]);
}
