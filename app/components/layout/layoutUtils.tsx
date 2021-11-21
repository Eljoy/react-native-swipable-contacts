export const layoutDirections = ['row', 'column'] as const;

export const alignmentMainAxis = [
  'start',
  'center',
  'end',
  'stretch',
  'space-around',
  'space-between',
  'space-evenly',
] as const;

export const alignmentCrossAxis = [
  'start',
  'center',
  'end',
  'stretch',
  'baseline',
] as const;

export type AlignmentMainAxis = typeof alignmentMainAxis[number];
export type AlignmentCrossAxis = typeof alignmentCrossAxis[number];
export type LayoutAlign =
  | 'start start'
  | 'start center'
  | 'start end'
  | 'start stretch'
  | 'start baseline'
  | 'center start'
  | 'center center'
  | 'center end'
  | 'center stretch'
  | 'center baseline'
  | 'end start'
  | 'end center'
  | 'end end'
  | 'end stretch'
  | 'end baseline'
  | 'space-around start'
  | 'space-around center'
  | 'space-around end'
  | 'space-around stretch'
  | 'space-around baseline'
  | 'space-between start'
  | 'space-between center'
  | 'space-between end'
  | 'space-between stretch'
  | 'space-between baseline'
  | 'space-evenly start'
  | 'space-evenly center'
  | 'space-evenly end'
  | 'space-evenly stretch'
  | 'space-evenly baseline';

export type LayoutDirection = typeof layoutDirections[number];

interface Axis {
  main: string;
  cross: string;
}

interface Normalized {
  [index: string]: 'flex-start' | 'flex-end';
}

const normalized: Normalized = {
  start: 'flex-start',
  end: 'flex-end',
};

const WHITESPACE = /\s+/g;

function toLayoutAlignStyle(layoutAlignValue: LayoutAlign) {
  const axis = normalizeAxis(extractAlignAxis(layoutAlignValue));

  const justifyContent = axis.main;
  const alignItems = axis.cross;

  return {justifyContent, alignItems};
}

function toLayoutDirectionStyle(layoutValue: LayoutDirection) {
  const flexDirection =
    layoutDirections.indexOf(layoutValue) !== -1 ? layoutValue : 'column';
  return {flexDirection};
}

function extractAlignAxis(layoutAlignValue: LayoutAlign) {
  const axis = {
    main: 'start',
    cross: 'stretch',
  } as {
    main: AlignmentMainAxis;
    cross: AlignmentCrossAxis;
  };

  const values: [
    AlignmentMainAxis,
    AlignmentCrossAxis,
  ] = layoutAlignValue.toLowerCase().trim().split(WHITESPACE) as any;

  if (values.length > 0) axis.main = values[0] || axis.main;
  if (values.length > 1) axis.cross = values[1] || axis.cross;

  if (!alignmentMainAxis.includes(axis.main)) axis.main = 'start';
  if (!alignmentCrossAxis.includes(axis.cross)) axis.cross = 'stretch';

  return axis;
}

function normalizeAxis(axis: Axis) {
  const main = normalized[axis.main] || axis.main;
  const cross = normalized[axis.cross] || axis.cross;
  return {main, cross};
}

export const LayoutUtils = {
  toLayoutStyle: toLayoutDirectionStyle,
  toLayoutAlignStyle,
};
