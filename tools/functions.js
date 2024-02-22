exports.logReturn = (message, name) => {
  console.log(name ? name + ": " : "", message);
  return message;
};

exports.sleep = async (s) =>
  new Promise((resolve) => setTimeout(resolve, 1000 * s));
