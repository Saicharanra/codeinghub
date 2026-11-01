/**
 * Text Case Conversion Module
 * Implements standard case transformations for copywriters and software engineers.
 */

export const MINOR_WORDS = new Set([
  "a", "an", "the", "and", "but", "or", "for", "nor", "on", "at", "to", "by", "with", "in", "of", "from"
]);

export function toUpperCase(str: string): string {
  return str.toUpperCase();
}

export function toLowerCase(str: string): string {
  return str.toLowerCase();
}

export function toSentenceCase(str: string): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
}

export function toCapitalizeEachWord(str: string): string {
  if (!str) return "";
  return str.replace(/\b\w+/g, (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}

export function toTitleCase(str: string): string {
  if (!str) return "";
  const words = str.toLowerCase().split(/\s+/);
  return words
    .map((word, index) => {
      if (index > 0 && MINOR_WORDS.has(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function toCamelCase(str: string): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[A-Z]/, (c) => c.toLowerCase());
}

export function toSnakeCase(str: string): string {
  if (!str) return "";
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function toKebabCase(str: string): string {
  if (!str) return "";
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function toConstantCase(str: string): string {
  if (!str) return "";
  return str
    .trim()
    .toUpperCase()
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}
