# 📘 **Numize – Frontend Prototype Specification**

Numize is an AI-native analytics platform enabling business teams (Marketing, Product, Ops…) to **access, understand, and act on their data** without depending on analysts — while ensuring full governance and trust for the Data Team.

## Prototype Scope

**This is a frontend-only prototype** built with Next.js 15, React 19, and Tailwind CSS v4. All features are fully functional in the UI with comprehensive mock data, but **do not include backend integrations, real database connections, or actual AI/ML services**.

The prototype demonstrates **three core features**, aligned with the **three core personas**:

1. **Converse & Analyze** — Natural-language analytics interface with charts, tables, and reasoning
2. **Weekly Digest** — Configurable recurring insights with block-based configuration
3. **Semantic Exposure** — Data team tools to expose semantic slices and configure data sources

---

# 🎯 **1. Goals**

### Primary Goal

Enable business teams to autonomously go from **question → insight → action** within minutes, using AI and governed data.

### Secondary Goals

* Reduce dependence on analysts for ad-hoc analysis
* Provide proactive insights (not just reactive queries)
* Provide full transparency & governance for data teams
* Offer extensibility via **MCP servers** for third-party actions

---

# 👤 **2. Personas**

## **Head of X (Marketing, Product, Ops) – Primary Decision Maker**

* Wants strategic understanding
* Prioritizes autonomy & speed
* Needs weekly insights, anomaly explanations, and ability to take actions directly

## **Business Ops (Growth Ops, Product Ops, Revenue Ops) – Power Users**

* Execute deep investigations
* Produce segments, reports, analyses
* Must be able to take actions (create campaigns, update CRM audiences…)

## **Data Team (Analytics Engineers, Data Engineers) – Governance Layer**

* Own dbt project + semantic layer
* Want strict governance, auditability, and control
* Expose semantic slices to each team
* Ensure queries are correct and cost-efficient
* Manage data sources, privacy, and lineage

---

# 🧱 **3. Core MVP Features**

---

# ⭐ **Feature 1 — Converse & Analyze (Chat Interface)**

### "Ask anything, understand everything, see transparent reasoning."

This is the primary interface for **Head of X** and **Business Ops**.

**Implementation Status:** ✅ **Fully Implemented** (UI with mock data)

---

## 1.1 Natural-Language Conversational Analytics

Users can ask questions via the chat interface at `/chat`:

* "How many signups did we get last week by country?"
* "Explain the drop in conversion rate in Italy."
* "Show me the product usage patterns of accounts at risk."
* "Give me a list of companies that used cards but not transfers in the last 30 days."

### Implemented Features

* **Multi-turn conversations** with full history
* **Response types**:
  * Charts (area, bar, line, pie, funnel) using Recharts
  * Tables with pagination
  * Text summaries and insights
* **Transparent reasoning panel** showing AI thought process with multi-step reasoning
* **SQL editor mode** with syntax highlighting and table preview
* **Data source badges** indicating which connectors were used
* **Contextual suggestions** filtered by:
  * Connected data sources
  * Single-source vs multi-source capabilities
  * Reconciliation requirements
* **Confidence indicators** on insight blocks
* **Conversation history** with sidebar navigation
* **Intelligent fallback responses** when no exact match found

### Mock Data

1,340 lines of mock conversation data including:
* 50+ suggested questions across different domains
* Sample responses with charts, tables, and reasoning
* Multi-source query examples
* Campaign attribution queries

---

## 1.2 Deep Investigation Mode

**Implementation Status:** ✅ **Implemented via Split-Screen**

Users can investigate insights through:

* **Split-screen chat on digest blocks** - Click "Deep dive" on any digest block to open chat interface
* **Campaign drill-down pages** (`/campaigns/[id]`) showing:
  * Performance metrics (spend, ROAS, CAC)
  * Daily spend trends
  * Attributed contacts and deals
  * Conversion funnel visualization
* **SQL editor with table preview** for data exploration
* **Reasoning panel** showing step-by-step analysis
* **Follow-up questions** in stateful conversations

The split-screen view allows users to:
* Ask follow-ups about specific insights
* Drill into sub-segments
* Compare to historical periods
* View related data

---

## 1.3 Action Buttons & Quick Actions

**Implementation Status:** ⚠️ **UI Only** (no backend execution)

