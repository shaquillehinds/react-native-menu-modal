import type {
  BaseTextProps,
  LayoutProps,
} from '@shaquillehinds/react-native-essentials';
import type { ViewStyle } from 'react-native';

export interface MenuOptionTitleTextProps extends BaseTextProps {
  fontSize?: 'titleS' | 'titleL';
}
export interface MenuOptionBodyTextProps extends BaseTextProps {
  fontSize?: 'bodyS' | 'bodyL';
}

export type MenuOptionInfo = {
  id?: string;
  title: string;
  subTitle?: string;
};

export type MenuOption = {
  disableDismissOnOptionPress?: boolean;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  titleProps?: MenuOptionTitleTextProps;
  subTitleProps?: MenuOptionBodyTextProps;
  onOptionPress?: (
    optionInfo: MenuOptionInfo & { index: number; dismiss: () => void }
  ) => void | Promise<void>;
  onOptionLongPress?: (
    optionInfo: MenuOptionInfo & { index: number; dismiss: () => void }
  ) => void | Promise<void>;
} & MenuOptionInfo &
  LayoutProps;

export type MenuModalRef = {
  open: (props: { pageX: number; pageY: number }) => void;
  close: () => void;
};

export type MenuModalProps<Scrollable extends boolean | undefined = undefined> =
  {
    refMenuModal?: React.MutableRefObject<MenuModalRef | null>;
    onPress?: () => Promise<void> | void;
    onLongPress?: () => Promise<void> | void;
    separatorStyle?: ViewStyle;
    disableDismissOnPress?: boolean;
    backgroundColor: string;
    options: MenuOption[];
    /**@default 'press' */
    activateOn?: 'press' | 'long-press';
    disablePortal?: boolean;
    disableNativeModal?: boolean;
  } & LayoutProps<Scrollable>;
