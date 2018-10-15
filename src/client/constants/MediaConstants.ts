import { invert } from 'lodash';

// XS, SM, MD, LG, XL
// this corresponds to $media-??-min constants in _mediaquery.scss
export const mediaSizeList = Object.freeze([320, 768, 992, 1200, 1560]);

function translateValue(from: typeof MediaTypes | typeof MediaNumbers, to: typeof MediaTypes | typeof MediaNumbers, value: string | number) {
    return from[invert(to)[value]];
}

export type MediaType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string

export const MediaTypes = {
    XS: 'xs',
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
    XL: 'xl'
};

export const MediaNumbers = {
    XS: 1,
    SM: 2,
    MD: 3,
    LG: 4,
    XL: 5
};

export function getMediaLiteral(value: number) {
    return translateValue(MediaTypes, MediaNumbers, value);
}

export function getMediaNumeral(value: string) {
    return translateValue(MediaNumbers, MediaTypes, value);
}
