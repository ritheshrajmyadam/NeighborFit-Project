const { matchNeighborhoods } = require('./matching');

const neighborhoods = [
  { id: 1, name: 'Greenwood', quietness: 8, budget: 5, parks: 7, vehicleFriendly: 6 },
  { id: 2, name: 'Downtown', quietness: 3, budget: 8, parks: 4, vehicleFriendly: 9 },
  { id: 3, name: 'Lakeside', quietness: 7, budget: 6, parks: 9, vehicleFriendly: 5 },
  { id: 4, name: 'Uptown', quietness: 5, budget: 7, parks: 5, vehicleFriendly: 8 },
];

test('returns neighborhoods sorted by closeness', () => {
  const userPrefs = { quietness: 7, budget: 6, parks: 7, vehicleFriendly: 7 };
  const results = matchNeighborhoods(neighborhoods, userPrefs);

  expect(results[0].name).toBe('Greenwood');
  expect(results[results.length - 1].name).toBe('Downtown');
});

test('throws error on invalid input', () => {
  const badPrefs = { quietness: 'high', budget: 5, parks: 5, vehicleFriendly: 5 };
  expect(() => matchNeighborhoods(neighborhoods, badPrefs)).toThrow('Invalid input');
});
