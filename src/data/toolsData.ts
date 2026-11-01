export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: "Student Tools" | "Developer Tools";
  categorySlug: "student" | "developer";
  icon: string;
  badge?: string;
  path: string;
  features: string[];
  keywords: string[];
}

export const toolsData: ToolItem[] = [
  {
    id: "cgpa-calculator",
    slug: "cgpa-calculator",
    name: "CGPA Calculator",
    shortDescription: "Calculate cumulative grade point average across multiple semesters with simple and credit-weighted models.",
    description: "An intuitive academic calculator designed for university and college students. Compute your cumulative GPA with real-time feedback, custom credit weighting, and grade scale interpretations.",
    category: "Student Tools",
    categorySlug: "student",
    icon: "GraduationCap",
    badge: "Popular",
    path: "/tools/cgpa-calculator",
    features: [
      "Dynamic semester row additions & deletions",
      "Support for both simple average and credit-weighted CGPA",
      "Clear visual GPA band meter (Distinction, First Class, etc.)",
      "Printable / exportable grade breakdown summary",
    ],
    keywords: ["cgpa", "gpa", "semester gpa", "college grade calculator", "university grades", "cumulative grade point average"],
  },
  {
    id: "percentage-calculator",
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    shortDescription: "Compute exact academic percentages, marks ratios, and score differences instantly.",
    description: "Fast and foolproof academic and statistical percentage calculator. Determine your score percentage, calculate marks required to reach target percentages, and visualize score breakdowns.",
    category: "Student Tools",
    categorySlug: "student",
    icon: "Percent",
    badge: "Essential",
    path: "/tools/percentage-calculator",
    features: [
      "Instant real-time calculation as you type",
      "Marks obtained vs total marks percentage mode",
      "Percentage change and discount/increment mode",
      "Visual percentage progress bar with grade classification",
    ],
    keywords: ["percentage", "marks percentage", "exam score calculator", "grades percentage", "percentage difference"],
  },
  {
    id: "attendance-calculator",
    slug: "attendance-calculator",
    name: "Attendance Calculator",
    shortDescription: "Track your lecture attendance percentage and calculate how many classes you must attend to meet criteria.",
    description: "Ensure you never get debarred from semester examinations. Calculate your exact current attendance percentage, know how many consecutive classes you need to reach 75% or 80%, or how many you can safely bunk.",
    category: "Student Tools",
    categorySlug: "student",
    icon: "CalendarCheck",
    badge: "Student Favorite",
    path: "/tools/attendance-calculator",
    features: [
      "Calculate current attendance percentage with color-coded safety indicators",
      "Determine required upcoming classes to hit targets (75%, 80%, 85%)",
      "Bunk calculator showing how many classes you can safely miss",
      "Transparent assumption notes regarding university rules",
    ],
    keywords: ["attendance", "college attendance", "75 percent attendance", "bunk calculator", "attendance requirement"],
  },
  {
    id: "json-formatter",
    slug: "json-formatter",
    name: "JSON Formatter & Validator",
    shortDescription: "Beautify, validate, minify, and inspect JSON payloads with line-accurate syntax error reporting.",
    description: "A secure, client-side JSON tool for developers. Format messy API responses, fix indentation, validate RFC 8259 compliance, and convert between pretty-print (2/4 spaces) and minified format without sending data to any external server.",
    category: "Developer Tools",
    categorySlug: "developer",
    icon: "FileCode2",
    badge: "Dev Utility",
    path: "/tools/json-formatter",
    features: [
      "100% Client-side processing — zero server telemetry or data storage",
      "Precise error locator pointing out line and character errors",
      "One-click 2-space, 4-space, and compact minification",
      "Sample payload loader and instant clipboard copy",
    ],
    keywords: ["json", "json validator", "json beautifier", "format json", "minify json", "parse json"],
  },
  {
    id: "word-counter",
    slug: "word-counter",
    name: "Word & Character Counter",
    shortDescription: "Count words, characters, sentences, paragraphs, and estimate reading/speaking times in real time.",
    description: "An advanced text analytics tool for writers, programmers, and students. Monitor character limits for social media, academic essays, and README files, with live metrics updating on every keystroke.",
    category: "Developer Tools",
    categorySlug: "developer",
    icon: "Type",
    badge: "Live Metrics",
    path: "/tools/word-counter",
    features: [
      "Real-time word, character (with and without whitespace), sentence, and paragraph counts",
      "Estimated reading time and verbal speaking duration",
      "Density insights including average word length",
      "Instant text clear and copy to clipboard",
    ],
    keywords: ["word counter", "character count", "essay word count", "sentence counter", "reading time calculator"],
  },
  {
    id: "text-case-converter",
    slug: "text-case-converter",
    name: "Text Case Converter",
    shortDescription: "Transform text into UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case.",
    description: "A fast text manipulation tool designed for coders and content creators. Instantly convert variable names, markdown titles, and database column names between different programmatic casing conventions.",
    category: "Developer Tools",
    categorySlug: "developer",
    icon: "CaseSensitive",
    badge: "Fast & Handy",
    path: "/tools/text-case-converter",
    features: [
      "One-click conversion between 7 distinct casing styles",
      "Programmer casing supported: camelCase, snake_case, kebab-case, CONSTANT_CASE",
      "Writing casing supported: Sentence case, Title Case, UPPERCASE, lowercase",
      "Live output preview with single-click copy",
    ],
    keywords: ["case converter", "camelcase converter", "snake case", "title case", "uppercase lowercase", "slugify"],
  },
];