Each chat response includes action buttons:
* **Create alert** - Set up monitoring for metrics
* **Export to Sheets** - Dialog for Google Sheets sync (UI only)
* **Schedule report** - Configure recurring delivery
* **View details** - Expand full data view

**Note:** MCP server integration architecture is mentioned in onboarding but not implemented in this prototype. The UI shows where actions would trigger, but actual execution would require backend integration.

---

## 1.4 Digest Creation from Chat

**Implementation Status:** ✅ **Fully Implemented**

A unique feature: users can create digests conversationally.

When the chat detects digest creation intent:
* Automatically switches to **split-screen digest preview** mode
* Shows real-time digest configuration on the right
* User can refine via conversation on the left
* "Save digest" button to persist configuration

This creates a seamless flow from question → insight → automated reporting.

---

# ⭐ **Feature 2 — Weekly Digest (Block-Based Reporting)**

### "Your AI-generated Monday report. Structured, configurable, interactive."

For **Heads of X** and **Business Ops**.

**Implementation Status:** ✅ **Fully Implemented** (UI with mock execution data)

---

## 2.1 Digest Structure (Blocks)

The weekly digest is composed of **configurable blocks**, similar to Notion.

### Implemented Block Types

1. **KPI Overview Block**
   * Grid layouts (2, 3, or 4 columns)
   * Trend indicators (↑↓ with percentages)
   * Comparison periods (previous period/year)
   * Optional previous values display

2. **Chart Block**
   * Types: Bar, Line, Area, Pie, Funnel
   * Configurable: legend, data labels, color schemes, height
   * Recharts-based visualization

3. **Table Block**
   * Paginated data tables
   * Configurable: page size, sorting, filtering, density
   * Optional row numbers

4. **Insight Block**
   * AI-generated insights with confidence scores
   * Configurable: insight types, confidence threshold, max insights
   * Recommendations toggle

5. **Text Block**
   * Custom text content
   * Font size, alignment, style options

6. **Funnel Performance Block**
   * Conversion funnel visualization
   * Step-by-step metrics
   * Conversion rate calculations

7. **Product Usage Block**
   * Feature usage metrics
   * Activity indicators
   * Usage trends

Each block includes:
* Block-specific configuration panel
* Visual preview
* "Deep dive" button to open chat
* Drag reordering (up/down arrows)

---

## 2.2 Digest Management

**Pages Implemented:**
* `/digests` - List all digests with filters
* `/digests/new` - Create new digest with block builder
* `/digests/[id]` - View digest execution
* `/digests/[id]/edit` - Edit digest configuration

**Configuration Options:**
* **Recurrence**: Daily, Weekly, Monthly
* **Delivery**: Email, In-app, Both
* **Active/Inactive** toggle
* **Block ordering** with drag controls
* **Alert thresholds** for KPI blocks
* **Block-specific settings** via configuration panels

**Digest Features:**
* Inline title editing
* Manual execution
* Preview before saving
* Last executed timestamp
* Execution history

**Mock Data:** 1,688 lines including:
* 8 sample digests across different domains
* Block configurations for all block types
* Mock execution results

---

## 2.3 Split Screen Mode: Digest + Chat

**Implementation Status:** ✅ **Fully Implemented**

When viewing a digest:

* Click **"Deep dive"** on any block
* Opens **ChatDigestSplitView** component
* Layout: `| Chat UI (left) | Digest Block (right) |`
* Chat context initialized with block-specific data

Users can:
* Ask follow-up questions about specific blocks
* Drill into sub-segments
* Request alternative visualizations
* Compare to other periods
* All while keeping the digest block visible

This is also used during conversational digest creation, where the digest preview updates in real-time as users describe what they want.

---

## 2.4 Anomaly Detection & Insights

**Implementation Status:** ⚠️ **UI Only** (no detection algorithm)

**Insight Blocks** display:
* Anomaly descriptions with natural language explanations
* Confidence scores (e.g., "Confidence: 0.74")
* Probable drivers
* Impact analysis
* Suggested next steps

Example mock output:
> "Traffic down –17% week-over-week in FR. Likely due to paid search impressions dropping by 24% (confidence 0.78)."

**What's Implemented:**
* UI for displaying insights and anomalies
* Confidence score visualization
* Configurable thresholds
* Alert thresholds on KPI blocks

