import { Link } from "react-router-dom";

export default function QuotePackagePage() {
  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-2">Quote Package</h1>
      <p className="text-muted-foreground mb-6">Quote package generation coming soon.</p>
      <Link to="/rfqs?rfq=RFQ-2026-0001" className="text-primary hover:underline text-sm">
        ← Back to RFQs
      </Link>
    </div>
  );
}
