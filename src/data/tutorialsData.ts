export interface TutorialItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  categorySlug: string;
  readTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  icon: string;
  badge: string;
  summary: string;
  learningObjectives: string[];
  introduction: string;
  sections: {
    heading: string;
    subheading?: string;
    content: string[];
    codeBlock?: {
      language: string;
      code: string;
      explanation: string;
    };
    tips?: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedTools: string[];
  relatedTutorials: string[];
}

export const tutorialsData: TutorialItem[] = [
  {
    id: "python-programming",
    slug: "python-programming",
    title: "Python Programming Masterclass: From Fundamentals to Automation",
    subtitle: "A comprehensive practical guide to mastering core Python syntax, data structures, and script automation.",
    category: "Python Programming",
    categorySlug: "python",
    readTime: "12 min read",
    difficulty: "Beginner",
    icon: "Code",
    badge: "Core Language",
    summary: "Learn clean, idiomatic Python. Explore basic syntax, control flow, functions, list comprehensions, and real-world file manipulation workflows.",
    learningObjectives: [
      "Understand Python variable assignment, dynamic typing, and fundamental data types",
      "Master control structures including if-elif-else, loops, and pattern matching",
      "Write modular functions with default arguments, *args, and **kwargs",
      "Utilize Pythonic idioms such as list comprehensions and dictionary mappings",
      "Handle exceptions and manage file I/O safely using context managers",
    ],
    introduction:
      "Python is universally acclaimed as one of the most accessible yet versatile programming languages on earth. From powering backend APIs at Instagram to driving machine learning models at OpenAI and Google, Python's readable syntax emphasizes clean code and rapid development. In this tutorial, you will build a solid mental model of Python, learning not just the syntax, but how experienced developers structure robust scripts.",
    sections: [
      {
        heading: "1. Python Variables and Dynamic Typing",
        subheading: "How memory and references operate in Python",
        content: [
          "Unlike statically typed languages like C++ or Java, Python variables are dynamic references to objects stored in memory. When you assign `x = 42`, Python allocates an integer object in heap memory and binds the name `x` to it.",
          "Python's core primitive types include integers (`int`), floating-point numbers (`float`), booleans (`bool`), and Unicode strings (`str`). Strings in Python are immutable, meaning any modification produces a brand new string object in memory.",
        ],
        codeBlock: {
          language: "python",
          code: `# Dynamic assignment and f-string formatting
student_name = "Alex"
current_semester = 4
gpa = 3.85
is_enrolled = True

# Python 3.6+ formatted string literals (f-strings)
summary = f"Student: {student_name} | Semester: {current_semester} | GPA: {gpa:.2f}"
print(summary)
# Output: Student: Alex | Semester: 4 | GPA: 3.85`,
          explanation: "f-strings provide the most efficient and readable way to interpolate expressions and format numbers in Python.",
        },
        tips: [
          "Always prefer f-strings over old % formatting or str.format() for clean readability and performance.",
          "Use type hints (e.g. def greet(name: str) -> str:) to clarify expectations for team members and static type checkers like mypy.",
        ],
      },
      {
        heading: "2. Working with Python Collections",
        subheading: "Lists, Tuples, Dictionaries, and Sets",
        content: [
          "Python offers four fundamental built-in collection types, each tailored for specific computational needs and lookup complexity.",
          "Lists (`list`) are ordered, mutable sequences. Tuples (`tuple`) are immutable sequences ideal for fixed records. Dictionaries (`dict`) provide O(1) average time complexity key-value lookups powered by hash tables. Sets (`set`) contain unique, unordered elements perfect for deduplication.",
        ],
        codeBlock: {
          language: "python",
          code: `# Filtering numbers using a list comprehension
grades = [88, 92, 79, 95, 64, 82, 91]

# Conventional loop vs Pythonic list comprehension
honor_roll = [grade for grade in grades if grade >= 85]
print(f"Honor roll scores: {honor_roll}")
# Output: Honor roll scores: [88, 92, 95, 91]

# Dictionary mapping student IDs to GPA
student_records = {
    "S101": {"name": "Sara", "gpa": 3.92},
    "S102": {"name": "David", "gpa": 3.45},
}
print(student_records["S101"]["name"])`,
          explanation: "List comprehensions provide an expressive syntax for transforming and filtering iterable collections in a single, fast operation.",
        },
      },
      {
        heading: "3. Robust Error Handling and File I/O",
        subheading: "Context managers and exception safety",
        content: [
          "When working with external resources like files, network sockets, or database connections, failing to release handles can cause operating system resource exhaustion.",
          "Python's `with` statement leverages context managers to guarantee that resources are cleanly finalized, even if an unexpected exception occurs inside the block.",
        ],
        codeBlock: {
          language: "python",
          code: `# Safe file reading and parsing with error handling
filename = "grades.txt"

try:
    with open(filename, mode="r", encoding="utf-8") as file:
        lines = [line.strip() for line in file.readlines() if line.strip()]
        print(f"Loaded {len(lines)} records successfully.")
except FileNotFoundError:
    print(f"Error: The file '{filename}' was not found.")
except PermissionError:
    print(f"Error: Insufficient permissions to read '{filename}'.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")`,
          explanation: "Using 'with open(...)' automatically closes file descriptors as soon as the block terminates, preventing resource leaks.",
        },
      },
    ],
    faqs: [
      {
        question: "Is Python fast enough for high-throughput enterprise systems?",
        answer: "While Python is an interpreted language with a Global Interpreter Lock (GIL), high-performance libraries (like NumPy, PyTorch, and Polars) run computationally intensive tasks in compiled C, C++, or Rust. For I/O bound workloads, async libraries like FastAPI and asyncio handle thousands of concurrent requests with ease.",
      },
      {
        question: "What is the difference between a List and a Tuple in Python?",
        answer: "Lists are mutable (you can add, remove, and modify items), whereas Tuples are immutable once initialized. Tuples consume less memory and can be used as keys in dictionaries, making them ideal for immutable data representations.",
      },
      {
        question: "How does Python garbage collection work?",
        answer: "Python primarily manages memory through reference counting. When an object's reference counter drops to zero, its memory is deallocated immediately. A secondary cyclic garbage collector handles circular references between objects in the background.",
      },
    ],
    relatedTools: ["json-formatter", "word-counter"],
    relatedTutorials: ["data-analytics", "sql"],
  },
  {
    id: "sql",
    slug: "sql",
    title: "SQL & Relational Databases: From Basic Queries to Window Functions",
    subtitle: "Master Structured Query Language for data querying, relational modeling, aggregation, and analytical window functions.",
    category: "SQL",
    categorySlug: "sql",
    readTime: "14 min read",
    difficulty: "Beginner",
    icon: "Database",
    badge: "Industry Essential",
    summary: "Gain complete mastery over SQL. Understand SELECT filtering, JOIN relationships, GROUP BY aggregations, CTEs, and advanced window functions like ROW_NUMBER and RANK.",
    learningObjectives: [
      "Understand relational algebra, database normalization, and table relationships",
      "Write advanced multi-table queries utilizing INNER, LEFT, and FULL OUTER JOINs",
      "Aggregate metrics across groups using GROUP BY and HAVING clauses",
      "Structure complex analytical pipelines using Common Table Expressions (CTEs)",
      "Leverage analytical window functions (OVER, PARTITION BY, DENSE_RANK)",
    ],
    introduction:
      "Data is the foundation of modern technology, and SQL (Structured Query Language) is the universal tongue spoken by relational databases across the planet. Whether you are using PostgreSQL, MySQL, Snowflake, BigQuery, or Microsoft SQL Server, writing performant SQL queries is a non-negotiable skill for software engineers, data analysts, and product managers.",
    sections: [
      {
        heading: "1. Core Query Structure & Execution Order",
        subheading: "Understanding how the database engine actually processes your query",
        content: [
          "Most beginners assume SQL queries execute top-to-bottom starting with `SELECT`. In reality, database query planners execute clauses in a very specific logical order: `FROM` and `JOIN`, followed by `WHERE`, `GROUP BY`, `HAVING`, `SELECT`, `DISTINCT`, `ORDER BY`, and finally `LIMIT`.",
          "Understanding this processing order explains why you cannot reference column aliases defined in `SELECT` inside your `WHERE` clause: the `WHERE` filter runs before the `SELECT` projection exists!",
        ],
        codeBlock: {
          language: "sql",
          code: `-- Filtering and aggregating university student records
SELECT 
    department_id,
    COUNT(student_id) AS total_enrolled,
    ROUND(AVG(gpa), 2) AS average_gpa
FROM students
WHERE status = 'Active' AND admission_year >= 2022
GROUP BY department_id
HAVING AVG(gpa) >= 3.20
ORDER BY average_gpa DESC
LIMIT 10;`,
          explanation: "Notice that HAVING filters aggregated metrics after GROUP BY, whereas WHERE filters individual rows before grouping occurs.",
        },
      },
      {
        heading: "2. Demystifying Joins and Relational Cardinality",
        subheading: "INNER, LEFT, RIGHT, and FULL OUTER joins explained",
        content: [
          "Relational databases separate concerns across normalized tables to prevent redundancy. To combine rows from related tables, SQL provides JOIN operations matching foreign keys to primary keys.",
          "`INNER JOIN` yields only rows where the join predicate matches in both tables. `LEFT JOIN` guarantees all rows from the primary left table are retained, appending `NULL` values when the right table lacks matching keys.",
        ],
        codeBlock: {
          language: "sql",
          code: `-- Combining course enrollments with student data
SELECT 
    s.student_id,
    s.full_name,
    c.course_code,
    c.course_name,
    e.grade
FROM students s
INNER JOIN enrollments e ON s.student_id = e.student_id
INNER JOIN courses c ON e.course_id = c.course_id
WHERE e.semester = 'Fall 2024';`,
          explanation: "Aliasing tables with short identifiers (s, e, c) makes complex joins maintainable and avoids column ambiguity.",
        },
      },
      {
        heading: "3. Advanced Window Functions & CTEs",
        subheading: "Calculating running totals, percentiles, and ranks without self-joins",
        content: [
          "Traditional `GROUP BY` collapses individual rows into single summary rows. In contrast, Window Functions evaluate calculations across a set of table rows related to the current row without collapsing the result set.",
          "Common Table Expressions (CTEs) introduced with the `WITH` keyword create temporary named result sets that make intricate nested queries read like clean, linear procedural code.",
        ],
        codeBlock: {
          language: "sql",
          code: `-- Ranking top students per department using DENSE_RANK()
WITH DepartmentRankings AS (
    SELECT 
        student_id,
        department_id,
        gpa,
        DENSE_RANK() OVER (
            PARTITION BY department_id 
            ORDER BY gpa DESC
        ) as department_rank
    FROM students
    WHERE is_enrolled = TRUE
)
SELECT * 
FROM DepartmentRankings
WHERE department_rank <= 3
ORDER BY department_id, department_rank;`,
          explanation: "PARTITION BY resets the rank calculation for each department, while ORDER BY determines the rank ordering.",
        },
      },
    ],
    faqs: [
      {
        question: "When should I use WHERE vs HAVING in SQL?",
        answer: "Use WHERE to filter individual rows before any grouping or aggregation takes place. Use HAVING to filter groups of rows after GROUP BY has calculated aggregate values (like SUM, AVG, or COUNT).",
      },
      {
        question: "What is an index, and how does it speed up queries?",
        answer: "An index is a specialized data structure (typically a B-Tree) maintained by the database that allows the query engine to locate rows in logarithmic O(log N) time rather than performing an expensive full-table sequential scan.",
      },
      {
        question: "What is the difference between RANK() and DENSE_RANK()?",
        answer: "Both rank rows based on an ORDER BY criteria. When ties occur, RANK() skips subsequent rank numbers (e.g. 1, 1, 3), whereas DENSE_RANK() assigns consecutive rank numbers without gaps (e.g. 1, 1, 2).",
      },
    ],
    relatedTools: ["cgpa-calculator", "percentage-calculator"],
    relatedTutorials: ["data-analytics", "power-bi"],
  },
  {
    id: "power-bi",
    slug: "power-bi",
    title: "Power BI for Business Intelligence: End-to-End Analytics & DAX",
    subtitle: "A practical guide to data modeling, star schemas, Power Query M transformations, and core DAX calculation patterns.",
    category: "Power BI",
    categorySlug: "power-bi",
    readTime: "11 min read",
    difficulty: "Intermediate",
    icon: "BarChart3",
    badge: "Business Analytics",
    summary: "Discover how to transform raw business data into actionable executive dashboards using Power BI Desktop, Power Query, star schema data modeling, and essential DAX formulas.",
    learningObjectives: [
      "Understand the Power BI architecture: Power Query, Data Model, and Visual Canvas",
      "Transform and clean disparate datasets using the Power Query M language",
      "Architect clean Star Schema data models with Fact and Dimension tables",
      "Write calculated measures using fundamental DAX functions (CALCULATE, FILTER, RELATED)",
      "Design accessible, high-impact executive dashboards and mobile layouts",
    ],
    introduction:
      "Microsoft Power BI has emerged as the definitive business analytics platform for global enterprises. Bridging the gap between raw database tables and strategic executive decision-making, Power BI empowers analysts to clean dirty data, engineer relational models, and formulate complex metrics through DAX (Data Analysis Expressions).",
    sections: [
      {
        heading: "1. The Analytics Pipeline: Power Query to Visuals",
        subheading: "Extract, Transform, and Load (ETL) inside Power BI",
        content: [
          "Every robust Power BI report begins in Power Query. Power Query connects to varied sources—such as SQL databases, Excel workbooks, SharePoint lists, and REST APIs—and executes cleaning steps recorded in the functional M programming language.",
          "Key transformations include unpivoting wide survey data into tall analytical columns, promoting headers, splitting columns by delimiters, and standardizing datatypes before data loads into the VertiPaq tabular memory engine.",
        ],
        tips: [
          "Never perform heavy data transformations inside DAX calculated columns. Perform all row-level ETL in Power Query or upstream in SQL to maximize VertiPaq compression.",
          "Ensure integer foreign keys are used to establish 1-to-many relationships rather than heavy text strings.",
        ],
      },
      {
        heading: "2. Star Schema Data Modeling Principles",
        subheading: "Fact tables vs. Dimension tables and filter context propagation",
        content: [
          "The single greatest cause of sluggish Power BI reports is poor data modeling. The gold standard for business intelligence reporting is the Ralph Kimball Star Schema.",
          "In a Star Schema, central Fact tables store quantitative events (such as sales transactions, exam marks, or attendance logs), surrounded by Dimension tables storing descriptive context (students, dates, courses, instructors). Filters propagate naturally from the 'one' side (dimension) to the 'many' side (fact).",
        ],
      },
      {
        heading: "3. Mastering DAX: Measures and Filter Context",
        subheading: "Calculated columns vs. measures and the CALCULATE function",
        content: [
          "DAX differs radically from Excel formulas because it evaluates within a dynamic 'Filter Context' created by user slicers, cross-filtering visuals, and row coordinates.",
          "`CALCULATE()` is the most powerful function in DAX: it is the only function capable of modifying, clearing, or injecting new filter context during measure evaluation.",
        ],
        codeBlock: {
          language: "dax",
          code: `-- Core DAX Measure Definitions

// Basic aggregation measure
Total Enrolled Students = 
COUNTROWS('Fact_Enrollments')

// High-performing student percentage utilizing CALCULATE
High Achievers Ratio = 
VAR TotalStudents = [Total Enrolled Students]
VAR HighAchievers = 
    CALCULATE(
        [Total Enrolled Students],
        'Dim_Student'[GPA] >= 3.50
    )
RETURN 
    DIVIDE(HighAchievers, TotalStudents, 0)`,
          explanation: "Using variables (VAR ... RETURN) improves performance by evaluating expressions once and enhances code readability.",
        },
      },
    ],
    faqs: [
      {
        question: "What is the difference between a Calculated Column and a Measure?",
        answer: "Calculated columns evaluate during data refresh for every row in the table, consuming physical RAM and disk space. Measures evaluate on the fly based on the current visual filter context, consuming virtually no storage and recalculating dynamically.",
      },
      {
        question: "Why should I always build a dedicated Date Dimension table?",
        answer: "A dedicated Date table ensures complete date continuity (no missing weekend or holiday dates), enabling Power BI's time intelligence functions (such as TOTALYTD, SAMEPERIODLASTYEAR, and DATEADD) to function properly.",
      },
    ],
    relatedTools: ["percentage-calculator", "attendance-calculator"],
    relatedTutorials: ["data-analytics", "sql"],
  },
  {
    id: "data-analytics",
    slug: "data-analytics",
    title: "Data Analytics Foundations: Exploratory Data Analysis & Statistics",
    subtitle: "A complete overview of the data analytics lifecycle: problem framing, data wrangling, EDA, statistical testing, and storytelling.",
    category: "Data Analytics",
    categorySlug: "data-analytics",
    readTime: "13 min read",
    difficulty: "Beginner",
    icon: "TrendingUp",
    badge: "Career Track",
    summary: "Learn how data analysts extract strategic insights from raw information. Cover descriptive statistics, handling outliers, feature distribution, correlation analysis, and data storytelling.",
    learningObjectives: [
      "Understand the standard 5-stage Data Analytics Lifecycle",
      "Calculate and interpret descriptive statistics: mean, median, variance, and standard deviation",
      "Detect and remediate missing data and outliers using IQR and Z-scores",
      "Distinguish correlation from causation and evaluate Pearson vs. Spearman coefficients",
      "Formulate compelling narrative charts using principles of visual perception",
    ],
    introduction:
      "In the modern data-driven economy, data analytics is the bridge between raw observational records and high-stakes operational choices. Rather than relying on intuition or guesswork, companies leverage statistical inquiry to optimize customer retention, streamline supply chains, and evaluate educational outcomes.",
    sections: [
      {
        heading: "1. The 5 Stages of the Data Analytics Lifecycle",
        subheading: "From business question formulation to executive presentation",
        content: [
          "Every successful analytics initiative adheres to a rigorous process: 1) Problem Definition (identifying measurable KPIs), 2) Data Collection and Extraction (querying databases and APIs), 3) Data Cleaning & Wrangling (addressing nulls, duplicates, and format inconsistencies), 4) Exploratory Data Analysis (EDA), and 5) Data Storytelling & Deployment.",
          "Analyst time is overwhelmingly invested in stages 2 and 3: raw data is invariably messy, inconsistent, and fraught with edge cases.",
        ],
      },
      {
        heading: "2. Exploratory Data Analysis (EDA) & Distribution Checks",
        subheading: "Measures of central tendency, skewness, and IQR anomaly detection",
        content: [
          "Before applying any modeling, analysts inspect the shape and spread of variables. The arithmetic mean is heavily skewed by extreme values, which is why median and interquartile range (IQR) are preferred for skewed distributions like student wealth or website session times.",
          "The Interquartile Range (IQR = Q3 - Q1) defines statistical fences: any observation falling below Q1 - 1.5*IQR or above Q3 + 1.5*IQR is categorized as a candidate outlier requiring investigation.",
        ],
        codeBlock: {
          language: "python",
          code: `# Identifying outliers using Pandas and IQR
import numpy as np
import pandas as pd

def detect_outliers_iqr(series: pd.Series) -> pd.Series:
    q1 = series.quantile(0.25)
    q3 = series.quantile(0.75)
    iqr = q3 - q1
    lower_bound = q1 - 1.5 * iqr
    upper_bound = q3 + 1.5 * iqr
    return (series < lower_bound) | (series > upper_bound)

# Sample test scores dataset
df = pd.DataFrame({"scores": [45, 78, 82, 85, 88, 90, 92, 95, 98, 150]})
outliers = df[detect_outliers_iqr(df["scores"])]
print("Detected Anomalies:")
print(outliers)`,
          explanation: "The score 150 is cleanly flagged because it exceeds the calculated upper threshold fence.",
        },
      },
      {
        heading: "3. Correlation, Causation, and Visualization Ethics",
        subheading: "Communicating findings without misleading your audience",
        content: [
          "A fundamental tenet of statistics is that correlation does not imply causation. Two variables may exhibit a high Pearson correlation coefficient (r) due to a shared lurking confounder or sheer coincidence.",
          "When designing charts, maintain baseline integrity (e.g. starting bar charts at zero) and select color palettes that are accessible to color-blind stakeholders.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the difference between Data Analytics and Data Science?",
        answer: "Data Analytics focuses primarily on historical and current trends to answer 'What happened and why?', utilizing SQL, BI tools, and descriptive statistics. Data Science focuses on predictive modeling and machine learning to answer 'What will happen next?' using algorithms and advanced programming.",
      },
      {
        question: "When should I use median instead of mean?",
        answer: "Use the median when your dataset contains extreme outliers or exhibits significant skewness (e.g. household incomes, real estate prices). The median represents the exact 50th percentile and is resistant to extreme values.",
      },
    ],
    relatedTools: ["cgpa-calculator", "percentage-calculator", "word-counter"],
    relatedTutorials: ["python-programming", "sql", "power-bi"],
  },
  {
    id: "web-development",
    slug: "web-development",
    title: "Modern Web Development: Architecture, Next.js & Responsive UI",
    subtitle: "Build modern, accessible, and high-performance web applications using semantic HTML, CSS, React, and Next.js App Router.",
    category: "Web Development",
    categorySlug: "web-dev",
    readTime: "15 min read",
    difficulty: "Beginner",
    icon: "Layout",
    badge: "Full Stack",
    summary: "Discover the principles of production web development. Master semantic HTML, responsive CSS with Tailwind, modern React component architecture, and the Next.js App Router.",
    learningObjectives: [
      "Structure accessible, SEO-compliant pages with semantic HTML5 elements",
      "Implement responsive, fluid designs using modern CSS Flexbox and Grid layouts",
      "Build modular, reusable React UI components with declarative props and state",
      "Understand Server Components vs. Client Components in Next.js App Router",
      "Optimize web performance, Core Web Vitals, and Lighthouse audit scores",
    ],
    introduction:
      "Web development has evolved from simple static HTML pages with inline styling into a sophisticated software engineering discipline. Today's web applications require responsive fluid interfaces, lightning-fast rendering times, robust accessibility, and search engine optimization. In this guide, you will learn how modern full-stack websites—like Coding Hub—are engineered.",
    sections: [
      {
        heading: "1. The Foundational Triumvirate: Semantic HTML, CSS, and JS",
        subheading: "Accessibility, SEO, and structural semantics",
        content: [
          "Building great web experiences begins with semantic HTML. Replacing generic `<div>` tags with `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, and `<footer>` allows screen readers, assistive technology, and search engine bots to accurately understand page hierarchy.",
          "For layout and styling, modern utility-first CSS frameworks like Tailwind CSS eliminate context-switching by colocating design styles directly within markup while enforcing design system constraints.",
        ],
        codeBlock: {
          language: "tsx",
          code: `// Modern accessible React button component
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export function ActionButton({ 
  variant = "primary", 
  children, 
  className = "", 
  ...props 
}: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2";
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-500 text-white focus:ring-indigo-400",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 focus:ring-slate-500",
  };

  return (
    <button 
      className={\`\${baseStyles} \${variants[variant]} \${className}\`} 
      {...props}
    >
      {children}
    </button>
  );
}`,
          explanation: "Encapsulating styling variants into typed reusable components guarantees visual consistency and rapid UI development.",
        },
      },
      {
        heading: "2. Next.js App Router & Hybrid Rendering Architecture",
        subheading: "React Server Components (RSC) vs Client Components ('use client')",
        content: [
          "Next.js revolutionized React development by introducing React Server Components by default inside the `app` directory.",
          "Server Components execute exclusively on the server, streaming lightweight HTML to the client without shipping bulky JavaScript bundles. When interactive state or browser APIs (like `localStorage` or `onClick` events) are required, you declare `'use client'` at the top of the file to instantiate a Client Component boundary.",
        ],
      },
      {
        heading: "3. Optimizing Core Web Vitals for Production",
        subheading: "LCP, INP, and CLS optimization techniques",
        content: [
          "Google evaluates website quality using Core Web Vitals: Largest Contentful Paint (LCP for loading speed), Interaction to Next Paint (INP for responsiveness), and Cumulative Layout Shift (CLS for visual stability).",
          "Ensure images use modern formats (WebP, AVIF) with defined aspect ratios, avoid layout shifts by reserving ad containers with static minimum heights, and preconnect to critical domains.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why should I use Next.js instead of plain Vite or Create React App?",
        answer: "Next.js provides built-in server-side rendering (SSR), static site generation (SSG), automatic image optimization, file-based routing, and zero-config SEO headers, ensuring top-tier search engine visibility and initial load speeds that client-only SPAs struggle to match.",
      },
      {
        question: "What is Cumulative Layout Shift (CLS) and how do I prevent it?",
        answer: "CLS measures unexpected layout movement when elements render or load asynchronously (e.g. unstyled images or dynamic ads). Prevent it by specifying width and height attributes on images and pre-reserving container space for advertisements.",
      },
    ],
    relatedTools: ["json-formatter", "text-case-converter"],
    relatedTutorials: ["javascript", "python-programming"],
  },
  {
    id: "javascript",
    slug: "javascript",
    title: "JavaScript Deep Dive: Asynchronous Programming, Closures & ES6+",
    subtitle: "Master the intricacies of the JavaScript runtime: Event Loop, Promises, Async/Await, Prototypes, and modern ESNext features.",
    category: "JavaScript",
    categorySlug: "javascript",
    readTime: "12 min read",
    difficulty: "Intermediate",
    icon: "FileCode",
    badge: "Core Web Language",
    summary: "Elevate your JavaScript expertise. Deepen your understanding of closures, the call stack, microtask queues, async/await error handling, and immutable array manipulations.",
    learningObjectives: [
      "Master lexical scope, execution contexts, and the mechanics of closures",
      "Deconstruct the JavaScript Event Loop, Call Stack, Microtasks, and Macrotasks",
      "Write clean asynchronous logic with Promises, async/await, and Promise.allSettled",
      "Utilize functional methods: map, filter, reduce, find, and structuredClone",
      "Implement defensive coding practices for resilient client-side applications",
    ],
    introduction:
      "JavaScript is the undisputed execution engine of the web. What started in 1995 as a 10-day scripting language for Netscape Navigator is now a powerhouse runtime powering client browsers (V8, SpiderMonkey), backend servers (Node.js, Deno, Bun), and mobile devices. Mastering JavaScript's runtime dynamics is essential for any serious software engineer.",
    sections: [
      {
        heading: "1. The JavaScript Event Loop & Concurrency Model",
        subheading: "Call Stack, Web APIs, Microtask Queue, and Task Queue",
        content: [
          "JavaScript is single-threaded: it has one call stack and can only execute one chunk of code at any given instant. To handle long-running operations like network requests or file reads without freezing the browser UI, JavaScript relies on an asynchronous event loop.",
          "When an asynchronous call (such as `fetch`) initiates, the browser delegates the work to background threads. Upon completion, Promise callbacks enter the high-priority **Microtask Queue**, which completely drains before the event loop processes tasks from the standard Macrotask Queue (like `setTimeout`).",
        ],
        codeBlock: {
          language: "javascript",
          code: `// Demonstrating Event Loop Execution Order
console.log("1. Synchronous script start");

setTimeout(() => {
  console.log("4. Macrotask (setTimeout callback)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Microtask (Promise callback)");
});

console.log("2. Synchronous script end");

// Output Sequence:
// 1. Synchronous script start
// 2. Synchronous script end
// 3. Microtask (Promise callback)
// 4. Macrotask (setTimeout callback)`,
          explanation: "Microtasks always execute immediately after current synchronous code completes and prior to any pending macrotasks.",
        },
      },
      {
        heading: "2. Understanding Closures and Encapsulation",
        subheading: "Lexical scoping and state preservation",
        content: [
          "A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In JavaScript, closures give inner functions access to an outer function's scope even after the outer function has finished executing.",
          "Closures form the underlying mechanics for functional currying, memoization caches, and React hooks like `useState`.",
        ],
        codeBlock: {
          language: "javascript",
          code: `// Building a stateful counter using closures
function createGradeTracker(studentName) {
  const grades = []; // Private enclosed state

  return {
    addGrade(score) {
      if (score >= 0 && score <= 100) {
        grades.push(score);
        return true;
      }
      return false;
    },
    getAverage() {
      if (grades.length === 0) return 0;
      const sum = grades.reduce((acc, curr) => acc + curr, 0);
      return Number((sum / grades.length).toFixed(2));
    },
    getReport() {
      return \`\${studentName}: \${grades.length} exams recorded | Avg: \${this.getAverage()}\`;
    }
  };
}

const tracker = createGradeTracker("Elena");
tracker.addGrade(94);
tracker.addGrade(88);
console.log(tracker.getReport()); // Elena: 2 exams recorded | Avg: 91.00`,
          explanation: "The 'grades' array cannot be manipulated directly from the outside, ensuring state encapsulation.",
        },
      },
      {
        heading: "3. Modern Async/Await Patterns and Error Handling",
        subheading: "Defensive fetching and concurrent orchestration",
        content: [
          "`async/await` syntax makes asynchronous code read synchronously. When coordinating multiple independent API requests, avoid sequential `await` calls that trigger waterfall delays; instead, launch requests concurrently with `Promise.all` or `Promise.allSettled`.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the difference between == and === in JavaScript?",
        answer: "== performs type coercion before comparison (e.g. '5' == 5 evaluates to true), which often leads to subtle bugs. === performs strict equality without coercion (both value and type must match), making it the recommended comparison operator.",
      },
      {
        question: "How does structuredClone() differ from JSON.parse(JSON.stringify())?",
        answer: "structuredClone() is the native modern web standard for deep copying objects. Unlike the JSON trick, structuredClone correctly preserves dates, sets, maps, regular expressions, and circular references without corrupting data types.",
      },
    ],
    relatedTools: ["json-formatter", "text-case-converter", "word-counter"],
    relatedTutorials: ["web-development", "python-programming"],
  },
];
