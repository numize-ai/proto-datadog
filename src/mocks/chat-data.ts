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
    id: "datadog-nps-1",
    text: "Diagnose low NPS drivers from Datadog org sessions (detractors, last month)",
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
  // Datadog NPS Analysis Conversation Flow
  "diagnose low nps drivers from datadog org sessions (detractors, last month)": {
    content:
      "I've analyzed **1,247 user verbatims from last month** (NPS detractor comments, support tickets, and CSM notes). The analysis reveals three dominant pain pillars driving low NPS: **1) High & Unpredictable Costs** (68% of detractor feedback), **2) Product Complexity & Steep Learning Curve** (54%), and **3) Aggressive Sales & Poor Support Experience** (31%). Let me break down the sentiment analysis:",
    type: "table",
    dataSources: [
      {
        id: "customer-feedback",
        name: "Customer Feedback & Sentiment",
        icon: "/dbt.png",
        tablesUsed: ["feedback.nps_responses", "support.tickets", "sales.csm_notes", "external.reviews"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Collect and aggregate detractor feedback",
        description: "Gather NPS responses (score < 7), support tickets, and CSM notes from last month",
        status: "completed",
        dataSource: "Customer Feedback & Sentiment",
        sqlQuery: `WITH detractor_feedback AS (
  SELECT
    response_id,
    customer_id,
    nps_score,
    comment_text,
    'nps_survey' as source,
    response_date as feedback_date
  FROM feedback.nps_responses
  WHERE response_date >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
    AND response_date < DATE_TRUNC('month', CURRENT_DATE)
    AND nps_score < 7
    AND comment_text IS NOT NULL
  UNION ALL
  SELECT
    ticket_id,
    customer_id,
    NULL as nps_score,
    ticket_description,
    'support_ticket' as source,
    created_at as feedback_date
  FROM support.tickets
  WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
    AND sentiment_score < 0.3
  UNION ALL
  SELECT
    note_id,
    customer_id,
    NULL as nps_score,
    note_content,
    'csm_note' as source,
    created_at as feedback_date
  FROM sales.csm_notes
  WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
    AND note_type = 'detractor_feedback'
)
SELECT * FROM detractor_feedback
ORDER BY feedback_date DESC;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Apply semantic analysis to categorize themes",
        description: "Use LLM to read each verbatim and categorize into pain pillars (cost, complexity, sales/support)",
        status: "completed",
      },
      {
        id: "step3",
        step: 3,
        title: "Extract representative quotes for each theme",
        description: "Identify the most impactful and representative customer quotes that exemplify each pain pillar",
        status: "completed",
      },
      {
        id: "step4",
        step: 4,
        title: "Analyze patterns across customer segments",
        description:
          "Identify whether pain pillars vary by customer segment (startup, mid-market, enterprise) and ARR band",
        status: "completed",
      },
      {
        id: "step5",
        step: 5,
        title: "Calculate theme prevalence and severity",
        description:
          "Quantify how frequently each pain pillar appears and correlate with NPS score severity and churn risk",
        status: "completed",
      },
    ],
    tableData: {
      title: "Detractor Feedback Analysis - Pain Pillar Distribution",
      columns: [
        { key: "theme", label: "Pain Pillar", sortable: true },
        { key: "percentage", label: "% of Detractor Feedback", sortable: true },
        { key: "severity", label: "Severity", sortable: true },
        { key: "example", label: "Representative Quote", sortable: false },
      ],
      rows: [
        {
          theme: "High & Unpredictable Costs",
          percentage: "68%",
          severity: "Critical",
          example: '"Our Datadog bill is insane, basically as much as our infra. Costs jump without us changing much."',
        },
        {
          theme: "Complexity & Steep Learning Curve",
          percentage: "54%",
          severity: "High",
          example:
            '"Incredibly powerful but the UI is overwhelming. We spend weeks wiring things up and still don\'t have dashboards non-experts can use."',
        },
        {
          theme: "Aggressive Sales & Poor Support",
          percentage: "31%",
          severity: "High",
          example:
            '"Sales spammed us for weeks, and when we had a billing issue, support just tried to close the ticket instead of owning it."',
        },
      ],
    },
    actions: [
      {
        id: "view-detractor-feedback",
        label: "View All Detractor Comments",
        icon: "Eye",
        type: "view",
        variant: "default",
      },
      {
        id: "export-sentiment-analysis",
        label: "Export Sentiment Analysis",
        icon: "Download",
        type: "export",
        variant: "outline",
      },
    ],
  },

  "what are the main root causes for the detractors?": {
    content:
      "Based on the sentiment analysis, the three pain pillars break down into more specific sub-themes. Let me show you the detailed breakdown of how customers describe each pain point and what's driving the frustration:",
    type: "table",
    dataSources: [
      {
        id: "customer-feedback",
        name: "Customer Feedback & Sentiment",
        icon: "/dbt.png",
        tablesUsed: ["feedback.nps_responses", "support.tickets", "sales.csm_notes", "external.reviews"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Break down cost-related complaints",
        description:
          "Use LLM to analyze verbatims tagged as 'cost' and identify specific sub-themes (bill shock, pricing opacity, absolute cost level, custom metrics charges)",
        status: "completed",
      },
      {
        id: "step2",
        step: 2,
        title: "Break down complexity complaints",
        description:
          "Use LLM to analyze verbatims tagged as 'complexity' and identify specific sub-themes (UI overwhelm, steep learning curve, configuration difficulty, query language complexity)",
        status: "completed",
      },
      {
        id: "step3",
        step: 3,
        title: "Break down sales/support complaints",
        description:
          "Use LLM to analyze verbatims tagged as 'sales_support' and identify specific sub-themes (aggressive tactics, ticket closure issues, poor billing support, inconsistent information)",
        status: "completed",
      },
    ],
    tableData: {
      title: "Detailed Root Cause Breakdown - Sub-themes Within Each Pain Pillar",
      columns: [
        { key: "pillar", label: "Pain Pillar", sortable: true },
        { key: "subTheme", label: "Specific Sub-Theme", sortable: true },
        { key: "percentage", label: "% of Comments", sortable: true },
        { key: "example", label: "Representative Quote", sortable: false },
      ],
      rows: [
        {
          pillar: "High & Unpredictable Costs",
          subTheme: "Bill Shock / Unpredictability",
          percentage: "42%",
          example: '"Costs jumped 3x in one month with minimal usage changes. We had no warning."',
        },
        {
          pillar: "High & Unpredictable Costs",
          subTheme: "Pricing Model Opacity",
          percentage: "38%",
          example:
            '"The pricing page is incomprehensible. Custom metrics, indexed logs, dual billing - it\'s impossible to forecast."',
        },
        {
          pillar: "High & Unpredictable Costs",
          subTheme: "Absolute Cost Level",
          percentage: "34%",
          example: '"Our Datadog bill is as expensive as our entire AWS infrastructure. That feels wrong."',
        },
        {
          pillar: "Complexity & Learning Curve",
          subTheme: "UI Overwhelm",
          percentage: "31%",
          example: '"The interface is incredibly dense. Too many tabs, options, and views. New users are lost."',
        },
        {
          pillar: "Complexity & Learning Curve",
          subTheme: "Configuration Difficulty",
          percentage: "28%",
          example: '"It takes weeks to set up basic dashboards and monitors. Not self-serve at all."',
        },
        {
          pillar: "Complexity & Learning Curve",
          subTheme: "Query Language Complexity",
          percentage: "22%",
          example: '"The log query DSL is powerful but cryptic. We need a dedicated person just to write queries."',
        },
        {
          pillar: "Sales & Support Issues",
          subTheme: "Aggressive Sales Tactics",
          percentage: "18%",
          example:
            '"Sales reps spammed us daily with cold emails and calls. Felt more like a hard sell than a partnership."',
        },
        {
          pillar: "Sales & Support Issues",
          subTheme: "Support Closing Tickets",
          percentage: "14%",
          example:
            '"We opened a billing question and support marked it resolved without actually helping. Just wanted it off their queue."',
        },
        {
          pillar: "Sales & Support Issues",
          subTheme: "Inconsistent Information",
          percentage: "11%",
          example:
            "\"Sales told us one price, then the bill was 40% higher. When we asked, they said 'custom metrics weren't included'.\"",
        },
      ],
    },
    actions: [
      {
        id: "view-cost-examples",
        label: "View All Cost Complaints",
        icon: "DollarSign",
        type: "view",
        variant: "default",
      },
      {
        id: "export-theme-breakdown",
        label: "Export Theme Breakdown",
        icon: "Download",
        type: "export",
        variant: "outline",
      },
    ],
  },

  "show me specific examples of cost complaints": {
    content:
      "I've extracted 15 specific examples of observability coverage gaps from the 38 affected detractor sessions. These represent actual user queries that returned zero or highly irrelevant results because telemetry (logs, traces, metrics, RUM) is missing or incomplete for key services.",
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
        title: "Extract failed observability search queries",
        description:
          "Collect queries with zero results from detractor sessions that indicate missing telemetry or uninstrumented services",
        status: "completed",
        dataSource: "Product Analytics",
        sqlQuery: `SELECT
  se.session_id,
  se.query_text,
  se.product_area,      -- 'Logs', 'APM', 'RUM', 'Infrastructure'
  se.timestamp,
  se.results_count,
  qi.inferred_intent,
  qi.expected_signal_type  -- e.g. 'trace', 'log', 'metric', 'rum_event'
FROM analytics.search_events se
LEFT JOIN analytics.query_intent qi ON se.search_id = qi.search_id
WHERE se.session_id IN (/* Detractor IDs with coverage gaps */)
  AND se.results_count = 0
ORDER BY se.timestamp;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Categorize gaps by product area",
        description:
          "Group missing telemetry by product area to identify systematic coverage gaps (e.g., APM-only, Logs missing, no RUM)",
        status: "completed",
        dataSource: "Product Analytics",
        sqlQuery: `SELECT
  qi.user_intent_category,
  se.product_area,
  COUNT(DISTINCT se.session_id) as affected_sessions,
  STRING_AGG(DISTINCT se.query_text, '", "' ORDER BY se.timestamp LIMIT 3) as example_queries,
  qi.expected_signal_type
FROM analytics.search_events se
LEFT JOIN analytics.query_intent qi ON se.search_id = qi.search_id
WHERE se.results_count = 0
  AND se.session_id IN (/* Detractor IDs with coverage gaps */)
GROUP BY qi.user_intent_category, se.product_area, qi.expected_signal_type
ORDER BY affected_sessions DESC, se.product_area;`,
      },
    ],
    tableData: {
      title: "Observability Coverage Gap Examples (Top 15 Intent Patterns)",
      columns: [
        { key: "userIntent", label: "User Intent", sortable: false },
        { key: "exampleQueries", label: "Example Queries", sortable: false },
        { key: "sessions", label: "Affected Sessions", sortable: true },
        { key: "domain", label: "Product Area", sortable: true },
      ],
      rows: [
        {
          userIntent: "Investigate p95 latency spike on checkout service in eu-west-3",
          exampleQueries:
            '"service:checkout env:prod latency:p95>500ms", "trace_search checkout eu-west-3", "apm checkout latency spike"',
          sessions: 8,
          domain: "APM",
        },
        {
          userIntent: "Find 5xx errors from payment provider in last 30 minutes",
          exampleQueries:
            '"service:payment-gateway status:500 @http.url:/charge", "payment-gateway 5xx env:prod", "error:payment-gateway timeout"',
          sessions: 6,
          domain: "Logs",
        },
        {
          userIntent: "Correlate frontend JS errors with backend 5xx for checkout page",
          exampleQueries:
            '"rum errors checkout AND 5xx backend", "front-end error checkout correlated with api-gateway", "js error + 500 checkout"',
          sessions: 5,
          domain: "RUM",
        },
        {
          userIntent: "See all traces for slow database queries on orders service",
          exampleQueries:
            '"service:orders db.statement:SELECT ... duration:>1s", "orders db latency traces", "apm db slow queries orders"',
          sessions: 4,
          domain: "APM",
        },
        {
          userIntent: "Check host metrics for CPU saturation on Kafka cluster",
          exampleQueries: '"host:kafka-* cpu.utilization", "kafka cpu > 90%", "kafka brokers metrics cpu saturation"',
          sessions: 4,
          domain: "Infrastructure",
        },
        {
          userIntent: "View errors by tenant for multi-tenant API",
          exampleQueries:
            '"service:multi-tenant-api tenant_id:* error", "tenant errors per customer", "5xx by tenant-id"',
          sessions: 3,
          domain: "Logs",
        },
        {
          userIntent: "Follow end-to-end trace from mobile app to backend",
          exampleQueries:
            '"trace from mobile app to api-gateway", "end-to-end trace mobile checkout", "rum to apm trace correlation"',
          sessions: 3,
          domain: "APM",
        },
        {
          userIntent: "See uptime SLO breaches for checkout service",
          exampleQueries: '"SLO breaches service:checkout", "checkout SLO error budget burn", "error_budget checkout"',
          sessions: 3,
          domain: "SLOs",
        },
        {
          userIntent: "Analyze synthetic test failures by region",
          exampleQueries:
            '"synthetics failures by region", "checkout synthetic tests eu-west failure", "synthetic monitor errors summary"',
          sessions: 2,
          domain: "Synthetics",
        },
        {
          userIntent: "Check logs for specific customer id during incident",
          exampleQueries:
            '"@customer.id:1234 error", "logs customer_id:1234 incident", "customer 1234 checkout failure logs"',
          sessions: 2,
          domain: "Logs",
        },
        {
          userIntent: "Compare error rate before/after deploy for a given service",
          exampleQueries:
            '"deploy:abc123 error rate diff", "errors before and after deploy orders-service", "orders error_rate by deploy_id"',
          sessions: 2,
          domain: "APM",
        },
        {
          userIntent: "See RUM performance by page for checkout funnel",
          exampleQueries:
            '"rum performance page:/checkout funnel", "checkout LCP and FCP per step", "rum web vitals checkout funnel"',
          sessions: 2,
          domain: "RUM",
        },
        {
          userIntent: "List services without any monitors configured",
          exampleQueries:
            '"services without monitors", "unmonitored apm services", "no monitors configured services list"',
          sessions: 2,
          domain: "Monitors",
        },
        {
          userIntent: "See which logs indexes are ingesting most data",
          exampleQueries: '"logs index ingestion by volume", "top log indexes by GB", "which index is most expensive"',
          sessions: 1,
          domain: "Logs",
        },
        {
          userIntent: "Find high-cardinality tags causing cost issues",
          exampleQueries: '"high cardinality tags", "top cardinality tags by series", "costly tags list"',
          sessions: 1,
          domain: "Metrics",
        },
      ],
    },
    actions: [
      {
        id: "export-missing-queries",
        label: "Export All Missing Telemetry Queries",
        icon: "Download",
        type: "export",
        variant: "outline",
      },
      {
        id: "create-content-backlog",
        label: "Create Instrumentation Backlog",
        icon: "List",
        type: "export",
        variant: "default",
      },
    ],
  },

  "tell me more about the steep learning curve and complexity issues": {
    content:
      "I've analyzed **54% of detractor verbatims** that mention complexity and learning curve problems. The patterns show users struggling with overwhelming UI, difficult configuration, and cryptic query languages. Here are the specific complexity issues broken down by theme:",
    type: "table",
    dataSources: [
      {
        id: "customer-feedback",
        name: "Customer Feedback & Sentiment",
        icon: "/dbt.png",
        tablesUsed: ["feedback.nps_responses", "support.tickets", "sales.csm_notes"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Analyze complexity-related verbatims",
        description:
          "Use LLM to analyze verbatims mentioning complexity, learning curve, configuration difficulty, and UI overwhelm to extract specific patterns and examples",
        status: "completed",
      },
    ],
    tableData: {
      title: "Complexity & Learning Curve Issues (54% of detractor verbatims)",
      columns: [
        { key: "complexityType", label: "Complexity Issue", sortable: false },
        { key: "percentage", label: "% Mentioning", sortable: true },
        { key: "customerQuote", label: "Representative Customer Quote", sortable: false },
        { key: "impact", label: "Impact on Usage", sortable: false },
      ],
      rows: [
        {
          complexityType: "Overwhelming UI & Information Density",
          percentage: "31%",
          customerQuote:
            '"The interface is incredibly dense. Too many tabs, dropdowns, options everywhere. New team members take weeks just to learn where things are."',
          impact: "Limits adoption beyond dedicated SRE team; non-technical stakeholders avoid using Datadog",
        },
        {
          complexityType: "Difficult Initial Configuration",
          percentage: "28%",
          customerQuote:
            '"Setting up our first useful dashboard took 3 weeks and constant Slack messages to our CSM. Not self-serve at all."',
          impact: "Delays time-to-value; requires significant engineering time for basic setup",
        },
        {
          complexityType: "Cryptic Query Languages (Logs, Metrics, APM)",
          percentage: "22%",
          customerQuote:
            '"The log query DSL is powerful but cryptic. We need a dedicated person who understands the syntax to write any useful queries."',
          impact: "Creates bottleneck; only 1-2 people per team can write effective queries",
        },
        {
          complexityType: "Steep Learning Curve for Advanced Features",
          percentage: "18%",
          customerQuote:
            '"We pay for APM and RUM but barely use them because the learning curve is so steep and documentation assumes expert-level knowledge."',
          impact: "Underutilization of paid features; customers don't realize full value",
        },
        {
          complexityType: "Lack of Guided Onboarding / Templates",
          percentage: "15%",
          customerQuote:
            '"Datadog dropped us into an empty dashboard with no guidance. Would be great to have templates or guided setup for common use cases."',
          impact: "New users struggle to get started; high early-stage frustration",
        },
      ],
    },
    actions: [
      {
        id: "view-complexity-verbatims",
        label: "View All Complexity Verbatims",
        icon: "MessageSquare",
        type: "view",
        variant: "default",
      },
      {
        id: "export-complexity-analysis",
        label: "Export Complexity Analysis",
        icon: "Download",
        type: "export",
        variant: "outline",
      },
    ],
  },

  "give me top 3 prioritized actions to recover nps": {
    content:
      "Based on the three pain pillars analysis, here are the top 3 prioritized actions to recover NPS. These directly address **high/unpredictable costs** (68% of detractors), **product complexity** (54%), and **sales/support experience** (31%). Each action has a clear owner, timeline, and measurable impact.",
    type: "table",
    dataSources: [
      {
        id: "customer-feedback",
        name: "Customer Feedback & Sentiment",
        icon: "/dbt.png",
        tablesUsed: ["feedback.nps_responses", "support.tickets", "sales.csm_notes"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Map pain pillars to actionable initiatives",
        description:
          "Use LLM to analyze the three pain pillars (costs 68%, complexity 54%, sales/support 31%) and identify the most impactful action for each that addresses root causes",
        status: "completed",
      },
      {
        id: "step2",
        step: 2,
        title: "Prioritize by impact and feasibility",
        description:
          "Use LLM to rank actions by expected NPS lift, percentage of detractors addressed, implementation timeline, and resource requirements",
        status: "completed",
      },
    ],
    tableData: {
      title: "Top 3 Priority Actions to Recover NPS",
      columns: [
        { key: "priority", label: "Priority", sortable: false },
        { key: "action", label: "Recommended Action", sortable: false },
        { key: "owner", label: "Primary Owner", sortable: false },
        { key: "timeline", label: "Timeline", sortable: false },
        { key: "impact", label: "Expected Impact", sortable: false },
      ],
      rows: [
        {
          priority: "🔴 URGENT",
          action:
            "Introduce clear cost guardrails and transparent usage-to-bill mapping (budgets, alerts, and simpler pricing explanations).",
          owner: "Pricing & Product",
          timeline: "Design in 1 sprint, rollout in next billing cycle",
          impact:
            "Directly addresses 68% of detractor complaints around high/unpredictable costs; reduces bill shock and restores financial trust.",
        },
        {
          priority: "🟠 HIGH",
          action:
            "Ship opinionated 'quick start' experience and templates for core monitoring use cases to reduce perceived complexity.",
          owner: "Product & UX",
          timeline: "2–3 sprints for initial templates; iterate monthly",
          impact:
            "Targets 54% of detractors who struggle to configure Datadog; makes value visible faster for new teams and non-experts.",
        },
        {
          priority: "🟠 HIGH",
          action:
            "Rewrite sales and support playbooks to emphasize transparency, proactive communication on billing, and problem ownership.",
          owner: "Sales, CS & Support",
          timeline: "Pilot within 1 quarter; full rollout the next",
          impact:
            "Addresses 31% of detractor feedback on aggressive sales and poor support; critical for rebuilding long-term relationship trust.",
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
      "Perfect! I've created an **NPS Analysis - Datadog Experience (Costs, Complexity, Support)** digest based on the verbatim analysis. The digest includes:\n\n• Executive Summary\n• NPS Overview with trend (6-month view)\n• Understanding the Decline section\n• Root Cause Breakdown table (3 pain pillars with examples)\n• Deep Dive Analysis\n• Key Findings Summary\n\nReview the preview on the right and let me know if you'd like to add anything.",
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
      "Done! I've added two new sections to your digest:\n\n• **Path to Recovery** - Strategic framing for the coordinated plan across Pricing, Product, and GTM/Support\n• **Top 3 Priority Actions** table - Specific actions with owners, timelines, and expected impact\n\nThese actions directly address the three pain pillars:\n- 🔴 Cost guardrails (68% of detractors)\n- 🟠 Quick start templates (54% complexity complaints)\n- 🟠 Sales/support playbook rewrite (31% relationship issues)\n\nYour digest is now complete and ready to activate with monthly delivery.",
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
