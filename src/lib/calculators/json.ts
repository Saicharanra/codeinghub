/**
 * JSON Formatting, Validation, and Minification Module
 * Uses native JSON.parse and JSON.stringify with line/column error pointer parsing.
 */

export interface JsonFormatSuccess {
  isValid: true;
  formatted: string;
  linesCount: number;
  charCount: number;
  byteSize: number;
  isMinified: boolean;
}

export interface JsonFormatError {
  isValid: false;
  error: string;
  line?: number;
  column?: number;
}

export type JsonFormatResult = JsonFormatSuccess | JsonFormatError;

/**
 * Formats, minifies, or validates a JSON string.
 */
export function processJson(
  input: string,
  mode: 2 | 4 | "compact" = 2
): JsonFormatResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      isValid: true,
      formatted: "",
      linesCount: 0,
      charCount: 0,
      byteSize: 0,
      isMinified: mode === "compact",
    };
  }

  try {
    const parsed = JSON.parse(trimmed);
    const formatted =
      mode === "compact"
        ? JSON.stringify(parsed)
        : JSON.stringify(parsed, null, mode);

    const lines = formatted.split("\n").length;
    const charCount = formatted.length;
    const byteSize = new Blob([formatted]).size;

    return {
      isValid: true,
      formatted,
      linesCount: lines,
      charCount,
      byteSize,
      isMinified: mode === "compact",
    };
  } catch (err: any) {
    const rawError = err.message || "Invalid JSON syntax";
    let line: number | undefined;
    let column: number | undefined;

    // Extract position if reported by parser
    const posMatch = rawError.match(/position\s+(\d+)/i);
    if (posMatch) {
      const pos = parseInt(posMatch[1], 10);
      const textUpToPos = input.substring(0, pos);
      const lines = textUpToPos.split("\n");
      line = lines.length;
      column = lines[lines.length - 1].length + 1;
    } else {
      // Chrome/V8 sometimes reports "at line X column Y"
      const lineColMatch = rawError.match(/line\s+(\d+)\s+column\s+(\d+)/i);
      if (lineColMatch) {
        line = parseInt(lineColMatch[1], 10);
        column = parseInt(lineColMatch[2], 10);
      }
    }

    return {
      isValid: false,
      error: rawError,
      line,
      column,
    };
  }
}
