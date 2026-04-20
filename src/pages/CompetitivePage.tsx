import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { costBreaks, competitors, winDrivers } from "@/data/mockData";

export default function CompetitivePage() {
  const [qtyIndex, setQtyIndex] = useState(0);
  const cb = costBreaks[qtyIndex];
  const ourPrice = cb.unitCost;
  const competitorPrices = competitors.map(c => parseFloat(c.price.replace(/[$,]/g, "")));
  const median = [...competitorPrices].sort((a, b) => a - b)[1];
  const minPrice = 5200;
  const maxPrice = 6800;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Badge className="bg-primary text-primary-foreground mb-2">Mock Competitive Intel</Badge>
      <h1 className="text-2xl font-bold mb-6">Competitive Positioning – Aerospace – Superalloy Forgings</h1>

      <div className="flex gap-1 mb-6">
        {costBreaks.map((c, i) => (
          <button key={c.qty} onClick={() => setQtyIndex(i)}
            className={`px-4 py-2 text-sm rounded-t border border-b-0 ${i === qtyIndex ? "bg-card font-semibold border-border" : "bg-muted text-muted-foreground border-transparent"}`}>
            Qty {c.qty}
          </button>
        ))}
      </div>

      <div className="bg-card rounded-lg border border-border p-6 mb-6">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-4">Market Band</div>
        <div className="relative h-10 flex items-center">
          <div className="flex items-center justify-between w-full text-sm">
            <span className="font-mono">${minPrice.toLocaleString()}</span>
            <div className="flex-1 mx-4 relative">
              <div className="h-3 bg-muted rounded-full relative">
                {competitorPrices.map((p, i) => {
                  const pct = ((p - minPrice) / (maxPrice - minPrice)) * 100;
                  return <div key={i} className="absolute w-3 h-3 bg-destructive rounded-full" style={{ left: `${pct}%`, top: 0 }} />;
                })}
                <div className="absolute w-3 h-3 bg-info rounded-full" style={{ left: `${((ourPrice - minPrice) / (maxPrice - minPrice)) * 100}%`, top: 0 }} />
              </div>
            </div>
            <span className="font-mono">${maxPrice.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-6 mt-3 text-xs">
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-info rounded-full" /> Our price: ${ourPrice.toLocaleString()}</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-destructive rounded-full" /> Competitors</div>
          <span className="text-muted-foreground">Median: ${median.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Competitor Analysis</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-xs">
                <th className="text-left py-2">Competitor</th>
                <th className="text-right py-2">Likely Price</th>
                <th className="text-left py-2 pl-4">Notes</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map(c => (
                <tr key={c.name} className="border-b border-border last:border-0">
                  <td className="py-2 font-medium">{c.name}</td>
                  <td className="py-2 text-right font-mono">{c.price}</td>
                  <td className="py-2 pl-4 text-xs text-muted-foreground">{c.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Win Probability</div>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(var(--info))" strokeWidth="3" strokeDasharray={`${62 * 0.8796} 87.96`} strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">62%</span>
            </div>
            <div>
              <div className="font-semibold">Estimated Win Probability</div>
              <div className="text-xs text-muted-foreground">Based on competitive positioning and historical win rates</div>
            </div>
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Win Drivers</div>
          <ul className="space-y-1.5">
            {winDrivers.map(d => (
              <li key={d} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-success" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
