function trilat([s1, s2, s3]) {
  n1 = {'right': 0, 'top': 0};
  n2 = {'right': 0.5, 'top':1};
  n3 = {'right': 1, 'top': 0.5};

  var x = ((s1 * s1) - (s2 * s2) +
          (n2.right * n2.right))
          / (2 * n2.right);
  var y = ((s1 * s1) - (s3 * s3)
          + (n3.right * n3.right)
          + (n3.top * n3.top))
          / (2 * n3.top)
          - (n3.right / n3.top)
          * x;

  return {'x': x, 'y': y}

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
