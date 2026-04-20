// RFQ Data
export interface RFQ {
  id: string;
  segment: string;
  customer: string;
  partName: string;
  dueDate: string;
  qtyBreaks: string;
  partNumber: string;
  partFamily: string;
  material: string;
  materialForm: string;
  forgingType: string;
  complexity: string;
  finishedWeight: string;
  roughWeight: string;
  annualVolume: number;
  delivery: string;
  specsNdt: string[];
  certifications: string[];
  dimensions: Record<string, string>;
  notes: string;
}

export const rfqs: RFQ[] = [
  {
    id: "RFQ-2026-0001",
    segment: "Aerospace – Turbine",
    customer: "Pratt & Whitney",
    partName: "LP Turbine Disk – Stage 2",
    dueDate: "2026-03-01",
    qtyBreaks: "10 / 50 / 200",
    partNumber: "PW-TRB-4421",
    partFamily: "Turbine Disks",
    material: "Inconel 718 (AMS 5663)",
    materialForm: "Billet",
    forgingType: "Closed Die",
    complexity: "High",
    finishedWeight: "42.5 lb",
    roughWeight: "68 lb",
    annualVolume: 600,
    delivery: "East Hartford, CT",
    specsNdt: ["AMS 2774", "AMS 2759/3", "ASTM E1444", "Ultrasonic (AMS 2630)", "FPI (AMS 2647)"],
    certifications: ["AS9100D", "NADCAP Heat Treat", "NADCAP NDT"],
    dimensions: {
      "OD": '18.75"',
      "ID (Bore)": '6.2"',
      "Height": '4.8"',
      "OD Tolerance": "±0.010",
      "Surface Finish": "125 µin (as-forged); 63 µin (machined faces)",
      "Face Flatness": "0.005 TIR",
      "Concentricity": "0.004 TIR",
      "Datum Scheme": "Three-plane: A (bore centerline), B (face), C (keyway slot)",
    },
    notes: "Tight tolerances on bore ID. Customer requires full material traceability per AMS 2809.",
  },
  {
    id: "RFQ-2026-0002",
    segment: "Heavy Equipment – Mining",
    customer: "Caterpillar Inc.",
    partName: "Final Drive Gear Blank",
    dueDate: "2026-03-10",
    qtyBreaks: "25 / 100 / 500",
    partNumber: "CAT-FDG-8812",
    partFamily: "Gear Blanks",
    material: "AISI 4340 (AMS 6414)",
    materialForm: "Bar Stock",
    forgingType: "Closed Die",
    complexity: "Medium",
    finishedWeight: "85 lb",
    roughWeight: "120 lb",
    annualVolume: 1200,
    delivery: "Peoria, IL",
    specsNdt: ["AMS 2759/1", "ASTM A388"],
    certifications: ["ISO 9001:2015"],
    dimensions: { "OD": '24"', "Height": '6"' },
    notes: "",
  },
  {
    id: "RFQ-2026-0003",
    segment: "Nuclear / Defense",
    customer: "BWX Technologies",
    partName: "Reactor Pressure Vessel Flange",
    dueDate: "2026-02-28",
    qtyBreaks: "2 / 5 / 10",
    partNumber: "BWX-RPV-3301",
    partFamily: "Flanges",
    material: "SA-508 Grade 3 Class 1",
    materialForm: "Ingot (VAR)",
    forgingType: "Open Die",
    complexity: "High",
    finishedWeight: "2,200 lb",
    roughWeight: "3,500 lb",
    annualVolume: 20,
    delivery: "Lynchburg, VA",
    specsNdt: ["ASME SA-388", "ASME SA-578"],
    certifications: ["ASME N-Stamp", "NQA-1"],
    dimensions: { "OD": '72"', "Height": '18"' },
    notes: "",
  },
  {
    id: "RFQ-2026-0004",
    segment: "Commercial – Firearms",
    customer: "Smith & Wesson Brands",
    partName: "Revolver Frame Forging",
    dueDate: "2026-03-15",
    qtyBreaks: "500 / 2000 / 10000",
    partNumber: "SW-RF-1102",
    partFamily: "Frames",
    material: "AISI 1045",
    materialForm: "Bar Stock",
    forgingType: "Closed Die",
    complexity: "Low",
    finishedWeight: "0.85 lb",
    roughWeight: "1.2 lb",
    annualVolume: 25000,
    delivery: "Springfield, MA",
    specsNdt: [],
    certifications: ["ISO 9001:2015"],
    dimensions: { "Length": '8"', "Width": '5"' },
    notes: "",
  },
];

// Envelope Data
export interface EnvelopeOption {
  id: string;
  name: string;
  match: number;
  type: "Recommended" | "Alternative";
  description?: string;
  routingSteps: string[];
  leadTime: string;
}

