export function compareAsc(a, b) {
  if (a < b) { return -1; }
  if (a > b) { return 1; }
  return 0;
}

export function compareDesc(a, b) {
  return compareAsc(b, a);
}
