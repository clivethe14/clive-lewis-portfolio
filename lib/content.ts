/**
 * Structured site content. Kept out of components so copy can be reviewed and
 * edited without touching layout code.
 */

export type Project = {
  slug: string;
  name: string;
  featured?: boolean;
  summary: string;
  period: string;
  tags: string[];
  /** Rendered as a small pill next to the title, e.g. "Publication". */
  badge?: string;
  bullets: string[];
  aside?: { heading: string; items: string[] };
  /**
   * Outbound link for the project. Omitted where the work isn't public, so the
   * card renders without a link rather than with a dead one.
   */
  link?: { url: string; label: string };
  /** Shown in place of a link when the work isn't publicly available. */
  note?: string;
};

export const projects: Project[] = [
  {
    slug: 'rosa',
    name: 'Rosa — Multi-Agent AI Health Platform',
    featured: true,
    period: 'April 2025',
    summary:
      'A multi-agent system for physical and mental health support, built by a 3-person team against a 25,000-user MVP target.',
    tags: ['Python', 'LangChain', 'RAG', 'Vector DB', 'Agentic AI'],
    bullets: [
      'A task-decomposition and routing layer takes a user query, breaks it into sub-tasks, and dispatches each to a specialized agent — one for physical health, one for mental health.',
      'Each agent carries its own tool set, including retrieval against a vector database holding session-wise memory, so answers are grounded through retrieval-augmented generation rather than pure generation.',
      'A response aggregator collects the specialized agents’ outputs, resolves overlap between them, and produces a single coherent answer.',
      'I built an evaluation process to score agent outputs against expected behavior, spot failure patterns, and iterate on routing logic, retrieval parameters, and prompts. That evaluation was largely manual — a maintained set of representative queries reviewed by hand.',
    ],
    aside: {
      heading: 'What I’d do differently today',
      items: [
        'Use LangGraph rather than vanilla LangChain, so agent handoffs are an explicit state graph instead of chained calls.',
        'Build automated evaluation from day one — instrument every agent interaction and score outputs continuously instead of reviewing them by hand.',
        'Add real observability. Structured logging and tracing across agent steps, because working out which agent or retrieval step produced a bad answer took longer than fixing it.',
      ],
    },
    link: { url: 'https://github.com/DJCodesStuff/StreamLit_app', label: 'View source' },
  },
  {
    slug: 'knee-osteoarthritis',
    name: 'Knee Osteoarthritis Detection Using Bone Distances',
    badge: 'Publication',
    period: 'IEEE/ACM CHASE 2025 · New York, June 2025',
    summary:
      'Applied deep learning on medical imaging: predicting osteoarthritis severity from geometric bone-distance measurements.',
    tags: ['PyTorch', 'MATLAB', 'Deep Learning', 'Medical Imaging'],
    bullets: [
      'A MATLAB–PyTorch supervised deep learning pipeline analyzing 160+ MRI scans to predict osteoarthritis severity from geometric bone-distance measurements.',
      'Achieved 76% accuracy and an AUC of 0.78.',
      'First-authored with Tarun Ramapuram and Dr. Juan Shan; presented at IEEE/ACM CHASE 2025 in New York City, June 2025.',
      'Framed accurately: this is applied deep learning on medical images driven by geometric measurement — model design, training, and evaluation — not detection, tracking, or segmentation work.',
    ],
    link: {
      url: 'https://github.com/clivethe14/OsteoarthritisDetection',
      label: 'View source',
    },
    // TODO: add the IEEE Xplore / ACM Digital Library page or DOI once indexed.
  },
  {
    slug: 'interactive-novel',
    name: 'Interactive Novel Web Application',
    period: 'February 2025 – May 2025',
    summary:
      'A full-stack app generating personalized storylines in real time from the reader’s choices — front end, backend, database, and cloud, owned end to end.',
    tags: ['React', 'TypeScript', 'Node.js', 'OpenAI API', 'MongoDB', 'AWS'],
    bullets: [
      'Generates personalized, real-time storylines from user choices, with real-time narration and emotion-driven thematic elements.',
      'Integrated the OpenAI API for real-time content generation inside a production-style REST service.',
      'Deployed on Amazon EC2 (Linux), with Amazon RDS for backend data services and CloudFront caching image delivery.',
      'Built session tracking and secured backend endpoints, then profiled and optimized request flows — cutting API call volume by 30% while holding reliability steady.',
    ],
    link: {
      url: 'https://github.com/htmw/2025S-Codesaurus/wiki',
      label: 'View project wiki',
    },
  },
  {
    slug: 'green2gold',
    name: 'Green2Gold Mobile App',
    badge: 'Professional work',
    period: 'June 2025 – Present',
    summary:
      'An end-to-end mobile app for an environmental education organization: Flutter client, Python REST API, PostgreSQL data layer.',
    tags: ['Flutter', 'Dart', 'Python', 'REST API', 'PostgreSQL'],
    bullets: [
      'Built and maintain a Python REST API backend paired with a Flutter mobile client, supporting content delivery and subscription workflows.',
      'Designed a PostgreSQL data layer with clean, reusable endpoints covering consultant inquiries, event sponsorship forms, and media assets.',
      'I had no mobile development experience going in. I learned Flutter on the job and shipped production features within weeks.',
    ],
    note: 'Internal app — the organization has not published it yet.',
  },
];