export const envelopeOptions: EnvelopeOption[] = [
  {
    id: "ENV-001",
    name: "Aerospace Closed-Die – Superalloy",
    match: 94,
    type: "Recommended",
    routingSteps: [
      "Receive & Inspect Raw Material",
      "Billet Cut & Weigh",
      "Preheat (Furnace A – 1900°F)",
      "Upset Forge (Press 1 – 4000T)",
      "Blocker Die (Press 1)",
      "Finish Die (Press 2 – 6000T)",
    ],
    leadTime: "14 weeks",
  },
  {
    id: "ENV-005",
    name: "Aerospace Closed-Die – Titanium",
    match: 72,
    type: "Alternative",
    description: "Titanium routing could adapt for Inconel but lacks vacuum HT optimization",
    routingSteps: [],
    leadTime: "12 weeks",
  },
  {
    id: "ENV-006",
    name: "Industrial Open-Die – Alloy Steel",
    match: 35,
    type: "Alternative",
    description: "Open-die not suitable for turbine disk geometry; included for completeness",
    routingSteps: [],
    leadTime: "10 weeks",
  },
];

export const envelopeRationale = [
  "Part family 'Turbine Disks' matches ENV-001 historical routing with 94% similarity",
  "Material spec Inconel 718 requires NADCAP vacuum heat treat – ENV-001 includes this step",
  "Customer Pratt & Whitney has 3 prior orders using ENV-001 successfully",
  "Complexity 'High' aligns with ENV-001's 16-step routing including dual NDT",
  "Closed-die forging type is direct match",
];

export const riskFlags = [
  { level: "Medium" as const, title: "Tight bore ID tolerance", detail: "Add precision machining pass; budget +2 hours CNC turning" },
  { level: "Low" as const, title: "Full material traceability (AMS 2809)", detail: "Standard for ENV-001; ensure CMTR chain is documented" },
];

export const dimensionalEnvelope = [
  { label: "Max OD", value: '36"' },
  { label: "Min OD", value: '4"' },
  { label: "Max Height", value: '12"' },
  { label: "Min Height", value: '0.5"' },
  { label: "Max Weight", value: "250 lb" },
  { label: "Min Weight", value: "2 lb" },
  { label: "Typical OD Tol.", value: "±0.010 to ±0.030" },
  { label: "Typical ID Tol.", value: "±0.005 to ±0.015" },
  { label: "Surface Finish (as-forged)", value: "63-250 µin as-forged; 16-63 µin machined" },
  { label: "Die Closure Tol.", value: "±0.015" },
  { label: "Straightness / ft", value: '0.010"' },
];

export const historicalBids = [
  { id: "HB-2025-0851", date: "2025-10-05", customer: "Pratt & Whitney", qty: 100, unitPrice: "$4,891", outcome: "Won", envelope: "ENV-001", similarity: "96%" },
  { id: "HB-2025-0734", date: "2025-07-22", customer: "GE Aerospace", qty: 50, unitPrice: "$5,230", outcome: "Won", envelope: "ENV-001", similarity: "91%" },
  { id: "HB-2025-0612", date: "2025-04-15", customer: "Rolls-Royce", qty: 200, unitPrice: "$4,650", outcome: "Lost", envelope: "ENV-001", similarity: "88%" },
  { id: "HB-2024-1102", date: "2024-11-08", customer: "Pratt & Whitney", qty: 25, unitPrice: "$6,100", outcome: "Won", envelope: "ENV-001", similarity: "85%" },
  { id: "HB-2024-0901", date: "2024-09-12", customer: "Safran", qty: 75, unitPrice: "$5,500", outcome: "Lost", envelope: "ENV-005", similarity: "78%" },
];

// Cost Build Data
export interface CostBreak {
  qty: number;
  totalCost: number;
  unitCost: number;
  material: number;
  labor: number;
  processing: number;
  valueAdded: number;
}

export const costBreaks: CostBreak[] = [
  { qty: 10, totalCost: 59389.80, unitCost: 5938.98, material: 26839.80, labor: 18450, processing: 5600, valueAdded: 8500 },
  { qty: 50, totalCost: 247450, unitCost: 4949, material: 125000, labor: 72000, processing: 22000, valueAdded: 28450 },
  { qty: 200, totalCost: 836000, unitCost: 4180, material: 420000, labor: 240000, processing: 80000, valueAdded: 96000 },
];

export const materialDetail = {
  material: "Inconel 718 (AMS 5663)",
  purchasedWeight: "68 lb",
  yield: "62.5%",
  pricePerLb: "$39.47",
  surcharge: "8.5%",
  scrapRecovery: "$2.10/lb",
  netCostPerPiece: "$2,630.43",
  source: "Material Price List",
  sourceDate: "2026-01-15",
};

// Pricing Data
export const pricingDefaults = {
  targetMargin: 25,
  priceOverride: 0,
};

