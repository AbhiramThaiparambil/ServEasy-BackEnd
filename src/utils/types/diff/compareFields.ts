export const isDifferent = <T>(oldVal: T, newVal: T): boolean =>
  JSON.stringify(oldVal) !== JSON.stringify(newVal);
