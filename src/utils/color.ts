export function colorHash(text: string): string {
  // TODO: Improve aesthetics, increase possible colors. Center around a certain palette?
  const textValues = text.split("").map(char => char.charCodeAt(0));
  const hash = "".padEnd(6, " ").split("").map(char => char.charCodeAt(0));

  for (let i = 0; i < text.length; i += hash.length) {
    for (let j = 0; j < hash.length && i + j < text.length; j++)
      hash[j] ^= textValues[i + j];
  }

  const color = "#" + hash.map(value => (value % 16).toString(16)).join("").substr(0, 6);
  return color;
}
