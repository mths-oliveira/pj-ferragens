export function capitalize(text: string) {
  const words = text.split(' ');
  const wordsCapitalized = words.map((word) => {
    const firstChar = word.charAt(0).toUpperCase();
    const restOfChars = word.substring(1).toLowerCase();
    return firstChar + restOfChars;
  });
  return wordsCapitalized.join(' ');
}
