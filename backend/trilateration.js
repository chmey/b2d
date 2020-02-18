function trilat([r1, r2, r3]) {
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
  // var px = ((s1 * s1)
  //           - (s2 * s2)
  //           + (this.node2.Left * this.node2.Left))
  //          / ((double)(2 * this.node2.Left));
  //
  // var py = ((s1 * s1)
  //           - (s3 * s3)
  //           + (this.node3.Left * this.node3.Left)
  //           + (this.node3.Top * this.node3.Top))
  //          / (2 * this.node3.Top)
  //          - (this.node3.Left / (double)this.node3.Top)
  //          * px;
};
exports.trilat = trilat;
