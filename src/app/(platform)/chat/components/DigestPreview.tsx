/* eslint-disable max-lines */
"use client";

import React, { useMemo } from "react";

import { Badge } from "~/components/ui/badge";
import { DigestBlockRenderer } from "~components/digest/DigestBlockRenderer";
import type { ChatMessage as ChatMessageType } from "~mocks/chat-data";
import type { Digest } from "~mocks/digest-data";

import { Calendar, TrendingUp } from "lucide-react";

interface DigestPreviewProps {
  messages: ChatMessageType[];
}

// Helper function to build NPS digest based on conversation progress
const buildNPSDigest = (messageCount: number, messages: ChatMessageType[]): Partial<Digest> | null => {
  const conversationText = messages
    .filter((msg) => msg.role === "user")
    .map((msg) => msg.content.toLowerCase())
    .join(" ");

  // Base NPS digest structure (Datadog “3 pain pillars” context)
  const digest: Partial<Digest> = {
    id: "preview-digest",
    title: "NPS Analysis - Datadog Experience (Costs, Complexity, Support)",
    description:
      "Monthly Net Promoter Score analysis for Datadog, focusing on high/unpredictable costs, product complexity, and sales/support experience as the three dominant pain pillars.",
    recurrence: "monthly",
    deliveryMethod: "in-app",
    isActive: false,
    blocks: [],
  };

  // Check if user has requested digest creation
  const hasRequestedDigestCreation =
    conversationText.includes("create") && conversationText.includes("digest") && messageCount >= 3;
  const hasRequestedPriorityActions = conversationText.includes("priority") && conversationText.includes("action");

  if (!hasRequestedDigestCreation) {
    return null;
  }

  // Build digest with blocks 0-6 when user requests digest creation
  if (messageCount >= 3) {
    digest.blocks = [
      // Block 0: Executive Summary
      {
        id: "block-nps-0",
        type: "text",
        title: "Executive Summary",
        order: 0,
        lastExecution: {
          executedAt: new Date(),
          textContent:
            "January 2025 Datadog NPS declined to 31 (down from 35), continuing a downward trend in customer sentiment. Analysis of NPS comments, support tickets and public reviews reveals three structural pain pillars: 1) high and unpredictable costs, 2) product complexity and steep learning curve, and 3) aggressive sales tactics combined with poor support follow-through. These three themes account for the vast majority of detractor feedback and are especially pronounced among mid-market and enterprise customers with large footprints.",
        },
      },
      // Block 1: NPS Overview (KPI)
      {
        id: "block-nps-1",
        type: "kpi",
        title: "NPS Overview",
        order: 1,
        lastExecution: {
          executedAt: new Date(),
          confidenceScore: 0.92,
          metrics: [
            {
              name: "Net Promoter Score",
              value: 31,
              change: -4.0,
              trend: "down" as const,
              previousValue: 35,
            },
            {
              name: "Promoters",
              value: 41.0,
              change: -3.5,
              trend: "down" as const,
              previousValue: 44.5,
              unit: "%",
            },
            {
              name: "Passives + Detractors",
              value: 59.0,
              change: 3.5,
              trend: "up" as const,
              previousValue: 55.5,
              unit: "%",
              isInverse: true,
            },
            {
              name: "NPS Responses (All Segments)",
              value: 8324,
              change: 7.8,
              trend: "up" as const,
              previousValue: 7722,
            },
          ],
          explanation:
            "NPS decreased from 35 to 31 in January, with promoters dropping to 41% and Passives + Detractors growing to 59%. Response volume increased by 7.8%, which means more customers are taking the time to express dissatisfaction. Negative comments cluster strongly around costs, complexity, and sales/support, indicating systemic issues rather than isolated incidents.",
        },
      },
      // Block 2: NPS Trend (chart)
      {
        id: "block-nps-2",
        type: "chart",
        title: "NPS Trend (6 Months)",
        order: 2,
        config: {
          type: "chart",
          config: {
            chartType: "line",
            showLegend: true,
            showDataLabels: true,
            colorScheme: "blue",
            height: "md",
          },
        },
        lastExecution: {
          executedAt: new Date(),
          confidenceScore: 0.9,
          chartData: {
            chartType: "line",
            labels: ["Aug '24", "Sep '24", "Oct '24", "Nov '24", "Dec '24", "Jan '25"],
            datasets: [
              {
                label: "Datadog NPS",
                data: [40, 38, 37, 36, 35, 31],
                color: "#3b82f6",
              },
            ],
            comparisonPeriod: "August 2024 – January 2025",
          },
          explanation:
            "NPS has been drifting down gradually from 40 in August to 35 in December, followed by a sharper 4-point drop to 31 in January. The qualitative analysis shows the narrative shifting from feature gaps to frustration with pricing unpredictability, platform complexity, and relationship management (sales/support).",
        },
      },
      // Block 3: Understanding the Decline (text)
      {
        id: "block-nps-3",
        type: "text",
        title: "Understanding the Decline",
        order: 3,
        lastExecution: {
          executedAt: new Date(),
          textContent:
            "To understand why NPS is falling, we analyzed a sample of detractor responses across segments (startups, mid-market, enterprise) and cross-referenced them with tickets, CSM notes, and public reviews. Three themes consistently emerge regardless of company size or maturity: 1) Bills that are higher and harder to predict than expected, 2) A powerful but overwhelming product that requires significant effort to configure, and 3) a perception that Datadog is more focused on selling and closing tickets than on partnering with customers to solve problems.",
        },
      },
      // Block 4: Root Cause Breakdown (table)
      {
        id: "block-nps-4",
        type: "table",
        title: "Root Cause Breakdown – Detractor Feedback",
        order: 4,
        lastExecution: {
          executedAt: new Date(),
          confidenceScore: 0.9,
          tableData: {
            columns: [
              {
                key: "rootCause",
                label: "Root Cause Category",
                type: "text",
                sortable: true,
              },
              {
                key: "affectedShare",
                label: "% of Detractor Comments",
                type: "percentage",
                sortable: true,
              },
              {
                key: "severity",
                label: "Perceived Severity",
                type: "text",
                sortable: true,
              },
              {
                key: "example",
                label: "Representative Feedback",
                type: "text",
                sortable: false,
              },
            ],
            rows: [
              {
                id: "root-1",
                cells: {
                  rootCause: "High & Unpredictable Costs",
                  affectedShare: "68%",
                  severity: "Critical",
                  example:
                    "“Our Datadog bill is insane, basically as much as our infra. Costs jump without us changing much, and the pricing model feels opaque and punishing.”",
                },
              },
              {
                id: "root-2",
                cells: {
                  rootCause: "Complexity & Steep Learning Curve",
                  affectedShare: "54%",
                  severity: "High",
                  example:
                    "“It’s incredibly powerful but the UI is overwhelming. We spend weeks wiring things up and still don’t have dashboards that non-experts can use.”",
                },
              },
              {
                id: "root-3",
                cells: {
                  rootCause: "Aggressive Sales & Poor Support Experience",
                  affectedShare: "31%",
                  severity: "High",
                  example:
                    "“Sales spammed us for weeks, and when we finally had a billing issue, support just tried to close the ticket instead of owning the problem.”",
                },
              },
            ],
            totalRows: 3,
          },
          explanation:
            "Most detractor comments fall into three buckets: 68% mention some form of pricing/cost shock, 54% describe product complexity or confusing UX, and 31% complain about sales/support behavior. Many detractors mention more than one theme in the same comment.",
        },
      },
      // Block 5: Deep Dive Analysis (text)
      {
        id: "block-nps-5",
        type: "text",
        title: "Deep Dive: How These Themes Show Up in Practice",
        order: 5,
        lastExecution: {
          executedAt: new Date(),
          textContent:
            "Cost complaints typically reference surprise overages, complex licensing (high-water-mark, custom metrics, dual ingest/index charges), and a lack of proactive communication when billing anomalies occur. Complexity complaints point to an overwhelming UI, difficult dashboards/monitors setup, and non-intuitive query DSLs. Sales/support complaints describe pushy outreach, inconsistent guidance on what features will cost, and support interactions that feel focused on closing tickets rather than solving root problems. Together, these paint a picture where customers feel both financially exposed and poorly supported when they need help.",
        },
      },
      // Block 6: Key Findings Summary (table)
      {
        id: "block-nps-6",
        type: "table",
        title: "Key Findings Summary",
        order: 6,
        lastExecution: {
          executedAt: new Date(),
          confidenceScore: 0.9,
          tableData: {
            columns: [
              {
                key: "finding",
                label: "Finding",
                type: "text",
                sortable: false,
              },
              {
                key: "detail",
                label: "Detail",
                type: "text",
                sortable: false,
              },
              {
                key: "impact",
                label: "Impact / Risk",
                type: "text",
                sortable: false,
              },
            ],
            rows: [
              {
                id: "finding-1",
                cells: {
                  finding: "Costs Drive Churn Conversations",
                  detail:
                    "Many detractor comments explicitly mention evaluating alternatives due to runaway Datadog bills, not product capability gaps.",
                  impact:
                    "Direct threat to renewal and expansion; perception that monitoring costs can exceed infra costs undermines long-term stickiness.",
                },
              },
              {
                id: "finding-2",
                cells: {
                  finding: "Complexity Limits Adoption Beyond Experts",
                  detail:
                    "Teams struggle to make Datadog useful for non-experts; dashboards remain “for SREs only”, limiting perceived value at the org level.",
                  impact:
                    "Reduces realized value and makes high spend harder to justify to leadership, especially when only a small group truly benefits.",
                },
              },
              {
                id: "finding-3",
                cells: {
                  finding: "Relationship Damage from Sales & Support",
                  detail:
                    "Stories of aggressive sales outreach and unsatisfying support on billing/technical issues erode trust across engineering and finance.",
                  impact:
                    "Once trust is broken, even product improvements struggle to restore goodwill; some customers publicly vow to avoid Datadog in future.",
                },
              },
            ],
            totalRows: 3,
          },
          explanation:
            "The combination of financial pain, operational friction, and damaged trust explains why NPS is sliding despite Datadog’s strong feature set.",
        },
      },
    ];

    // Add Path to Recovery + Priority Actions when user asks for them
    if (messageCount >= 5 && hasRequestedPriorityActions) {
      digest.blocks.push(
        // Block 7: Path to Recovery (text)
        {
          id: "block-nps-7",
          type: "text",
          title: "Path to Recovery",
          order: 7,
          lastExecution: {
            executedAt: new Date(),
            textContent:
              "To recover NPS, we need a coordinated plan across Pricing, Product, and GTM/Support. The focus should be to (1) make costs understandable and controllable, (2) make common use cases simple and approachable, and (3) rebuild trust through more honest, less aggressive customer interactions. The actions below are prioritized by estimated NPS impact and feasibility over the next 1–2 quarters.",
          },
        },
        // Block 8: Top Priority Actions (table)
        {
          id: "block-nps-8",
          type: "table",
          title: "Top 3 Priority Actions",
          order: 8,
          lastExecution: {
            executedAt: new Date(),
            confidenceScore: 0.93,
            tableData: {
              columns: [
                {
                  key: "priority",
                  label: "Priority",
                  type: "text",
                  sortable: false,
                },
                {
                  key: "action",
                  label: "Recommended Action",
                  type: "text",
                  sortable: false,
                },
                {
                  key: "owner",
                  label: "Primary Owner",
                  type: "text",
                  sortable: false,
                },
                {
                  key: "timeline",
                  label: "Timeline",
                  type: "text",
                  sortable: false,
                },
                {
                  key: "impact",
                  label: "Expected Impact",
                  type: "text",
                  sortable: false,
                },
              ],
              rows: [
                {
                  id: "rec-1",
                  cells: {
                    priority: "🔴 URGENT",
                    action:
                      "Introduce clear cost guardrails and transparent usage-to-bill mapping (budgets, alerts, and simpler pricing explanations).",
                    owner: "Pricing & Product",
                    timeline: "Design in 1 sprint, rollout in next billing cycle",
                    impact:
                      "Directly addresses 68% of detractor complaints around high/unpredictable costs; reduces bill shock and restores financial trust.",
                  },
                },
                {
                  id: "rec-2",
                  cells: {
                    priority: "🟠 HIGH",
                    action:
                      "Ship opinionated ‘quick start’ experience and templates for core monitoring use cases to reduce perceived complexity.",
                    owner: "Product & UX",
                    timeline: "2–3 sprints for initial templates; iterate monthly",
                    impact:
                      "Targets 54% of detractors who struggle to configure Datadog; makes value visible faster for new teams and non-experts.",
                  },
                },
                {
                  id: "rec-3",
                  cells: {
                    priority: "🟠 HIGH",
                    action:
                      "Rewrite sales and support playbooks to emphasize transparency, proactive communication on billing, and problem ownership.",
                    owner: "Sales, CS & Support",
                    timeline: "Pilot within 1 quarter; full rollout the next",
                    impact:
                      "Addresses 31% of detractor feedback on aggressive sales and poor support; critical for rebuilding long-term relationship trust.",
                  },
                },
              ],
              totalRows: 3,
            },
            explanation:
              "These actions directly map to the three dominant pain pillars: costs, complexity, and sales/support. Each has a clear owner, timeline, and measurable impact on detractor themes.",
          },
        },
      );
    }
  }

  return digest;
};

