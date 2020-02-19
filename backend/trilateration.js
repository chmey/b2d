function trilat([s1, s2, s3]) {
  let [r1, r2, r3] = [s1, s2, s3].map(function(e) {
    return (e / Math.min(s1, s2, s3));
  });
  n1 = {x: 0, y: 0};
  n2 = {x: 1, y: 0};
  n3 = {x: 0.5, y: 1};

  var x = ((r1 * r1) - (r2 * r2) +
          (n2.x * n2.x))
          / (2 * n2.x);
  var y = ((r1 * r1) - (r3 * r3)
          + ((n3.x * n3.x) + (n3.y * n3.y))
          - 2 * n3.x * x)
          / (2 * n3.y)

  return {x, y}
  //https://en.wikipedia.org/wiki/True_range_multilateration#Three_Cartesian_dimensions,_three_measured_slant_ranges
};
exports.trilat = trilat;