**What's Not Implemented:**
* Actual anomaly detection algorithm
* Real-time monitoring
* Automated alert triggering
* Statistical analysis engine

The UI demonstrates how anomalies would be surfaced, but detection would require backend ML services.

---

# ⭐ **Feature 3 — Semantic Exposure & Data Governance Tools**

### "The Data Team defines the governed data that business teams can safely use."

This is for the **Data Team**.

**Implementation Status:** ⚠️ **Partially Implemented** (onboarding + data source UI + dbt dictionary)

---

## 3.1 Semantic Slice Management

**Implementation Status:** ✅ **Onboarding UI Implemented**

During the 4-step onboarding wizard (`/onboard`), data teams configure:

### Step 1: Data Warehouse Configuration
* Warehouse types: Snowflake, BigQuery, Postgres, Redshift
* Connection testing (simulated)
* Credential management

### Step 2: dbt Project Import
* Upload manifest.json or connect via Git
* Model selection and validation
* Import dbt artifacts

### Step 3: Semantic Layer Configuration
Data team exposes **semantic slices** to teams:
* **Product Slice**
* **Marketing Slice**
* **Ops Slice**
* **Finance Slice**

Each slice configuration includes:
* Metrics selection (from dbt metrics)
* Dimensions selection
* Model assignment
* Entity definitions
* Visual interface for drag-and-drop assignment

### Step 4: AI Agent Tools
* External tool connections: Brevo, HubSpot, Zapier, n8n
* OAuth simulation
* Connection testing
* MCP server mention (not implemented)

**What's Implemented:**
* Full onboarding wizard UI
* Semantic slice configuration interface
* Team-based access model
* Visual model/metric assignment

**What's Not Implemented:**
* Runtime access control enforcement
* Row-level filtering
* Column-level permissions
* Actual warehouse credential storage

---

## 3.2 Data Source Configuration

**Implementation Status:** ✅ **UI Implemented** (`/data-sources`)

Data sources page shows:
* Connected warehouse (with connection status badge)
* dbt project information:
  * Number of models, metrics, dimensions
  * Last sync timestamp
  * Import status
* Semantic layer slices summary
* AI agent tools configuration
* Onboarding progress indicator

**Available Data Connectors** (10 connectors):
* Meta Ads, Google Ads, Stripe, HubSpot, Shopify
* Google Analytics 4, Google Sheets
* Pennylane (premium), QuickBooks (premium), Zendesk

**What's Implemented:**
* Data source management UI
* Connection status display
* Connector catalog
* Configuration forms (mock)

**What's Not Implemented:**
* Actual warehouse connections
* Real OAuth flows
* Credential encryption/storage
* API integrations

---

## 3.3 dbt Integration

**Implementation Status:** ✅ **Dictionary Browser Implemented** (`/dbt-dictionary`)

The dbt semantic dictionary provides:

**Metrics View:**
* Browse all dbt metrics
* View metric definitions (SQL - read-only)
* Add natural language synonyms
* See available dimensions for each metric
* Related metrics suggestions
* Filter by tags

**Models View:**
* Model lineage (upstream/downstream)
* Column metadata
* Data tests
* Model descriptions
* Freshness indicators

**Entities View:**
* Entity definitions
* Entity relationships
* Dimension assignments

**Additional Features:**
* Search across all semantic layer objects
* Export suggestions to dbt YAML (button, not functional)
* Tag filtering
* Comprehensive mock dbt semantic data (239 lines)

**What's Implemented:**
* Full dbt dictionary browser UI
* Synonym management interface
* Lineage visualization structure
* Metric/model/entity exploration

**What's Not Implemented:**
* Actual manifest.json parsing
* Real dbt API integration
* Auto-sync with dbt Cloud/Core
* SQL validation
* Actual YAML export

---

## 3.4 Review Workflow for AI-Generated Assets

**Implementation Status:** ❌ **Not Implemented**

The prototype does not include:
* SQL review queue
* KPI approval workflow
* Generated block review
* Segment approval process
* Correction feedback mechanism

**What Would Be Needed:**
* Review queue page
* Approve/reject workflow
* Feedback loop to AI model
* Access control enforcement based on reviews
* Audit log of approvals/rejections

This would be a key feature for production but is not demonstrated in the prototype.

---

# 🧪 **4. Prototype Acceptance Criteria**

