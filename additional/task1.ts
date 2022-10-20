function greeting(name) {
  return "Hello " + name;
}

function processWithCallback(name, callback) {
  return callback(name);
}

// Without changing the input parameters,
// change the "processWithCallback" body for this use case:
(async function main() {
  const result = await processWithCallback("User", greeting);
  console.log("Result:", result);
})();
