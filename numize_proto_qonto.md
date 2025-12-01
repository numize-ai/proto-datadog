# 📘 **Numize – MVP PRD (Unified Across All Personas)**

Numize is an AI-native analytics platform enabling business teams (Marketing, Product, Ops…) to **access, understand, and act on their data** without depending on analysts — while ensuring full governance and trust for the Data Team.

The MVP focuses on **three core features**, aligned with the **three core personas**:

1. **Converse & Act** — Natural-language analytics + action execution
2. **Weekly Digest** — Configurable recurring insights with anomaly detection
3. **Semantic Exposure** — Data team tools to expose semantic slices and data sources

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

# ⭐ **Feature 1 — Converse & Act (Chat + Action Layer)**

### “Ask anything, understand everything, take action instantly.”

This is the primary interface for **Head of X** and **Business Ops**.

---

## 1.1 Natural-Language Conversational Analytics

Users can ask anything:

* “How many signups did we get last week by country?”
* “Explain the drop in conversion rate in Italy.”
* “Show me the product usage patterns of accounts at risk.”
* “Give me a list of companies that used cards but not transfers in the last 30 days.”

### Deliverables

* SQL generation via governed semantic slices
* Clear charts, tables, summaries
* Transparent reasoning (tables, fields, lineage)
* Confidence score for each answer
* Follow-up questions (stateful conversation)

---

## 1.2 Deep Investigation Mode

When the system surfaces an anomaly or unexpected pattern, users can type:

> “Deep dive on this”

and the system switches to **investigation mode**:

* Identify drivers
* Show correlations, hypotheses
* Explore segments
* Compare to historical periods
* Suggest actions

---

## 1.3 Actions via MCP Servers

This is the “AI → action” part of the platform.

Users can ask:

* “Create a customer segment of inactive users and sync it to Brevo as a mailing list.”
* “Push the top 200 high-intent leads to HubSpot.”
* “Create a Slack alert if this spike happens again.”

### Action layer powered by:

* **MCP servers** (Brevo, Hubspot, Salesforce, Slack, Notion…)
* AI agents generating action payloads
* Data lineage preserved

**Example:**

> “Create a mailing list with companies that visited the pricing page 3+ times.”

* AI generates SQL
* Segment preview
* User confirms
* MCP connector creates list in Brevo
* Returns confirmation + link

---

## 1.4 Reusable Segments & Actions

Every conversationally generated segment or action can be saved:

* “Save as Marketing Segment: High Intent Visitors”
* “Save as Action: Push to CRM audience”

This creates reusable internal knowledge building blocks.

---

# ⭐ **Feature 2 — Weekly Digest (Blocks + Deep Dive Engine)**

### “Your AI-generated Monday report. Structured, explainable, interactive.”

For **Heads of X** and **Business Ops**.

---

## 2.1 Digest Structure (Blocks)

The weekly digest is composed of **blocks**, similar to Notion:

### Block = Prompt + Agent + Data Source

Example blocks:

* **KPI Overview Block**
  Prompt: “Summarize last week’s marketing KPIs.”
  Agent: KPI interpreter
  Source: marts_marketing.*

* **Anomaly Detection Block**
  Prompt: “Detect anomalies >15% and explain likely causes.”
  Agent: Anomaly explainer
  Source: fct_events, dim_country, ad_spend tables

* **Funnel Performance Block**
  Prompt: “Analyze signup funnel steps and compare to last 8 weeks.”

* **Product Usage Block**
  Prompt: “Highlight features with unusual activity.”

Each block can render:

* Metric snapshot
* Trend charts
* Explanation
* Confidence score
* “Deep dive” CTA

---

## 2.2 Recurrence & Configuration

Users can configure:

* Recurrence (daily / weekly / monthly)
* KPI selection
* Data source selection
* Block layout ordering
* Email delivery vs in-app delivery

---

## 2.3 Split Screen Mode: Digest + Chat

When reading the digest, user can:

