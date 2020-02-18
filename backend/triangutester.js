const trilateration = require('./trilateration');

const pt = (x, y) => { return {x, y} };
function test_trilat(input, expected_output) {
  let res = trilateration.trilat(input);
  console.log("trilat(", input, ") =", res, ", expected:", expected_output);
}

test_trilat([-60, -60, -60], pt(0.5, 0.5));