### Conversational Analytics Interface ✅

* ✅ Chat interface renders all message types (text, charts, tables)
* ✅ Multi-turn conversations with history
* ✅ Suggested questions filter by connected data sources
* ✅ Reasoning panel shows AI thought process
* ✅ SQL editor mode with syntax highlighting
* ✅ Data source badges indicate connector usage
* ✅ Action buttons present (create alert, export, schedule)
* ✅ Fallback responses for unmatched queries
* ⚠️ Mock responses only (no real SQL generation)

### Weekly Digest ✅

* ✅ All 7 block types render correctly
* ✅ Block configuration panels work for each type
* ✅ Digest creation wizard functional
* ✅ Recurrence and delivery configuration works
* ✅ Deep dive split-screen mode functional
* ✅ Inline title editing works
* ✅ Block reordering (up/down) works
* ✅ Digest preview during conversational creation
* ⚠️ Mock execution data (no real scheduling/delivery)

### Semantic Layer / Data Team Tools ⚠️

* ✅ 4-step onboarding wizard complete
* ✅ Semantic slice configuration UI functional
* ✅ dbt dictionary browser with metrics/models/entities
* ✅ Synonym management for metrics
* ✅ Data source management page
* ✅ Connector catalog display
* ❌ No runtime access control enforcement
* ❌ No review workflow for AI-generated assets
* ⚠️ All data simulated (no real warehouse connections)

### Additional Features ✅

* ✅ Campaign attribution drill-down pages
* ✅ Query history tracking
* ✅ Responsive design (mobile, tablet, desktop)
* ✅ Loading states and error handling
* ✅ TypeScript strict mode throughout
* ✅ ESLint compliance
* ✅ No console errors or warnings

---

# 🔐 **5. Security Requirements**

* No raw PII exposed without approval
* Full audit logs
* Role-based access (Head of X, Ops, Data)
* Warehouse credentials stored via Secrets Manager
* Only dbt-governed models are accessible

---

# 🛠️ **6. Architecture Overview**

## Frontend (Implemented)

**Framework:**
* **Next.js 15** with App Router (not Pages Router)
* **React 19** with TypeScript strict mode
* **Tailwind CSS v4** for all styling
* **Framer Motion** for animations

**UI Component Library:**
* **shadcn/ui** (20 components) built on Radix UI primitives
* **Lucide React** for icons
* **Recharts** for data visualization
* **Class Variance Authority (CVA)** for type-safe variants

**State Management:**
* **Redux Toolkit** for global state (connectors, user preferences)
* React hooks for local component state
* Context API for providers only

**Key Pages:**
* `/` - Marketing landing page
* `/signin` - Authentication
* `/onboard` - 4-step onboarding wizard
* `/chat` - Conversational analytics
* `/digests` - Digest management
* `/digests/new` - Create digest
* `/digests/[id]` - View/edit digest
* `/data-sources` - Data source configuration
* `/dbt-dictionary` - dbt semantic browser
* `/campaigns/[id]` - Campaign attribution
* `/history` - Query history
* `/settings` - User settings

**Components:**
* 50+ feature-specific components
* 20+ shared UI components (shadcn/ui)
* Marketing components (Hero, Features, Testimonials, etc.)
* Digest blocks (7 block types)
* Chat components (messages, charts, tables, reasoning panel)
* Data source components (onboarding, configuration)

**Mock Data:**
* 6,659 lines across 15 data files
* Realistic data structures simulating production APIs
* Suggested queries, digest configurations, dbt metadata
* HubSpot contacts/deals, ad platform campaigns
* Attribution mappings, marketing metrics

**Custom Hooks:**
* useAsync, useAsyncFn - Async operation handling
* useQueryExecution - Execute queries (mocked)
* useQueryHistory - History management
* useSheetsSync - Google Sheets sync (UI only)

## Backend (Not Implemented - Planned)

The following would be needed for production:

**LLM Orchestration:**
* LangGraph or similar for agent workflows
* Prompt engineering and fine-tuning
* Reasoning step generation

**Data Layer:**
* SQL engine over semantic slices
* Query optimization and caching
* dbt manifest parsing and sync
* Warehouse connection management (Snowflake, BigQuery, Postgres, Redshift)

