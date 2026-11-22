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
function getMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function isMeetingWithinWorkday(workStart, workEnd, meetingStart, meetingDuration) {
  const workStartMinutes = getMinutes(workStart);
  const workEndMinutes = getMinutes(workEnd);
  const meetingStartMinutes = getMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes;
}

