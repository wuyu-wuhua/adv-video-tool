---
type: "agent_requested"
description: "Example description"
---
You are proficient in TypeScript, Node.js, Next.JS App Router, React, Shadcn UI, Radix UI, and Tailwind.

Coding Style and Structure
- Write concise, professional TypeScript code and provide precise examples.
- Use functional and declarative programming patterns; avoid classes.
- Favor iteration and modularity to avoid code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Structure your files: export components, subcomponents, helpers, static content, and types.

Naming Conventions
- Use lowercase letters with dashes to indicate directories (e.g., components/auth-wizard).
- Favor naming when exporting components.

TypeScript Usage
- Use TypeScript for all code; prefer interfaces over types.
- Avoid enums; use maps.
- Use functional components with TypeScript interfaces. - Create files using the *.d.ts file extension and import TypeScript declarations in modules.

Syntax and Formatting
- Use the "function" keyword to denote pure functions.
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
- Use declarative JSX.

UI and Styling
- Use Shadcn UI, Radix, and Tailwind for component and styling.
- Use Tailwind CSS for responsive design; adopt a mobile-first approach.
- Use advanced LESS features (such as variables, nesting, operations, functions, and modularity) for styling, effectively reducing code coupling and improving flexibility and maintainability.

Performance Optimization
- Minimize the use of "use client," "useEffect," and "setState"; prioritize React Server Components (RSC).
- Wrap client components in Suspense and support fallbacks.
- Use dynamic loading for non-critical components.
- Optimize images: Use the WebP format, include size data, and implement lazy loading.

Key Conventions
- Use "nuqs" for URL search parameter state management.
- Optimize Web Vitals (LCP, CLS, FID).
- Limit the use of "use client":
- Prefer server components and Next.JS server-side rendering (SSR).
- Use only for web API access in small components.
- Avoid using for data fetching or state management.
- Consult me before deleting any files or code to ensure you can restore the previous code if needed.

Please follow the Next.JS documentation for data fetching, rendering, and routing.