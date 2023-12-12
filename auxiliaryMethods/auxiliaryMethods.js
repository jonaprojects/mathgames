export function getRandomElement(list) {
  // Check if the list is not empty
  if (list.length === 0) {
    return "The list is empty, no elements to pick!";
  }

  // Generate a random index within the length of the list
  const randomIndex = Math.floor(Math.random() * list.length);

  // Return the element at the random index
  return list[randomIndex];
}

export function getRandomNumber(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

export function floatToPercent(floatNumber) {
  // Check if the input is within the valid range
  if (floatNumber < 0 || floatNumber > 1) {
    return -1; // Error!
  }

  // Convert float to percentage and round to the nearest whole number
  return Math.round(floatNumber * 100);
}
