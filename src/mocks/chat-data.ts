/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-lines */
export interface DataSource {
  id: string;
  name: string;
  icon: string;
  tablesUsed: string[];
}

export interface Tool {
  id: string;
  name: string;
  icon: string;
  purpose: string;
}

export interface ReasoningStep {
  id: string;
  step: number;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
  sqlQuery?: string;
  dataSource?: string;
}

export interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
  type?: "chart" | "table" | "text";
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  chartData?: ChartData;
  tableData?: TableData;
  actions?: ChatAction[];
  dataSources?: DataSource[];
  tools?: Tool[];
  reasoningSteps?: ReasoningStep[];
  sqlQuery?: string;
}

export interface ChatAction {
  id: string;
  label: string;
  icon: string;
  type: "alert" | "export" | "schedule" | "view";
  variant?: "default" | "ghost" | "outline";
  onClick?: () => void;
}

export interface ChartData {
  type: "area" | "bar" | "funnel" | "line" | "pie";
  data: Array<Record<string, number | string>>;
  xKey?: string;
  yKey?: string;
  yKeys?: string[];
  title?: string;
  colors?: string[];
  legend?: boolean;
}

export interface TableData {
  title?: string;
  columns: Array<{ key: string; label: string; sortable?: boolean }>;
  rows: Array<Record<string, number | string>>;
}

interface SuggestedQuery {
  id: string;
  text: string;
  category: "cross-source" | "multi-source" | "single-source";
  dataSources: string[];
  requiredSources: string[]; // connector IDs
  requiresReconciliation: boolean;
  icon?: string;
}

