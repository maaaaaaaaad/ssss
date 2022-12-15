var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
  console.clear();
}
{
  class Person {
    accountId({ accountId }) {
      return { accountId };
    }
  }
  class Mad extends Person {
    result({ nickname }) {
      return __spreadProps(__spreadValues({}, this.accountId({ accountId: "mad" })), { nickname });
    }
  }
  const mad = new Mad();
  const result = mad.result({ nickname: "ninini" });
  console.log(result);
  console.clear();
}
{
  let gogo = function(arr, func) {
    return arr.map(func);
  };
  var gogo2 = gogo;
  const result = gogo(["1", "2", "3", "4"], (i) => parseInt(i));
  console.log(result);
  console.clear();
}
{
  let updateUserData = function(insert, update) {
    return __spreadValues(__spreadValues({}, insert), update);
  };
  var updateUserData2 = updateUserData;
  const user = {
    name: "mad",
    age: 1
  };
  const updateProfile = updateUserData(user, { age: 3 });
  console.log(updateProfile);
  console.clear();
}
//# sourceMappingURL=index.js.map