* Click **“Deep dive”** → brings chat UI on the left
* AI agent opens a conversation **specific to that block**
* Example:
  “Deep dive on Italian conversion drop” → starts a thread automatically

Split-screen interface:

```
| Chat UI (left) | Digest Block (right) |
```

User can then:

* Ask follow-ups
* Drill into sub-segments
* Generate actions (e.g., create audience, send alert, tag accounts)

---

## 2.4 Anomaly Detection & Quick Explanation

Each digest should automatically:

* Detect anomalies across core KPIs
* Provide:

  * Explanation
  * Probable driver
  * Impact analysis
  * Suggested next steps
* Offer a “Confidence: 0.74” score

Example output:

> “Traffic down –17% week-over-week in FR. Likely due to paid search impressions dropping by 24% (confidence 0.78).”

---

# ⭐ **Feature 3 — Semantic Exposure & Data Governance Tools**

### “The Data Team defines the governed data that business teams can safely use.”

This is for the **Data Team**.

---

## 3.1 Semantic Slice Management

Data team can expose **semantic slices** to individual teams:

* Marketing Slice
* Product Slice
* Ops Slice

Each slice contains:

* Metrics
* Dimensions
* Facts
* Time windows
* Models and joins
* Aggregation rules
* Entity definitions

This defines what the AI is allowed to query.

---

## 3.2 Data Source Configuration

Data team manages:

* Warehouse credentials
* Connections to external MCP servers
* Source configurations
* Privacy/scoping rules
* Row-level filtering (if needed)
* Allowed models (dbt artifacts)

---

## 3.3 dbt Integration

Numize syncs with dbt to:

* Import manifest.json / run results
* Discover models, fields, column types
* Detect lineage
* Extract metrics & dimensions
* Validate SQL
* Auto-generate semantic objects

Data team can choose which dbt models are “business-ready”.

---

## 3.4 Review Workflow for AI-Generated Assets

Data team can review:

* Generated SQL
* Suggested KPIs
* Generated blocks
* Segments
* Saved actions

They can approve or correct them:

* “Approve for Marketing”
* “Needs correction – use dim_customer.status instead”
* “Block access to raw_events table”

All corrections improve the AI’s behavior.

---

# 🧪 **4. Acceptance Criteria**

### Conversational Analytics

* 95% correctness of SQL on governed slices
* Ability to create segments, charts, and actions
* Transparent reasoning always available

### Weekly Digest

* All blocks render
* Anomalies detected with explanation
* Deep dive works and starts new threads
* Split screen behaves correctly

### Semantic Layer / Data Team Tools

* Data team can expose a semantic slice in <10 minutes
* AI respects slice restrictions
* All queries are auditable

---

# 🔐 **5. Security Requirements**

* No raw PII exposed without approval
* Full audit logs
* Role-based access (Head of X, Ops, Data)
* Warehouse credentials stored via Secrets Manager
* Only dbt-governed models are accessible

---

# 🛠️ **6. Architecture Overview**

### Backend

* LLM orchestration (LangGraph)
* SQL engine over semantic slices
* Digest scheduler
* Anomaly detection service
* MCP connector execution
* dbt ingestion engine

### Frontend

* Chat interface
* Split-screen digest mode
* Block editor
* Semantic slice admin
* Settings + integrations

### Shared Schemas

* Semantic objects
* SQL request schema
* KPI definitions
* Digest block schema

---

# 🏁 **7. Final Summary**

This MVP enables:

### **For Head of X**

* Ask anything
* Understand everything
* Receive proactive weekly insights
* Take actions instantly via connectors

### **For Business Ops**

* Build segments
* Investigate anomalies
* Run advanced analysis
* Automate activation workflows

### **For Data Teams**

* Provide governed semantic access
* Configure data sources & connectors
* Review AI outputs
* Ensure trust, privacy, lineage

Together, these three features deliver a unified vision:

> **Numize = AI-native analytics workflow: from question → insight → action, governed by data teams and powered by semantic slices.**
