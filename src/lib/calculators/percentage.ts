/**
 * Percentage Calculation Module
 * Provides pure mathematical logic for Marks Percentage, Number Percentage,
 * and Percentage Change with zero-division handling and boundary checks.
 */

export interface MarksPercentageResult {
  isValid: boolean;
  percentage: number;
  percentageFormatted: string;
  fractionRatio: string;
  error?: string;
}

export interface NumberPercentageResult {
  isValid: boolean;
  result: number;
  resultFormatted: string;
  statement: string;
  error?: string;
}

export interface PercentageChangeResult {
  isValid: boolean;
  change: number;
  changeFormatted: string;
  difference: number;
  type: "increase" | "decrease" | "no-change";
  error?: string;
}

/**
 * Mode A: Calculate Percentage from Obtained and Total Marks
 */
export function calculateMarksPercentage(
  obtainedStr: string,
  totalStr: string
): MarksPercentageResult {
  const obtainedTrim = obtainedStr.trim();
  const totalTrim = totalStr.trim();

  if (!obtainedTrim || !totalTrim) {
    return {
      isValid: false,
      percentage: 0,
      percentageFormatted: "0.00%",
      fractionRatio: "0 / 0",
      error: "Please enter both obtained marks and total marks",
    };
  }

  const obtained = parseFloat(obtainedTrim);
  const total = parseFloat(totalTrim);

  if (isNaN(obtained) || isNaN(total)) {
    return {
      isValid: false,
      percentage: 0,
      percentageFormatted: "0.00%",
      fractionRatio: "0 / 0",
      error: "Both fields must be valid numeric values",
    };
  }

  if (total <= 0) {
    return {
      isValid: false,
      percentage: 0,
      percentageFormatted: "0.00%",
      fractionRatio: `${obtained} / ${total}`,
      error: "Total maximum marks must be strictly greater than zero",
    };
  }

  if (obtained < 0) {
    return {
      isValid: false,
      percentage: 0,
      percentageFormatted: "0.00%",
      fractionRatio: `${obtained} / ${total}`,
      error: "Obtained marks cannot be negative",
    };
  }

  const percentage = (obtained / total) * 100;
  const rounded = Math.round(percentage * 100) / 100;

  return {
    isValid: true,
    percentage: rounded,
    percentageFormatted: `${rounded.toFixed(2)}%`,
    fractionRatio: `${obtained} / ${total}`,
  };
}

/**
 * Mode B: Calculate Percentage of a Given Number (e.g., What is 15% of 240?)
 */
export function calculatePercentageOfNumber(
  percentStr: string,
  totalNumberStr: string
): NumberPercentageResult {
  const percentTrim = percentStr.trim();
  const totalTrim = totalNumberStr.trim();

  if (!percentTrim || !totalTrim) {
    return {
      isValid: false,
      result: 0,
      resultFormatted: "0",
      statement: "",
      error: "Please provide both the percentage and the number",
    };
  }

  const percent = parseFloat(percentTrim);
  const numberVal = parseFloat(totalTrim);

  if (isNaN(percent) || isNaN(numberVal)) {
    return {
      isValid: false,
      result: 0,
      resultFormatted: "0",
      statement: "",
      error: "Both percentage and number must be valid numbers",
    };
  }

  const calculated = (percent / 100) * numberVal;
  const rounded = Math.round(calculated * 1000) / 1000;

  return {
    isValid: true,
    result: rounded,
    resultFormatted: rounded.toString(),
    statement: `${percent}% of ${numberVal} = ${rounded}`,
  };
}

/**
 * Mode C: Calculate Percentage Increase or Decrease between two values
 */
export function calculatePercentageChange(
  originalStr: string,
  newStr: string
): PercentageChangeResult {
  const originalTrim = originalStr.trim();
  const newTrim = newStr.trim();

  if (!originalTrim || !newTrim) {
    return {
      isValid: false,
      change: 0,
      changeFormatted: "0.00%",
      difference: 0,
      type: "no-change",
      error: "Please enter both the original value and the new value",
    };
  }

  const original = parseFloat(originalTrim);
  const newVal = parseFloat(newTrim);

  if (isNaN(original) || isNaN(newVal)) {
    return {
      isValid: false,
      change: 0,
      changeFormatted: "0.00%",
      difference: 0,
      type: "no-change",
      error: "Both original and new values must be numeric",
    };
  }

  if (original === 0) {
    return {
      isValid: false,
      change: 0,
      changeFormatted: "0.00%",
      difference: newVal - original,
      type: "no-change",
      error: "Original value cannot be zero when calculating percentage change (division by zero)",
    };
  }

  const diff = newVal - original;
  const changePercent = (diff / Math.abs(original)) * 100;
  const rounded = Math.round(changePercent * 100) / 100;

  let type: "increase" | "decrease" | "no-change" = "no-change";
  if (rounded > 0) type = "increase";
  else if (rounded < 0) type = "decrease";

  return {
    isValid: true,
    change: rounded,
    changeFormatted: `${Math.abs(rounded).toFixed(2)}%`,
    difference: Math.round(diff * 100) / 100,
    type,
  };
}
