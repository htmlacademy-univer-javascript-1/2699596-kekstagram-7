/* eslint-disable no-unused-vars */
function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}
function isPalindrome(string) {
  const cleanString = string.toLowerCase().replaceAll(' ', '');

  let reversedString = '';
  for (let i = cleanString.length - 1; i >= 0; i--) {
    reversedString += cleanString[i];
  }

  return cleanString === reversedString;
}

