import { Link, useLocation, useSearchParams } from "react-router-dom";
import { FileText, Mail, DollarSign, Target, BarChart3, CheckSquare, Package, Database } from "lucide-react";
import { workflowSteps } from "@/data/mockData";

const navItems = [
  { label: "RFQs", path: "/rfqs", icon: FileText },
  { label: "Envelope", path: "/envelope", icon: Mail },
  { label: "Cost Build", path: "/cost-build", icon: DollarSign },
  { label: "Pricing", path: "/pricing", icon: Target },
  { label: "Competitive", path: "/competitive", icon: BarChart3 },
  { label: "Approval", path: "/approval", icon: CheckSquare },
  { label: "Quote Package", path: "/quote-package", icon: Package },
  { label: "Sources", path: "/sources", icon: Database },
];

function WorkflowStepper() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const rfq = searchParams.get("rfq") || "RFQ-2026-0001";
  const currentIndex = workflowSteps.findIndex(s => location.pathname.startsWith(s.path));
  const isSourcesPage = location.pathname === "/sources";

  return (
    <div className="bg-background border-b border-border px-6 py-1.5 flex items-center gap-1 text-xs overflow-x-auto">
      {workflowSteps.map((step, i) => {
        const isComplete = isSourcesPage || i < currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <span key={step.label} className="flex items-center gap-1 whitespace-nowrap">
            {i > 0 && <span className="text-muted-foreground mx-1">→</span>}
            <Link
              to={`${step.path}?rfq=${rfq}`}
              className={`${isComplete ? "text-success font-medium" : isCurrent ? "text-foreground font-semibold" : "text-muted-foreground"} hover:underline`}
            >
              {isComplete && "✓ "}{!isComplete && !isCurrent ? `${i + 1} ` : ""}{step.label}
            </Link>
          </span>
        );
      })}
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const rfq = searchParams.get("rfq") || "RFQ-2026-0001";

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-navbar text-navbar-foreground h-12 flex items-center px-4 gap-1 shrink-0">
        <Link to={`/rfqs?rfq=${rfq}`} className="flex items-center gap-2 mr-4">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-primary-foreground text-xs font-bold">F</div>
          <span className="font-semibold text-sm tracking-tight">ForgeBid AI</span>
        </Link>

        <div className="flex items-center gap-0.5">
          {navItems.map(item => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={`${item.path}?rfq=${rfq}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-navbar-active text-navbar-active-foreground"
                    : "text-navbar-foreground/70 hover:text-navbar-foreground hover:bg-navbar-foreground/10"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-2 text-xs">
          <span className="text-navbar-foreground/50">SCENARIO</span>
          <div className="bg-navbar-foreground/10 border border-navbar-foreground/20 rounded px-3 py-1 text-navbar-foreground/90">
            {rfq} – Prat...
          </div>
        </div>
      </nav>

      <WorkflowStepper />

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
