/**
 * CGPA Calculation Module
 * Handles simple average calculation across multiple semester GPAs
 * and provides grading scale interpretations and percentage conversions.
 */

export interface SemesterEntry {
  id: string;
  semesterNumber: number;
  gpa: string; // string representation for raw input control
}

export interface CgpaValidationResult {
  isValid: boolean;
  error?: string;
  parsedGpa?: number;
}

export interface CgpaCalculationResult {
  semesterCount: number;
  cgpa: number;
  cgpaFormatted: string;
  percentageEquivalent: string;
  honorsClassification: string;
  isValid: boolean;
  error?: string;
}

/**
 * Validates a single GPA value.
 * Supports standard 0.00 to 10.00 scale (or 4.00 scale).
 */
export function validateGpaInput(input: string, maxScale = 10): CgpaValidationResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { isValid: false, error: "GPA is required" };
  }

  const num = parseFloat(trimmed);
  if (isNaN(num)) {
    return { isValid: false, error: "Must be a valid number" };
  }

  if (num < 0) {
    return { isValid: false, error: "GPA cannot be negative" };
  }

  if (num > maxScale) {
    return { isValid: false, error: `GPA cannot exceed ${maxScale.toFixed(1)}` };
  }

  return { isValid: true, parsedGpa: num };
}

/**
 * Determines honors classification based on standard academic tiers.
 */
export function getHonorsClassification(cgpa: number, scale = 10): string {
  if (scale === 10) {
    if (cgpa >= 8.5) return "First Class with Distinction";
    if (cgpa >= 7.0) return "First Class";
    if (cgpa >= 6.0) return "Higher Second Class";
    if (cgpa >= 5.0) return "Second Class";
    return "Pass";
  } else {
    // 4.0 Scale
    if (cgpa >= 3.75) return "Summa Cum Laude (Highest Distinction)";
    if (cgpa >= 3.5) return "Magna Cum Laude (High Distinction)";
    if (cgpa >= 3.0) return "Cum Laude (Distinction)";
    if (cgpa >= 2.0) return "Satisfactory Academic Standing";
    return "Academic Probation / Pass";
  }
}

/**
 * Computes simple average CGPA from list of semester entries.
 */
export function calculateSimpleCgpa(
  semesters: SemesterEntry[],
  scale = 10
): CgpaCalculationResult {
  const validGpas: number[] = [];

  for (let i = 0; i < semesters.length; i++) {
    const entry = semesters[i];
    const validation = validateGpaInput(entry.gpa, scale);
    if (!validation.isValid) {
      return {
        semesterCount: semesters.length,
        cgpa: 0,
        cgpaFormatted: "0.00",
        percentageEquivalent: "0.0%",
        honorsClassification: "Incomplete",
        isValid: false,
        error: `Semester ${entry.semesterNumber}: ${validation.error}`,
      };
    }
    validGpas.push(validation.parsedGpa!);
  }

  if (validGpas.length === 0) {
    return {
      semesterCount: 0,
      cgpa: 0,
      cgpaFormatted: "0.00",
      percentageEquivalent: "0.0%",
      honorsClassification: "No semesters entered",
      isValid: false,
      error: "Please enter at least one semester GPA",
    };
  }

  const sum = validGpas.reduce((acc, val) => acc + val, 0);
  const average = sum / validGpas.length;
  const rounded = Math.round(average * 100) / 100;

  // Standard university percentage formula: (CGPA * 9.5) for 10-scale, or (CGPA / 4 * 100)
  const percentage =
    scale === 10
      ? (rounded * 9.5).toFixed(1) + "%"
      : ((rounded / 4) * 100).toFixed(1) + "%";

  return {
    semesterCount: validGpas.length,
    cgpa: rounded,
    cgpaFormatted: rounded.toFixed(2),
    percentageEquivalent: percentage,
    honorsClassification: getHonorsClassification(rounded, scale),
    isValid: true,
  };
}
