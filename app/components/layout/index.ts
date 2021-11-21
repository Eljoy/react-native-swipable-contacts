import LayoutComponent, {LayoutProps} from './Layout';
import {
  AlignmentCrossAxis,
  AlignmentMainAxis,
  LayoutAlign,
  LayoutDirection,
} from './layoutUtils';

export const Layout = LayoutComponent;

export namespace Layout {
  export type Align = LayoutAlign;
  export type AlignCrossAxis = AlignmentCrossAxis;
  export type AlignMainAxis = AlignmentMainAxis;
  export type Direction = LayoutDirection;
  export type Props = LayoutProps;
}
