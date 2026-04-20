import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { costBreaks, auditTimeline } from "@/data/mockData";

export default function PricingPage() {
  const [qtyIndex, setQtyIndex] = useState(0);
  const [margin, setMargin] = useState(25);
  const [override, setOverride] = useState(0);
  const cb = costBreaks[qtyIndex];
  const basePrice = cb.unitCost / (1 - margin / 100);
  const adjustedPrice = basePrice * (1 + override / 100);
  const extendedPrice = adjustedPrice * cb.qty;
  const impliedMargin = ((adjustedPrice - cb.unitCost) / adjustedPrice) * 100;
  const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Margin & Pricing Workspace</h1>

      <div className="flex gap-1 mb-6">
        {costBreaks.map((c, i) => (
          <button key={c.qty} onClick={() => setQtyIndex(i)}
            className={`px-4 py-2 text-sm rounded-t border border-b-0 ${i === qtyIndex ? "bg-card font-semibold border-border" : "bg-muted text-muted-foreground border-transparent"}`}>
            Qty {c.qty}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_340px] gap-6">
        <div className="space-y-6">
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Target Margin %</div>
            <div className="flex items-center gap-4">
              <Slider value={[margin]} onValueChange={v => setMargin(v[0])} min={0} max={50} step={0.5} className="flex-1" />
              <span className="text-lg font-bold w-16 text-right">{margin.toFixed(1)}%</span>
            </div>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Price Override Adjustment %</div>
            <div className="flex items-center gap-4">
              <Slider value={[override]} onValueChange={v => setOverride(v[0])} min={-20} max={20} step={0.5} className="flex-1" />
              <span className="text-lg font-bold w-16 text-right">{override.toFixed(1)}%</span>
            </div>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Unit Cost", value: fmt(cb.unitCost) },
                { label: "Unit Price", value: fmt(adjustedPrice) },
                { label: "Extended Price", value: fmt(extendedPrice) },
                { label: "Implied Margin", value: impliedMargin.toFixed(1) + "%" },
              ].map(item => (
                <div key={item.label}>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{item.label}</div>
                  <div className="text-xl font-bold mt-1">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-4">Approval Timeline</div>
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
