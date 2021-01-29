import { IProps as IconProps } from '../../Icon/Icon';
import { TSupportStatusString } from '../../../../common/types/feature-types';

export type TSupportStringToIconInfoMapping = {
  [key in TSupportStatusString]: {
    color: IconProps['color'],
    icon: IconProps['icon'],
  }
}

export type TCanIUseSupportString = 'a' | 'a d' | 'a x'  | 'n' | 'p' | 'u' | 'y' | 'y x';

export type TCanIUseSupportStringToIconInfoMapping = {
  [key in TCanIUseSupportString]: {
    color: IconProps['color'],
    icon: IconProps['icon'],
  }
}
