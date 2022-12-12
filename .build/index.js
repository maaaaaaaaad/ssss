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
{
  let test = function({ name, age }) {
    return { name, age };
  };
  var test2 = test;
  const output = test({ name: "mad", age: "1" });
  const result = output;
  console.log(result);
  console.clear();
}
{
  const user = { name: "mad", age: 1 };
  console.log(user);
  console.clear();
}
{
  const mad = "account_id: mad";
  const integral = "account_id: integral";
  console.log(mad);
  console.log(integral);
  console.clear();
}
{
  let middleware = function(sign) {
    switch (sign.kind) {
      case "sign_up":
        delete sign.password;
        delete sign.confirmPassword;
        return sign;
      case "sign_in":
        delete sign.password;
        return sign;
      default:
        break;
    }
  };
  var middleware2 = middleware;
  const signUp = middleware({ kind: "sign_up", password: "123", confirmPassword: "123" });
  const signIn = middleware({ kind: "sign_in", password: "123" });
  console.log("sign_up: ", signUp);
  console.log("sign_in: ", signIn);
  console.clear();
}
{
  class Person {
    name = "mad";
    test() {
      return "mad";
    }
  }
  class Mad extends Person {
    output() {
      return this.name + "hello!";
    }
  }
  const mad = new Mad();
  const output = mad.output();
  console.log(output);
}
//# sourceMappingURL=index.js.map
