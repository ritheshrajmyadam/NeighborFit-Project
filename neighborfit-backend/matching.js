function matchNeighborhoods(neighborhoods, userPrefs) {
  const keys = ['quietness', 'budget', 'parks', 'vehicleFriendly'];
  for (const key of keys) {
    if (typeof userPrefs[key] !== 'number') {
      throw new Error('Invalid input: ' + key);
    }
  }

  const results = neighborhoods.map(n => {
    // Use default 5 if field missing
    const q = typeof n.quietness === 'number' ? n.quietness : 5;
    const b = typeof n.budget === 'number' ? n.budget : 5;
    const p = typeof n.parks === 'number' ? n.parks : 5;
    const v = typeof n.vehicleFriendly === 'number' ? n.vehicleFriendly : 5;

    const score =
      Math.abs(q - userPrefs.quietness) +
      Math.abs(b - userPrefs.budget) +
      Math.abs(p - userPrefs.parks) +
      Math.abs(v - userPrefs.vehicleFriendly);

    return { neighborhood: n, score };
  });

  results.sort((a, b) => a.score - b.score);

  return results.map(r => r.neighborhood);
}

module.exports = { matchNeighborhoods };