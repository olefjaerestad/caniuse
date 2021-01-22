import React, { useState, MouseEvent, KeyboardEvent } from 'react';
import styles from './FeatureListItem.module.css';
import { getSupportStatus, mapSupportStatusToNoteAnchors } from './FeatureListItem-utils';
import { IFeature } from '../../../types/feature-types';

interface IProps {
  name: string,
  feature: IFeature,
}

export function FeatureListItem({name, feature}: IProps) {
  const {
    description,
    firstFullySupportedIn,
    firstPartiallySupportedIn,
    notesByNum,
    supportedInLatestBrowserVersion,
    supportStatusByBrowserCritical,
    supportStatusByBrowserNonCritical,
    supportStatusCritical,
    supportStatusNonCritical,
    title,
    url,
  } = feature;
  const [ open, setOpen ] = useState<boolean>(false);

  function handleClick(e: MouseEvent | KeyboardEvent) {
    if ( e.type === 'keyup' && (e as KeyboardEvent).key !== 'Enter') {
      return;
    }

    setOpen(!open);
  }

  // TODO: Make an expand button that runs handleClick
  return (
    <li className={styles.item} id={`feature--${name}`} tabIndex={0} onClick={handleClick} onKeyUp={handleClick}>
      <span>{title}</span>
      <span>{supportStatusCritical}</span>
      <span>{supportStatusNonCritical}</span>
      {open && <div className={styles.details}>
        <p>{description}</p>

        <p>Support status by browser - critical threshold</p>
        <table>
          <tr>
            <td>Browser</td>
            <td>Version</td>
          </tr>
          {Object.entries(supportStatusByBrowserCritical).map(([browser, supportStatus]) => {
            return (
              <tr>
                <td>{browser}</td>
                <td>{supportStatus}</td>
              </tr>
            );
          })}
        </table>

        <p>Support status by browser - non-critical threshold</p>
        <table>
          <tr>
            <td>Browser</td>
            <td>Version</td>
          </tr>
          {Object.entries(supportStatusByBrowserNonCritical).map(([browser, supportStatus]) => {
            return (
              <tr>
                <td>{browser}</td>
                <td>{supportStatus}</td>
              </tr>
            );
          })}
        </table>

        <p>First partially supported in:</p>
        <table>
          <tr>
            <td>Browser</td>
            <td>Version</td>
          </tr>
          {Object.entries(firstPartiallySupportedIn).map(([browser, version]) => {
            return (
              <tr>
                <td>{browser}</td>
                <td>{version}</td>
              </tr>
            );
          })}
        </table>

        <p>First fully supported in:</p>
        <table>
          <tr>
            <td>Browser</td>
            <td>Version</td>
          </tr>
          {Object.entries(firstFullySupportedIn).map(([browser, version]) => {
            return (
              <tr>
                <td>{browser}</td>
                <td>{version}</td>
              </tr>
            );
          })}
        </table>

        <p>Is supported in latest browser version:</p>
        <table>
          <tr>
            <td>Browser</td>
            <td>Is supported</td>
            <td>Notes</td>
          </tr>
          {Object.entries(supportedInLatestBrowserVersion).map(([browser, supportStatus]) => {
            return (
              <tr>
                <td>{browser} {supportStatus}</td>
                <td>{getSupportStatus(supportStatus)}</td>
                <td>{mapSupportStatusToNoteAnchors(supportStatus, name)}</td>
              </tr>
            );
          })}
        </table>

        {Object.keys(notesByNum).length > 0 &&
          <>
            <p>Notes:</p>
            {Object.entries(notesByNum).map(([num, note]) => {
              return <li id={`feature--${name}--note--${num}`}>{num}: {note}</li>;
            })}
          </>
        }

        <a href={url} title={`Read more about ${title} at caniuse.com`}>Read more at {url}</a>
      </div>}
    </li>
  )
}
