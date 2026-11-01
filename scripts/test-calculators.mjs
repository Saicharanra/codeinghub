import assert from "node:assert";

// 1. Test CGPA Logic
import { calculateSimpleCgpa, validateGpaInput } from "../src/lib/calculators/cgpa.ts";

console.log("Testing CGPA Calculator...");
const semValid = [
  { id: "1", semesterNumber: 1, gpa: "8.5" },
  { id: "2", semesterNumber: 2, gpa: "8.2" },
  { id: "3", semesterNumber: 3, gpa: "8.8" },
  { id: "4", semesterNumber: 4, gpa: "8.4" },
];
const cgpaRes = calculateSimpleCgpa(semValid, 10);
assert.strictEqual(cgpaRes.isValid, true);
assert.strictEqual(cgpaRes.cgpaFormatted, "8.48");
assert.strictEqual(cgpaRes.semesterCount, 4);

// Boundary: Empty list
assert.strictEqual(calculateSimpleCgpa([], 10).isValid, false);

// Boundary: Negative GPA
assert.strictEqual(validateGpaInput("-1", 10).isValid, false);

// Boundary: GPA exceeds scale
assert.strictEqual(validateGpaInput("10.5", 10).isValid, false);
assert.strictEqual(validateGpaInput("4.5", 4).isValid, false);
console.log("✓ CGPA Calculator passed!");

// 2. Test Percentage Logic
import {
  calculateMarksPercentage,
  calculatePercentageOfNumber,
  calculatePercentageChange,
} from "../src/lib/calculators/percentage.ts";

console.log("Testing Percentage Calculator...");
// Mode A: Marks
const marksRes = calculateMarksPercentage("442", "500");
assert.strictEqual(marksRes.isValid, true);
assert.strictEqual(marksRes.percentageFormatted, "88.40%");

// Division by zero
const divZeroRes = calculateMarksPercentage("50", "0");
assert.strictEqual(divZeroRes.isValid, false);

// Negative marks
assert.strictEqual(calculateMarksPercentage("-5", "100").isValid, false);

// Mode B: % of number
const numRes = calculatePercentageOfNumber("15", "240");
assert.strictEqual(numRes.isValid, true);
assert.strictEqual(numRes.result, 36);

// Mode C: Percentage change
const increaseRes = calculatePercentageChange("80", "100");
assert.strictEqual(increaseRes.isValid, true);
assert.strictEqual(increaseRes.type, "increase");
assert.strictEqual(increaseRes.changeFormatted, "25.00%");

const decreaseRes = calculatePercentageChange("100", "80");
assert.strictEqual(decreaseRes.isValid, true);
assert.strictEqual(decreaseRes.type, "decrease");
assert.strictEqual(decreaseRes.changeFormatted, "20.00%");

// Division by zero in change
assert.strictEqual(calculatePercentageChange("0", "50").isValid, false);
console.log("✓ Percentage Calculator passed!");

// 3. Test Attendance Logic
import { calculateAttendance } from "../src/lib/calculators/attendance.ts";

console.log("Testing Attendance Calculator...");
// 34 attended of 48 conducted at 75% target
// needed = ceil((0.75 * 48 - 34) / (1 - 0.75)) = ceil((36 - 34) / 0.25) = ceil(8) = 8
const attNeedRes = calculateAttendance("48", "34", "75");
assert.strictEqual(attNeedRes.isValid, true);
assert.strictEqual(attNeedRes.classesNeeded, 8);
assert.strictEqual(attNeedRes.classesCanMiss, 0);

// 40 attended of 48 conducted at 75% target
// canMiss = floor((40 / 0.75) - 48) = floor(53.333 - 48) = 5
const attSafeRes = calculateAttendance("48", "40", "75");
assert.strictEqual(attSafeRes.isValid, true);
assert.strictEqual(attSafeRes.classesNeeded, 0);
assert.strictEqual(attSafeRes.classesCanMiss, 5);

// Attended > Conducted error
assert.strictEqual(calculateAttendance("40", "45", "75").isValid, false);

// Zero conducted
const zeroRes = calculateAttendance("0", "0", "75");
assert.strictEqual(zeroRes.isValid, true);
assert.strictEqual(zeroRes.status, "unstarted");

// Target out of range
assert.strictEqual(calculateAttendance("10", "8", "120").isValid, false);
assert.strictEqual(calculateAttendance("10", "8", "0").isValid, false);

// Target 100% when missed
const imp100 = calculateAttendance("10", "9", "100");
assert.strictEqual(imp100.isImpossible100Percent, true);
console.log("✓ Attendance Calculator passed!");

// 4. Test JSON Formatter
import { processJson } from "../src/lib/calculators/json.ts";

console.log("Testing JSON Formatter...");
const sampleObj = { a: 1, b: [2, 3] };
const jsonStr = JSON.stringify(sampleObj);

const formatRes = processJson(jsonStr, 2);
assert.strictEqual(formatRes.isValid, true);
assert.strictEqual(formatRes.isMinified, false);

const minRes = processJson(formatRes.formatted, "compact");
assert.strictEqual(minRes.isValid, true);
assert.strictEqual(minRes.isMinified, true);

// Invalid JSON syntax
const badJson = '{"a": 1, }';
const badRes = processJson(badJson);
assert.strictEqual(badRes.isValid, false);
assert.ok(badRes.error);
console.log("✓ JSON Formatter passed!");

// 5. Test Word Counter
import { analyzeText } from "../src/lib/calculators/wordCounter.ts";

console.log("Testing Word Counter...");
const emptyStats = analyzeText("   \n\t  ");
assert.strictEqual(emptyStats.wordsCount, 0);
assert.strictEqual(emptyStats.sentencesCount, 0);
assert.strictEqual(emptyStats.paragraphsCount, 0);

const testText = "Hello world! This is Coding Hub. It provides fast tools.\n\nSecond paragraph here.";
const stats = analyzeText(testText);
assert.strictEqual(stats.wordsCount, 13);
assert.strictEqual(stats.sentencesCount, 4);
assert.strictEqual(stats.paragraphsCount, 2);
assert.ok(stats.readingTimeMinutes >= 1);
console.log("✓ Word Counter passed!");

// 6. Test Text Case Converter
import {
  toUpperCase,
  toLowerCase,
  toSentenceCase,
  toTitleCase,
  toCapitalizeEachWord,
  toCamelCase,
  toSnakeCase,
  toKebabCase,
} from "../src/lib/calculators/textCase.ts";

console.log("Testing Text Case Converter...");
const raw = "hello world from CODING HUB";
assert.strictEqual(toUpperCase(raw), "HELLO WORLD FROM CODING HUB");
assert.strictEqual(toLowerCase(raw), "hello world from coding hub");
assert.strictEqual(toSentenceCase("hello world. second sentence."), "Hello world. Second sentence.");
assert.strictEqual(toCapitalizeEachWord("hello world"), "Hello World");
assert.strictEqual(toTitleCase("the lord of the rings"), "The Lord of the Rings");
assert.strictEqual(toCamelCase("hello-world_test"), "helloWorldTest");
assert.strictEqual(toSnakeCase("hello world test"), "hello_world_test");
assert.strictEqual(toKebabCase("hello world test"), "hello-world-test");
console.log("✓ Text Case Converter passed!");

console.log("\nALL 6 CALCULATOR MODULE TESTS PASSED FLAWLESSLY!");
