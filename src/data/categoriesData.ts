export interface TutorialCategory {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: string;
  path: string;
  color: string;
}

export const categoriesData: TutorialCategory[] = [
  {
    id: "python",
    slug: "python",
    name: "Python Programming",
    shortDescription: "Master core Python syntax, functions, automation, and data structures.",
    description: "Learn Python from the ground up. Master foundational syntax, clean function design, data manipulation, and real-world script automation without unnecessary complexity.",
    icon: "Code",
    path: "/tutorials/python",
    color: "#176B50",
  },
  {
    id: "sql",
    slug: "sql",
    name: "SQL and Databases",
    shortDescription: "Query relational databases, master SELECT filters, and join complex tables.",
    description: "Build robust database query skills. Learn relational database design, query optimization, joins, aggregation, and filtering across PostgreSQL, MySQL, and SQLite.",
    icon: "Database",
    path: "/tutorials/sql",
    color: "#176B50",
  },
  {
    id: "power-bi",
    slug: "power-bi",
    name: "Power BI",
    shortDescription: "Transform messy business data, build interactive dashboards, and write DAX.",
    description: "Master business intelligence workflows. Clean and model raw spreadsheets in Power Query, write calculated DAX measures, and design executive reporting dashboards.",
    icon: "BarChart3",
    path: "/tutorials/power-bi",
    color: "#176B50",
  },
  {
    id: "data-analytics",
    slug: "data-analytics",
    name: "Data Analytics",
    shortDescription: "Exploratory data analysis, statistical methods, and data cleaning techniques.",
    description: "Develop practical analytics competence. Learn the complete data lifecycle, exploratory analysis methods, outlier detection, and data cleaning best practices.",
    icon: "TrendingUp",
    path: "/tutorials/data-analytics",
    color: "#176B50",
  },
  {
    id: "web-development",
    slug: "web-development",
    name: "Web Development",
    shortDescription: "Build responsive, modern web interfaces with HTML, CSS, JavaScript, and React.",
    description: "Craft modern, accessible web applications. Understand semantic HTML5, modern CSS flexbox and grid, client-side JavaScript, and component architectures.",
    icon: "Layout",
    path: "/tutorials/web-development",
    color: "#176B50",
  },
  {
    id: "java",
    slug: "java",
    name: "Java Programming",
    shortDescription: "Object-oriented programming, class design, JVM architecture, and types.",
    description: "Understand enterprise software fundamentals. Explore Java object-oriented principles, JVM bytecode execution, strongly typed data structures, and robust method design.",
    icon: "Coffee",
    path: "/tutorials/java",
    color: "#176B50",
  },
];

export function getCategoryBySlug(slug: string): TutorialCategory | undefined {
  return categoriesData.find(
    (c) => c.slug.toLowerCase() === slug.toLowerCase()
  );
}
