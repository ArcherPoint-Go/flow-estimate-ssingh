import { Badge } from "@/components/ui/badge";
import { envelopeOptions, envelopeRationale, riskFlags, dimensionalEnvelope, historicalBids } from "@/data/mockData";
import { Check } from "lucide-react";

export default function EnvelopePage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Badge className="bg-info text-info-foreground mb-2">AI Recommendation</Badge>
      <h1 className="text-2xl font-bold mb-6">Envelope Selection</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {envelopeOptions.map(env => (
          <div key={env.id} className={`bg-card rounded-lg border-2 p-4 ${env.type === "Recommended" ? "border-primary" : "border-border"}`}>
            <div className="flex items-center justify-between mb-2">
              <Badge className={env.type === "Recommended" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}>
                {env.type}
              </Badge>
              <span className="text-xl font-bold">{env.match}%</span>
            </div>
            <h3 className="font-semibold text-sm mb-1">{env.name}</h3>
            <p className="text-xs text-muted-foreground font-mono mb-3">{env.id}</p>
            {env.routingSteps.length > 0 && (
              <>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Key Routing Steps</div>
                <ol className="text-xs space-y-1 mb-2">
                  {env.routingSteps.map((step, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-muted-foreground">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <p className="text-xs text-muted-foreground">+ 10 more steps</p>
                <p className="text-xs text-muted-foreground mt-2">Lead time: {env.leadTime}</p>
              </>
            )}
            {env.description && <p className="text-xs text-muted-foreground mt-2">{env.description}</p>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Rationale</div>
          <ul className="space-y-2">
            {envelopeRationale.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Risk Flags</div>
          <div className="space-y-4">
            {riskFlags.map((rf, i) => (
              <div key={i}>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px] font-bold">{rf.level}</Badge>
                  <span className="text-sm font-semibold">{rf.title}</span>
                </div>
                <p className="text-xs text-muted-foreground ml-14">{rf.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-4 mb-8">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Dimensional Envelope</div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-2">
          {dimensionalEnvelope.map(d => (
            <div key={d.label} className="flex justify-between text-sm py-1 border-b border-border last:border-0">
              <span className="text-muted-foreground">{d.label}</span>
              <span className="font-mono">{d.value}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground italic mt-3">
          Envelope qualified for AS9100D programs. CMM inspection standard. Flash-line mismatch ≤0.030".
        </p>
      </div>

      <div className="bg-card rounded-lg border border-border p-4">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Similar Historical Bids (Top 5)</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground text-xs">
              <th className="text-left py-2 px-2">ID</th>
              <th className="text-left py-2 px-2">Date</th>
              <th className="text-left py-2 px-2">Customer</th>
              <th className="text-right py-2 px-2">Qty</th>
              <th className="text-right py-2 px-2">Unit Price</th>
              <th className="text-left py-2 px-2">Outcome</th>
              <th className="text-left py-2 px-2">Envelope</th>
              <th className="text-right py-2 px-2">Similarity</th>
            </tr>
          </thead>
          <tbody>
            {historicalBids.map(bid => (
              <tr key={bid.id} className="border-b border-border last:border-0">
                <td className="py-2 px-2 font-mono text-xs">{bid.id}</td>
                <td className="py-2 px-2">{bid.date}</td>
                <td className="py-2 px-2">{bid.customer}</td>
                <td className="py-2 px-2 text-right">{bid.qty}</td>
                <td className="py-2 px-2 text-right font-mono">{bid.unitPrice}</td>
                <td className="py-2 px-2">
                  <Badge className={bid.outcome === "Won" ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}>
                    {bid.outcome}
                  </Badge>
                </td>
                <td className="py-2 px-2 font-mono text-xs">{bid.envelope}</td>
                <td className="py-2 px-2 text-right font-semibold">{bid.similarity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
