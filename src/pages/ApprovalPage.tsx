import { CheckCircle, AlertTriangle } from "lucide-react";
import { auditTimeline, riskFlags } from "@/data/mockData";

const checklist = [
  "Envelope selected",
  "Cost estimate built",
  "Target margin set",
  "Competitive review completed",
  "Approvals complete",
];

export default function ApprovalPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Review & Approval</h1>

      <div className="bg-card rounded-lg border border-border p-4 mb-6">
        <div className="flex items-center gap-2 text-success">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold">Ready to Send</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">All checklist items complete. Quote package is ready for release.</p>
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-6">
        <div className="space-y-6">
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Checklist</div>
            <ul className="space-y-2">
              {checklist.map(item => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Risk Flags</div>
            <div className="space-y-4">
              {riskFlags.map((rf, i) => (
                <div key={i} className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold">{rf.title}</div>
                    <p className="text-xs text-muted-foreground">{rf.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-4">Audit Timeline</div>
          <div className="space-y-4">
            {auditTimeline.map((entry, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 bg-info rounded-full shrink-0 mt-1" />
                  {i < auditTimeline.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                </div>
                <div className="pb-4">
                  <div className="text-[10px] text-muted-foreground">{entry.date}</div>
                  <div className="text-sm font-semibold">{entry.actor}</div>
                  <div className="text-xs text-muted-foreground">{entry.action} – {entry.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
