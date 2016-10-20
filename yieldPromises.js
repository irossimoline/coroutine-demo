// Naive implementation of Promise.coroutine for learning purposes
const coroutine = generatorFunction => () => {
  const generator = generatorFunction();
  const processYieldObject = yieldObject => {
    if (!yieldObject.done) {
      const promise = yieldObject.value;
      promise.then(response => processYieldObject(generator.next(response)));
    }
  }
  processYieldObject(generator.next());
};

// Returns whatever args you pass to the second invocation after `duration` milliseconds
const delay = duration => (...args) => new Promise((resolve, reject) =>
  setTimeout(() => resolve(...args), duration));

// Example usage (async code that looks synchronous)
const print = coroutine(function* () {
  const hello = yield delay(500)('hello');
  console.log(hello);
  const goodbye = yield delay(500)('goodbye');
  console.log(goodbye);
});

print();
console.log('See? It kept going.');
