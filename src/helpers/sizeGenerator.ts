export function sizeGenerator(size: number): string {
  return size > 1000
    ? (size / 1000).toFixed(2) + ' kB'
    : size.toFixed(2) + ' B';
}
