import type { AIAnalysis, Issue, IssueCategory, IssueSeverity, PriorityFactor, ReportFormData } from '../types';
import { mockIssues } from '../data/mockData';

const categoryMapping: Record<string, string> = {
  infrastructure: 'Infrastructure & Facilities',
  electricity: 'Electrical Systems',
  water: 'Plumbing & Water Supply',
  cleanliness: 'Health & Hygiene',
  wifi_internet: 'IT Infrastructure',
  classroom: 'Academic Facilities',
  laboratory: 'Lab Equipment & Safety',
  security: 'Security & Safety',
  transport: 'Transport & Parking',
  other: 'General Campus',
};

const departmentMapping: Record<string, string> = {
  infrastructure: 'Infrastructure Department',
  electricity: 'Electrical Department',
  water: 'Infrastructure Department',
  cleanliness: 'Maintenance Department',
  wifi_internet: 'IT Department',
  classroom: 'IT Department',
  laboratory: 'Infrastructure Department',
  security: 'Security Department',
  transport: 'Transport Department',
  other: 'Administration',
};

const actionTemplates: Record<string, string[]> = {
  infrastructure: [
    'Inspect structural integrity and schedule repairs.',
    'Dispatch maintenance team for facility assessment.',
    'Evaluate infrastructure condition and plan renovation.',
  ],
  electricity: [
    'Check electrical panel and wiring connections.',
    'Inspect transformer load and power distribution.',
    'Replace faulty electrical components and test safety.',
  ],
  water: [
    'Inspect plumbing system and check for leaks.',
    'Evaluate water pump and tank system performance.',
    'Check pipeline integrity and water pressure.',
  ],
  cleanliness: [
    'Deploy cleaning team for immediate sanitation.',
    'Schedule deep cleaning and hygiene inspection.',
    'Enforce hygiene protocols and vendor compliance.',
  ],
  wifi_internet: [
    'Inspect router/access point and network configuration.',
    'Check bandwidth allocation and network hardware.',
    'Run network diagnostics and optimize coverage.',
  ],
  classroom: [
    'Inspect AV equipment and check connections.',
    'Schedule equipment maintenance or replacement.',
    'Evaluate classroom facilities and plan upgrades.',
  ],
  laboratory: [
    'Conduct safety audit of lab equipment.',
    'Inspect and calibrate laboratory instruments.',
    'Review lab safety protocols and equipment condition.',
  ],
  security: [
    'Inspect security systems and surveillance equipment.',
    'Deploy security personnel for area assessment.',
    'Review access control and safety measures.',
  ],
  transport: [
    'Review transport schedule and resource allocation.',
    'Inspect vehicle condition and maintenance logs.',
    'Evaluate route efficiency and service coverage.',
  ],
  other: [
    'Investigate reported issue and assess impact.',
    'Coordinate with relevant departments for resolution.',
    'Evaluate situation and recommend appropriate action.',
  ],
};

const keywordSeverityBoosts: { keywords: string[]; boost: number }[] = [
  { keywords: ['fire', 'expired', 'safety', 'hazard', 'emergency', 'stuck', 'dangerous'], boost: 25 },
  { keywords: ['broken', 'malfunction', 'not working', 'failed', 'damage'], boost: 15 },
  { keywords: ['leak', 'flood', 'overflow', 'burst'], boost: 20 },
  { keywords: ['health', 'hygiene', 'illness', 'sick', 'food'], boost: 18 },
  { keywords: ['slow', 'intermittent', 'irregular', 'inconsistent'], boost: 5 },
];

function findSimilarReports(category: IssueCategory, location: string, existingIssues: Issue[]): number {
  return existingIssues.filter(
    (issue) =>
      issue.category === category ||
      issue.location.toLowerCase().includes(location.toLowerCase()) ||
      issue.building.toLowerCase().includes(location.toLowerCase())
  ).length;
}

