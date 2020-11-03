import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { gaussian } from '../gaussian';

expect.extend({ toBeDeepCloseTo });

describe('gaussan', () => {
  it('fwhm fixed and normalized', () => {
    let shape = gaussian({ fwhm: 50, normalized: true });
    expect(shape.fwhm).toBe(50);
    expect(shape.data).toHaveLength(201);
    let area = shape.data.reduce((a, b) => a + b, 0);
    expect(area).toBeDeepCloseTo(0.99, 2);
  });

  it('sd fixed', () => {
    const sd = 50;
    const height = 3;
    let data = gaussian({ sd, height }).data;
    let center = Math.floor((data.length - 1) / 2);
    expect(data[center]).toBeDeepCloseTo(height, 2);
    let area = data.reduce((a, b) => a + b, 0);
    expect(area).toBeDeepCloseTo(height * Math.sqrt(2 * Math.PI) * sd, 2);
  });

  it('odd fwhm', () => {
    let data = gaussian({ fwhm: 101, length: 101 }).data;
    expect(data).toHaveLength(101);
    let lenG = data.length;
    let center = Math.floor((lenG - 1) / 2);
    expect(data[center]).toBeDeepCloseTo(1, 4);
    expect(data[center - 1]).toBeDeepCloseTo(data[center + 1], 4);
    expect(data[center]).toBeGreaterThan(data[center + 1]);
  });
  it('even fwhm', () => {
    let data = gaussian({ fwhm: 100, length: 100 }).data;
    expect(data).toHaveLength(100);
    let lenG = data.length;
    let center = Math.floor((lenG - 1) / 2);
    expect(data[center]).toBeDeepCloseTo(data[center + 1], 4);
    expect(data[0]).toBeDeepCloseTo(data[data.length - 1], 4);
  });
});
