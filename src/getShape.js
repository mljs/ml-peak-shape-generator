/**
 * Calculate a normalized gaussian shape
 * @param {number} [kind = 1]
 * @param {object} [options = {}]
 * @param {number} [options.fwhm = 500] - number of points in Full Width at Half Maximum, Standard deviation will be computed as fwhm / 2 / sqrt(2 ln(2))
 * @param {number} [options.factor = 3] - factor of standard deviation to increase the window size, the vector size is 2 * factor * sd
 * @return {Float64Array} - array of Y points
 */

import { gaussian } from './gaussian';
import { lorentzian } from './lorentzian';
import { pseudoVoigt } from './pseudoVoigt';

export const GAUSSIAN = 1;
export const LORENTZIAN = 2;
export const PSEUDO_VOIGT = 3;

export function getShape(kind = 1, options = {}) {
  switch (kind) {
    case 1:
      return gaussian(options);
    case 2:
      return lorentzian(options);
    case 3:
      return pseudoVoigt(options);
    default:
      throw new Error(`Unknown shape kind: ${kind}`);
  }
}