function calculateKeywordBoost(text: string): number {
  const lowerText = text.toLowerCase();
  let totalBoost = 0;
  for (const { keywords, boost } of keywordSeverityBoosts) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        totalBoost += boost;
        break;
      }
    }
  }
  return Math.min(totalBoost, 40);
}

function determineSeverity(score: number): IssueSeverity {
  if (score >= 85) return 'critical';
  if (score >= 65) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

export function analyzeReport(formData: ReportFormData, existingIssues: Issue[] = mockIssues): AIAnalysis {
  const similarReports = findSimilarReports(formData.category, formData.location, existingIssues);
  const keywordBoost = calculateKeywordBoost(formData.title + ' ' + formData.description);
  const isRecurring = similarReports >= 3;

  // Calculate individual factor scores
  const baseSeverity = formData.prioritySuggestion === 'critical' ? 90
    : formData.prioritySuggestion === 'high' ? 70
    : formData.prioritySuggestion === 'medium' ? 50
    : 30;

  const severityScore = Math.min(100, baseSeverity + keywordBoost);
  const frequencyScore = Math.min(100, similarReports * 12 + 20);
  const affectedScore = Math.min(100, 40 + Math.random() * 40 + (isRecurring ? 20 : 0));
  const timeScore = Math.min(100, 50 + Math.random() * 30);
  const recurringScore = isRecurring ? 80 + Math.random() * 20 : 20 + Math.random() * 20;

  const factors: PriorityFactor[] = [
    {
      name: 'Severity',
      value: Math.round(severityScore),
      weight: 0.25,
      description: severityScore >= 80 ? 'Critical impact on campus safety/operations' :
        severityScore >= 60 ? 'Significant disruption to activities' :
        severityScore >= 40 ? 'Moderate inconvenience' : 'Minor issue',
    },
    {
      name: 'Report Frequency',
      value: Math.round(frequencyScore),
      weight: 0.2,
      description: `${similarReports} similar reports found in system`,
    },
    {
      name: 'Affected Students',
      value: Math.round(affectedScore),
      weight: 0.2,
      description: `Estimated ${Math.round(affectedScore * 3 + 20)} students affected`,
    },
    {
      name: 'Time Unresolved',
      value: Math.round(timeScore),
      weight: 0.2,
      description: 'Newly reported, requires prompt attention',
    },
    {
      name: 'Recurring Pattern',
      value: Math.round(recurringScore),
      weight: 0.15,
      description: isRecurring ? 'Recurring issue pattern detected' : 'No recurring pattern found',
    },
  ];

  const priorityScore = Math.round(
    factors.reduce((sum, f) => sum + f.value * f.weight, 0)
  );

  const actionList = actionTemplates[formData.category] || actionTemplates.other;
  const suggestedAction = actionList[Math.floor(Math.random() * actionList.length)];

  return {
    predictedCategory: categoryMapping[formData.category] || 'General Campus',
    priorityScore,
    severity: determineSeverity(priorityScore),
    isRecurring,
    similarReportsCount: similarReports,
    affectedStudents: Math.round(affectedScore * 3 + 20),
    suggestedDepartment: departmentMapping[formData.category] || 'Administration',
    suggestedAction,
    analysisTimestamp: new Date().toISOString(),
    factors,
  };
}

export function generateIssueId(): string {
  const year = new Date().getFullYear();
  const num = Math.floor(Math.random() * 900 + 100);
  return `CI-${year}-00${num}`;
}

export function getCampusHealthScore(issues: Issue[]): number {
  const resolved = issues.filter((i) => i.status === 'resolved' || i.status === 'closed').length;
  const critical = issues.filter((i) => i.priority === 'critical' && i.status !== 'resolved' && i.status !== 'closed').length;
  const total = issues.length;

  if (total === 0) return 100;

  const resolutionRate = resolved / total;
  const criticalPenalty = (critical / total) * 30;

  return Math.max(0, Math.min(100, Math.round(resolutionRate * 100 - criticalPenalty)));
}
