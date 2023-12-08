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
