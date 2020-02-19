const trilateration = require('./trilateration');

const pt = (x, y) => { return {x, y} };
function test_trilat(input, expected_output) {
  let res = trilateration.trilat(input);
  console.log("trilat(", input, ") =", res, ", expected:", expected_output);
}

test_trilat([-60, -60, -60], pt(0.5, 0.375));
test_trilat([-120, -120, -120], pt(0.5, 0.375));
test_trilat([-25, -25, -25], pt(0.5, 0.375));
test_trilat([-66, -66, -66], pt(0.5, 0.375));

test_trilat([-60, -60, -40], pt(0.5, 0.3));
