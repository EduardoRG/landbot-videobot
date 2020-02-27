import { parseTime, getButtonData } from '.';

describe('helpers', () => {
  it('parseTime :: should parse a time string to seconds time', () => {
    expect(parseTime('00:15')).toEqual(15);
    expect(parseTime('01:24')).toEqual(84);
    expect(parseTime('40:10')).toEqual(2410);
    expect(parseTime('1:40:10')).toEqual(6010);
  });

  it('getButtonData', () => {
    const label = '[00:01, 00:20] Test';
    expect(getButtonData(label)).toEqual({
      timeRange: [1, 20],
      label: 'Test',
    });
  });
});