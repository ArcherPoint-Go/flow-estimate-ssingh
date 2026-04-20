import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { costBreaks, materialDetail } from "@/data/mockData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function CostBuildPage() {
  const [qtyIndex, setQtyIndex] = useState(0);
  const [view, setView] = useState<"internal" | "customer">("internal");
  const cb = costBreaks[qtyIndex];
  const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const costCategories = [
    { label: "Material", value: cb.material, color: "text-primary" },
    { label: "Labor", value: cb.labor, color: "text-info" },
    { label: "Processing & Outside Services", value: cb.processing, color: "text-success" },
    { label: "Value-Added & Commercial", value: cb.valueAdded, color: "text-warning" },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Badge className="bg-info text-info-foreground mb-2">AI-Generated Estimate</Badge>
      <div className="flex items-start justify-between mb-6">
        <h1 className="text-2xl font-bold">LP Turbine Disk – Stage 2 – Cost Build</h1>
        <div className="flex border border-border rounded overflow-hidden text-xs">
          <button onClick={() => setView("internal")} className={`px-3 py-1.5 ${view === "internal" ? "bg-card font-semibold" : "bg-muted text-muted-foreground"}`}>Internal View</button>
          <button onClick={() => setView("customer")} className={`px-3 py-1.5 ${view === "customer" ? "bg-card font-semibold" : "bg-muted text-muted-foreground"}`}>Customer View</button>
        </div>
      </div>

      <div className="flex gap-1 mb-6">
        {costBreaks.map((c, i) => (
          <button key={c.qty} onClick={() => setQtyIndex(i)}
            className={`px-4 py-2 text-sm rounded-t border border-b-0 ${i === qtyIndex ? "bg-card font-semibold border-border" : "bg-muted text-muted-foreground border-transparent"}`}>
            Qty {c.qty}
          </button>
        ))}
      </div>

      <div className="bg-card rounded-lg border border-border p-6 mb-6">
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Total Cost</div>
            <div className="text-3xl font-bold">{fmt(cb.totalCost)}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Unit Cost</div>
            <div className="text-3xl font-bold">{fmt(cb.unitCost)}</div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {costCategories.map(cat => {
            const pct = ((cat.value / cb.totalCost) * 100).toFixed(1);
            return (
              <div key={cat.label} className={`border-t-2 pt-3 ${cat.color}`}>
                <div className={`text-[10px] font-semibold uppercase tracking-wider ${cat.color}`}>{cat.label}</div>
                <div className="text-xl font-bold mt-1 text-foreground">{fmt(cat.value)}</div>
                <div className="text-xs text-muted-foreground">{fmt(cat.value / cb.qty)}/unit&nbsp;&nbsp;{pct}% of total</div>
              </div>
            );
          })}
        </div>
      </div>

      <Accordion type="single" collapsible defaultValue="material">
        <AccordionItem value="material" className="bg-card rounded-lg border border-border mb-2">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold">Material Detail</AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="grid grid-cols-2 gap-x-12 gap-y-2">
              {Object.entries(materialDetail).filter(([k]) => k !== "source" && k !== "sourceDate").map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm py-1 border-b border-border">
                  <span className="text-muted-foreground capitalize">{k.replace(/([A-Z])/g, " $1")}</span>
                  <span className="font-mono">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-xs text-primary font-medium">{materialDetail.source}</span>
              <span className="text-xs text-muted-foreground">· {materialDetail.sourceDate}</span>
            </div>
          </AccordionContent>
        </AccordionItem>
        {[
          { value: "labor", label: "Labor Detail", text: "Labor breakdown includes setup, forge operations, heat treat, machining, and inspection hours." },
          { value: "processing", label: "Processing & Outside Services Detail", text: "Includes NDT, heat treatment, and third-party machining services." },
          { value: "dimensions", label: "Dimensional Parameters", text: "Key dimensional inputs used in cost calculations." },
          { value: "valueadded", label: "Value-Added & Commercial Adders", text: "Includes packaging, freight, certification, and commercial overhead." },
        ].map(item => (
          <AccordionItem key={item.value} value={item.value} className="bg-card rounded-lg border border-border mb-2">
            <AccordionTrigger className="px-4 py-3 text-sm font-semibold">{item.label}</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
