export interface TableOfContentItem {
  id: string;
  title: string;
}

export interface TutorialSection {
  id: string;
  heading: string;
  subheading?: string;
  content: string[];
  codeBlock?: {
    language: string;
    code: string;
    explanation: string;
  };
  tips?: string[];
  commonMistakes?: string[];
}

export interface TutorialItem {
  id: string;
  slug: string;
  categorySlug: "python" | "sql" | "power-bi" | "data-analytics" | "web-development" | "java";
  category: string;
  title: string;
  subtitle: string;
  summary: string;
  readTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  icon: string;
  badge: string;
  publishedAt: string;
  updatedAt: string;
  author: {
    name: string;
    role: string;
  };
  learningObjectives: string[];
  introduction: string;
  tableOfContents: TableOfContentItem[];
  sections: TutorialSection[];
  summaryTakeaways: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedTutorials: string[]; // slugs
  relatedTools: string[]; // tool ids
  isFeatured?: boolean;
  isRecommended?: boolean;
}

export const tutorialsData: TutorialItem[] = [
  // ==========================================
  // PYTHON TUTORIALS (3)
  // ==========================================
  {
    id: "what-is-python",
    slug: "what-is-python",
    categorySlug: "python",
    category: "Python Programming",
    title: "What Is Python? A Beginner's Complete Introduction",
    subtitle: "Understand why Python has become the world's most versatile language for automation, web backends, and data science.",
    summary: "Discover Python's core design philosophy, interpreted execution model, dynamic typing, and why readability makes it the optimal first language.",
    readTime: "6 min read",
    difficulty: "Beginner",
    icon: "Code",
    badge: "Core Language",
    publishedAt: "2026-01-15",
    updatedAt: "2026-03-10",
    author: {
      name: "Coding Hub Technical Editorial Team",
      role: "Software Engineering & Education",
    },
    learningObjectives: [
      "Understand Python's interpreted execution model vs compiled languages",
      "Learn the core philosophy of 'The Zen of Python' and readability principles",
      "Verify your local Python installation and execute your first script",
      "Explore primary domain applications across data science, web backends, and script automation",
    ],
    introduction:
      "Created by Guido van Rossum and first released in 1991, Python was intentionally built around a radical core philosophy: computer code is read far more often than it is written. While languages like C++ and Java demand rigid boilerplate syntax, Python enforces clean, visually intuitive indentation that reads almost like standard English prose. Today, Python stands as the primary language powering artificial intelligence, data engineering, cloud infrastructure automation, and backend web APIs.",
    tableOfContents: [
      { id: "why-python-matters", title: "1. Why Python Matters" },
      { id: "interpreted-vs-compiled", title: "2. Interpreted Execution Explained" },
      { id: "running-first-script", title: "3. Running Your First Python Script" },
      { id: "common-pitfalls", title: "4. Common Beginner Pitfalls" },
      { id: "key-takeaways", title: "5. Key Takeaways & Next Steps" },
    ],
    sections: [
      {
        id: "why-python-matters",
        heading: "1. Why Python Matters in Modern Computing",
        subheading: "Readability, extensive package ecosystem, and community support",
        content: [
          "Python is high-level, general-purpose, and dynamically typed. A high-level language abstracts away computer architecture details like manual memory allocation, pointer manipulation, and CPU register management.",
          "Through the Python Package Index (PyPI), developers have instant access to hundreds of thousands of battle-tested open-source libraries. For data analysis, libraries like Pandas and NumPy offer vectorized speed. For web applications, frameworks like Django and FastAPI provide production-grade server architectures.",
        ],
        tips: [
          "Type `import this` inside an interactive Python terminal to read Tim Peters' 19 guiding design principles in The Zen of Python.",
        ],
      },
      {
        id: "interpreted-vs-compiled",
        heading: "2. How Python Runs: Interpreted Execution",
        subheading: "From source code (.py) to bytecode (.pyc) to the Python Virtual Machine",
        content: [
          "Unlike C or Rust, which compile directly to hardware-specific machine code binary files before execution, Python relies on an interpreter (standard implementation: CPython).",
          "When you run a Python script, the interpreter first parses your source code and compiles it into an intermediate representation known as bytecode. This bytecode is then executed line-by-line by the Python Virtual Machine (PVM). This allows Python code written on Windows to run unmodified on macOS and Linux servers.",
        ],
      },
      {
        id: "running-first-script",
        heading: "3. Writing and Running Your First Python Script",
        subheading: "Command line execution and interactive REPL",
        content: [
          "To verify that Python is installed on your system, open your command terminal and run `python --version` or `python3 --version`. You should see Python 3.10 or higher.",
          "Here is a complete, beginner-friendly Python script that demonstrates variable assignment, string interpolation, and list iteration:",
        ],
        codeBlock: {
          language: "python",
          code: `# first_script.py
student_name = "Alex"
target_attendance_rate = 75.0
completed_courses = ["Calculus", "Data Structures", "Computer Architecture"]

print(f"Student: {student_name}")
print(f"Target Attendance: {target_attendance_rate}%")
print("Current Course Enrolments:")

for index, course in enumerate(completed_courses, start=1):
    print(f"  {index}. {course}")`,
          explanation:
            "Python uses clean f-strings (formatted string literals) prefixed with 'f' to embed variables directly inside strings within curly braces.",
        },
        commonMistakes: [
          "Mixing tabs and spaces for indentation. Always configure your code editor to insert 4 spaces per indent level.",
          "Using Python 2 syntax like `print 'Hello'`. Python 3 requires parentheses: `print('Hello')`.",
        ],
      },
      {
        id: "common-pitfalls",
        heading: "4. Common Beginner Pitfalls",
        content: [
          "Beginners frequently stumble upon indentation errors. Because Python has no curly braces `{}` to demarcate code blocks, inconsistent whitespace causes immediate IndentationError failures.",
          "Another pitfall is running outdated global Python environments instead of project-isolated virtual environments (`python -m venv .venv`). Virtual environments keep dependencies clean across multiple local projects.",
        ],
      },
      {
        id: "key-takeaways",
        heading: "5. Key Takeaways & Summary",
        content: [
          "Python balances extreme developer productivity with tremendous ecosystem breadth.",
          "Its interpreted architecture enables immediate rapid prototyping, while its clear syntax reduces cognitive load, making it ideal for automation, web backends, and data workflows.",
        ],
      },
    ],
    summaryTakeaways: [
      "Python is an interpreted, dynamically typed, high-level programming language.",
      "Indentation in Python is syntactic: 4 spaces per indentation level is the universal PEP 8 standard.",
      "Code is executed via CPython bytecode on the Python Virtual Machine.",
      "Virtual environments isolate dependencies and prevent library version conflicts.",
    ],
    faqs: [
      {
        question: "Is Python fast enough for production applications?",
        answer: "Yes. While raw CPU-bound iteration in pure Python is slower than compiled C or Go, modern Python applications delegate heavy computational lifting to optimized C and Fortran libraries (like NumPy, BLAS, and PyTorch). Major platforms like Instagram, Netflix, and Spotify rely heavily on Python backends.",
      },
      {
        question: "Should I learn Python 2 or Python 3?",
        answer: "Always learn Python 3. Python 2 reached official End-of-Life on January 1, 2020, and is no longer supported or maintained.",
      },
      {
        question: "What text editor should I use for Python?",
        answer: "Visual Studio Code (with the official Microsoft Python extension) and PyCharm are the two industry standards for writing and debugging Python code.",
      },
    ],
    relatedTutorials: ["python-variables", "python-functions", "what-is-data-analytics"],
    relatedTools: ["word-counter", "text-case-converter"],
    isFeatured: true,
    isRecommended: true,
  },

  {
    id: "python-variables",
    slug: "python-variables",
    categorySlug: "python",
    category: "Python Programming",
    title: "Python Variables and Data Types: A Comprehensive Guide",
    subtitle: "Master dynamic typing, primitive types, sequence containers, and mutability in modern Python.",
    summary: "Learn how variables work in Python as memory references. Understand numbers, strings, lists, tuples, dictionaries, sets, and type conversion.",
    readTime: "8 min read",
    difficulty: "Beginner",
    icon: "Code",
    badge: "Core Language",
    publishedAt: "2026-01-20",
    updatedAt: "2026-03-12",
    author: {
      name: "Coding Hub Technical Editorial Team",
      role: "Software Engineering & Education",
    },
    learningObjectives: [
      "Understand variable naming conventions (PEP 8 snake_case)",
      "Distinguish between primitive types (int, float, bool, str) and collection types",
      "Master the fundamental difference between mutable and immutable data structures",
      "Perform safe explicit type conversions using int(), float(), and str()",
    ],
    introduction:
      "In many compiled programming languages, a variable is a named memory location with a fixed, strictly enforced type. In Python, variables work differently: they are lightweight labels or references bound to underlying objects in heap memory. Because Python is dynamically typed, you do not declare a variable's type upfront; the interpreter infers the type automatically at runtime based on the value assigned.",
    tableOfContents: [
      { id: "variable-declaration", title: "1. Variable Declaration & Memory References" },
      { id: "primitive-types", title: "2. Primitive Data Types" },
      { id: "collection-types", title: "3. Sequence & Mapping Containers" },
      { id: "mutability", title: "4. Mutability vs Immutability" },
      { id: "type-casting", title: "5. Explicit Type Casting & Best Practices" },
    ],
    sections: [
      {
        id: "variable-declaration",
        heading: "1. Variable Declaration & Memory References",
        subheading: "Assignment operator and PEP 8 naming standards",
        content: [
          "To create a variable in Python, assign an object to a name using the `=` operator.",
          "According to Python's official PEP 8 style guide, variable and function names must use lowercase letters separated by underscores (`snake_case`). Variable names cannot start with a digit, cannot contain punctuation, and should never shadow Python built-in keywords.",
        ],
        codeBlock: {
          language: "python",
          code: `# Variable assignment and dynamic reassignment
semester_gpa = 8.75         # float
student_count = 120         # integer
is_active_term = True       # boolean
course_code = "CS-201"      # string

# In Python, variables can be rebound to different types:
item = 42                   # item refers to an int
item = "Forty-Two"          # item now refers to a str`,
          explanation:
            "Rebinding `item` simply redirects the reference pointer to a new string object; the initial integer is garbage collected if no other references exist.",
        },
      },
      {
        id: "primitive-types",
        heading: "2. Primitive Data Types",
        subheading: "Integers, Floats, Booleans, and Strings",
        content: [
          "Integers (`int`) in Python 3 have arbitrary precision, meaning they can grow to accommodate arbitrarily large numbers limited only by available system RAM.",
          "Floats (`float`) implement standard IEEE 754 double-precision numbers. Booleans (`bool`) have two states: `True` and `False`.",
          "Strings (`str`) are immutable sequences of Unicode characters, supporting multi-language characters out of the box.",
        ],
      },
      {
        id: "collection-types",
        heading: "3. Collection Types: Lists, Tuples, Dictionaries & Sets",
        subheading: "Choosing the correct container for your data",
        content: [
          "Lists (`list`) are ordered, mutable sequences enclosed in square brackets `[]`.",
          "Tuples (`tuple`) are ordered, immutable sequences enclosed in parentheses `()`.",
          "Dictionaries (`dict`) are key-value mappings enclosed in curly braces `{}` with unique keys and O(1) average lookup times.",
          "Sets (`set`) are unordered collections of unique elements, useful for deduplication and membership checks.",
        ],
        codeBlock: {
          language: "python",
          code: `# Collections in action
exam_scores = [88, 92, 79, 95]               # Mutable list
fixed_dimensions = (1920, 1080)              # Immutable tuple
unique_student_ids = {101, 102, 103, 101}    # Set removes duplicate 101

# Dictionary mapping student IDs to grade averages
grade_book = {
    "S101": 8.8,
    "S102": 7.4,
    "S103": 9.1
}

print("Unique IDs count:", len(unique_student_ids))  # Output: 3
print("Student S101 GPA:", grade_book["S101"])        # Output: 8.8`,
          explanation:
            "Dictionaries provide fast hash-based lookups, making them the standard data container for API responses and table records.",
        },
      },
      {
        id: "mutability",
        heading: "4. Mutability vs Immutability",
        content: [
          "Understanding mutability is crucial in Python. Immutable objects (strings, integers, floats, tuples) cannot be modified in place after creation; modifying them produces a new object.",
          "Mutable objects (lists, dictionaries, sets) can be modified in place without changing their identity memory address (`id()`).",
        ],
        commonMistakes: [
          "Assuming `b = a` copies a list. In Python, assigning a list to a new variable copies the reference, not the data. Modifying `b` will modify `a`! Use `b = a.copy()` or `list(a)` to create an independent shallow copy.",
        ],
      },
      {
        id: "type-casting",
        heading: "5. Explicit Type Casting & Best Practices",
        content: [
          "User input from terminals or web forms always arrives as strings. Use `int()`, `float()`, or `str()` to explicitly convert between data types.",
        ],
        codeBlock: {
          language: "python",
          code: `raw_input_marks = "95"
total_possible_marks = 100

# Explicitly cast to float before math operations
percentage = (float(raw_input_marks) / total_possible_marks) * 100
print(f"Calculated Percentage: {percentage:.1f}%")  # Output: 95.0%`,
          explanation:
            "Formatting with `:.1f` inside an f-string rounds the displayed floating-point number to one decimal place.",
        },
      },
    ],
    summaryTakeaways: [
      "Variables in Python are reference labels attached to objects in memory.",
      "Primitive types: int (arbitrary precision), float (double precision), bool, str.",
      "Lists and dictionaries are mutable; tuples, strings, and numbers are immutable.",
      "Always use PEP 8 snake_case for variable names.",
    ],
    faqs: [
      {
        question: "Why does Python not require variable type declarations?",
        answer: "Python is dynamically typed: the interpreter checks and enforces types at runtime when operations occur, rather than checking during an ahead-of-time compile step. Python 3.6+ supports optional type hints (e.g. `age: int = 20`) for static analysis with tools like Mypy.",
      },
      {
        question: "When should I use a tuple instead of a list?",
        answer: "Use tuples when you have a fixed collection of heterogeneous items that should never change (like coordinates or database records). Tuples use slightly less memory than lists and prevent accidental mutation bugs.",
      },
    ],
    relatedTutorials: ["what-is-python", "python-functions", "data-cleaning-techniques"],
    relatedTools: ["text-case-converter", "percentage-calculator"],
    isFeatured: false,
    isRecommended: true,
  },

  {
    id: "python-functions",
    slug: "python-functions",
    categorySlug: "python",
    category: "Python Programming",
    title: "Python Functions: Defining Reusable, Modular Code",
    subtitle: "Learn def statements, positional parameters, keyword arguments, default values, and scope rules.",
    summary: "A practical guide to writing clean, modular Python functions. Master argument passing, *args and **kwargs, return tuples, and docstrings.",
    readTime: "9 min read",
    difficulty: "Beginner",
    icon: "Code",
    badge: "Core Language",
    publishedAt: "2026-02-01",
    updatedAt: "2026-03-15",
    author: {
      name: "Coding Hub Technical Editorial Team",
      role: "Software Engineering & Education",
    },
    learningObjectives: [
      "Define functions with clear parameters and explicit return statements",
      "Configure default argument values safely without mutable default traps",
      "Accept arbitrary numbers of parameters with *args and **kwargs",
      "Understand variable scope rules governed by Python's LEGB hierarchy",
    ],
    introduction:
      "Functions are the foundational building blocks of organized software. They allow developers to encapsulate logic into named, self-contained, and reusable routines. Instead of repeating lines of code across scripts, functions enable the DRY (Don't Repeat Yourself) principle, making programs easier to test, debug, and maintain.",
    tableOfContents: [
      { id: "defining-functions", title: "1. Defining Functions & Return Values" },
      { id: "parameters-arguments", title: "2. Positional vs Keyword Arguments" },
      { id: "args-kwargs", title: "3. Variable Arguments with *args and **kwargs" },
      { id: "scope-legb", title: "4. Variable Scope & The LEGB Rule" },
      { id: "docstrings", title: "5. Docstrings & Type Annotations" },
    ],
    sections: [
      {
        id: "defining-functions",
        heading: "1. Defining Functions & Return Values",
        subheading: "The def statement, parameters, and early returns",
        content: [
          "In Python, a function is declared using the `def` keyword, followed by the function name, parentheses containing optional parameters, and a colon.",
          "The code block indented beneath the definition executes only when the function is called. Use the `return` keyword to pass calculated results back to the caller. If a function reaches its end without an explicit `return`, it implicitly returns `None`.",
        ],
        codeBlock: {
          language: "python",
          code: `def calculate_attendance_needed(conducted: int, attended: int, target: float = 0.75) -> int:
    """Calculates additional consecutive classes needed to hit target percentage."""
    if conducted <= 0:
        return 0
    current_percentage = attended / conducted
    if current_percentage >= target:
        return 0
    
    # Mathematical derivation: ceil((target * conducted - attended) / (1 - target))
    import math
    numerator = (target * conducted) - attended
    denominator = 1.0 - target
    return max(0, math.ceil(numerator / denominator))

# Calling the function
needed = calculate_attendance_needed(48, 34, 0.75)
print(f"Classes needed: {needed}")  # Output: 8`,
          explanation:
            "This function mirrors the exact mathematical formula implemented in Coding Hub's online Attendance Calculator.",
        },
      },
      {
        id: "parameters-arguments",
        heading: "2. Positional vs Keyword Arguments",
        subheading: "Default values and the dangerous mutable default argument pitfall",
        content: [
          "Arguments passed in order are positional arguments. You can also specify arguments by name using keyword arguments (`key=value`), which allows arguments to be passed in any order.",
        ],
        commonMistakes: [
          "The Mutable Default Trap: Never use a mutable container (like `target_list=[]`) as a default parameter value! Default values are evaluated once when the function is defined, meaning all calls share the exact same list instance. Use `target_list=None` instead and initialize inside the function body.",
        ],
      },
      {
        id: "args-kwargs",
        heading: "3. Handling Arbitrary Arguments with *args and **kwargs",
        content: [
          "When you do not know in advance how many arguments will be passed to a function, use `*args` to collect extra positional arguments into a tuple, and `**kwargs` to collect extra keyword arguments into a dictionary.",
        ],
        codeBlock: {
          language: "python",
          code: `def calculate_simple_cgpa(*semester_gpas: float) -> float:
    """Computes simple arithmetic mean of any number of semester GPAs."""
    if not semester_gpas:
        return 0.0
    return round(sum(semester_gpas) / len(semester_gpas), 2)

# Pass any number of arguments dynamically
average = calculate_simple_cgpa(8.5, 8.2, 8.8, 8.4)
print(f"CGPA: {average}")  # Output: 8.48`,
          explanation:
            "`*semester_gpas` packs the 4 float numbers into a single tuple `(8.5, 8.2, 8.8, 8.4)`.",
        },
      },
      {
        id: "scope-legb",
        heading: "4. Variable Scope & The LEGB Rule",
        content: [
          "Python searches for variable names in a strict 4-tier hierarchy: Local (inside current function) → Enclosing (outer enclosing functions) → Global (module-level) → Built-in (Python system functions like `len`, `sum`, `range`).",
          "Variables created inside a function exist only within that local scope and cannot be accessed from outside.",
        ],
      },
      {
        id: "docstrings",
        heading: "5. Docstrings & Type Annotations",
        content: [
          "Professional Python developers write multi-line docstrings beneath the `def` line using triple quotes `\"\"\"`. Docstrings provide immediate tooltips inside code editors and generate automatic documentation.",
        ],
      },
    ],
    summaryTakeaways: [
      "Define functions with `def`, pass parameters in parentheses, and return values with `return`.",
      "Never use mutable default arguments; use `None` and initialize inside the function body.",
      "`*args` collects extra positional parameters into a tuple; `**kwargs` collects keyword arguments into a dictionary.",
      "Variable lookup strictly follows the Local → Enclosing → Global → Built-in (LEGB) rule.",
    ],
    faqs: [
      {
        question: "Can a Python function return multiple values?",
        answer: "Yes. In Python, returning comma-separated values (e.g. `return x, y`) packs them into a single tuple. The caller can easily unpack them: `a, b = get_coordinates()`.",
      },
      {
        question: "What is a lambda function?",
        answer: "A lambda is an anonymous, single-line function defined with the `lambda` keyword (e.g., `lambda x: x * 2`). They are typically used for short transform callbacks inside `sorted()` or `map()`.",
      },
    ],
    relatedTutorials: ["what-is-python", "python-variables", "data-cleaning-techniques"],
    relatedTools: ["cgpa-calculator", "attendance-calculator"],
    isFeatured: false,
    isRecommended: false,
  },

  // ==========================================
  // SQL AND DATABASES TUTORIALS (3)
  // ==========================================
  {
    id: "sql-basics",
    slug: "sql-basics",
    categorySlug: "sql",
    category: "SQL and Databases",
    title: "SQL Basics for Beginners: Relational Database Fundamentals",
    subtitle: "Understand tables, rows, columns, primary keys, and core CRUD statements across modern databases.",
    summary: "A gentle, comprehensive introduction to Structured Query Language (SQL). Master database concepts, primary keys, and essential querying commands.",
    readTime: "7 min read",
    difficulty: "Beginner",
    icon: "Database",
    badge: "Database",
    publishedAt: "2026-01-18",
    updatedAt: "2026-03-08",
    author: {
      name: "Coding Hub Technical Editorial Team",
      role: "Software Engineering & Education",
    },
    learningObjectives: [
      "Understand what a Relational Database Management System (RDBMS) is",
      "Learn table schema structure: rows, columns, data types, and primary keys",
      "Write fundamental DDL and DML statements: CREATE, INSERT, and SELECT",
      "Understand standard SQL dialects across PostgreSQL, MySQL, and SQLite",
    ],
    introduction:
      "Structured Query Language (SQL) is the universal, standardized language used to manage, store, query, and manipulate data stored in relational databases. First developed by IBM researchers in the 1970s, SQL remains the absolute foundation of data infrastructure across modern banking, e-commerce, cloud software, and analytics platforms.",
    tableOfContents: [
      { id: "what-is-rdbms", title: "1. What is an RDBMS?" },
      { id: "tables-keys", title: "2. Tables, Columns, and Primary Keys" },
      { id: "creating-tables", title: "3. Creating Tables & Inserting Data" },
      { id: "basic-queries", title: "4. Executing Basic SELECT Queries" },
      { id: "sql-dialects", title: "5. SQL Dialects & Next Steps" },
    ],
    sections: [
      {
        id: "what-is-rdbms",
        heading: "1. What is an RDBMS?",
        subheading: "Relational integrity, ACID compliance, and structured storage",
        content: [
          "A Relational Database Management System (RDBMS) organizes structured data into two-dimensional tables consisting of horizontal rows (records) and vertical columns (fields).",
          "Relational databases guarantee ACID properties (Atomicity, Consistency, Isolation, Durability), ensuring that financial transactions and critical database operations either succeed completely or roll back without corrupting data.",
        ],
      },
      {
        id: "tables-keys",
        heading: "2. Tables, Columns, and Primary Keys",
        content: [
          "Every column in a database table has a strictly defined data type (e.g. `INTEGER`, `VARCHAR`, `DECIMAL`, `BOOLEAN`, `TIMESTAMP`).",
          "A Primary Key is a unique identifier assigned to each row in a table. No two rows can share the same primary key value, and a primary key cannot be `NULL`.",
        ],
      },
      {
        id: "creating-tables",
        heading: "3. Creating Tables & Inserting Records",
        subheading: "Data Definition Language (DDL) and Data Manipulation Language (DML)",
        content: [
          "Use `CREATE TABLE` to define your table schema, and `INSERT INTO` to populate it with new rows:",
        ],
        codeBlock: {
          language: "sql",
          code: `-- Create student directory table
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    cgpa DECIMAL(3, 2) DEFAULT 0.00,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample records
INSERT INTO students (first_name, last_name, email, cgpa)
VALUES 
    ('Sarah', 'Chen', 'sarah.c@university.edu', 8.95),
    ('Marcus', 'Vance', 'marcus.v@university.edu', 7.40),
    ('Aisha', 'Patel', 'aisha.p@university.edu', 9.20);`,
          explanation:
            "SERIAL (or AUTOINCREMENT in SQLite) automatically increments the unique student_id integer for every inserted row.",
        },
      },
      {
        id: "basic-queries",
        heading: "4. Executing Basic SELECT Queries",
        content: [
          "To retrieve information from a database, execute a `SELECT` statement. You can specify exact column names or use the wildcard `*` to fetch all columns:",
        ],
        codeBlock: {
          language: "sql",
          code: `-- Fetch specific columns
SELECT first_name, email, cgpa
FROM students;

-- Fetch all columns from the table
SELECT * FROM students;`,
          explanation:
            "In production software, avoid `SELECT *`. Explicitly naming required columns reduces network bandwidth and query latency.",
        },
        commonMistakes: [
          "Executing `UPDATE` or `DELETE` statements without a `WHERE` clause. Doing so will overwrite or permanently delete every single row in the entire table!",
        ],
      },
      {
        id: "sql-dialects",
        heading: "5. SQL Dialects & Database Engines",
        content: [
          "While ANSI SQL establishes standard syntax, individual database engines (PostgreSQL, MySQL, SQLite, Microsoft SQL Server, Oracle) include minor syntax variations, specialized date functions, and custom performance extensions.",
        ],
      },
    ],
    summaryTakeaways: [
      "SQL is the declarative query language for relational databases.",
      "Data is organized in 2D tables of rows and typed columns.",
      "Primary keys uniquely identify records and enforce relational integrity.",
      "Always specify explicit column names rather than `SELECT *` in production code.",
    ],
    faqs: [
      {
        question: "Is SQL case-sensitive?",
        answer: "Standard SQL keywords (like SELECT, FROM, WHERE) are case-insensitive, but writing them in UPPERCASE is the universal industry convention. Table and column names may be case-sensitive depending on your database engine configuration and OS filesystem.",
      },
      {
        question: "What is the difference between SQL and NoSQL?",
        answer: "SQL databases are relational, structured, and use fixed schemas with ACID guarantees. NoSQL databases (like MongoDB, Redis, Cassandra) store unstructured or semi-structured data (JSON documents, key-value pairs) and prioritize horizontal scaling flexibility over relational joins.",
      },
    ],
    relatedTutorials: ["sql-select-where-orderby", "understanding-sql-joins", "what-is-data-analytics"],
    relatedTools: ["cgpa-calculator", "text-case-converter"],
    isFeatured: true,
    isRecommended: true,
  },

  {
    id: "sql-select-where-orderby",
    slug: "sql-select-where-orderby",
    categorySlug: "sql",
    category: "SQL and Databases",
    title: "SQL SELECT, WHERE and ORDER BY: Filtering & Sorting Data",
    subtitle: "Master conditional operators, logical expressions, pattern matching, and sorting results.",
    summary: "Learn how to filter and sort database records with precision. Explore comparison operators, AND/OR logic, LIKE wildcards, and ORDER BY clauses.",
    readTime: "8 min read",
    difficulty: "Beginner",
    icon: "Database",
    badge: "Database",
    publishedAt: "2026-01-25",
    updatedAt: "2026-03-10",
    author: {
      name: "Coding Hub Technical Editorial Team",
      role: "Software Engineering & Education",
    },
    learningObjectives: [
      "Filter rows with precision using the WHERE clause and comparison operators",
      "Combine multiple conditions using logical AND, OR, and NOT operators",
      "Perform string pattern searches with LIKE and wildcard symbols (% and _)",
      "Sort query results chronologically and alphabetically using ORDER BY ASC / DESC",
      "Understand the internal SQL query execution pipeline",
    ],
    introduction:
      "A database table often contains millions of rows. Retrieving every row is neither practical nor performant. The true power of SQL lies in filtering out irrelevant data and ordering the results. By mastering the `WHERE` clause for row filtering and `ORDER BY` for sorting, you can extract exactly the records your application needs with minimal database workload.",
    tableOfContents: [
      { id: "where-clause", title: "1. The WHERE Clause & Comparison Operators" },
      { id: "logical-operators", title: "2. Combining Conditions: AND, OR, NOT" },
      { id: "pattern-matching", title: "3. Pattern Matching with LIKE & Wildcards" },
      { id: "order-by", title: "4. Sorting Data with ORDER BY" },
      { id: "query-order", title: "5. Internal Query Execution Order" },
    ],
    sections: [
      {
        id: "where-clause",
        heading: "1. The WHERE Clause & Comparison Operators",
        subheading: "Equality, inequality, ranges, and null checks",
        content: [
          "The `WHERE` clause appears immediately after the `FROM` clause. It evaluates an expression for every candidate row; only rows for which the expression evaluates to `TRUE` are returned.",
          "Common operators include `=` (equals), `<>` or `!=` (not equals), `>`, `<`, `>=`, `<=`, and `BETWEEN ... AND ...`.",
        ],
        codeBlock: {
          language: "sql",
          code: `-- Filter students with high academic standing
SELECT first_name, last_name, cgpa
FROM students
WHERE cgpa >= 8.50;

-- Range filtering with BETWEEN (inclusive bounds)
SELECT first_name, cgpa
FROM students
WHERE cgpa BETWEEN 7.00 AND 8.49;`,
          explanation:
            "`BETWEEN` is inclusive: it matches values equal to the lower bound, the upper bound, and all points between.",
        },
      },
      {
        id: "logical-operators",
        heading: "2. Combining Conditions: AND, OR, NOT, and IN",
        content: [
          "`AND` requires both conditions to be true. `OR` requires at least one condition to be true. When combining `AND` and `OR` in the same query, always use parentheses `()` to enforce precedence.",
          "The `IN` operator checks if a column's value matches any value in a designated list.",
        ],
        codeBlock: {
          language: "sql",
          code: `-- Combining boolean conditions
SELECT first_name, email, department, cgpa
FROM students
WHERE (department = 'Computer Science' OR department = 'Data Science')
  AND cgpa >= 8.00;

-- Checking list membership
SELECT course_name, credits
FROM courses
WHERE course_code IN ('CS-101', 'CS-201', 'DS-301');`,
          explanation:
            "Without parentheses around the `OR` clause, `AND` takes mathematical precedence, which often produces unintended results.",
        },
        commonMistakes: [
          "Using `= NULL` or `!= NULL`. In SQL, `NULL` represents an unknown value. Comparing anything to `NULL` with `=` yields `UNKNOWN`, not `TRUE`. Always write `WHERE column IS NULL` or `WHERE column IS NOT NULL`.",
        ],
      },
      {
        id: "pattern-matching",
        heading: "3. Pattern Matching with LIKE & Wildcards",
        content: [
          "Use the `LIKE` operator to search for text patterns:",
          "- `%` matches zero, one, or multiple characters.",
          "- `_` matches exactly one character.",
        ],
        codeBlock: {
          language: "sql",
          code: `-- Find students with university email domains
SELECT first_name, email
FROM students
WHERE email LIKE '%@university.edu';

-- Find course codes like 'CS-101', 'CS-201', etc.
SELECT course_code, course_name
FROM courses
WHERE course_code LIKE 'CS-___';`,
          explanation:
            "`'CS-___'` matches 'CS-' followed by exactly three characters.",
        },
      },
      {
        id: "order-by",
        heading: "4. Sorting Data with ORDER BY",
        subheading: "Ascending vs Descending order, multi-column sorting, and LIMIT",
        content: [
          "Database rows are stored in arbitrary order unless you explicitly specify an `ORDER BY` clause.",
          "Use `ASC` for ascending order (default: A to Z, smallest to largest) and `DESC` for descending order (Z to A, largest to smallest).",
        ],
        codeBlock: {
          language: "sql",
          code: `-- Top 5 highest performing students
SELECT first_name, last_name, cgpa
FROM students
WHERE cgpa > 0.00
ORDER BY cgpa DESC, last_name ASC
LIMIT 5;`,
          explanation:
            "Rows are sorted first by `cgpa` descending. If two students share the exact same CGPA, they are sorted alphabetically by `last_name`.",
        },
      },
      {
        id: "query-order",
        heading: "5. Internal Query Execution Order",
        content: [
          "Although SQL queries start with `SELECT`, SQL engines execute clauses in this specific logical order:",
          "1. `FROM` (identify tables)",
          "2. `WHERE` (filter individual rows)",
          "3. `SELECT` (select and project requested columns)",
          "4. `ORDER BY` (sort the final projected result set)",
          "5. `LIMIT` (restrict row count)",
          "Because `WHERE` executes before `SELECT`, you cannot reference column aliases defined in `SELECT` within your `WHERE` clause.",
        ],
      },
    ],
    summaryTakeaways: [
      "`WHERE` filters records based on boolean criteria before projection.",
      "Check for nulls strictly using `IS NULL` and `IS NOT NULL`.",
      "`LIKE` uses `%` (any characters) and `_` (single character) for string searches.",
      "`ORDER BY` sorts output ascending (`ASC`) or descending (`DESC`).",
      "Logical execution order: FROM → WHERE → SELECT → ORDER BY → LIMIT.",
    ],
    faqs: [
      {
        question: "Does ORDER BY affect database index performance?",
        answer: "Yes. Sorting large unindexed datasets forces the database engine to perform expensive in-memory or disk-based sorting operations. Adding an index on frequently sorted columns enables instant B-tree order traversal.",
      },
      {
        question: "Can I filter on aggregate functions in WHERE?",
        answer: "No. Because WHERE filters individual rows before aggregation occurs, you cannot write `WHERE COUNT(*) > 5`. Filtering aggregated groups requires the `HAVING` clause after `GROUP BY`.",
      },
    ],
    relatedTutorials: ["sql-basics", "understanding-sql-joins", "data-cleaning-techniques"],
    relatedTools: ["cgpa-calculator", "percentage-calculator"],
    isFeatured: false,
    isRecommended: true,
  },

  {
    id: "understanding-sql-joins",
    slug: "understanding-sql-joins",
    categorySlug: "sql",
    category: "SQL and Databases",
    title: "Understanding SQL Joins: INNER, LEFT, RIGHT and FULL Explained",
    subtitle: "Visualizing relational data connections across multiple tables with real-world query examples.",
    summary: "Master SQL table joins with practical visual analogies. Learn how and when to use INNER JOIN, LEFT OUTER JOIN, and multi-table joins without performance degradation.",
    readTime: "10 min read",
    difficulty: "Intermediate",
    icon: "Database",
    badge: "Database",
    publishedAt: "2026-02-05",
    updatedAt: "2026-03-14",
    author: {
      name: "Coding Hub Technical Editorial Team",
      role: "Software Engineering & Education",
    },
    learningObjectives: [
      "Understand database normalization and the purpose of Foreign Keys",
      "Distinguish between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN",
      "Write multi-table join queries across 3 or more related relational tables",
      "Avoid common join performance pitfalls and unintended Cartesian products",
    ],
    introduction:
      "In relational database design, data is intentionally normalized across separate specialized tables to eliminate redundancy and maintain integrity. For instance, customer details live in a `customers` table, while sales records live in an `orders` table. To generate a unified report displaying a customer's name alongside their recent purchases, you must join these tables together based on a shared foreign key.",
    tableOfContents: [
      { id: "why-joins-exist", title: "1. Why Relational Joins Exist" },
      { id: "inner-join", title: "2. INNER JOIN (The Intersection)" },
      { id: "left-join", title: "3. LEFT OUTER JOIN (All Left Rows)" },
      { id: "right-full-join", title: "4. RIGHT & FULL OUTER JOIN" },
      { id: "multi-table-joins", title: "5. Multi-Table Joins in Practice" },
    ],
    sections: [
      {
        id: "why-joins-exist",
        heading: "1. Why Relational Joins Exist",
        subheading: "Database normalization and Foreign Key relationships",
        content: [
          "If a student's address, degree major, and contact info were copied onto every course grade row, updating a single phone number would require updating thousands of duplicate rows. Normalization stores student information once in a `students` table, referencing it via `student_id` in an `enrollments` table.",
          "A Join merges rows from two or more tables based on a related column between them.",
        ],
      },
      {
        id: "inner-join",
        heading: "2. INNER JOIN (The Intersection)",
        subheading: "Returns rows only when a matching key exists in BOTH tables",
        content: [
          "`INNER JOIN` is the most common join type. It returns records that have matching values in both tables. If a student is in the `students` table but has never enrolled in any course, an `INNER JOIN` against `enrollments` will omit that student.",
        ],
        codeBlock: {
          language: "sql",
          code: `-- Match students with their enrolled courses
SELECT 
    s.student_id,
    s.first_name,
    s.last_name,
    e.course_code,
    e.grade
FROM students s
INNER JOIN enrollments e 
    ON s.student_id = e.student_id;`,
          explanation:
            "Table aliases `s` and `e` keep query syntax concise and disambiguate columns that share names across tables.",
        },
      },
      {
        id: "left-join",
        heading: "3. LEFT OUTER JOIN (Preserving All Left Table Rows)",
        subheading: "Returns all rows from the left table, plus matched rows from the right table",
        content: [
          "`LEFT JOIN` (or `LEFT OUTER JOIN`) returns ALL rows from the left table, regardless of whether a match exists on the right.",
          "If no match exists on the right table, the right-side columns return as `NULL`. This makes `LEFT JOIN` invaluable for finding orphan records or students who have not enrolled in courses.",
        ],
        codeBlock: {
          language: "sql",
          code: `-- Find all students, including those with ZERO course enrollments
SELECT 
    s.student_id,
    s.first_name,
    s.last_name,
    COALESCE(e.course_code, 'Not Enrolled') AS current_status
FROM students s
LEFT JOIN enrollments e 
    ON s.student_id = e.student_id;`,
          explanation:
            "`COALESCE` returns the first non-null argument, replacing NULL with a readable string.",
        },
        commonMistakes: [
          "Filtering right-table columns in the `WHERE` clause of a `LEFT JOIN`. Writing `WHERE e.grade = 'A'` converts your `LEFT JOIN` into an `INNER JOIN` because rows with NULL on the right are discarded! Place condition in the `ON` clause instead: `ON s.student_id = e.student_id AND e.grade = 'A'`.",
        ],
      },
      {
        id: "right-full-join",
        heading: "4. RIGHT & FULL OUTER JOIN",
        content: [
          "`RIGHT JOIN` is the mirrored opposite of `LEFT JOIN`, returning all rows from the right table.",
          "`FULL OUTER JOIN` returns all rows when there is a match in either the left or the right table. Rows without a match on either side are padded with `NULL`.",
        ],
      },
      {
        id: "multi-table-joins",
        heading: "5. Multi-Table Joins in Practice",
        content: [
          "In real-world enterprise databases, queries frequently chain three or more tables to connect many-to-many relationships:",
        ],
        codeBlock: {
          language: "sql",
          code: `-- 3-table join: Students -> Enrollments -> Courses
SELECT 
    s.first_name || ' ' || s.last_name AS full_name,
    c.course_name,
    c.credits,
    e.grade
FROM students s
INNER JOIN enrollments e ON s.student_id = e.student_id
INNER JOIN courses c ON e.course_id = c.course_id
ORDER BY s.last_name, c.course_name;`,
          explanation:
            "This query joins students to enrollments, and then joins those enrollments to the courses catalog table.",
        },
      },
    ],
    summaryTakeaways: [
      "`INNER JOIN`: Returns records with matching keys in both tables.",
      "`LEFT JOIN`: Returns all records from the left table; unmatched right-side columns return `NULL`.",
      "`FULL OUTER JOIN`: Returns all records from both tables.",
      "Always ensure join columns (`foreign keys`) have database indexes to prevent slow full-table scans.",
    ],
    faqs: [
      {
        question: "What is a Cartesian product (CROSS JOIN)?",
        answer: "A Cartesian product occurs when you join two tables without specifying a join condition in the `ON` clause. Every row in table A multiplies against every row in table B. If table A has 1,000 rows and table B has 1,000 rows, a Cartesian product produces 1,000,000 rows, crashing query memory.",
      },
      {
        question: "Should I join on string columns or numeric IDs?",
        answer: "Always join on integer numeric IDs (primary and foreign keys). Comparing 4-byte or 8-byte integers is significantly faster and uses less memory than comparing strings.",
      },
    ],
    relatedTutorials: ["sql-basics", "sql-select-where-orderby", "what-is-data-analytics"],
    relatedTools: ["cgpa-calculator", "percentage-calculator"],
    isFeatured: false,
    isRecommended: true,
  },

  // ==========================================
  // POWER BI TUTORIALS (2)
  // ==========================================
  {
    id: "what-is-power-bi",
    slug: "what-is-power-bi",
    categorySlug: "power-bi",
    category: "Power BI",
    title: "What Is Microsoft Power BI? Architecture & Dashboard Basics",
    subtitle: "A business intelligence overview explaining Power BI Desktop, data modeling, and reporting visuals.",
    summary: "Learn how Microsoft Power BI transforms raw spreadsheets and SQL databases into interactive executive dashboards. Explore the three core engines and report design basics.",
    readTime: "7 min read",
    difficulty: "Beginner",
    icon: "BarChart3",
    badge: "Business Intelligence",
    publishedAt: "2026-02-10",
    updatedAt: "2026-03-12",
    author: {
      name: "Coding Hub Technical Editorial Team",
      role: "Software Engineering & Education",
    },
    learningObjectives: [
      "Understand the purpose and role of Business Intelligence (BI) in modern organizations",
      "Differentiate between Power BI Desktop, Power BI Service (Cloud), and Power BI Mobile",
      "Explore the 3 core internal engines: Power Query (ETL), VertiPaq (Model), and Visual Canvas",
      "Understand the standard workflow from raw ingestion to report publishing",
    ],
    introduction:
      "Modern businesses generate enormous volumes of transactional data daily across CRM systems, SQL databases, ERP software, and Excel spreadsheets. Raw data sitting in disconnected spreadsheets provides zero strategic insight. Microsoft Power BI is a unified business analytics platform that ingests, cleans, models, and visualizes complex data, allowing leaders to make data-driven decisions through interactive reports.",
    tableOfContents: [
      { id: "bi-ecosystem", title: "1. The Power BI Ecosystem" },
      { id: "core-engines", title: "2. The Three Core Internal Engines" },
      { id: "standard-workflow", title: "3. End-to-End Report Workflow" },
      { id: "best-practices", title: "4. Data Modeling Best Practices" },
      { id: "common-mistakes", title: "5. Common Mistakes" },
    ],
    sections: [
      {
        id: "bi-ecosystem",
        heading: "1. The Power BI Ecosystem Explained",
        subheading: "Desktop vs Service vs Mobile",
        content: [
          "Power BI is not a single application; it is an integrated ecosystem:",
          "- **Power BI Desktop:** The free Windows authoring tool where data analysts connect to data sources, clean data, build relational data models, write DAX formulas, and design visual report pages.",
          "- **Power BI Service (Cloud):** The SaaS cloud platform (app.powerbi.com) where published reports are hosted, shared across enterprise teams, and scheduled for automated background data refreshes.",
          "- **Power BI Mobile:** Native apps for iOS and Android allowing executives to inspect live KPI dashboards securely on smartphones.",
        ],
      },
      {
        id: "core-engines",
        heading: "2. The Three Core Internal Engines",
        content: [
          "Under the hood, Power BI Desktop combines three distinct Microsoft technologies:",
          "1. **Power Query Engine (M):** Handles Extract, Transform, Load (ETL). Ingests data from hundreds of sources and reshapes it.",
          "2. **VertiPaq Analytical Engine:** An ultra-fast in-memory columnar database that compresses millions of rows into RAM and handles calculations.",
          "3. **Visual Canvas:** The report design interface rendering interactive bar charts, matrices, maps, and KPI cards.",
        ],
      },
      {
        id: "standard-workflow",
        heading: "3. The End-to-End Report Workflow",
        content: [
          "Every successful Power BI project follows an established sequence:",
          "Step 1: **Get Data:** Connect to databases, Web APIs, or spreadsheets.",
          "Step 2: **Transform Data:** Clean columns, remove blanks, and standardize types in Power Query.",
          "Step 3: **Data Modeling:** Connect fact tables to dimension tables using 1-to-Many relationships.",
          "Step 4: **DAX Measures:** Write business calculations (e.g. Total Revenue, YoY Growth %, Average Attendance Rate).",
          "Step 5: **Visual Report Layout:** Drag visuals onto the canvas and apply unified color themes.",
        ],
      },
      {
        id: "best-practices",
        heading: "4. Data Modeling: Star Schema Architecture",
        content: [
          "The golden rule of Power BI data modeling is building a **Star Schema**.",
          "A Star Schema features a central **Fact Table** containing numerical transaction metrics (e.g. exam scores, sales orders) surrounded by related **Dimension Tables** containing contextual attributes (e.g. students, dates, courses). Avoid flat, single-table spreadsheets containing 50+ mixed columns.",
        ],
        tips: [
          "Always create a dedicated Date/Calendar dimension table in Power BI to enable Time Intelligence DAX functions like YTD and SamePeriodLastYear.",
        ],
      },
      {
        id: "common-mistakes",
        heading: "5. Common Power BI Mistakes",
        content: [
          "Treating Power BI like Microsoft Excel. Excel is designed for ad-hoc cell-based formulas; Power BI is an enterprise relational database modeling engine. Avoid attempting to build 200-column spreadsheet views in Power BI.",
          "Using bidirectional cross-filtering without a specific requirement. Bidirectional filters degrade query performance and introduce ambiguity in relationship calculations.",
        ],
      },
    ],
    summaryTakeaways: [
      "Power BI is an end-to-end business analytics platform.",
      "Work in Power BI Desktop to build models; publish to Power BI Service to share.",
      "Always design data models in a clean Star Schema (Fact table surrounded by Dimension tables).",
      "Power Query handles ETL before data enters the in-memory VertiPaq engine.",
    ],
    faqs: [
      {
        question: "Is Power BI Desktop free?",
        answer: "Yes, Power BI Desktop is completely free to download and use on Windows for building reports and analyzing local data. A paid Power BI Pro or Premium license is only required when sharing and collaborating on reports via the cloud Power BI Service.",
      },
      {
        question: "What is DAX?",
        answer: "DAX stands for Data Analysis Expressions. It is a formula expression language similar to Excel formulas, but designed specifically to query relational tabular data models.",
      },
    ],
    relatedTutorials: ["power-query-basics", "what-is-data-analytics", "sql-basics"],
    relatedTools: ["percentage-calculator", "cgpa-calculator"],
    isFeatured: true,
    isRecommended: true,
  },

  {
    id: "power-query-basics",
    slug: "power-query-basics",
    categorySlug: "power-bi",
    category: "Power BI",
    title: "Power Query Basics: Data Cleaning and Transformation",
    subtitle: "Learn ETL fundamentals in Power BI and Excel to reshape messy spreadsheets into analysis-ready models.",
    summary: "Master the Power Query editor. Learn how to remove blank rows, split columns, unpivot cross-tabulated data, change types, and inspect the Applied Steps pane.",
    readTime: "9 min read",
    difficulty: "Beginner",
    icon: "BarChart3",
    badge: "Business Intelligence",
    publishedAt: "2026-02-15",
    updatedAt: "2026-03-14",
    author: {
      name: "Coding Hub Technical Editorial Team",
      role: "Software Engineering & Education",
    },
    learningObjectives: [
      "Understand the Extract, Transform, Load (ETL) pipeline in Power Query",
      "Navigate the Power Query interface, Ribbon, and Applied Steps timeline",
      "Clean dirty datasets: remove empty rows, trim whitespace, and enforce data types",
      "Master the Unpivot Columns operation to normalize wide spreadsheet data",
      "Understand how the underlying M language powers transformation steps",
    ],
    introduction:
      "Real-world business data is notoriously dirty: header rows are misplaced, numbers are stored as text strings, date formats are inconsistent, and spreadsheets are shaped for human printing rather than database analysis. Power Query is the transformation engine embedded inside Power BI and Excel. It records every cleaning action you take as a repeatable recipe, automating your data prep forever.",
    tableOfContents: [
      { id: "applied-steps", title: "1. The Applied Steps Mechanism" },
      { id: "core-cleaning-actions", title: "2. Essential Data Cleaning Operations" },
      { id: "unpivoting", title: "3. Unpivoting Wide Tables" },
      { id: "intro-m-language", title: "4. The M Formula Language" },
      { id: "best-practices", title: "5. Power Query Performance Rules" },
    ],
    sections: [
      {
        id: "applied-steps",
        heading: "1. The Applied Steps Mechanism",
        subheading: "A visual, repeatable transformation recipe",
        content: [
          "In traditional spreadsheet workflows, cleaning data involves manual cell deletion that must be redone every week when fresh data arrives.",
          "In Power Query, every button you click—whether removing a column, replacing a null value, or changing a data type—is appended as a sequential step in the **Applied Steps** pane on the right. When your source file updates, simply click **Refresh** and Power Query automatically executes the entire transformation pipeline in seconds.",
        ],
      },
      {
        id: "core-cleaning-actions",
        heading: "2. Essential Data Cleaning Operations",
        content: [
          "1. **Use First Row as Headers:** Promotes the top row of data into column titles.",
          "2. **Remove Top / Empty Rows:** Strips out spreadsheet title banners and blank spacer rows.",
          "3. **Change Data Type:** Explicitly set columns to `Decimal Number`, `Whole Number`, `Text`, or `Date`. Leaving columns typed as `Any` causes severe memory bloat and prevents calculations.",
          "4. **Text Cleaning (Trim & Clean):** Strips leading/trailing spaces and non-printable carriage returns.",
        ],
      },
      {
        id: "unpivoting",
        heading: "3. Unpivoting: The Most Important Power Query Skill",
        subheading: "Converting wide matrix tables into tall normalized datasets",
        content: [
          "Spreadsheets often display dates across columns (e.g. `Student`, `Jan`, `Feb`, `Mar`). This wide format is great for reading on paper, but relational engines like Power BI cannot filter or aggregate across multiple columns.",
          "By selecting the date columns and clicking **Transform → Unpivot Columns**, Power Query instantly reshapes the data into two columns: `Attribute` (the month) and `Value` (the score). Now you have a normalized tall table ready for calculations.",
        ],
      },
      {
        id: "intro-m-language",
        heading: "4. Understanding the M Formula Language",
        content: [
          "Behind every visual button in Power Query lies code written in **M** (Power Query Formula Language). You can inspect the entire M script by opening the **Advanced Editor** in the Home ribbon.",
        ],
        codeBlock: {
          language: "powerquery",
          code: `let
    // Step 1: Connect to source Excel spreadsheet
    Source = Excel.Workbook(File.Contents("C:\\Data\\StudentGrades.xlsx"), null, true),
    Grades_Sheet = Source{[Item="Grades",Kind="Sheet"]}[Data],

    // Step 2: Promote headers and set explicit types
    #"Promoted Headers" = Table.PromoteHeaders(Grades_Sheet, [PromoteAllScalars=true]),
    #"Changed Type" = Table.TransformColumnTypes(#"Promoted Headers",{
        {"StudentID", Int64.Type},
        {"StudentName", type text},
        {"SemesterGPA", type number},
        {"EnrollmentDate", type date}
    }),

    // Step 3: Remove records with empty GPA
    #"Filtered Rows" = Table.SelectRows(#"Changed Type", each [SemesterGPA] <> null)
in
    #"Filtered Rows"`,
          explanation:
            "Every step in M takes the output table of the preceding step as its input parameter, constructing a functional transformation pipeline.",
        },
      },
      {
        id: "best-practices",
        heading: "5. Power Query Performance Rules",
        content: [
          "- Remove unneeded columns as early as possible in your steps. Every column loaded into memory increases file size.",
          "- Filter out historical rows you do not need before applying complex transformations.",
          "- Leverage **Query Folding**: when connecting to SQL databases, Power Query translates M steps back into native SQL `SELECT` statements, executing the heavy work on the database server.",
        ],
      },
    ],
    summaryTakeaways: [
      "Power Query is an ETL tool that records repeatable data cleaning recipes.",
      "Applied Steps execute sequentially on every data refresh.",
      "Unpivot wide cross-tabulated spreadsheets into tall normalized tables.",
      "Remove unneeded columns early to maximize VertiPaq compression.",
    ],
    faqs: [
      {
        question: "Can I use Power Query in Microsoft Excel?",
        answer: "Yes. In Excel for Windows, Power Query is built natively into the Data ribbon under the 'Get & Transform Data' group.",
      },
      {
        question: "What is Query Folding?",
        answer: "Query Folding is an optimization where Power Query translates transformations (like filtering and joining) into native SQL queries executed directly on the source database server before data is transferred to your local machine.",
      },
    ],
    relatedTutorials: ["what-is-power-bi", "what-is-data-analytics", "data-cleaning-techniques"],
    relatedTools: ["json-formatter", "text-case-converter"],
    isFeatured: false,
    isRecommended: false,
  },

  // ==========================================
  // DATA ANALYTICS TUTORIALS (2)
  // ==========================================
  {
    id: "what-is-data-analytics",
    slug: "what-is-data-analytics",
    categorySlug: "data-analytics",
    category: "Data Analytics",
    title: "Introduction to Data Analytics: The Complete Lifecycle",
    subtitle: "A foundational guide to descriptive, diagnostic, predictive, and prescriptive analytics.",
    summary: "Understand the core discipline of data analytics. Explore the 4 types of analysis, the 6-step analytics lifecycle, and the essential tooling ecosystem.",
    readTime: "8 min read",
    difficulty: "Beginner",
    icon: "TrendingUp",
    badge: "Analytics",
    publishedAt: "2026-01-22",
    updatedAt: "2026-03-08",
    author: {
      name: "Coding Hub Technical Editorial Team",
      role: "Software Engineering & Education",
    },
    learningObjectives: [
      "Distinguish between the 4 types of analytics: Descriptive, Diagnostic, Predictive, Prescriptive",
      "Master the 6 stages of the Data Analytics Lifecycle (Ask, Prepare, Process, Analyze, Share, Act)",
      "Understand the modern analytics stack: SQL, Python/Pandas, Business Intelligence tools",
      "Avoid fundamental cognitive traps like confusing correlation with causation",
    ],
    introduction:
      "Data Analytics is the scientific discipline of inspecting, cleansing, transforming, and modeling raw data with the goal of discovering useful information, informing conclusions, and supporting decision-making. From estimating university student retention rates to optimizing multi-billion-dollar supply chains, analytics bridges the gap between raw database records and actionable human strategy.",
    tableOfContents: [
      { id: "four-types", title: "1. The Four Types of Analytics" },
      { id: "analytics-lifecycle", title: "2. The 6-Step Analytics Lifecycle" },
      { id: "tooling-ecosystem", title: "3. The Analytics Tooling Stack" },
      { id: "correlation-causation", title: "4. Correlation vs Causation" },
      { id: "getting-started", title: "5. Getting Started & Next Steps" },
    ],
    sections: [
      {
        id: "four-types",
        heading: "1. The Four Types of Analytics",
        subheading: "From retrospective reporting to forward-looking optimization",
        content: [
          "Data analytics is divided into four progressive tiers of maturity:",
          "1. **Descriptive Analytics (What happened?):** Historical aggregation and reporting (e.g. 'Our average class attendance dropped by 8% last month').",
          "2. **Diagnostic Analytics (Why did it happen?):** Root-cause investigation through data drill-downs (e.g. 'Attendance dropped primarily among Friday morning lab sessions').",
          "3. **Predictive Analytics (What is likely to happen?):** Statistical modeling and forecasting based on historical trends (e.g. 'Predicting which 15% of students are at risk of exam debarment').",
          "4. **Prescriptive Analytics (What should we do about it?):** Recommending specific actions through optimization algorithms (e.g. 'Automating personalized SMS alerts when a student reaches 2 classes away from the attendance threshold').",
        ],
      },
      {
        id: "analytics-lifecycle",
        heading: "2. The 6-Step Analytics Lifecycle",
        content: [
          "Industry standard frameworks (like Google's Data Analytics framework and CRISP-DM) divide analytical work into six stages:",
          "- **Ask:** Define the business question and project scope.",
          "- **Prepare:** Locate, collect, and verify data sources.",
          "- **Process:** Clean dirty data, handle missing values, and check integrity.",
          "- **Analyze:** Calculate statistical metrics, find trends, and test hypotheses.",
          "- **Share:** Visualize findings in charts and communicate insights to stakeholders.",
          "- **Act:** Implement solutions and monitor outcomes.",
        ],
      },
      {
        id: "tooling-ecosystem",
        heading: "3. The Modern Analytics Tooling Stack",
        content: [
          "- **SQL:** The universal query language for extracting data from databases.",
          "- **Spreadsheets (Excel / Google Sheets):** Fast exploratory calculations, pivot tables, and light modeling.",
          "- **Programming (Python & R):** Complex data manipulation (Pandas), statistical testing, and automated machine learning.",
          "- **Business Intelligence (Power BI & Tableau):** Executive reporting, self-service visual exploration, and automated cloud KPI dashboards.",
        ],
      },
      {
        id: "correlation-causation",
        heading: "4. Cognitive Traps: Correlation vs Causation",
        content: [
          "The most dangerous mistake in analytics is confusing correlation with causation.",
          "Just because two variables move together (positive correlation) does not mean one causes the other. Both variables might be driven by a hidden third factor (a confounding variable). Always demand controlled experiments or rigorous statistical regression before claiming causal impact.",
        ],
      },
      {
        id: "getting-started",
        heading: "5. Next Steps for Data Learners",
        content: [
          "Begin by mastering SQL query fundamentals and basic percentage mathematics. Once comfortable extracting structured tables, progress to data cleaning techniques in Python or Power Query.",
        ],
      },
    ],
    summaryTakeaways: [
      "Analytics spans Descriptive (What), Diagnostic (Why), Predictive (Future), and Prescriptive (Action).",
      "Always clearly define the business problem before opening analysis software.",
      "Correlation does not imply causation; verify confounding variables.",
      "The core modern analytics stack consists of SQL, Python/Pandas, and Power BI.",
    ],
    faqs: [
      {
        question: "Do data analysts need advanced mathematics?",
        answer: "Data analysts need a solid grasp of foundational statistics (mean, median, standard deviation, percentiles, correlation) and algebra. Advanced mathematical calculus and linear algebra are primarily required for data scientists building custom machine learning algorithms.",
      },
      {
        question: "Should I learn Python or SQL first?",
        answer: "Learn SQL first. SQL is universally required to pull data out of company databases. Once you can retrieve and filter data, learning Python allows you to perform advanced transformations and machine learning.",
      },
    ],
    relatedTutorials: ["data-cleaning-techniques", "sql-basics", "what-is-power-bi"],
    relatedTools: ["percentage-calculator", "word-counter"],
    isFeatured: true,
    isRecommended: true,
  },

  {
    id: "data-cleaning-techniques",
    slug: "data-cleaning-techniques",
    categorySlug: "data-analytics",
    category: "Data Analytics",
    title: "Data Cleaning Techniques: Handling Missing Values & Outliers",
    subtitle: "A practical guide to data quality, deduplication, imputation, and anomaly detection using Python.",
    summary: "Learn essential data hygiene practices. Master how to handle missing data with Pandas, detect statistical outliers with IQR, and standardize categorical values.",
    readTime: "9 min read",
    difficulty: "Intermediate",
    icon: "TrendingUp",
    badge: "Analytics",
    publishedAt: "2026-02-18",
    updatedAt: "2026-03-15",
    author: {
      name: "Coding Hub Technical Editorial Team",
      role: "Software Engineering & Education",
    },
    learningObjectives: [
      "Understand the direct business costs of dirty data ('Garbage In, Garbage Out')",
      "Learn strategies for handling missing values: dropping vs statistical imputation",
      "Identify and remove duplicate records without losing transactional context",
      "Detect and treat extreme numerical outliers using the Interquartile Range (IQR) method",
    ],
    introduction:
      "Data scientists and analysts routinely report spending up to 80% of their working time finding, cleaning, and organizing messy data. No machine learning algorithm or visual dashboard can overcome inaccurate, duplicate, or corrupted inputs. Master data cleaning techniques to ensure your insights rest on a foundation of verified statistical truth.",
    tableOfContents: [
      { id: "dirty-data-types", title: "1. The 4 Forms of Dirty Data" },
      { id: "missing-values", title: "2. Strategies for Missing Data (NaN)" },
      { id: "deduplication", title: "3. Identifying & Removing Duplicates" },
      { id: "outlier-detection", title: "4. Outlier Detection with IQR" },
      { id: "python-cleaning-script", title: "5. Complete Python Cleaning Script" },
    ],
    sections: [
      {
        id: "dirty-data-types",
        heading: "1. The 4 Forms of Dirty Data",
        content: [
          "1. **Missing Data:** Empty cells, null pointers, or sentinel placeholders (like `-999` or `'N/A'`).",
          "2. **Duplicate Records:** Identical transactions submitted multiple times due to network retries.",
          "3. **Inconsistent Formatting:** Mixed date notations (`2026-01-15` vs `15/01/2026`) or mixed categorical text casing (`'Remote'`, `'remote'`, `'REMOTE'`).",
          "4. **Outliers:** Numerical values that deviate so severely from other observations that they distort statistical averages (e.g. entering an age of `200` instead of `20`).",
        ],
      },
      {
        id: "missing-values",
        heading: "2. Strategies for Handling Missing Values",
        subheading: "Deletion vs Imputation",
        content: [
          "When data is missing, you have two primary options:",
          "- **Listwise Deletion (`dropna()`):** Drop the row. This is safe only when the percentage of missing records is tiny (< 3%) and missing at random.",
          "- **Imputation (`fillna()`):** Fill the missing cell with a calculated substitute. For symmetric numerical data, use the mean. For skewed data with outliers, use the median. For categorical data, use the mode (most frequent item).",
        ],
      },
      {
        id: "deduplication",
        heading: "3. Identifying & Removing Duplicates",
        content: [
          "Always verify uniqueness on candidate primary key columns. In Python Pandas, use `df.duplicated()` to inspect matches, and `df.drop_duplicates()` to retain only the first instance.",
        ],
      },
      {
        id: "outlier-detection",
        heading: "4. Outlier Detection with the IQR Method",
        subheading: "The Interquartile Range (Tukey's Fences)",
        content: [
          "The Interquartile Range (IQR) measures statistical dispersion, calculated as the difference between the 75th percentile ($Q3$) and the 25th percentile ($Q1$):",
          "$$\\text{IQR} = Q3 - Q1$$",
          "Values falling below $Q1 - 1.5 \\times \\text{IQR}$ or above $Q3 + 1.5 \\times \\text{IQR}$ are classified as outliers.",
        ],
      },
      {
        id: "python-cleaning-script",
        heading: "5. Complete Python Data Cleaning Script",
        content: [
          "Here is a complete, production-ready script using Pandas to clean an academic score dataset:",
        ],
        codeBlock: {
          language: "python",
          code: `import pandas as pd
import numpy as np

# Sample dirty student dataframe
data = {
    "student_id": [101, 102, 103, 103, 104, 105],
    "student_name": ["Alice Smith", "Bob Jones", "Carol White", "Carol White", "David Lee", "Eva Green"],
    "semester_gpa": [8.5, np.nan, 7.8, 7.8, 9.2, 18.5], # 18.5 is an invalid outlier on a 10.0 scale!
    "department": ["Computer Science", "data science", "Data Science", "Data Science", "CS", "Computer Science"]
}

df = pd.DataFrame(data)

# Step 1: Remove duplicate rows
df = df.drop_duplicates()

# Step 2: Standardize categorical text casing and abbreviations
df["department"] = df["department"].str.strip().str.title()
df["department"] = df["department"].replace({"Cs": "Computer Science"})

# Step 3: Handle outliers (cap GPA to maximum valid 10.0)
df.loc[df["semester_gpa"] > 10.0, "semester_gpa"] = np.nan

# Step 4: Impute missing GPA values using the median
median_gpa = df["semester_gpa"].median()
df["semester_gpa"] = df["semester_gpa"].fillna(median_gpa)

print("Cleaned Dataset:")
print(df)`,
          explanation:
            "This script systematically removes duplicates, standardizes department naming, handles scale outliers, and imputes missing GPA values cleanly.",
        },
      },
    ],
    summaryTakeaways: [
      "Always inspect missing data distributions before choosing deletion or imputation.",
      "Use the median rather than the mean when data contains extreme skewness or outliers.",
      "Detect numerical outliers using the 1.5 * IQR rule.",
      "Standardize categorical strings with `.str.strip()` and `.str.title()`.",
    ],
    faqs: [
      {
        question: "Should I always delete outliers?",
        answer: "No. Never delete outliers blindly. Outliers often represent genuine, critical business events—such as credit card fraud attempts or viral social traffic spikes. Only delete outliers that represent proven data entry or sensor errors.",
      },
      {
        question: "What is the difference between NaN and Null?",
        answer: "In Python and Pandas, `NaN` (Not a Number) represents missing floating-point numeric data. `None` is Python's native singleton object representing the absence of a value. In SQL, missing values are universally denoted as `NULL`.",
      },
    ],
    relatedTutorials: ["what-is-data-analytics", "python-variables", "what-is-power-bi"],
    relatedTools: ["percentage-calculator", "text-case-converter"],
    isFeatured: false,
    isRecommended: true,
  },

  // ==========================================
  // WEB DEVELOPMENT TUTORIALS (1)
  // ==========================================
  {
    id: "html-css-basics",
    slug: "html-css-basics",
    categorySlug: "web-development",
    category: "Web Development",
    title: "HTML and CSS Fundamentals: Building Responsive Web Layouts",
    subtitle: "A modern guide to semantic HTML5 tags, the CSS Box Model, Flexbox alignment, and responsive design.",
    summary: "Learn how the modern web works. Master semantic HTML5 elements, the CSS box model, Flexbox layout techniques, and mobile-first responsive design.",
    readTime: "8 min read",
    difficulty: "Beginner",
    icon: "Layout",
    badge: "Web Dev",
    publishedAt: "2026-02-08",
    updatedAt: "2026-03-11",
    author: {
      name: "Coding Hub Technical Editorial Team",
      role: "Software Engineering & Education",
    },
    learningObjectives: [
      "Understand the division of labor between HTML (structure) and CSS (presentation)",
      "Build accessible web documents using semantic HTML5 tags (<header>, <main>, <article>, <nav>)",
      "Master the CSS Box Model: content, padding, border, and margin",
      "Align UI elements effortlessly using CSS Flexbox",
      "Write mobile-first media queries for responsive cross-device layouts",
    ],
    introduction:
      "Every website on the internet—from simple personal blogs to multi-billion-dollar web applications—relies on HTML and CSS. HTML (HyperText Markup Language) defines the semantic structure and content of the page, while CSS (Cascading Style Sheets) controls visual appearance, spacing, colors, and responsive layouts across screens.",
    tableOfContents: [
      { id: "semantic-html", title: "1. Semantic HTML5: Meaning Over Decoration" },
      { id: "css-box-model", title: "2. The CSS Box Model Explained" },
      { id: "flexbox-layout", title: "3. Modern Flexbox Layouts" },
      { id: "responsive-design", title: "4. Responsive Design & Media Queries" },
      { id: "code-example", title: "5. Complete Responsive Card Example" },
    ],
    sections: [
      {
        id: "semantic-html",
        heading: "1. Semantic HTML5: Meaning Over Decoration",
        subheading: "Why <div> soup hurts accessibility and SEO",
        content: [
          "In the early days of web development, pages were constructed from endless generic `<div>` containers. HTML5 introduced semantic elements that carry meaning for screen readers, search engines, and browsers.",
          "Use `<header>` for navigation and introductory banners, `<nav>` for site links, `<main>` for primary content, `<article>` for self-contained blog posts or widgets, and `<footer>` for copyright and legal links.",
        ],
      },
      {
        id: "css-box-model",
        heading: "2. The CSS Box Model Explained",
        subheading: "Content, Padding, Border, and Margin",
        content: [
          "Every element rendered in a web browser is a rectangular box composed of four concentric layers:",
          "- **Content:** The actual text, image, or video.",
          "- **Padding:** Space between the content and the element's border.",
          "- **Border:** The outer line surrounding the padding.",
          "- **Margin:** Transparent space separating this element from neighboring elements.",
        ],
        tips: [
          "Always include `*, *::before, *::after { box-sizing: border-box; }` at the top of your global CSS. This ensures that padding and borders are included within the element's specified width rather than expanding it.",
        ],
      },
      {
        id: "flexbox-layout",
        heading: "3. Modern Flexbox Layouts",
        content: [
          "CSS Flexbox (Flexible Box Layout) simplifies horizontal and vertical alignment along a single axis.",
          "Declare `display: flex;` on the parent container. Use `justify-content` to distribute children along the main axis, and `align-items` to align them along the cross axis.",
        ],
      },
      {
        id: "responsive-design",
        heading: "4. Responsive Design & Media Queries",
        content: [
          "Responsive design ensures a website adapts seamlessly whether viewed on a 375px mobile screen or a 2560px 4K desktop monitor.",
          "Mobile-first design means writing base styles for small mobile screens first, then using `@media (min-width: 768px)` to enhance layouts for tablet and desktop viewports.",
        ],
      },
      {
        id: "code-example",
        heading: "5. Complete Responsive Card Example",
        content: [
          "Here is a clean, semantic HTML and CSS implementation of a responsive card component:",
        ],
        codeBlock: {
          language: "html",
          code: `<!-- Semantic HTML Card -->
<article class="tool-card">
  <div class="card-icon">🎓</div>
  <h3 class="card-title">CGPA Calculator</h3>
  <p class="card-desc">Compute cumulative grade point average with simple or credit-weighted models.</p>
  <a href="/tools/cgpa-calculator" class="card-btn">Launch Tool →</a>
</article>

<style>
  .tool-card {
    background-color: #FFFFFF;
    border: 1px solid #E7E7E3;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  .card-title {
    color: #202124;
    font-size: 1.125rem;
    margin: 8px 0;
  }
  .card-desc {
    color: #737373;
    font-size: 0.875rem;
    line-height: 1.5;
  }
  .card-btn {
    color: #176B50;
    font-weight: 600;
    text-decoration: none;
    margin-top: 16px;
  }
  .card-btn:hover {
    text-decoration: underline;
  }
</style>`,
          explanation:
            "This card matches Coding Hub's warm white editorial aesthetic with clean semantic markup and zero heavy dependencies.",
        },
      },
    ],
    summaryTakeaways: [
      "Use semantic HTML5 elements (<header>, <nav>, <main>, <article>, <footer>) for accessibility and SEO.",
      "The CSS Box Model consists of Content, Padding, Border, and Margin.",
      "Set `box-sizing: border-box` globally for predictable width calculations.",
      "Flexbox provides clean 1-dimensional alignment along rows or columns.",
    ],
    faqs: [
      {
        question: "What is the viewport meta tag?",
        answer: "The viewport meta tag `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">` instructs mobile browsers to render the website at the screen's actual physical width rather than simulating a 980px desktop screen.",
      },
      {
        question: "What is the difference between CSS Flexbox and CSS Grid?",
        answer: "Flexbox is designed for 1-dimensional layouts (arranging items in a single row or a single column). CSS Grid is designed for 2-dimensional layouts (arranging items across rows and columns simultaneously).",
      },
    ],
    relatedTutorials: ["what-is-python", "java-basics"],
    relatedTools: ["word-counter", "json-formatter"],
    isFeatured: false,
    isRecommended: true,
  },

  // ==========================================
  // JAVA TUTORIALS (1)
  // ==========================================
  {
    id: "java-basics",
    slug: "java-basics",
    categorySlug: "java",
    category: "Java Programming",
    title: "Introduction to Java Programming: Core OOP & JVM Architecture",
    subtitle: "A beginner's guide to compiled bytecode, classes, methods, strong typing, and the Java Virtual Machine.",
    summary: "Discover Java programming fundamentals. Understand the JVM, bytecode execution, strongly typed variables, object-oriented principles, and your first Java program.",
    readTime: "9 min read",
    difficulty: "Beginner",
    icon: "Coffee",
    badge: "Enterprise",
    publishedAt: "2026-02-12",
    updatedAt: "2026-03-12",
    author: {
      name: "Coding Hub Technical Editorial Team",
      role: "Software Engineering & Education",
    },
    learningObjectives: [
      "Understand the Java slogan 'Write Once, Run Anywhere' (WORA) and JVM architecture",
      "Differentiate between the JDK (Developer Kit), JRE (Runtime), and JVM (Virtual Machine)",
      "Understand static typing and strong variable declarations in Java",
      "Write, compile, and execute a standalone Java class containing a main method",
    ],
    introduction:
      "Created by James Gosling at Sun Microsystems in 1995, Java is an object-oriented, strongly typed, class-based programming language. Designed around the architectural mandate of 'Write Once, Run Anywhere' (WORA), Java compiles source code into platform-independent bytecode that runs on any operating system equipped with a Java Virtual Machine (JVM). Today, Java powers the enterprise backend systems of global banks, Android mobile apps, and massive distributed infrastructure.",
    tableOfContents: [
      { id: "jvm-architecture", title: "1. The Java Platform Architecture: JVM, JRE, JDK" },
      { id: "static-typing", title: "2. Static Typing & Primitive Data Types" },
      { id: "first-java-program", title: "3. Writing Your First Java Class" },
      { id: "oop-principles", title: "4. Core Object-Oriented Principles" },
      { id: "common-pitfalls", title: "5. Common Java Beginner Pitfalls" },
    ],
    sections: [
      {
        id: "jvm-architecture",
        heading: "1. The Java Platform Architecture: JVM, JRE, JDK",
        subheading: "Bytecode compilation and cross-platform portability",
        content: [
          "Understanding the three Java acronyms is essential:",
          "- **JDK (Java Development Kit):** The complete software development package containing the compiler (`javac`), debugging tools, and the runtime.",
          "- **JRE (Java Runtime Environment):** The software layer needed to execute compiled Java programs on an end-user device.",
          "- **JVM (Java Virtual Machine):** The virtual computer engine that loads bytecode (`.class` files), verifies code security, executes instructions, and handles automatic garbage collection.",
        ],
      },
      {
        id: "static-typing",
        heading: "2. Static Typing & Primitive Data Types",
        content: [
          "Unlike Python or JavaScript, Java is strictly statically typed. You must explicitly declare the data type of every variable before compiling:",
          "- `int`: 32-bit signed integer (e.g. `int attendance = 48;`)",
          "- `double`: 64-bit floating point number for decimals (e.g. `double cgpa = 8.75;`)",
          "- `boolean`: `true` or `false`",
          "- `char`: 16-bit Unicode character (e.g. `char grade = 'A';`)",
          "- `String`: Reference type representing text sequences.",
        ],
      },
      {
        id: "first-java-program",
        heading: "3. Writing Your First Java Program",
        subheading: "Anatomy of public class and public static void main",
        content: [
          "In Java, every line of executable code must live inside a class. Furthermore, the source file name must match the `public class` name exactly (`StudentReport.java`):",
        ],
        codeBlock: {
          language: "java",
          code: `// StudentReport.java
public class StudentReport {
    // The main method is the entry point of every Java application
    public static void main(String[] args) {
        String studentName = "Elena Rostova";
        int classesConducted = 48;
        int classesAttended = 40;
        
        // Calculate attendance rate (cast to double to avoid integer division truncation)
        double attendancePercentage = ((double) classesAttended / classesConducted) * 100.0;
        
        System.out.println("Student Name: " + studentName);
        System.out.printf("Current Attendance: %.2f%%\n", attendancePercentage);
        
        if (attendancePercentage >= 75.0) {
            System.out.println("Status: Eligible for Final Examinations");
        } else {
            System.out.println("Status: Attendance Shortage");
        }
    }
}`,
          explanation:
            "`(double) classesAttended` prevents integer division. In Java, dividing an integer by an integer truncates decimals (e.g. `40 / 48` would equal `0`).",
        },
      },
      {
        id: "oop-principles",
        heading: "4. Core Object-Oriented Principles",
        content: [
          "Java organizes code around four core Object-Oriented Programming (OOP) pillars:",
          "1. **Encapsulation:** Hiding internal object state behind private fields and providing public getter/setter methods.",
          "2. **Inheritance:** Deriving new classes from existing classes to reuse attributes and behaviors.",
          "3. **Polymorphism:** Allowing subclasses to provide custom implementations of methods defined in their parent class.",
          "4. **Abstraction:** Hiding complex implementation details behind clean interfaces and abstract classes.",
        ],
      },
      {
        id: "common-pitfalls",
        heading: "5. Common Java Beginner Pitfalls",
        content: [
          "- **Integer Division:** Writing `int a = 5 / 2;` produces `2`, not `2.5`. Always use `double` literals like `5.0 / 2` when computing fractional percentages.",
          "- **String Comparison:** In Java, never compare strings with `==`. The `==` operator checks if two references point to the exact same memory address! Always compare strings using `.equals()`: `str1.equals(str2)`.",
        ],
      },
    ],
    summaryTakeaways: [
      "Java compiles source code into portable bytecode executed by the JVM.",
      "Every Java program requires a `public static void main(String[] args)` entry method.",
      "Java is statically typed: all variables require explicit type declarations.",
      "Always compare string contents using `.equals()`, not `==`.",
    ],
    faqs: [
      {
        question: "Why does Java use garbage collection?",
        answer: "In older languages like C, developers had to manually allocate and free computer memory, which frequently caused memory leaks and crashes. The Java Virtual Machine automatically identifies and removes objects that are no longer referenced in your program through automatic Garbage Collection (GC).",
      },
      {
        question: "Is Java related to JavaScript?",
        answer: "No. Despite sharing 'Java' in their names for marketing reasons in 1995, Java and JavaScript are completely distinct languages with entirely different runtimes, syntax rules, object models, and design philosophies.",
      },
    ],
    relatedTutorials: ["what-is-python", "html-css-basics"],
    relatedTools: ["attendance-calculator", "text-case-converter"],
    isFeatured: false,
    isRecommended: true,
  },
];

export function getTutorialBySlug(
  categorySlug: string,
  slug: string
): TutorialItem | undefined {
  return tutorialsData.find(
    (t) => t.categorySlug.toLowerCase() === categorySlug.toLowerCase() && t.slug.toLowerCase() === slug.toLowerCase()
  );
}

export function getTutorialsByCategory(categorySlug: string): TutorialItem[] {
  return tutorialsData.filter(
    (t) => t.categorySlug.toLowerCase() === categorySlug.toLowerCase()
  );
}

export function getFeaturedTutorials(): TutorialItem[] {
  return tutorialsData.filter((t) => t.isFeatured);
}

export function getRecommendedTutorials(): TutorialItem[] {
  return tutorialsData.filter((t) => t.isRecommended);
}

export function getLatestTutorials(limit?: number): TutorialItem[] {
  const sorted = [...tutorialsData].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return limit ? sorted.slice(0, limit) : sorted;
}
