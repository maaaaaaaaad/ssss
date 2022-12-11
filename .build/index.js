{
  let iter = function(arr) {
    return [...arr];
  }, anyTest = function(anyArr) {
    return anyArr;
  };
  var iter2 = iter, anyTest2 = anyTest;
  const result = iter([1, 2, 3, 4]);
  console.log(result);
  const anyResult = anyTest([1, 2, 3, 4]);
  console.log(anyResult);
  console.clear();
}
{
  let test = function({ name, age }) {
    return { name, age };
  };
  var test2 = test;
  const result = test({ name: "mad", age: 1 });
  console.log(result);
  console.clear();
}
{
  let test = function({ name, age }) {
    return { name, age };
  };
  var test2 = test;
  const result = test({ name: "okok", age: "1" });
  console.log(result);
  console.clear();
}
//# sourceMappingURL=index.js.map
