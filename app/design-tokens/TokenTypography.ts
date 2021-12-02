import { createPropertyGetter } from './createPropertyGetter'

enum FontSizeOptions {
  S = 14,
  M = 16,
  L = 18,
}

enum FontColorOptions {
  Grey = '#919191',
  Black = '#101010',
}

export namespace TokenTypography {
  export enum FontSize {
    Body = FontSizeOptions.S,
    SubTitle = FontSizeOptions.M,
    Title = FontSizeOptions.L,
  }

  export enum FontColor {
    Body = FontColorOptions.Grey,
    Title = FontColorOptions.Black,
    SubTitle = FontColorOptions.Black,
  }
}

export const getFontSizeStyle =
  createPropertyGetter<TokenTypography.FontSize>('fontSize')

export const getFontColorStyle =
  createPropertyGetter<TokenTypography.FontColor>('color')
