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

  // Base NPS digest structure
  const digest: Partial<Digest> = {
    id: "preview-digest",
    title: "NPS Analysis - Monthly Report",
    description: "Monthly Net Promoter Score analysis with segment breakdowns, trends, and actionable insights",
    recurrence: "monthly",
    deliveryMethod: "in-app",
    isActive: false,
    blocks: [],
  };

  // Check if user has requested digest creation
  const hasRequestedDigestCreation =
    conversationText.includes("create") && conversationText.includes("digest") && messageCount >= 6;
  const hasRequestedPriorityActions = conversationText.includes("priority") && conversationText.includes("action");

  // If user hasn't requested digest creation yet, return null or early structure
  if (!hasRequestedDigestCreation) {
    return null;
  }

  // Build digest with blocks 0-6 when user requests digest creation
  if (messageCount >= 6) {
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
            "January 2025 NPS declined to 47 (down from 48) - our first decrease after six months of growth. Based on 15,247 respondents, root cause analysis reveals two critical issues: search relevance degradation (45.7% of complaints) and corpus gaps (37.8%). Urgent action needed on algorithm rollback and indexing backlog clearance.",
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
              value: 47,
              change: -1.0,
              trend: "down" as const,
              previousValue: 48,
            },
            {
              name: "Promoters",
              value: 58.2,
              change: -2.8,
              trend: "down" as const,
              previousValue: 61.0,
              unit: "%",
            },
            {
              name: "Passives + Detractors",
              value: 41.8,
              change: 2.8,
              trend: "up" as const,
              previousValue: 39.0,
              unit: "%",
              isInverse: true,
            },
            {
              name: "NPS Forms Completed",
              value: 15247,
              change: 10.2,
              trend: "up" as const,
              previousValue: 13835,
            },
          ],
          explanation:
            "Concerning NPS decline in January with overall score dropping to 47 (down 1.0 point from December's 48). This represents our first month-over-month decrease after six months of consistent growth. Promoter percentage declined to 58.2% (-2.8 percentage points), while combined Passives + Detractors increased to 41.8% (+2.8 points), indicating growing user dissatisfaction. Despite the decline, survey engagement remains strong with 15,247 completed NPS forms (+10.2%), suggesting users are actively providing feedback about their concerns. The high response volume provides statistically significant data for root cause analysis and indicates urgent need for remediation efforts.",
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
          confidenceScore: 0.92,
          chartData: {
            chartType: "line",
            labels: ["Aug '24", "Sep '24", "Oct '24", "Nov '24", "Dec '24", "Jan '25"],
            datasets: [
              {
                label: "NPS Score",
                data: [38.2, 40.1, 41.8, 42.5, 48.0, 47.0],
                color: "#3b82f6",
              },
            ],
            comparisonPeriod: "August 2024 - January 2025",
          },
          explanation:
            "NPS trajectory shows strong growth from August through December 2024, climbing from 38.2 to a peak of 48.0 (+9.8 points, +25.7% improvement). However, January 2025 marks a concerning reversal with a 1-point decline to 47.0, breaking six months of consecutive gains. The December peak coincided with major platform releases (Citation Network expansion, document annotation enhancements), but January's drop suggests recent changes may have introduced issues. The decline warrants immediate investigation as it contradicts the previously sustained positive momentum and may indicate systematic problems affecting user satisfaction. Root cause analysis points to search algorithm changes deployed December 15th and mobile performance degradation as primary drivers of the downturn.",
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
            "To understand January's NPS decline, we analyzed 127 detractor sessions (users who scored 0-6). Our investigation identified five distinct root cause categories driving user dissatisfaction. Each category represents a systematic issue affecting multiple user sessions, with some users experiencing multiple problems in a single interaction. The table below breaks down these categories by frequency, showing which issues are most prevalent among unhappy users.",
        },
      },
      // Block 4: Root Cause Breakdown (table)
      {
        id: "block-nps-4",
        type: "table",
        title: "Root Cause Breakdown - Detractor Sessions",
        order: 4,
        lastExecution: {
          executedAt: new Date(),
          confidenceScore: 0.91,
          tableData: {
            columns: [
              { key: "rootCause", label: "Root Cause Category", type: "text", sortable: true },
              { key: "affectedSessions", label: "Affected Sessions", type: "number", sortable: true },
              { key: "percentage", label: "% of Detractors", type: "percentage", sortable: true },
              { key: "severity", label: "Severity", type: "text", sortable: true },
              { key: "example", label: "Example Issue", type: "text", sortable: false },
            ],
            rows: [
              {
                id: "root-1",
                cells: {
                  rootCause: "Search Relevance Degradation",
                  affectedSessions: 58,
                  percentage: "45.7%",
                  severity: "Critical",
                  example: "Query 'jurisprudence contrat travail CDI' returned only 3 results vs 847 in November",
                },
              },
              {
                id: "root-2",
                cells: {
                  rootCause: "Corpus Coverage Gaps",
                  affectedSessions: 48,
                  percentage: "37.8%",
                  severity: "High",
                  example: "Missing Cour de cassation decisions from Jan 15-28 (indexing backlog)",
                },
              },
              {
                id: "root-3",
                cells: {
                  rootCause: "Mobile Performance Degradation",
                  affectedSessions: 41,
                  percentage: "32.3%",
                  severity: "High",
                  example: "Search results loading 4.2s on iOS vs 1.8s in December",
                },
              },
              {
                id: "root-4",
                cells: {
                  rootCause: "Legislative Timeline Bugs",
                  affectedSessions: 29,
                  percentage: "22.8%",
                  severity: "Medium",
                  example: "Null pointer exception on Code civil Article L1234-5 timeline queries",
                },
              },
              {
                id: "root-5",
                cells: {
                  rootCause: "Navigation Friction",
                  affectedSessions: 22,
                  percentage: "17.3%",
                  severity: "Medium",
                  example: "Users averaging 8.2 failed search attempts before abandonment",
                },
              },
            ],
            totalRows: 5,
          },
          explanation:
            "Root cause analysis of 127 detractor sessions (NPS 0-6) identifies five primary categories of issues. The top two drivers—Search Relevance Degradation (45.7%) and Corpus Coverage Gaps (37.8%)—account for majority of user dissatisfaction. Note: Percentages exceed 100% as users can experience multiple root causes in a single session.",
        },
      },
      // Block 5: Deep Dive Analysis (text)
      {
        id: "block-nps-5",
        type: "text",
        title: "Deep Dive Analysis",
        order: 5,
        lastExecution: {
          executedAt: new Date(),
          textContent:
            "Building on the root cause categories, we conducted in-depth analysis using session replays, A/B testing, and statistical correlation studies. The findings reveal specific technical issues and their measurable impact on user experience. Search relevance degradation shows a clear 14% precision drop from algorithm changes, while corpus gaps create 2,300 failed searches daily. These aren't just complaints—they're quantifiable platform failures with direct business impact that we can measure and fix.",
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
          confidenceScore: 0.91,
          tableData: {
            columns: [
              { key: "finding", label: "Finding Category", type: "text", sortable: false },
              { key: "detail", label: "Key Detail", type: "text", sortable: false },
              { key: "impact", label: "Impact/Data", type: "text", sortable: false },
            ],
            rows: [
              {
                id: "finding-1",
                cells: {
                  finding: "Search Relevance Degradation",
                  detail: "Dec 15 algorithm changes reduced Code civil query accuracy by 14%",
                  impact: "58 sessions (45.7%) - Old: 89.3% precision, New: 76.8%",
                },
              },
              {
                id: "finding-2",
                cells: {
                  finding: "Corpus Coverage Gaps",
                  detail: "15,247-doc backlog affecting Cour de cassation decisions (Jan 15-28)",
                  impact: "48 sessions (37.8%) - 2,300 daily failed searches, 73% abandon rate",
                },
              },
              {
                id: "finding-3",
                cells: {
                  finding: "Session Behavior Pattern",
                  detail: "Frustrated users average 8.2 failed searches before giving up",
                  impact: "43 sessions analyzed - repeated query reformulation attempts",
                },
              },
              {
                id: "finding-4",
                cells: {
                  finding: "Power User Impact",
                  detail: "Detractors conduct 3.2x more searches than average (14.8 vs 4.6)",
                  impact: "Most valuable segment hitting platform limitations",
                },
              },
              {
                id: "finding-5",
                cells: {
                  finding: "Statistical Correlation",
                  detail: "Users encountering backlog documents give lower NPS scores",
                  impact: "4.7x more likely to detract (r=0.73, p<0.01)",
                },
              },
            ],
            totalRows: 5,
          },
          explanation:
            "Structured summary of the five key findings from analyzing 127 detractor sessions, highlighting impact data and statistical evidence.",
        },
      },
    ];

    // Add blocks 7-8 when user requests priority actions
    if (messageCount >= 7 && hasRequestedPriorityActions) {
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
              "Based on our root cause analysis, we've identified three high-impact actions that address 83.2% of detractor complaints. These recommendations are sequenced by urgency and readiness—the search algorithm rollback can deploy immediately, while indexing and mobile optimizations follow in the next two weeks. Engineering has validated the technical approach for each action, and we project these fixes will recover NPS to the 49-50 range by March 2025. Each recommendation includes specific timelines, expected impact, and current status to enable rapid decision-making.",
          },
        },
        // Block 8: Top 3 Priority Actions (table)
        {
          id: "block-nps-8",
          type: "table",
          title: "Top 3 Priority Actions",
          order: 8,
          lastExecution: {
            executedAt: new Date(),
            confidenceScore: 0.94,
            tableData: {
              columns: [
                { key: "priority", label: "Priority", type: "text", sortable: false },
                { key: "action", label: "Recommended Action", type: "text", sortable: false },
                { key: "timeline", label: "Timeline", type: "text", sortable: false },
                { key: "impact", label: "Expected Impact", type: "text", sortable: false },
                { key: "status", label: "Status", type: "text", sortable: false },
              ],
              rows: [
                {
                  id: "rec-1",
                  cells: {
                    priority: "🔴 URGENT",
                    action: "Rollback search algorithm to November baseline",
                    timeline: "Immediate (24-48 hours)",
                    impact: "Restore search precision to 89.3% - affects 58 sessions (45.7%)",
                    status: "Ready to deploy",
                  },
                },
                {
                  id: "rec-2",
                  cells: {
                    priority: "🟠 HIGH",
                    action: "Accelerate indexing backlog clearance to 2-week timeline",
                    timeline: "Complete by Feb 15",
                    impact: "Resolve 2,300 daily failed searches - affects 48 sessions (37.8%)",
                    status: "Resources allocated",
                  },
                },
                {
                  id: "rec-3",
                  cells: {
                    priority: "🟠 HIGH",
                    action: "Deploy mobile performance optimization patch",
                    timeline: "Feb 3-5 deployment",
                    impact: "Reduce load time from 4.2s to 1.8s - affects 41 sessions (32.3%)",
                    status: "Tested in staging",
                  },
                },
              ],
              totalRows: 3,
            },
            explanation:
              "Three highest-impact recommendations based on root cause analysis. Implementing these actions addresses 83.2% of detractor complaints and is projected to recover NPS to 49-50 range by March 2025.",
          },
        },
      );
    }

    return digest;
  }

  return null;
};

// Helper function to build digest based on conversation progress
const buildDigestFromMessages = (messages: ChatMessageType[]): Partial<Digest> | null => {
  // Count user messages to determine progress
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