export type Role = {
  company: string;
  title: string;
  location: string;
  period: string;
  body: string[];
};

export const roles: Role[] = [
  {
    company: 'Green2Gold Environmental Education Group',
    title: 'Software Development Intern',
    location: 'Remote',
    period: 'June 2025 – Present',
    body: [
      'I build and maintain a Python REST API backend paired with a Flutter mobile client, supporting content delivery and subscription workflows for the organization’s platform, on a PostgreSQL data layer with clean, reusable endpoints.',
      'I had never written mobile code before this role. I learned Flutter on the job and shipped production features within weeks, working largely independently and iterating on both backend architecture and mobile UI as requirements moved.',
    ],
  },
  {
    company: 'Keymate.AI Inc.',
    title: 'Full Stack Web Development Associate',
    location: 'New York, NY',
    period: 'January 2025 – May 2025',
    body: [
      'A 4-person engineering team reporting directly to the CTO. I owned a Chrome extension feature end to end — design, implementation, backend microservice integration, and production deployment — serving 1,500+ paying customers.',
      'I integrated the Google Gemini LLM API into the production application for real-time content summarization and owned the full loop: deploying the model, evaluating output quality against real usage, and iterating on direct paid-customer feedback. Alongside that I built CI/CD pipelines with Jest and Playwright so we could deploy continuously without holding our breath.',
      'Owning a feature for paying customers makes quality concrete. Users notice within hours when something breaks, and that changed how seriously I take testing and monitoring.',
    ],
  },
  {
    company: 'Cognizant Technology Services Ltd.',
    title: 'Software Engineering Team Lead',
    location: 'Mumbai, Maharashtra, India',
    period: 'January 2022 – April 2023',
    body: [
      'I built and maintained 190+ Java-based integration interfaces for enterprise clients including British Airways, holding 100% SWIFT banking compliance across the portfolio — enterprise financial data integration with real regulatory stakes.',
      'A recurring production issue kept failing cash remittance transactions under SWIFT cross-validation. My first instinct was to patch each failure as it surfaced, and that didn’t hold — they kept coming back. So I stepped back and traced it through the logs to the actual cause: mandatory system ID fields weren’t populating during cross-validation. I designed an automated Java validation routine that fixed it at the source, and that entire class of failure stopped. The lesson stuck: understand why something is failing before you fix what is failing.',
      'I also worked directly with business and IT stakeholders to integrate a chatbot and remittance systems with SAP S/4 HANA, improving data recovery by 15% — which meant translating what stakeholders actually cared about (timelines, risk, operational impact) into technical decisions rather than implementing a spec.',
    ],
  },
];

export const skillGroups = [
  {
    label: 'Languages',
    items: ['Python', 'Java', 'TypeScript', 'JavaScript', 'Dart', 'SQL', 'C++'],
  },
  {
    label: 'AI/ML',
    items: [
      'Agentic systems (LangChain/LangGraph)',
      'RAG',
      'Vector DBs (Pinecone, Chroma)',
      'LLM APIs (OpenAI, Gemini)',
      'PyTorch',
    ],
  },
  {
    label: 'Frameworks',
    items: ['React', 'Next.js', 'Node.js/Express', 'Flutter'],
  },
  {
    label: 'Data & Infra',
    items: [
      'PostgreSQL',
      'MongoDB',
      'DynamoDB',
      'Supabase',
      'AWS (EC2, RDS, CloudFront)',
      'Docker',
      'Kubernetes',
      'CI/CD',
    ],
  },
] as const;