**Scheduling & Alerts:**
* Digest scheduler (cron-based)
* Anomaly detection service (statistical models)
* Alert delivery (email, Slack, etc.)

**Action Execution:**
* MCP server protocol implementation
* External tool integrations (Brevo, HubSpot, Zapier, n8n)
* OAuth flows
* Action audit logging

**Security & Governance:**
* Row-level security enforcement
* Column-level permissions
* Query auditing and logging
* Secrets management (credentials, API keys)

**APIs:**
* RESTful or GraphQL API for frontend
* WebSocket for real-time updates
* Authentication service (JWT, sessions)

## Shared Schemas (Partially Implemented)

**Implemented (TypeScript interfaces):**
* Message types (chat)
* Block types (digest)
* Connector configurations
* User preferences

**Would Be Needed:**
* Semantic object schemas (metrics, dimensions, entities)
* SQL request/response schemas
* Query execution schemas
* dbt artifact schemas
* MCP protocol schemas

---

# 🏁 **7. Prototype Summary**

This frontend prototype demonstrates the complete user experience for:

### **For Head of X**

* ✅ Ask questions via natural language chat
* ✅ Understand insights with transparent reasoning
* ✅ Receive configurable weekly digests with anomaly highlights
* ✅ See where actions would be triggered (UI only)
* ⚠️ Actual action execution requires backend integration

### **For Business Ops**

* ✅ Navigate conversational analytics interface
* ✅ Investigate insights via split-screen deep dive
* ✅ Explore campaign attribution with drill-down pages
* ✅ Configure digest blocks with advanced options
* ⚠️ Segment creation mentioned but not fully implemented
* ⚠️ Automation workflows shown in UI only

### **For Data Teams**

* ✅ Complete 4-step onboarding wizard
* ✅ Configure semantic slices by team
* ✅ Browse dbt semantic dictionary (metrics, models, entities)
* ✅ Manage data source connections (UI)
* ✅ Add synonyms to improve AI understanding
* ❌ Review workflow not implemented
* ⚠️ Access control configured but not enforced

## What's Been Built

**13 fully functional pages** with:
* Responsive design (mobile, tablet, desktop)
* Loading states and error handling
* TypeScript strict mode compliance
* ESLint compliance
* No console errors

**50+ feature-specific components** including:
* Chat interface with reasoning panel
* 7 digest block types with configuration
* Onboarding wizard
* dbt dictionary browser
* Campaign attribution views

**6,659 lines of realistic mock data** simulating:
* Conversational queries and responses
* Digest configurations and executions
* dbt semantic layer metadata
* Marketing platform data
* Attribution mappings

**Production-ready code quality:**
* Git hooks for linting, type checking, commit messages
* Conventional commits with Commitizen
* File size limits
* Unused dependency detection
* Path aliases for clean imports

## What's Not Built (Backend Requirements)

* Real database connections and query execution
* AI/ML services (LLM orchestration, anomaly detection)
* Authentication backend
* Digest scheduling and delivery
* MCP server protocol implementation
* OAuth flows for external tools
* Action execution layer
* Runtime access control enforcement
* Review workflows

## Vision Statement

> **Numize = AI-native analytics workflow: from question → insight → action, governed by data teams and powered by semantic slices.**

This prototype **proves the UX/UI** for this vision and provides a **strong foundation** for backend integration. All user flows have been designed, tested, and refined in a fully interactive environment.

## Next Steps to Production

1. **Backend Infrastructure**: Set up API layer, database, authentication
2. **LLM Integration**: Connect OpenAI/Anthropic APIs, implement LangGraph orchestration
3. **Data Warehouse Connections**: Implement real Snowflake/BigQuery/Postgres adapters
4. **dbt Integration**: Parse manifest.json, sync semantic layer
5. **Query Execution**: Build SQL generation and execution engine
6. **Scheduling**: Implement digest scheduler and delivery (email, in-app)
7. **MCP Protocol**: Implement action execution layer
8. **Security**: Add authentication, authorization, row-level security
9. **Monitoring**: Add error tracking, performance monitoring, query auditing
10. **Testing**: Add unit tests, integration tests, E2E tests

The prototype reduces production risk by validating:
* ✅ User flows and interaction patterns
* ✅ UI/UX design decisions
* ✅ Component architecture
* ✅ Data structure requirements
* ✅ Feature scope and prioritization