// Helper function to build digest based on conversation progress
const buildDigestFromMessages = (messages: ChatMessageType[]): Partial<Digest> | null => {
  const userMessages = messages.filter((msg) => msg.role === "user");
  const messageCount = userMessages.length;

  if (messageCount === 0) return null;

  // Build NPS digest
  return buildNPSDigest(messageCount, messages);
};

export const DigestPreview: React.FC<DigestPreviewProps> = ({ messages }) => {
  const digest = useMemo(() => buildDigestFromMessages(messages), [messages]);

  if (digest === null) {
    return (
      <div className="h-full flex items-center justify-center p-6 bg-muted/20">
        <div className="text-center text-muted-foreground">
          <TrendingUp className="size-12 mx-auto mb-4 opacity-50" />
          <p className="text-sm">Digest preview will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border bg-card px-6 py-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-lg font-semibold text-foreground">{digest.title}</h2>
              <Badge variant="outline" className="text-xs">
                Preview
              </Badge>
            </div>
            {digest.description !== undefined && digest.description.length > 0 && (
              <p className="text-sm text-muted-foreground">{digest.description}</p>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            <span className="capitalize">{digest.recurrence}</span>
          </div>
          {digest.blocks !== undefined && digest.blocks.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span>{digest.blocks.length} blocks</span>
            </div>
          )}
        </div>
      </div>

      {/* Blocks */}
      <div className="flex-1 overflow-y-auto p-6">
        {digest.blocks !== undefined && digest.blocks.length > 0 ? (
          <div className="space-y-6">
            {digest.blocks.map((block) => (
              <div key={block.id} className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <DigestBlockRenderer block={block} />
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-center text-muted-foreground">
            <div>
              <TrendingUp className="size-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">Continue the conversation to build your digest</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
