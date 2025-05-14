export function prettyPrintCamel(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before uppercase letters
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // Add space between consecutive uppercase letters and lowercase letters
    .replace(/([0-9]+)([a-zA-Z])/g, "$1 $2") // Add space between numbers and letters
    .replace(/([a-z])([0-9]+)/g, "$1 $2") // Add space between letters and numbers
    .replace(/([0-9]+)([0-9]+)/g, "$1 $2") // Add space between consecutive numbers
    .trim(); // Remove leading/trailing whitespace
}
