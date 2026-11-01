/**
 * Attendance Calculation Module
 * Implements strict mathematical logic for attendance percentage,
 * required upcoming consecutive classes, and safe bunk allowances.
 */

export interface AttendanceResult {
  isValid: boolean;
  currentPercentage: number;
  currentPercentageFormatted: string;
  status: "above" | "below" | "exact" | "unstarted";
  classesNeeded: number;
  classesCanMiss: number;
  message: string;
  isImpossible100Percent?: boolean;
  error?: string;
}

/**
 * Calculates student attendance statistics based on official college models.
 *
 * Formula for classes needed:
 * needed = Math.max(0, Math.ceil((targetDecimal * total - attended) / (1 - targetDecimal)))
 *
 * Formula for safe skips:
 * canMiss = Math.max(0, Math.floor((attended / targetDecimal) - total))
 */
export function calculateAttendance(
  conductedStr: string,
  attendedStr: string,
  targetPercentStr: string
): AttendanceResult {
  const conductedTrim = conductedStr.trim();
  const attendedTrim = attendedStr.trim();
  const targetTrim = targetPercentStr.trim();

  if (!conductedTrim || !attendedTrim || !targetTrim) {
    return {
      isValid: false,
      currentPercentage: 0,
      currentPercentageFormatted: "0.0%",
      status: "unstarted",
      classesNeeded: 0,
      classesCanMiss: 0,
      message: "Please fill in all three fields to calculate attendance.",
      error: "All fields are required",
    };
  }

  const conducted = parseInt(conductedTrim, 10);
  const attended = parseInt(attendedTrim, 10);
  const targetPercent = parseFloat(targetTrim);

  if (isNaN(conducted) || isNaN(attended) || isNaN(targetPercent)) {
    return {
      isValid: false,
      currentPercentage: 0,
      currentPercentageFormatted: "0.0%",
      status: "unstarted",
      classesNeeded: 0,
      classesCanMiss: 0,
      message: "Please enter valid numeric integers for classes and percentage.",
      error: "Inputs must be numbers",
    };
  }

  if (conducted < 0 || attended < 0) {
    return {
      isValid: false,
      currentPercentage: 0,
      currentPercentageFormatted: "0.0%",
      status: "unstarted",
      classesNeeded: 0,
      classesCanMiss: 0,
      message: "Class numbers cannot be negative.",
      error: "Negative numbers are not allowed",
    };
  }

  if (attended > conducted) {
    return {
      isValid: false,
      currentPercentage: 0,
      currentPercentageFormatted: "0.0%",
      status: "unstarted",
      classesNeeded: 0,
      classesCanMiss: 0,
      message: "Attended classes cannot exceed total classes conducted.",
      error: "Attended cannot exceed total conducted",
    };
  }

  if (targetPercent <= 0 || targetPercent > 100) {
    return {
      isValid: false,
      currentPercentage: 0,
      currentPercentageFormatted: "0.0%",
      status: "unstarted",
      classesNeeded: 0,
      classesCanMiss: 0,
      message: "Target attendance must be between 1% and 100%.",
      error: "Target percentage out of range (1-100)",
    };
  }

  // Handle boundary case: Zero classes conducted so far
  if (conducted === 0) {
    return {
      isValid: true,
      currentPercentage: 0,
      currentPercentageFormatted: "0.0%",
      status: "unstarted",
      classesNeeded: 0,
      classesCanMiss: 0,
      message: "No classes have been conducted yet this semester. Your attendance starts once the first class is held.",
    };
  }

  const currentPercent = (attended / conducted) * 100;
  const currentFormatted = `${currentPercent.toFixed(1)}%`;
  const targetDecimal = targetPercent / 100;

  // Boundary case: 100% Target
  if (targetPercent === 100) {
    if (attended < conducted) {
      return {
        isValid: true,
        currentPercentage: currentPercent,
        currentPercentageFormatted: currentFormatted,
        status: "below",
        classesNeeded: 0,
        classesCanMiss: 0,
        isImpossible100Percent: true,
        message: "You have already missed at least one class. It is mathematically impossible to achieve a 100% attendance rate this semester.",
      };
    } else {
      return {
        isValid: true,
        currentPercentage: 100,
        currentPercentageFormatted: "100.0%",
        status: "exact",
        classesNeeded: 0,
        classesCanMiss: 0,
        message: "You currently have perfect 100% attendance! You must attend all future classes to maintain 100%.",
      };
    }
  }

  // Current attendance is below target
  if (currentPercent < targetPercent) {
    // needed = ceil((target * total - attended) / (1 - target))
    const numerator = targetDecimal * conducted - attended;
    const denominator = 1 - targetDecimal;
    const needed = Math.max(0, Math.ceil(numerator / denominator));

    return {
      isValid: true,
      currentPercentage: currentPercent,
      currentPercentageFormatted: currentFormatted,
      status: "below",
      classesNeeded: needed,
      classesCanMiss: 0,
      message: `You need to attend the next ${needed} consecutive class${needed === 1 ? "" : "es"} without absence to reach ${targetPercent}%.`,
    };
  }

  // Current attendance is at or above target
  if (currentPercent >= targetPercent) {
    // canMiss = floor((attended / target) - total)
    const canMiss = Math.max(0, Math.floor(attended / targetDecimal - conducted));

    const status = currentPercent === targetPercent ? "exact" : "above";
    let message = "";
    if (canMiss > 0) {
      message = `You are safely above your target! You can skip the next ${canMiss} class${canMiss === 1 ? "" : "es"} and still stay at or above ${targetPercent}%.`;
    } else {
      message = `You are currently at ${currentFormatted}. You cannot skip the upcoming class without dropping below ${targetPercent}%.`;
    }

    return {
      isValid: true,
      currentPercentage: currentPercent,
      currentPercentageFormatted: currentFormatted,
      status,
      classesNeeded: 0,
      classesCanMiss: canMiss,
      message,
    };
  }

  return {
    isValid: true,
    currentPercentage: currentPercent,
    currentPercentageFormatted: currentFormatted,
    status: "exact",
    classesNeeded: 0,
    classesCanMiss: 0,
    message: "Attendance calculated.",
  };
}
