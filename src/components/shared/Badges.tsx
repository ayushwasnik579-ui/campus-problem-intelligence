import { statusColors, statusLabels, severityColors } from '../../data/mockData';
import type { IssueSeverity, IssueStatus } from '../../types';

export function StatusBadge({ status }: { status: IssueStatus }) {
  const colors = statusColors[status] || statusColors.reported;
  const label = statusLabels[status] || status;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
      {label}
    </span>
  );
}

export function SeverityBadge({ severity }: { severity: IssueSeverity }) {
  const colors = severityColors[severity] || severityColors.low;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}>
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  );
}

export function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
      {category}
    </span>
  );
}
