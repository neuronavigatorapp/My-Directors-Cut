export function parseCSV(raw: string): string[][] {
  return raw.trim().split("\n").map(line => line.split(","));
}