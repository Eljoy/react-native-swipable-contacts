import { TextStyle, ViewStyle } from 'react-native';

type PropertyType = keyof TextStyle | keyof ViewStyle;

export const createPropertyGetter =
  <T = unknown>(property: PropertyType) =>
  (value: T) => {
    return { [property]: value };
  };
