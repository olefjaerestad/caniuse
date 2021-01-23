import React, { useState, MouseEvent, KeyboardEvent } from 'react';
import styles from './FeatureTableItem.module.css';
import { getSupportStatus, mapSupportStatusToNoteAnchors } from './FeatureTableItem-utils';
import { IFeature } from '../../../types/feature-types';
import { parseMarkdown } from '../../../util/markdown-utils';

interface IProps {
  name: string,
  feature: IFeature,
}

export function FeatureTableItem({name, feature}: IProps) {
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
    <tr id={`feature--${name}`}>
      <td 
        className={styles.title} 
        tabIndex={0} 
        onClick={handleClick} 
        onKeyUp={handleClick}
      ><h2>{title}</h2></td>
      <td>{supportStatusCritical}</td>
      <td>{supportStatusNonCritical}</td>
      {open && <td className={styles.details}>
        <p>{description}</p>

        <div className="grid grid--spacing">
          <div className="cell--6">
            <h3>Support status by browser - critical threshold</h3>
            <table>
              <thead>
                <tr>
                  <td>Browser</td>
                  <td>Version</td>
                </tr>
              </thead>
              <tbody>
                {Object.entries(supportStatusByBrowserCritical).map(([browser, supportStatus]) => {
                  return (
                    <tr>
                      <td>{browser}</td>
                      <td>{supportStatus}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="cell--6">
            <h3>Support status by browser - non-critical threshold</h3>
            <table>
              <thead>
                <tr>
                  <td>Browser</td>
                  <td>Version</td>
                </tr>
              </thead>
              <tbody>
                {Object.entries(supportStatusByBrowserNonCritical).map(([browser, supportStatus]) => {
                  return (
                    <tr>
                      <td>{browser}</td>
                      <td>{supportStatus}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid--spacing">
          <div className="cell--6">
            <h3>First partially supported in</h3>
            <table>
              <thead>
                <tr>
                  <td>Browser</td>
                  <td>Version</td>
                </tr>
              </thead>
              <tbody>
                {Object.entries(firstPartiallySupportedIn).map(([browser, version]) => {
                  return (
                    <tr>
                      <td>{browser}</td>
                      <td>{version}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="cell--6">
            <h3>First fully supported in</h3>
            <table>
              <thead>
                <tr>
                  <td>Browser</td>
                  <td>Version</td>
                </tr>
              </thead>
              <tbody>
                {Object.entries(firstFullySupportedIn).map(([browser, version]) => {
                  return (
                    <tr>
                      <td>{browser}</td>
                      <td>{version}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <h3>Is supported in latest browser version</h3>
        <table>
          <thead>
            <tr>
              <td>Browser</td>
              <td>Is supported</td>
              <td>Notes</td>
            </tr>
          </thead>
          <tbody>
            {Object.entries(supportedInLatestBrowserVersion).map(([browser, supportStatus]) => {
              return (
                <tr>
                  <td>{browser}</td>
                  <td>{getSupportStatus(supportStatus)}</td>
                  <td>{mapSupportStatusToNoteAnchors(supportStatus, name)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {Object.keys(notesByNum).length > 0 &&
          <>
            <br />
            <h3>Notes</h3>
            <ol>
              {Object.entries(notesByNum).map(([num, note]) => {
                return <li id={`feature--${name}--note--${num}`}><span dangerouslySetInnerHTML={{__html: parseMarkdown(note)}}></span></li>;
              })}
            </ol>
          </>
        }

        <br />
        <a href={url} title={`Read more about support for ${title} at caniuse.com`}>Read more at {url}</a>
      </td>}
    </tr>
  )
}
