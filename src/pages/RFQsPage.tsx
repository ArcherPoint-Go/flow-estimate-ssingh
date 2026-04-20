import { useSearchParams } from "react-router-dom";
import { rfqs } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

export default function RFQsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("rfq") || "RFQ-2026-0001";
  const selected = rfqs.find(r => r.id === selectedId) || rfqs[0];

  return (
    <div className="flex h-[calc(100vh-5.5rem)]">
      <div className="w-60 border-r border-border bg-card overflow-y-auto shrink-0">
        <div className="p-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">RFQ Database</div>
        {rfqs.map(rfq => (
          <button
            key={rfq.id}
            onClick={() => setSearchParams({ rfq: rfq.id })}
            className={`w-full text-left p-3 border-b border-border hover:bg-accent transition-colors ${rfq.id === selectedId ? "bg-accent" : ""}`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-primary">{rfq.id}</span>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0">{rfq.segment}</Badge>
            </div>
            <div className="font-medium text-sm">{rfq.customer}</div>
            <div className="text-xs text-muted-foreground">{rfq.partName}</div>
            <div className="text-[10px] text-muted-foreground mt-1">Due: {rfq.dueDate}&nbsp;&nbsp;Qty: {rfq.qtyBreaks}</div>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-card rounded-lg border border-border p-4 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-destructive/10 rounded flex items-center justify-center">
                <span className="text-destructive font-bold text-xs">PDF</span>
              </div>
              <div>
                <div className="font-semibold text-sm">RFQ Document – {selected.partNumber}</div>
                <div className="text-xs text-muted-foreground">Received 2026-02-10 · Simulated extraction complete</div>
              </div>
            </div>
            <Badge className="bg-success text-success-foreground">Extracted</Badge>
          </div>
          <div className="mt-4 bg-muted rounded p-8 text-center text-sm text-muted-foreground">
            Simulated PDF preview – {selected.customer} – {selected.partName}
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4">Extracted RFQ Fields</h2>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="grid grid-cols-2 gap-x-12 gap-y-4">
            {[
              ["Customer", selected.customer],
              ["Segment", selected.segment],
              ["Part Number", selected.partNumber],
              ["Part Name", selected.partName],
              ["Part Family", selected.partFamily],
              ["Material", selected.material],
              ["Material Form", selected.materialForm],
              ["Forging Type", selected.forgingType],
              ["Complexity", selected.complexity],
              ["Finished Weight", selected.finishedWeight],
              ["Rough Weight", selected.roughWeight],
              ["Qty Breaks", selected.qtyBreaks],
              ["Annual Volume Est.", String(selected.annualVolume)],
              ["Due Date", selected.dueDate],
              ["Delivery", selected.delivery],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">{label}</div>
                <div className="text-sm font-medium">{value}</div>
              </div>
            ))}
          </div>

          {selected.specsNdt.length > 0 && (
            <div className="mt-6">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Specs & NDT</div>
              <div className="flex flex-wrap gap-1.5">
                {selected.specsNdt.map(s => <Badge key={s} variant="outline" className="text-xs font-mono">{s}</Badge>)}
              </div>
            </div>
          )}

          {selected.certifications.length > 0 && (
            <div className="mt-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Certifications Required</div>
              <div className="flex flex-wrap gap-1.5">
                {selected.certifications.map(c => <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>)}
              </div>
            </div>
          )}

          {Object.keys(selected.dimensions).length > 0 && (
            <div className="mt-6">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Dimensions</div>
              <div className="bg-muted rounded border border-border">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(selected.dimensions).map(([k, v], i) => (
                      <tr key={k} className={i % 2 === 0 ? "" : "bg-card"}>
                        <td className="px-4 py-2 text-muted-foreground">{k}</td>
                        <td className="px-4 py-2 text-right font-mono">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground italic mt-2">
                Bore ID is a critical characteristic requiring 100% CMM inspection. Drawing Rev G.
              </p>
            </div>
          )}

          {selected.notes && (
            <div className="mt-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Notes</div>
              <p className="text-sm text-muted-foreground">{selected.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
