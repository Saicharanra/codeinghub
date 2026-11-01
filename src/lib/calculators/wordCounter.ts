/**
 * Word, Character, and Reading Time Analysis Module
 * Robust text parser handling empty strings, arbitrary whitespace,
 * punctuation density, and speaking/reading time estimates.
 */

export interface TextStatistics {
  wordsCount: number;
  charsWithSpaces: number;
  charsWithoutSpaces: number;
  sentencesCount: number;
  paragraphsCount: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
  avgWordLength: string;
}

export function analyzeText(text: string): TextStatistics {
  if (!text || !text.trim()) {
    return {
      wordsCount: 0,
      charsWithSpaces: text.length,
      charsWithoutSpaces: 0,
      sentencesCount: 0,
      paragraphsCount: 0,
      readingTimeMinutes: 0,
      speakingTimeMinutes: 0,
      avgWordLength: "0.0",
    };
  }

  const trimmed = text.trim();
  const charsWithSpaces = text.length;
  const charsWithoutSpaces = text.replace(/\s+/g, "").length;

  // Words: match non-whitespace sequences
  const wordsArray = trimmed.match(/\S+/g) || [];
  const wordsCount = wordsArray.length;

  // Sentences: match ending punctuation followed by space or end of string
  const sentencesArray = trimmed
    .split(/[.!?]+(?:\s+|$)/)
    .filter((s) => s.trim().length > 0);
  const sentencesCount = sentencesArray.length;

  // Paragraphs: non-empty chunks separated by one or more newlines
  const paragraphsArray = text
    .split(/\n+/)
    .filter((p) => p.trim().length > 0);
  const paragraphsCount = paragraphsArray.length;

  // Reading time at ~200 words per minute, speaking at ~130 words per minute
  const readingTimeMinutes = Math.max(1, Math.ceil(wordsCount / 200));
  const speakingTimeMinutes = Math.max(1, Math.ceil(wordsCount / 130));

  const avgWordLength =
    wordsCount > 0 ? (charsWithoutSpaces / wordsCount).toFixed(1) : "0.0";

  return {
    wordsCount,
    charsWithSpaces,
    charsWithoutSpaces,
    sentencesCount,
    paragraphsCount,
    readingTimeMinutes: wordsCount > 0 ? readingTimeMinutes : 0,
    speakingTimeMinutes: wordsCount > 0 ? speakingTimeMinutes : 0,
    avgWordLength,
  };
}