export const SUGGESTED_QUERIES: SuggestedQuery[] = [
  // Product Analytics & Feature Usage
  {
    id: "product-1",
    text: "What are the top 5 features by daily active users this month?",
    category: "single-source",
    dataSources: ["Product Analytics"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Activity",
  },
  {
    id: "doctrine-nps-1",
    text: "Diagnose low NPS drivers from Doctrine user sessions (detractors, last month)",
    category: "single-source",
    dataSources: ["Product Analytics"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "TrendingDown",
  },
  {
    id: "product-3",
    text: "Show me feature adoption rates for new users in their first 7 days",
    category: "single-source",
    dataSources: ["Product Analytics"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "TrendingUp",
  },
  {
    id: "marketing-2",
    text: "What's our campaign ROI by channel this month?",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "TrendingUp",
  },

  // User Acquisition & Funnel Analysis
  {
    id: "marketing-5",
    text: "Analyze our signup funnel steps and compare to last month",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "TrendingDown",
  },
  {
    id: "marketing-6",
    text: "What's the MQL to SQL conversion rate by source?",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Filter",
  },
  {
    id: "marketing-7",
    text: "Show me user acquisition by device type and country",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Smartphone",
  },
  {
    id: "marketing-8",
    text: "Give me a list of companies that visited the pricing page 3+ times",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Eye",
  },

  // Ad Spend & Efficiency
  {
    id: "marketing-9",
    text: "What's our ad spend efficiency across all channels?",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Target",
  },
  {
    id: "marketing-10",
    text: "Explain the drop in conversion rate in Italy",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "AlertCircle",
  },
  {
    id: "marketing-11",
    text: "Which audience segments have the highest engagement?",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Users",
  },
  {
    id: "marketing-12",
    text: "Show me traffic sources that drive the most qualified leads",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Zap",
  },

  // Cohort & Retention Analysis
  {
    id: "marketing-13",
    text: "Compare user cohorts from Q1 vs Q2 by retention rate",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "BarChart",
  },
  {
    id: "marketing-14",
    text: "What's the lifetime value of customers by acquisition channel?",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "DollarSign",
  },
  {
    id: "marketing-15",
    text: "Show me inactive users who haven't engaged in 30 days",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "UserX",
  },
  {
    id: "marketing-16",
    text: "Create a segment of users who engaged with our last campaign",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Users",
  },

  // Content & Attribution Analysis
  {
    id: "marketing-17",
    text: "Which content pieces drive the most conversions?",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "FileText",
  },
  {
    id: "marketing-18",
    text: "Show me attribution breakdown for closed deals this quarter",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "GitBranch",
  },
  {
    id: "marketing-19",
    text: "What's the average time from first touch to conversion?",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Clock",
  },
  {
    id: "marketing-20",
    text: "Show me top-performing landing pages by conversion rate",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Layout",
  },

  // Segmentation & Personalization
  {
    id: "marketing-21",
    text: "Create an audience of high-intent visitors for retargeting",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Target",
  },
  {
    id: "marketing-22",
    text: "Which customer segments have the best engagement scores?",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Layers",
  },
  {
    id: "marketing-23",
    text: "Show me behavioral patterns of our most valuable customers",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Activity",
  },
  {
    id: "marketing-24",
    text: "Identify accounts showing buying intent signals",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Zap",
  },
  // Digest creation suggestion
  {
    id: "digest-1",
    text: "I want to create a digest",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "CalendarDays",
  },
];

// Mock responses for common queries
export const MOCK_RESPONSES: Record<string, Omit<ChatMessage, "id" | "role" | "timestamp">> = {
  // Digest creation conversation flow - 6 message exchanges (with confirmation step)
  "i want to create a digest": {
    content:
      "I'd be happy to help you create a digest! To get started, could you tell me what type of insights you'd like to receive? For example, are you interested in campaign performance, social media metrics, email marketing, or something else?",
    type: "text",
  },
  "i want campaign performance metrics": {
    content: "Great! For campaign performance, what time period would you like to track? Daily, weekly, or monthly?",
    type: "text",
  },
  weekly: {
    content:
      "Perfect! Should I include comparisons with previous periods, and any specific breakdowns like by channel, campaign type, or audience segment?",
    type: "text",
  },
  "yes, compare with previous week and break down by channel": {
    content:
      "Excellent! I've added those components. Would you like to include any visualizations like charts or graphs, and any specific alerts or thresholds?",
    type: "text",
  },
  "add a line chart for trends and alert if click-through rate drops below 2%": {
    content:
      "Excellent! I've configured your Marketing Campaign Performance digest with all the components you requested. Here's what it includes:\n\n- Weekly tracking of campaign performance metrics\n- Comparison with previous week\n- Breakdown by channel (Email, Social Media, Paid Search, Display)\n- Line chart showing CTR and conversion rate trends\n- Alert when click-through rate drops below 2%\n\nDoes this look good to you? I can make any changes you'd like before we set up the schedule.",
    type: "text",
  },
  // User confirmation variations - all lead to scheduling options
  "looks good to me": {
    content:
      "Perfect! I've configured your digest. Now, how often would you like to receive this digest? You can choose: Daily at 9am, Every Monday at 9am, or Monthly on the 1st at 9am",
    type: "text",
    actions: [
      {
        id: "schedule-daily",
        label: "Daily at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
      {
        id: "schedule-weekly",
        label: "Every Monday at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "default",
      },
      {
        id: "schedule-monthly",
        label: "Monthly on the 1st at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
    ],
  },
  // Doctrine NPS Analysis Conversation Flow
  "diagnose low nps drivers from doctrine user sessions (detractors, last month)": {
    content:
      "I found ~600,000 user sessions from last month. Let me analyze 100 randomly sampled sessions from detractors (NPS < 7). This sample size provides statistical significance (~95% confidence level, ±10% margin of error) for identifying key patterns. I'll examine search behavior, navigation flows, document interactions, and error patterns to diagnose root causes driving low NPS scores.",
    type: "table",
    dataSources: [
      {
        id: "product-analytics",
        name: "Product Analytics",
        icon: "/dbt.png",
        tablesUsed: [
          "analytics.user_sessions",
          "analytics.search_events",
          "analytics.navigation_flows",
          "analytics.error_logs",
        ],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Load and validate session sample",
        description: "Extract 100 random sessions from detractors (NPS < 7) from ~600k total sessions last month",
        status: "completed",
        dataSource: "Product Analytics",
        sqlQuery: `WITH total_sessions AS (
  SELECT COUNT(DISTINCT session_id) as total_count
  FROM analytics.user_sessions
  WHERE session_date >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
    AND session_date < DATE_TRUNC('month', CURRENT_DATE)
),
detractor_sessions AS (
  SELECT COUNT(DISTINCT session_id) as detractor_count
  FROM analytics.user_sessions
  WHERE session_date >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
    AND session_date < DATE_TRUNC('month', CURRENT_DATE)
    AND nps_score < 7
)
SELECT
  s.session_id,
  s.user_id,
  s.session_date,
  s.session_duration_seconds,
  s.nps_score,
  s.search_count,
  s.click_count,
  s.document_views,
  s.error_count,
  (SELECT total_count FROM total_sessions) as total_sessions_last_month,
  (SELECT detractor_count FROM detractor_sessions) as detractor_sessions_count
FROM analytics.user_sessions s
WHERE s.session_date >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
  AND s.session_date < DATE_TRUNC('month', CURRENT_DATE)
  AND s.nps_score < 7
  AND s.nps_score IS NOT NULL
ORDER BY RANDOM()
LIMIT 100;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Categorize sessions by NPS score",
        description: "Analyze detractor sessions (NPS < 7) and categorize by specific score ranges",
        status: "completed",
        dataSource: "Product Analytics",
        sqlQuery: `WITH sampled_sessions AS (
  SELECT * FROM analytics.user_sessions
  WHERE session_id IN (/* 100 sampled session IDs */)
    AND nps_score < 7
)
SELECT
  CASE
    WHEN nps_score BETWEEN 0 AND 6 THEN 'Detractors'
  END as nps_category,
  COUNT(*) as session_count,
  ROUND(AVG(session_duration_seconds), 1) as avg_duration_sec,
  ROUND(AVG(search_count), 1) as avg_searches,
  ROUND(AVG(click_count), 1) as avg_clicks,
  ROUND(AVG(error_count), 2) as avg_errors
FROM sampled_sessions
GROUP BY nps_category
ORDER BY MIN(nps_score);`,
      },
      {
        id: "step3",
        step: 3,
        title: "Analyze search quality and relevance",
        description: "Examine search queries, result click-through rates, and null result frequency",
        status: "completed",
        dataSource: "Product Analytics",
        sqlQuery: `SELECT
  se.session_id,
  COUNT(se.search_id) as total_searches,
  COUNT(CASE WHEN se.results_count = 0 THEN 1 END) as null_results,
  ROUND(
    COUNT(CASE WHEN se.results_count = 0 THEN 1 END) * 100.0 /
    NULLIF(COUNT(se.search_id), 0), 1
  ) as null_result_rate,
  ROUND(AVG(se.first_click_position), 1) as avg_click_position,
  COUNT(CASE WHEN se.first_click_position IS NULL THEN 1 END) as searches_without_click
FROM analytics.search_events se
WHERE se.session_id IN (/* 100 sampled session IDs */)
GROUP BY se.session_id;`,
      },
      {
        id: "step4",
        step: 4,
        title: "Map navigation and UX friction points",
        description: "Identify common page sequences, back-button usage, and abandonment patterns",
        status: "completed",
        dataSource: "Product Analytics",
        sqlQuery: `WITH navigation_patterns AS (
  SELECT
    nf.session_id,
    nf.page_sequence,
    nf.back_button_count,
    nf.reload_count,
    nf.pages_visited,
    CASE
      WHEN nf.exit_page = '/search' AND nf.session_duration_seconds < 30 THEN 'Quick abandonment'
      WHEN nf.back_button_count > 5 THEN 'High friction navigation'
      WHEN nf.reload_count > 2 THEN 'Repeated page reloads'
      ELSE 'Normal navigation'
    END as friction_indicator
  FROM analytics.navigation_flows nf
  WHERE nf.session_id IN (/* 100 sampled session IDs */)
)
SELECT
  friction_indicator,
  COUNT(*) as occurrence_count,
  ROUND(AVG(back_button_count), 1) as avg_back_count,
  ROUND(AVG(session_duration_seconds), 1) as avg_session_duration
FROM navigation_patterns
GROUP BY friction_indicator
ORDER BY occurrence_count DESC;`,
      },
      {
        id: "step5",
        step: 5,
        title: "Correlate issues with NPS scores",
        description: "Cross-reference identified issues with NPS categories to find causal patterns",
        status: "completed",
        dataSource: "Product Analytics",
        sqlQuery: `SELECT
  s.nps_category,
  AVG(CASE WHEN se.null_result_rate > 30 THEN 1 ELSE 0 END) as pct_high_null_results,
  AVG(CASE WHEN el.error_count > 0 THEN 1 ELSE 0 END) as pct_with_errors,
  AVG(CASE WHEN nf.friction_indicator != 'Normal navigation' THEN 1 ELSE 0 END) as pct_friction,
  AVG(CASE WHEN s.session_duration_seconds < 60 THEN 1 ELSE 0 END) as pct_short_sessions
FROM sampled_sessions s
LEFT JOIN search_quality se ON s.session_id = se.session_id
LEFT JOIN error_logs el ON s.session_id = el.session_id
LEFT JOIN navigation_patterns nf ON s.session_id = nf.session_id
GROUP BY s.nps_category;`,
      },
    ],
    tableData: {
      title: "Detractor Sessions - NPS Distribution and Key Metrics (100 Sessions, NPS < 7)",
      columns: [
        { key: "category", label: "NPS Category", sortable: true },
        { key: "count", label: "Sessions", sortable: true },
        { key: "percentage", label: "% of Sample", sortable: true },
        { key: "avgDuration", label: "Avg Duration (sec)", sortable: true },
        { key: "avgSearches", label: "Avg Searches", sortable: true },
        { key: "avgErrors", label: "Avg Errors", sortable: true },
      ],
      rows: [
        {
          category: "Detractors (0-6)",
          count: 100,
          percentage: "100%",
          avgDuration: 142.3,
          avgSearches: 4.2,
          avgErrors: 1.8,
        },
      ],
    },
    actions: [
      {
        id: "view-detractor-sessions",
        label: "View Unsatisfied User Session Details",
        icon: "Eye",
        type: "view",
        variant: "default",
      },
      {
        id: "export-analysis",
        label: "Export Full Analysis",
        icon: "Download",
        type: "export",
        variant: "outline",
      },
    ],
  },

  "what are the main root causes for the detractors?": {
    content:
      "I've identified 5 primary root cause categories affecting Detractors (100 sessions). The analysis reveals that **search relevance issues** (affecting 58% of detractors) and **corpus coverage gaps** (affecting 52%) are the dominant problems, followed by UX friction and performance issues.",
    type: "table",
    dataSources: [
      {
        id: "product-analytics",
        name: "Product Analytics",
        icon: "/dbt.png",
        tablesUsed: [
          "analytics.search_events",
          "analytics.error_logs",
          "analytics.navigation_flows",
          "analytics.performance_metrics",
        ],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Identify search relevance problems",
        description: "Detect null results, low CTR, and irrelevant result patterns",
        status: "completed",
        dataSource: "Product Analytics",
        sqlQuery: `WITH detractor_sessions AS (
  SELECT session_id FROM analytics.user_sessions
  WHERE nps_score BETWEEN 0 AND 6
    AND session_id IN (/* 100 sampled IDs */)
)
SELECT
  s.session_id,
  COUNT(CASE WHEN se.results_count = 0 THEN 1 END) as null_searches,
  COUNT(CASE WHEN se.first_click_position IS NULL AND se.results_count > 0 THEN 1 END) as no_click_searches,
  CASE
    WHEN COUNT(CASE WHEN se.results_count = 0 THEN 1 END) >= 2 THEN 'Search Relevance Issue'
    WHEN COUNT(CASE WHEN se.first_click_position IS NULL AND se.results_count > 0 THEN 1 END) >= 3 THEN 'Search Relevance Issue'
    ELSE NULL
  END as root_cause
FROM detractor_sessions ds
JOIN analytics.search_events se ON ds.session_id = se.session_id
GROUP BY s.session_id
HAVING root_cause IS NOT NULL;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Detect corpus coverage gaps",
        description: "Analyze search queries that returned zero results for legal domain patterns",
        status: "completed",
        dataSource: "Product Analytics",
        sqlQuery: `SELECT
  se.query_text,
  se.legal_domain,
  COUNT(DISTINCT se.session_id) as affected_sessions,
  CASE
    WHEN se.legal_domain IN ('droit social', 'droit fiscal', 'droit pénal')
      AND se.results_count = 0 THEN 'Corpus Coverage Gap'
    ELSE NULL
  END as root_cause
FROM analytics.search_events se
WHERE se.session_id IN (/* Detractor session IDs */)
  AND se.results_count = 0
GROUP BY se.query_text, se.legal_domain, root_cause
HAVING root_cause IS NOT NULL
ORDER BY affected_sessions DESC;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Identify UX friction patterns",
        description: "Find navigation issues, excessive back-button usage, and confusion signals",
        status: "completed",
        dataSource: "Product Analytics",
        sqlQuery: `SELECT
  nf.session_id,
  nf.back_button_count,
  nf.reload_count,
  nf.pages_visited,
  nf.session_duration_seconds,
  CASE
    WHEN nf.back_button_count > 8 THEN 'UX Friction - Excessive Navigation'
    WHEN nf.reload_count > 3 THEN 'UX Friction - Page Reloading'
    WHEN nf.pages_visited < 3 AND nf.session_duration_seconds < 45 THEN 'UX Friction - Quick Abandonment'
    ELSE NULL
  END as root_cause
FROM analytics.navigation_flows nf
WHERE nf.session_id IN (/* Detractor session IDs */)
HAVING root_cause IS NOT NULL;`,
      },
      {
        id: "step4",
        step: 4,
        title: "Analyze performance and error issues",
        description: "Detect slow page loads, timeouts, and technical errors",
        status: "completed",
        dataSource: "Product Analytics",
        sqlQuery: `SELECT
  pm.session_id,
  pm.avg_page_load_ms,
  el.error_type,
  COUNT(el.error_id) as error_count,
  CASE
    WHEN pm.avg_page_load_ms > 3000 THEN 'Performance Issue - Slow Loading'
    WHEN el.error_type IN ('timeout', '500', 'network_error') THEN 'Technical Error'
    ELSE NULL
  END as root_cause
FROM analytics.performance_metrics pm
LEFT JOIN analytics.error_logs el ON pm.session_id = el.session_id
WHERE pm.session_id IN (/* Detractor session IDs */)
GROUP BY pm.session_id, pm.avg_page_load_ms, el.error_type, root_cause
HAVING root_cause IS NOT NULL;`,
      },
      {
        id: "step5",
        step: 5,
        title: "Categorize and quantify all root causes",
        description: "Aggregate findings into distinct categories with frequency counts",
        status: "completed",
        dataSource: "Product Analytics",
        sqlQuery: `WITH all_root_causes AS (
  SELECT session_id, 'Search Relevance' as category FROM search_issues
  UNION ALL
  SELECT session_id, 'Corpus Coverage Gap' as category FROM coverage_gaps
  UNION ALL
  SELECT session_id, 'UX Friction' as category FROM ux_friction
  UNION ALL
  SELECT session_id, 'Performance Issue' as category FROM performance_issues
  UNION ALL
  SELECT session_id, 'Technical Error' as category FROM technical_errors
)
SELECT
  category,
  COUNT(DISTINCT session_id) as affected_sessions,
  ROUND(COUNT(DISTINCT session_id) * 100.0 / 100, 1) as pct_of_detractors
FROM all_root_causes
GROUP BY category
ORDER BY affected_sessions DESC;`,
      },
    ],
    tableData: {
      title: "Root Cause Analysis - Detractors (100 Sessions)",
      columns: [
        { key: "rootCause", label: "Root Cause Category", sortable: true },
        { key: "affectedSessions", label: "Affected Sessions", sortable: true },
        { key: "percentage", label: "% of Detractors", sortable: true },
        { key: "example", label: "Example Issue", sortable: false },
      ],
      rows: [
        {
          rootCause: "Search Relevance",
          affectedSessions: 42,
          percentage: "72.4%",
          example: "Query 'jurisprudence contrat travail' → 0 results",
        },
        {
          rootCause: "Corpus Coverage Gap",
          affectedSessions: 38,
          percentage: "65.5%",
          example: "Missing recent decisions in 'droit fiscal' domain",
        },
        {
          rootCause: "UX Friction",
          affectedSessions: 31,
          percentage: "53.4%",
          example: "Avg 12 back-button clicks per session",
        },
        {
          rootCause: "Performance Issue",
          affectedSessions: 18,
          percentage: "31.0%",
          example: "Search results loading >4s on mobile",
        },
        {
          rootCause: "Onboarding Gap",
          affectedSessions: 14,
          percentage: "24.1%",
          example: "New users (< 3 sessions) struggle with advanced search",
        },
      ],
    },
    actions: [
      {
        id: "view-search-examples",
        label: "View Search Relevance Examples",
        icon: "Search",
        type: "view",
        variant: "default",
      },
      {
        id: "export-root-causes",
        label: "Export Root Cause Details",
        icon: "Download",
        type: "export",
        variant: "outline",
      },
    ],
  },

  "show me specific examples from the corpus coverage gaps": {
    content:
      "I've extracted 15 specific examples of corpus coverage gaps from the 38 affected detractor sessions. These represent actual user queries that returned zero or highly irrelevant results due to missing content in the legal database.",
    type: "table",
    dataSources: [
      {
        id: "product-analytics",
        name: "Product Analytics",
        icon: "/dbt.png",
        tablesUsed: ["analytics.search_events", "analytics.query_intent"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Extract failed search queries",
        description: "Collect queries with zero results from detractor sessions",
        status: "completed",
        dataSource: "Product Analytics",
        sqlQuery: `SELECT
  se.session_id,
  se.query_text,
  se.legal_domain,
  se.timestamp,
  se.results_count,
  qi.inferred_intent,
  qi.expected_document_type
FROM analytics.search_events se
LEFT JOIN analytics.query_intent qi ON se.search_id = qi.search_id
WHERE se.session_id IN (/* Detractor IDs with coverage gaps */)
  AND se.results_count = 0
ORDER BY se.timestamp;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Categorize gaps by legal domain",
        description: "Group missing content by domain area to identify systematic gaps",
        status: "completed",
        dataSource: "Product Analytics",
        sqlQuery: `SELECT
  qi.user_intent_category,
  legal_domain,
  COUNT(DISTINCT session_id) as affected_sessions,
  STRING_AGG(DISTINCT se.query_text, '", "' ORDER BY se.timestamp LIMIT 3) as example_queries,
  qi.expected_document_type
FROM analytics.search_events se
LEFT JOIN analytics.query_intent qi ON se.search_id = qi.search_id
WHERE se.results_count = 0
  AND se.session_id IN (/* Detractor IDs with coverage gaps */)
GROUP BY qi.user_intent_category, legal_domain, qi.expected_document_type
ORDER BY affected_sessions DESC, legal_domain;`,
      },
    ],
    tableData: {
      title: "Corpus Coverage Gap Examples (Top 15 Intent Patterns)",
      columns: [
        { key: "userIntent", label: "User Intent", sortable: false },
        { key: "exampleQueries", label: "Example Queries", sortable: false },
        { key: "sessions", label: "Affected Sessions", sortable: true },
        { key: "domain", label: "Legal Domain", sortable: true },
      ],
      rows: [
        {
          userIntent: "Recent telework jurisprudence (2024)",
          exampleQueries:
            '"jurisprudence télétravail 2024", "télétravail jurisprudence récente", "arrêts télétravail 2024"',
          sessions: 8,
          domain: "Droit Social",
        },
        {
          userIntent: "Cryptocurrency taxation for individuals",
          exampleQueries:
            '"crypto monnaie fiscalité particulier", "impôt crypto actifs", "déclaration fiscale bitcoin"',
          sessions: 6,
          domain: "Droit Fiscal",
        },
        {
          userIntent: "Economic layoff PSE requirements",
          exampleQueries:
            '"licenciement économique PSE obligations", "plan sauvegarde emploi procédure", "PSE obligations employeur"',
          sessions: 5,
          domain: "Droit Social",
        },
        {
          userIntent: "Moral harassment statute of limitations",
          exampleQueries:
            '"condamnation harcèlement moral prescription", "délai prescription harcèlement", "harcèlement moral délai action"',
          sessions: 4,
          domain: "Droit Pénal",
        },
        {
          userIntent: "Non-compete clause validity conditions",
          exampleQueries:
            '"clause non-concurrence validité conditions", "validité clause non concurrence", "conditions clause de non-concurrence"',
          sessions: 4,
          domain: "Droit Commercial",
        },
        {
          userIntent: "Moral damages for work accidents",
          exampleQueries:
            '"indemnisation préjudice moral accident travail", "préjudice moral accident professionnel", "dommages moraux AT"',
          sessions: 3,
          domain: "Droit Social",
        },
        {
          userIntent: "Early termination of 3-6-9 commercial lease",
          exampleQueries:
            '"bail commercial 3-6-9 résiliation anticipée", "résiliation anticipée bail 3-6-9", "sortie bail commercial avant terme"',
          sessions: 3,
          domain: "Droit Commercial",
        },
        {
          userIntent: "Whistleblower protection in private companies",
          exampleQueries:
            '"protection lanceur alerte entreprise privée", "lanceur alerte secteur privé", "protection whistleblower entreprise"',
          sessions: 3,
          domain: "Droit Social",
        },
        {
          userIntent: "Notary fees for inheritance (2024 rates)",
          exampleQueries:
            '"succession notaire frais barème 2024", "frais notaire succession 2024", "tarif notaire héritage"',
          sessions: 2,
          domain: "Droit Civil",
        },
        {
          userIntent: "Hidden defect claim deadlines in real estate",
          exampleQueries:
            '"vente immobilière vice caché délai recours", "délai action vice caché immobilier", "prescription vice caché vente"',
          sessions: 2,
          domain: "Droit Civil",
        },
        {
          userIntent: "Work-related disability dismissal rules",
          exampleQueries:
            '"licenciement inaptitude origine professionnelle", "inaptitude professionnelle licenciement", "licenciement inaptitude travail"',
          sessions: 2,
          domain: "Droit Social",
        },
        {
          userIntent: "Tax law abuse penalties and amounts",
          exampleQueries:
            '"abus de droit fiscal sanction montant", "sanction abus droit fiscal", "pénalités abus de droit"',
          sessions: 2,
          domain: "Droit Fiscal",
        },
        {
          userIntent: "Online sales withdrawal right exceptions",
          exampleQueries:
            '"droit rétractation vente distance exception", "exceptions rétractation vente en ligne", "pas de rétractation vente distance"',
          sessions: 2,
          domain: "Droit Commercial",
        },
        {
          userIntent: "Can employer refuse mutual termination agreement",
          exampleQueries:
            '"rupture conventionnelle refus employeur motif", "employeur refuse rupture conventionnelle", "refus rupture conventionnelle légal"',
          sessions: 1,
          domain: "Droit Social",
        },
        {
          userIntent: "10-year construction liability time limits",
          exampleQueries:
            '"prescription action responsabilité décennale", "délai responsabilité décennale", "prescription décennale construction"',
          sessions: 1,
          domain: "Droit Civil",
        },
      ],
    },
    actions: [
      {
        id: "export-missing-queries",
        label: "Export All Missing Queries",
        icon: "Download",
        type: "export",
        variant: "outline",
      },
      {
        id: "create-content-backlog",
        label: "Create Content Backlog",
        icon: "List",
        type: "export",
        variant: "default",
      },
    ],
  },

  "tell me more about the ux friction issues": {
    content:
      "I've identified **31 detractor sessions (53%)** experiencing UX friction. The patterns show users struggling with navigation, excessive back-button usage, and interface confusion. Here are the main friction points with session counts and specific behavioral signals:",
    type: "table",
    dataSources: [
      {
        id: "product-analytics",
        name: "Product Analytics",
        icon: "/dbt.png",
        tablesUsed: ["analytics.ux_friction_patterns", "analytics.user_behavior_signals"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Identify UX friction patterns",
        description: "Analyze user behavior signals indicating navigation confusion and interface friction",
        status: "completed",
        dataSource: "Product Analytics",
        sqlQuery: `WITH friction_signals AS (
  SELECT
    session_id,
    COUNT(*) FILTER (WHERE event_type = 'back_button_click') as back_button_clicks,
    COUNT(*) FILTER (WHERE event_type = 'search_refinement') as search_refinements,
    COUNT(*) FILTER (WHERE event_type = 'filter_toggle') as filter_toggles,
    AVG(time_on_results_page) as avg_time_on_results,
    COUNT(DISTINCT page_visited) as pages_visited
  FROM user_events
  WHERE session_id IN (/* detractor IDs */)
  GROUP BY session_id
)
SELECT
  CASE
    WHEN back_button_clicks > 5 THEN 'Excessive back navigation'
    WHEN search_refinements > 3 THEN 'Search results confusion'
    WHEN filter_toggles > 8 THEN 'Filter overwhelm'
    WHEN avg_time_on_results > 45 THEN 'Results page confusion'
    ELSE 'General navigation issues'
  END as friction_type,
  COUNT(*) as session_count,
  AVG(back_button_clicks) as avg_back_clicks,
  AVG(search_refinements) as avg_refinements
FROM friction_signals
GROUP BY friction_type
ORDER BY session_count DESC;`,
      },
    ],
    tableData: {
      title: "UX Friction Patterns (31 sessions affected)",
      columns: [
        { key: "frictionType", label: "Friction Type", sortable: false },
        { key: "sessionCount", label: "Sessions", sortable: true },
        { key: "behaviorSignal", label: "Behavior Signal", sortable: false },
        { key: "specificExample", label: "Specific Example", sortable: false },
      ],
      rows: [
        {
          frictionType: "Search Results Navigation Confusion",
          sessionCount: 12,
          behaviorSignal: "Avg 7.2 back-button clicks per session",
          specificExample:
            "Users click into a result, immediately return, try another result, return again (repeat pattern 5-10 times)",
        },
        {
          frictionType: "Filter Overwhelm & Unclear Hierarchy",
          sessionCount: 9,
          behaviorSignal: "Avg 11.3 filter toggles per session",
          specificExample:
            "Users toggle multiple domain filters rapidly (Droit Social → Fiscal → Penal → reset → Social again) without finding desired content",
        },
        {
          frictionType: "Excessive Search Refinement Loop",
          sessionCount: 8,
          behaviorSignal: "Avg 4.8 search query refinements",
          specificExample:
            "Users refine the same query repeatedly ('jurisprudence licenciement' → 'jurisprudence licenciement 2024' → 'licenciement economique jurisprudence' → abandon)",
        },
        {
          frictionType: "Results Page Confusion (Long Dwell Time)",
          sessionCount: 6,
          behaviorSignal: "Avg 52 seconds on results page with no clicks",
          specificExample:
            "Users stare at results page for extended periods, scroll up/down multiple times, but don't click any results (confusion or overwhelm)",
        },
        {
          frictionType: "Lack of Saved Search / History Features",
          sessionCount: 5,
          behaviorSignal: "Users manually re-type identical queries 3+ times",
          specificExample:
            "Same complex query typed 3-4 times across the session ('jurisprudence cour de cassation chambre sociale licenciement economique 2023')",
        },
      ],
    },
    actions: [
      {
        id: "view-session-recordings",
        label: "View Session Recordings",
        icon: "Play",
        type: "view",
        variant: "default",
      },
      {
        id: "export-friction-data",
        label: "Export UX Friction Data",
        icon: "Download",
        type: "export",
        variant: "outline",
      },
    ],
  },

  "give me top 3-5 prioritized product improvement suggestions based on the coverage gaps and ux improvement issues": {
    content:
      "Here are 5 prioritized product improvements focused on **corpus coverage gaps** (38 sessions, 65%) and **UX friction** (31 sessions, 53%), the two most actionable root causes. These improvements are ranked by ROI (impact / effort) to maximize NPS lift. Effort estimates are based on similar past initiatives tracked in GitHub.",
    type: "table",
    dataSources: [
      {
        id: "product-analytics",
        name: "Product Analytics",
        icon: "/dbt.png",
        tablesUsed: ["analytics.user_sessions", "analytics.search_events", "analytics.navigation_flows"],
      },
    ],
    tools: [
      {
        id: "github",
        name: "GitHub",
        icon: "/github.png",
        purpose: "Effort estimation from historical issues and pull requests",
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Identify sessions with coverage gaps and UX friction",
        description:
          "Analyze raw session data to identify detractors experiencing corpus coverage gaps or UX friction patterns",
        status: "completed",
        dataSource: "Product Analytics",
        sqlQuery: `-- Identify sessions with corpus coverage gaps (detractors with multiple null result searches)
WITH coverage_gap_sessions AS (
  SELECT DISTINCT s.session_id
  FROM analytics.user_sessions s
  JOIN analytics.search_events se ON s.session_id = se.session_id
  WHERE s.nps_score < 7
    AND se.results_count = 0
    AND se.query_text IS NOT NULL
  GROUP BY s.session_id
  HAVING COUNT(*) >= 2  -- At least 2 null result searches
),
-- Identify sessions with UX friction (detractors with excessive navigation or errors)
ux_friction_sessions AS (
  SELECT DISTINCT s.session_id
  FROM analytics.user_sessions s
  JOIN analytics.navigation_flows nf ON s.session_id = nf.session_id
  WHERE s.nps_score < 7
    AND (nf.back_button_count > 8 OR nf.reload_count > 3 OR nf.tab_switch_count > 10)
)
SELECT
  'Corpus Coverage Gap' as issue_type,
  COUNT(DISTINCT session_id) as affected_sessions,
  ROUND(COUNT(DISTINCT session_id) * 100.0 /
    (SELECT COUNT(DISTINCT session_id) FROM analytics.user_sessions WHERE nps_score < 7), 1) as pct_of_detractors
FROM coverage_gap_sessions
UNION ALL
SELECT
  'UX Friction' as issue_type,
  COUNT(DISTINCT session_id) as affected_sessions,
  ROUND(COUNT(DISTINCT session_id) * 100.0 /
    (SELECT COUNT(DISTINCT session_id) FROM analytics.user_sessions WHERE nps_score < 7), 1) as pct_of_detractors
FROM ux_friction_sessions
ORDER BY affected_sessions DESC;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Calculate impact metrics for product improvements",
        description:
          "Derive improvement opportunities from session patterns and estimate effort based on GitHub historical data from similar past initiatives",
        status: "completed",
        dataSource: "Product Analytics, GitHub",
        sqlQuery: `-- Get effort estimates from similar past initiatives in GitHub
WITH github_effort_estimates AS (
  SELECT
    issue_label,
    AVG(story_points) as avg_effort_weeks,
    AVG(actual_completion_days / 7.0) as avg_duration_weeks,
    COUNT(*) as similar_issues_count
  FROM github.issues
  WHERE status = 'closed'
    AND issue_type IN ('enhancement', 'feature')
    AND closed_at >= CURRENT_DATE - INTERVAL '12 months'
  GROUP BY issue_label
),
-- Calculate impact metrics for coverage gap improvements
coverage_gap_impact AS (
  SELECT
    COUNT(DISTINCT s.session_id) as affected_sessions,
    COUNT(DISTINCT se.query_text) as unique_failed_queries,
    AVG(s.session_duration_sec) as avg_session_duration
  FROM analytics.user_sessions s
  JOIN analytics.search_events se ON s.session_id = se.session_id
  WHERE s.nps_score < 7
    AND se.results_count = 0
    AND se.query_text IS NOT NULL
  HAVING COUNT(*) >= 2
),
-- Calculate impact metrics for UX friction improvements
ux_friction_impact AS (
  SELECT
    COUNT(DISTINCT s.session_id) as affected_sessions,
    AVG(nf.back_button_count) as avg_back_buttons,
    AVG(nf.reload_count) as avg_reloads,
    AVG(s.session_duration_sec) as avg_session_duration
  FROM analytics.user_sessions s
  JOIN analytics.navigation_flows nf ON s.session_id = nf.session_id
  WHERE s.nps_score < 7
    AND (nf.back_button_count > 8 OR nf.reload_count > 3)
)
SELECT
  'Corpus Coverage' as improvement_area,
  cgi.affected_sessions,
  15.0 as estimated_nps_lift_pts,
  COALESCE(gh.avg_effort_weeks, 5.0) as estimated_effort_weeks,
  ROUND(cgi.affected_sessions / COALESCE(gh.avg_effort_weeks, 5.0), 1) as roi_score
FROM coverage_gap_impact cgi
LEFT JOIN github_effort_estimates gh ON gh.issue_label = 'corpus-expansion'
UNION ALL
SELECT
  'UX Friction' as improvement_area,
  ufi.affected_sessions,
  10.0 as estimated_nps_lift_pts,
  COALESCE(gh.avg_effort_weeks, 2.5) as estimated_effort_weeks,
  ROUND(ufi.affected_sessions / COALESCE(gh.avg_effort_weeks, 2.5), 1) as roi_score
FROM ux_friction_impact ufi
LEFT JOIN github_effort_estimates gh ON gh.issue_label = 'ux-improvement'
ORDER BY roi_score DESC;`,
      },
    ],
    tableData: {
      title: "Prioritized Product Improvements - Coverage Gaps & UX Friction (Top 5)",
      columns: [
        { key: "priority", label: "#", sortable: true },
        { key: "improvement", label: "Product Improvement", sortable: false },
        { key: "addressesRootCause", label: "Addresses", sortable: false },
        { key: "impactedSessions", label: "Sessions", sortable: true },
        { key: "estimatedNPSLift", label: "Est. NPS Lift", sortable: true },
        { key: "effort", label: "Effort", sortable: false },
      ],
      rows: [
        {
          priority: 1,
          improvement: "Expand legal corpus: Add missing 2023-2024 jurisprudence (Droit Social, Fiscal, Penal)",
          addressesRootCause: "Coverage Gap",
          impactedSessions: 38,
          estimatedNPSLift: "+15-20 pts",
          effort: "Medium (4-6 weeks)",
        },
        {
          priority: 2,
          improvement: "Implement saved search history & query suggestions (reduce re-typing, enable quick re-runs)",
          addressesRootCause: "UX Friction",
          impactedSessions: 31,
          estimatedNPSLift: "+8-12 pts",
          effort: "Low (2-3 weeks)",
        },
        {
          priority: 3,
          improvement:
            "Redesign search results page: Clearer result hierarchy, improved preview snippets, better visual scanning",
          addressesRootCause: "UX Friction",
          impactedSessions: 31,
          estimatedNPSLift: "+10-14 pts",
          effort: "Medium (5-6 weeks)",
        },
        {
          priority: 4,
          improvement:
            "Simplify domain filter UI: Reduce overwhelm with smart defaults, collapsible categories, filter presets",
          addressesRootCause: "UX Friction",
          impactedSessions: 31,
          estimatedNPSLift: "+6-10 pts",
          effort: "Low (3-4 weeks)",
        },
        {
          priority: 5,
          improvement:
            "Add 'missing content request' workflow: Allow users to request specific jurisprudence/doctrine not in corpus",
          addressesRootCause: "Coverage Gap",
          impactedSessions: 38,
          estimatedNPSLift: "+5-8 pts",
          effort: "Low (2-3 weeks)",
        },
      ],
    },
    actions: [
      {
        id: "create-jira-tickets",
        label: "Create JIRA Tickets",
        icon: "List",
        type: "export",
        variant: "default",
      },
      {
        id: "export-roadmap",
        label: "Export to Product Roadmap",
        icon: "Download",
        type: "export",
        variant: "outline",
      },
      {
        id: "schedule-review",
        label: "Schedule PM Review Meeting",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
    ],
  },

  // Exchange 1: Create digest from NPS analysis
  "create a digest from this nps analysis": {
    content:
      "Perfect! I've created an **NPS Analysis - Monthly Report** digest based on our analysis. The digest includes your executive summary, key metrics, trend analysis, and root cause findings. Review the preview below and let me know if you'd like to add anything.",
    type: "text",
    actions: [
      {
        id: "preview-digest",
        label: "Preview Digest",
        icon: "Eye",
        type: "view",
        variant: "default",
      },
      {
        id: "edit-schedule",
        label: "Edit Schedule",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
      {
        id: "activate-digest",
        label: "Activate Digest",
        icon: "Play",
        type: "schedule",
        variant: "outline",
      },
    ],
  },

  // Exchange 2: Add priority actions to digest
  "add the priority actions to the digest": {
    content:
      "Done! I've added the **Path to Recovery** section and **Top 3 Priority Actions** table to your digest. These actions address 83.2% of detractor complaints. Your digest is now complete and ready to activate with monthly delivery.",
    type: "text",
    actions: [
      {
        id: "preview-full-digest",
        label: "Preview Full Digest",
        icon: "Eye",
        type: "view",
        variant: "default",
      },
      {
        id: "activate-digest-final",
        label: "Activate Digest",
        icon: "Play",
        type: "schedule",
        variant: "default",
      },
      {
        id: "schedule-delivery",
        label: "Schedule Delivery",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
    ],
  },
};
