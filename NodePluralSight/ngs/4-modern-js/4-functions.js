const X = function () {
  // "this" here is the caller of X
};

const Y = () => {
  // "this" here is NOT the caller of Y

  // It's the same "this" found in Y's scope
};

console.log([10, 2, 3, 4].map(a => a*a));