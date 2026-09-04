export type UserRole = 'student' | 'staff' | 'admin';

export type IssueStatus = 'reported' | 'ai_analyzed' | 'assigned' | 'in_progress' | 'resolved' | 'closed';

export type IssueSeverity = 'low' | 'medium' | 'high' | 'critical';

export type IssueCategory =
  | 'infrastructure'
  | 'electricity'
  | 'water'
  | 'cleanliness'
  | 'wifi_internet'
  | 'classroom'
  | 'laboratory'
  | 'security'
  | 'transport'
  | 'other';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
}

export interface AIAnalysis {
  predictedCategory: string;
  priorityScore: number;
  severity: IssueSeverity;
  isRecurring: boolean;
  similarReportsCount: number;
  affectedStudents: number;
  suggestedDepartment: string;
  suggestedAction: string;
  analysisTimestamp: string;
  factors: PriorityFactor[];
}

export interface PriorityFactor {
  name: string;
  value: number;
  weight: number;
  description: string;
}

export interface TimelineEvent {
  id: string;
  status: IssueStatus;
  timestamp: string;
  description: string;
  user?: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  location: string;
  building: string;
  status: IssueStatus;
  priority: IssueSeverity;
  reportedBy: string;
  reporterName: string;
  isAnonymous: boolean;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  aiAnalysis?: AIAnalysis;
  assignedDepartment?: string;
  assignedStaff?: string;
  timeline: TimelineEvent[];
  upvotes: number;
}

export interface Department {
  id: string;
  name: string;
  head: string;
  staffCount: number;
  activeIssues: number;
  resolvedIssues: number;
  avgResolutionTime: number;
  performance: number;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  issueId?: string;
}

export interface CampusLocation {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  totalReports: number;
  commonIssue: string;
  priority: IssueSeverity;
  resolutionRate: number;
}

export interface RecurringIssue {
  id: string;
  title: string;
  category: IssueCategory;
  location: string;
  reportCount: number;
  priority: IssueSeverity;
  firstReported: string;
  lastReported: string;
  relatedIssueIds: string[];
}

export interface ReportFormData {
  title: string;
  description: string;
  category: IssueCategory;
  location: string;
  building: string;
  prioritySuggestion: IssueSeverity;
  imageFile?: File;
  isAnonymous: boolean;
}
