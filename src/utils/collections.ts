// Return unique elements of the input array.
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}
