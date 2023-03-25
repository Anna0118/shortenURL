// random
function sample(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

// 英數組合
function generateEnNum(length) {
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseLetters = lowerCaseLetters.toUpperCase();
  const numbers = "1234567890";
  const collection = lowerCaseLetters + upperCaseLetters + numbers;
  let string = "";
  for (let i = 0; i < length; i++) {
    string += sample(collection);
  }
  if (!/\d/.test(string)) {
    return generateEnNum(length);
  }
  return string;
}
module.exports = generateEnNum;

// console.log(generateEnNum(5));
