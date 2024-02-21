exports.logReturn = (message, name) => {
  console.log(name ? name + ": " : "", message);
  return message;
};

exports.sleep = async (s) =>
  new Promise((resolve) => setTimeout(resolve, 1000 * s));

// async function myFunction() {
//   console.log("Before delay");
//   await exports.sleep(6);
//   console.log("After delay");
// }

// myFunction();
