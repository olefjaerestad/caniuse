import React, { useState, MouseEvent, KeyboardEvent } from 'react';
import styles from './FeatureTableItem.module.css';
import { getSupportStatus, mapSupportStatusToNoteAnchors } from './FeatureTableItem-utils';
import { Icon } from '../../Icon/Icon';
import { IFeature } from '../../../types/feature-types';
import { IProps as IconProps } from '../../Icon/Icon';
import { parseMarkdown } from '../../../util/markdown-utils';
import { TSupportStatus } from '../../../../common/types/feature-types';

interface IProps {
  name: string,
  feature: IFeature,
}

type TSupportStringToIconInfoMapping = {
  [key in TSupportStatus['key']]: {
    color: IconProps['color'],
    icon: IconProps['icon'],
  }
}

type TCanIUseSupportString = 'y' | 'y x' | 'n' | 'a' | 'a x' | 'a d' | 'u';

type TCanIUseSupportStringToIconInfoMapping = {
  [key in TCanIUseSupportString]: {
    color: IconProps['color'],
    icon: IconProps['icon'],
  }
}

const supportStringToIcon: TSupportStringToIconInfoMapping = {
  not_supported: {
    color: 'hsl(var(--color-error))',
    icon: 'cross',
  },
  partial_support: {
    color: 'hsl(var(--color-info))',
    icon: 'checkmark',
  },
  supported: {
    color: 'hsl(var(--color-success))',
    icon: 'checkmark',
  }
}

const caniuseSupportStringToIcon: TCanIUseSupportStringToIconInfoMapping = {
  n: {
    color: 'hsl(var(--color-error))',
    icon: 'cross',
  },
  a: {
    color: 'hsl(var(--color-info))',
    icon: 'checkmark',
  },
  'a x': {
    color: 'hsl(var(--color-info))',
    icon: 'checkmark',
  },
  'a d': {
    color: 'hsl(var(--color-info))',
    icon: 'checkmark',
  },
  u: {
    color: 'hsl(var(--color-info))',
    icon: 'checkmark',
  },
  y: {
    color: 'hsl(var(--color-success))',
    icon: 'checkmark',
  },
  'y x': {
    color: 'hsl(var(--color-success))',
    icon: 'checkmark',
  },
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
      <td>
        <Icon 
          icon={supportStringToIcon[supportStatusCritical].icon} 
          color={supportStringToIcon[supportStatusCritical].color} 
        />
      </td>
      <td>
        <Icon 
          icon={supportStringToIcon[supportStatusNonCritical].icon} 
          color={supportStringToIcon[supportStatusNonCritical].color} 
        />
      </td>
      {open && <td className={styles.details}>
        <p>{description}</p>

        <div className="grid grid--spacing">
          <div className="cell--6">
            <h3>Support status by browser - critical threshold</h3>
            <table className="table--small">
              <thead>
                <tr>
                  <th>Browser</th>
                  <th>Version</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(supportStatusByBrowserCritical).map(([browser, supportStatus]) => {
                  return (
                    <tr>
                      <td>{browser}</td>
                      <td>
                        <Icon 
                          icon={supportStringToIcon[supportStatus].icon} 
                          color={supportStringToIcon[supportStatus].color} 
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="cell--6">
            <h3>Support status by browser - non-critical threshold</h3>
            <table className="table--small">
              <thead>
                <tr>
                  <th>Browser</th>
                  <th>Version</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(supportStatusByBrowserNonCritical).map(([browser, supportStatus]) => {
                  return (
                    <tr>
                      <td>{browser}</td>
                      <td>
                        <Icon 
                          icon={supportStringToIcon[supportStatus].icon} 
                          color={supportStringToIcon[supportStatus].color} 
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid--spacing">
          <div className="cell--6">
            <h3>First partial support</h3>
            <table className="table--small">
              <thead>
                <tr>
                  <th>Browser</th>
                  <th>Version</th>
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
            <h3>First full support</h3>
            <table className="table--small">
              <thead>
                <tr>
                  <th>Browser</th>
                  <th>Version</th>
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

        <div className="grid grid--spacing">
          <div className="cell--12">
            <h3>Support in latest browser version</h3>
            <table className="table--small">
              <thead>
                <tr>
                  <th>Browser</th>
                  <th>Is supported</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(supportedInLatestBrowserVersion).map(([browser, supportStatus]) => {
                  return (
                    <tr>
                      <td>{browser}</td>
                      <td>
                        <Icon 
                          icon={caniuseSupportStringToIcon[getSupportStatus(supportStatus)].icon} 
                          color={caniuseSupportStringToIcon[getSupportStatus(supportStatus)].color} 
                        />
                      </td>
                      <td>{mapSupportStatusToNoteAnchors(supportStatus, name)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

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