// Approval & Audit
export const auditTimeline = [
  { date: "2/10/2026, 4:15:00 AM", actor: "System", action: "RFQ received and ingested", detail: "Auto-extracted from email attachment" },
  { date: "2/10/2026, 4:16:00 AM", actor: "AI Assistant", action: "Envelope recommended", detail: "ENV-001 selected with 94% confidence" },
  { date: "2/10/2026, 4:18:00 AM", actor: "AI Assistant", action: "Cost estimate generated", detail: "3 qty break estimates built" },
  { date: "2/11/2026, 5:30:00 AM", actor: "Mike Reynolds (Sales Manager)", action: "Reviewed estimate", detail: "Requested margin analysis for 50-unit break" },
  { date: "2/11/2026, 9:00:00 AM", actor: "Sarah Kim (VP Sales)", action: "Margin adjustment", detail: "Approved 20% target margin for qty 200 to improve win probability" },
  { date: "2/12/2026, 4:00:00 AM", actor: "Mike Reynolds", action: "Price override", detail: "Adjusted qty 10 price from $7,423 to $7,823 (+5.4%) per customer relationship assessment" },
  { date: "2/13/2026, 6:00:00 AM", actor: "Sarah Kim", action: "Competitive review completed", detail: "Reviewed market positioning; approved pricing strategy" },
  { date: "2/14/2026, 3:30:00 AM", actor: "Tom Bradley (Quality Director)", action: "Technical review", detail: "Confirmed NADCAP compliance and NDT scope" },
  { date: "2/14/2026, 10:00:00 AM", actor: "Sarah Kim", action: "Final approval", detail: "Quote package approved for release" },
];

// Competitive Data
export const competitors = [
  { name: "Precision Castparts (Berkshire)", price: "$5,400.00", notes: "Aggressive pricing on aerospace; vertically integrated" },
  { name: "Alcoa Howmet", price: "$5,750.00", notes: "Strong in turbine disks; may undercut on volume" },
  { name: "Bharat Forge (India)", price: "$4,800.00", notes: "Offshore pricing advantage; some customers resist for NADCAP work" },
];

export const winDrivers = [
  "Existing P&W relationship",
  "NADCAP certifications",
  "Domestic preference for defense-adjacent",
];

// Sources Data
export const dataSourceRegistry = [
  { id: "SRC-MAT-001", name: "Material Price List", owner: "Procurement – Raw Materials", refresh: "Monthly", lastUpdated: "2026-01-15" },
  { id: "SRC-RATE-001", name: "Internal Rate Cards", owner: "Operations – Cost Engineering", refresh: "Quarterly", lastUpdated: "2026-01-01" },
  { id: "SRC-OP-001", name: "Outside Processing Catalog", owner: "Supply Chain – Outside Services", refresh: "Semi-Annual", lastUpdated: "2025-11-01" },
  { id: "SRC-FRT-001", name: "Freight & Packaging Table", owner: "Logistics", refresh: "Quarterly", lastUpdated: "2025-12-01" },
  { id: "SRC-HIST-001", name: "Historical Bid Database", owner: "Sales – Bid Desk", refresh: "Continuous", lastUpdated: "2026-02-10" },
  { id: "SRC-MKT-001", name: "Market Intelligence Feed", owner: "Strategy & Pricing", refresh: "Weekly", lastUpdated: "2026-02-14" },
  { id: "SRC-ERP-001", name: "ERP – Production Standards", owner: "Manufacturing Engineering", refresh: "Continuous", lastUpdated: "2026-02-01" },
];

export const materialPrices = [
  { material: "Inconel 718 (AMS 5663)", form: "Billet", basePricePerLb: "$32.50", surcharge: "8.5%", effectivePrice: "$39.47", leadTime: "8w", effective: "2026-01-15" },
  { material: "AISI 4340 (AMS 6414)", form: "Bar Stock", basePricePerLb: "$2.85", surcharge: "3.2%", effectivePrice: "$3.39", leadTime: "3w", effective: "2026-01-15" },
  { material: "SA-508 Grade 3 Class 1", form: "Ingot (VAR)", basePricePerLb: "$8.75", surcharge: "5%", effectivePrice: "$10.99", leadTime: "14w", effective: "2026-01-15" },
  { material: "17-4 PH Stainless (AMS 5643)", form: "Bar Stock", basePricePerLb: "$6.20", surcharge: "4.8%", effectivePrice: "$7.60", leadTime: "4w", effective: "2026-01-15" },
  { material: "Ti-6Al-4V (AMS 4928)", form: "Billet", basePricePerLb: "$28.00", surcharge: "6%", effectivePrice: "$33.18", leadTime: "10w", effective: "2026-01-15" },
  { material: "AISI 1045", form: "Bar Stock", basePricePerLb: "$1.15", surcharge: "2.5%", effectivePrice: "$1.18", leadTime: "2w", effective: "2026-01-15" },
];

// Workflow steps (drives the stepper in AppLayout)
export const workflowSteps = [
  { label: "RFQs", path: "/rfqs" },
  { label: "Envelope", path: "/envelope" },
  { label: "Cost Build", path: "/cost-build" },
  { label: "Pricing", path: "/pricing" },
  { label: "Competitive", path: "/competitive" },
  { label: "Approval", path: "/approval" },
  { label: "Quote Package", path: "/quote-package" },
];
