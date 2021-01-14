import React from 'react';
import { getFunctionalities } from '../../redux/functionality/functionality-selectors';
import { useSelector } from 'react-redux';

export function FunctionalityList() {
  const functionalities = useSelector(getFunctionalities);
  // console.log('functionalities');
  // console.log(functionalities);

  return (
    <ul>
      {Object.entries(functionalities).map(([name, info]) => {
        return (
          <li>
            {name}<br/>
            {info.title}<br/>
            Meets critical threshold: {info.supportStatusCritical}<br/>
            Meets non critical threshold: {info.supportStatusNonCritical}<br/>
            <a href={info.url} title={`Read more about ${info.title} at caniuse.com`}>{info.url}</a>
          </li>
        );
      })}
    </ul>
  )
}
