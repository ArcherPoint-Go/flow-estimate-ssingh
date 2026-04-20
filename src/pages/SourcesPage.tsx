import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dataSourceRegistry, materialPrices } from "@/data/mockData";

const tabs = ["Materials", "Rate Cards", "Outside Processing", "Freight & Packaging"];

export default function SourcesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const filteredSources = dataSourceRegistry.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Sources</h1>
          <p className="text-sm text-muted-foreground">Read-only price lists and data sources</p>
        </div>
        <div className="flex items-center gap-3">
          <Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="w-40 h-8 text-sm" />
          <Button variant="outline" size="sm">Request Update</Button>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-4 mb-8">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Data Source Registry</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground text-xs">
              <th className="text-left py-2 px-2">Source ID</th>
              <th className="text-left py-2 px-2">Name</th>
              <th className="text-left py-2 px-2">Data Owner</th>
              <th className="text-left py-2 px-2">Refresh</th>
              <th className="text-left py-2 px-2">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {filteredSources.map(src => (
              <tr key={src.id} className="border-b border-border last:border-0">
                <td className="py-2 px-2 font-mono text-xs">{src.id}</td>
                <td className="py-2 px-2">{src.name}</td>
                <td className="py-2 px-2 text-muted-foreground">{src.owner}</td>
                <td className="py-2 px-2"><Badge variant="outline" className="text-[10px] font-semibold">{src.refresh}</Badge></td>
                <td className="py-2 px-2">{src.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-1 mb-4">
        {tabs.map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)}
            className={`px-4 py-2 text-sm rounded-t border border-b-0 ${i === activeTab ? "bg-card font-semibold border-border" : "bg-muted text-muted-foreground border-transparent"}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 0 && (
        <div className="bg-card rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-xs">
                <th className="text-left py-2 px-3">Material</th>
                <th className="text-left py-2 px-3">Form</th>
                <th className="text-right py-2 px-3">Base $/lb</th>
                <th className="text-right py-2 px-3">Surcharge</th>
                <th className="text-right py-2 px-3">Effective $/lb</th>
                <th className="text-right py-2 px-3">Lead Time</th>
                <th className="text-right py-2 px-3">Effective</th>
              </tr>
            </thead>
            <tbody>
              {materialPrices.map(mp => (
                <tr key={mp.material} className="border-b border-border last:border-0">
                  <td className="py-2 px-3 font-medium">{mp.material}</td>
                  <td className="py-2 px-3">{mp.form}</td>
                  <td className="py-2 px-3 text-right font-mono">{mp.basePricePerLb}</td>
                  <td className="py-2 px-3 text-right">{mp.surcharge}</td>
                  <td className="py-2 px-3 text-right font-mono">{mp.effectivePrice}</td>
                  <td className="py-2 px-3 text-right">{mp.leadTime}</td>
                  <td className="py-2 px-3 text-right">{mp.effective}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab > 0 && (
        <div className="bg-card rounded-lg border border-border p-8 text-center text-muted-foreground">
          {tabs[activeTab]} data would appear here.
        </div>
      )}
    </div>
  );
}
