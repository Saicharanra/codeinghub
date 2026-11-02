/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/tutorials/python-programming",
        destination: "/tutorials/python",
        permanent: true,
      },
      {
        source: "/tutorials/javascript",
        destination: "/tutorials/java",
        permanent: true,
      },
      // Convenience redirects from single-slug to category-slug
      {
        source: "/tutorials/what-is-python",
        destination: "/tutorials/python/what-is-python",
        permanent: true,
      },
      {
        source: "/tutorials/python-variables",
        destination: "/tutorials/python/python-variables",
        permanent: true,
      },
      {
        source: "/tutorials/python-functions",
        destination: "/tutorials/python/python-functions",
        permanent: true,
      },
      {
        source: "/tutorials/sql-basics",
        destination: "/tutorials/sql/sql-basics",
        permanent: true,
      },
      {
        source: "/tutorials/sql-select-where-orderby",
        destination: "/tutorials/sql/sql-select-where-orderby",
        permanent: true,
      },
      {
        source: "/tutorials/understanding-sql-joins",
        destination: "/tutorials/sql/understanding-sql-joins",
        permanent: true,
      },
      {
        source: "/tutorials/what-is-power-bi",
        destination: "/tutorials/power-bi/what-is-power-bi",
        permanent: true,
      },
      {
        source: "/tutorials/power-query-basics",
        destination: "/tutorials/power-bi/power-query-basics",
        permanent: true,
      },
      {
        source: "/tutorials/what-is-data-analytics",
        destination: "/tutorials/data-analytics/what-is-data-analytics",
        permanent: true,
      },
      {
        source: "/tutorials/data-cleaning-techniques",
        destination: "/tutorials/data-analytics/data-cleaning-techniques",
        permanent: true,
      },
      {
        source: "/tutorials/html-css-basics",
        destination: "/tutorials/web-development/html-css-basics",
        permanent: true,
      },
      {
        source: "/tutorials/java-basics",
        destination: "/tutorials/java/java-basics",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;