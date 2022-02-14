Function.prototype.bind2 = function () {
  const currentThisObj = [].shift.call(arguments) || window;
  const args = Object.values(arguments);
  currentThisObj.fn = this;
  return function () {
    currentThisObj.fn(...args.concat(Object.values(arguments)));
  };
};

//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------

var foo = {
  value: 1,
};

function bar(name, age, school) {
  console.log(this.value);
  console.log(name);
  console.log(age);
  console.log(school);
}

var bindFoo = bar.bind2(foo, "daisy", 18);
bindFoo("北大");
