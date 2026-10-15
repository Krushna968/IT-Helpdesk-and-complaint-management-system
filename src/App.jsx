import React, { useState, useMemo } from 'react';
import {
  Wrench,
  Search,
  ShoppingCart,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  FileText,
  Filter,
  Plus,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Building,
  Truck,
  Award,
  Phone,
  HelpCircle,
  Cpu,
  Layers,
  Settings,
  Flame,
  Gauge,
  Activity,
  HardDrive,
  Wifi,
  Printer,
  Key,
  ShieldAlert,
  User,
  Trash2,
  ArrowLeft,
  UploadCloud,
  Check,
  Eye,
  Send,
  Zap,
  Info,
  Package,
  X
} from 'lucide-react';

// ==========================================
// 1. SAMPLE DATA (STORE & HELPDESK)
// ==========================================

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    sku: 'AF-BRK-1200-S',
    name: 'Autoforge AccuVent Slotted Brake Rotor Pair (Front)',
    category: 'Brake Systems',
    price: 4850,
    originalPrice: 6200,
    discount: '22% off',
    rating: 4.8,
    reviews: 142,
    stockText: '28 pkts in stock',
    inStock: true,
    tag: 'High Carbon Steel',
    tagColor: 'bg-slate-800 text-white',
    fitment: 'Fits: Mahindra Scorpio/Thar, Tata Safari (2018-2024)',
    image: 'https://images.unsplash.com/photo-1600790142055-619df03207e6?auto=format&fit=crop&w=700&q=80',
    description: 'Precision-machined high carbon metallurgy engineered for rapid heat dissipation under heavy commercial braking loads. Features directional curved cooling vanes and bi-directional friction cleaning slots.',
    specs: {
      'Rotor Diameter': '312 mm',
      'Thickness': '28.0 mm (Min 25.4 mm)',
      'Bolt Hole Circle': '5 x 114.3 mm',
      'Material Grade': 'G3000 Alloyed High-Carbon Cast Iron',
      'Coating': 'Geomet 360 Anti-Rust Zinc Flake Coating',
      'Runout Tolerance': '< 0.005 mm (Exceeds ISO 9001 Specs)'
    }
  },
  {
    id: 'prod-2',
    sku: 'AF-ENG-4502-K',
    name: 'ProSeries Forged Connecting Rod & Piston Kit (Set of 4)',
    category: 'Engine Spares',
    price: 16999,
    originalPrice: 21500,
    discount: '21% off',
    rating: 4.9,
    reviews: 84,
    stockText: '9 sets left',
    inStock: true,
    tag: 'Billet Aluminium',
    tagColor: 'bg-amber-600 text-white',
    fitment: 'Fits: Tata Xenon 2.2L, Mahindra Scorpio Pik-Up 2.2 CRDe',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=700&q=80',
    description: 'H-Beam forged 4340 chromoly steel connecting rods paired with silicon-alloy forged pistons. Engineered for industrial turbo diesel engines demanding up to 2.5 bar boost pressure without structural fatigue.',
    specs: {
      'Center-to-Center Length': '148.5 mm',
      'Wrist Pin Diameter': '22 mm Fully Floating',
      'Tensile Strength': '980 MPa Heat Treated',
      'Weight Variance': '+/- 1.0 gram balanced per set',
      'Includes': 'ARP 2000 Cap Bolts & Teflon Coated Skirts'
    }
  },
  {
    id: 'prod-3',
    sku: 'AF-TRB-7001-X',
    name: 'Twin-Scroll High Performance Turbocharger Core',
    category: 'Engine Spares',
    price: 28400,
    originalPrice: 34500,
    discount: '18% off',
    rating: 4.7,
    reviews: 120,
    stockText: '3 units in stock',
    inStock: true,
    tag: 'Dynamic Balanced',
    tagColor: 'bg-orange-600 text-white',
    fitment: 'Fits: Mahindra Scorpio-N, XUV700 2.2L mHawk Diesel',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=700&q=80',
    description: 'High-speed VSR balanced replacement cartridge with Inconel 713C turbine wheel. Engineered for immediate spooling at low RPMs and sustained thermal threshold up to 920°C exhaust gas temperatures.',
    specs: {
      'Compressor Inducer': '46.5 mm / Exducer: 60.0 mm',
      'Turbine Housing': 'High Silicon Ductile Iron (HiSi-Mo)',
      'Balance Certification': 'Dynamic VSR balanced < 0.05g at 190,000 RPM',
      'Actuator': 'Electronic Wastegate Stepper Motor',
      'Cooling': 'Integrated Water Jacket + Dual Oil Feed'
    }
  },
  {
    id: 'prod-4',
    sku: 'AF-FLT-0985-PE',
    name: 'Micro-Pore Synthetic Extended Life Oil Filter (Packet 3)',
    category: 'Maintenance Kits',
    price: 1290,
    originalPrice: 1650,
    discount: '22% off',
    rating: 4.6,
    reviews: 310,
    stockText: '18+ available',
    inStock: true,
    tag: 'Synthetic Blend',
    tagColor: 'bg-emerald-600 text-white',
    fitment: 'Universal Spec for M20 x 1.5 Thread Commercial Fleets',
    image: 'https://images.unsplash.com/photo-1635770310672-8d76dca33df7?auto=format&fit=crop&w=700&q=80',
    description: '100% synthetic depth filter media capable of capturing 99.2% of microscopic contaminants down to 15 microns. Silicon anti-drainback valve ensures dry-start protection for commercial logistics vehicles.',
    specs: {
      'Efficiency': '99.2% @ 15 Microns (ISO 4548-12 Certified)',
      'Burst Pressure': '280 PSI Heavy Gauge Steel Casing',
      'Gasket Material': 'Viton High-Temperature Nitrile',
      'Service Interval': 'Up to 20,000 km or 500 Engine Hours'
    }
  },
  {
    id: 'prod-5',
    sku: 'AF-TRN-5520-K',
    name: 'Heavy-Duty Dual Mass Flywheel & Clutch Assembly',
    category: 'Transmission',
    price: 22750,
    originalPrice: 28500,
    discount: '20% off',
    rating: 4.9,
    reviews: 64,
    stockText: '12 units in stock',
    inStock: true,
    tag: 'Sintered Friction',
    tagColor: 'bg-blue-600 text-white',
    fitment: 'Fits: Maruti Brezza / S-Cross / Vitara 1.3L DDiS 200',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=700&q=80',
    description: 'Factory-calibrated dual mass flywheel designed to damp torsional vibration and protect gearbox synchronizers under continuous stop-go urban delivery and intercity commercial transit.',
    specs: {
      'Diameter': '230 mm',
      'Clutch Disc Spline': '20 Teeth x 22.4 mm',
      'Torsional Dampening': 'Dual Stage Arc Springs',
      'Friction Compound': 'Cerametallic Copper-Kevlar Blend'
    }
  },
  {
    id: 'prod-6',
    sku: 'AF-SUS-3200-G',
    name: 'Inverted Monotube Gas-Charged Front Strut Assembly',
    category: 'Suspension',
    price: 6400,
    originalPrice: 8500,
    discount: '25% off',
    rating: 4.8,
    reviews: 91,
    stockText: '32 units in stock',
    inStock: true,
    tag: 'Nitrogen Charged',
    tagColor: 'bg-purple-600 text-white',
    fitment: 'Fits: Toyota Innova / Crysta 2.4L/2.8L (GGN40/KUN40)',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=700&q=80',
    description: 'High-pressure nitrogen gas pressurized monotube strut featuring hard-chromed 18mm piston rods. Prevents hydraulic cavitation and delivers pinpoint vehicle stability under full commercial passenger payload.',
    specs: {
      'Bore Diameter': '46 mm Large Capacity Monotube',
      'Gas Pressure': '25 Bar Nitrogen Pre-charge',
      'Damping Valve': 'Multi-disc digressive deflection shim stack',
      'Surface Finish': 'Cathodic Electrodeposition (CED) rust-proof'
    }
  }
];

const INITIAL_TICKETS = [
  {
    id: 'THT-8841',
    subject: 'CNC Station 4 Industrial Touch Display Unresponsive',
    category: 'Hardware',
    reporter: 'Rajesh Kumar',
    reporterRole: 'Senior Shopfloor Engineer',
    empId: 'AF-EMP-4091',
    department: 'Production Engineering, Manesar Plant 2',
    assetTag: 'MC-CNC-04B',
    urgency: 'Critical',
    slaTime: '< 1 Hour (Line Stoppage)',
    status: 'In Progress',
    assignedTech: 'Vikas Sharma (Senior Industrial Tech)',
    createdAt: 'Today, 09:15 AM',
    timeline: [
      { time: '09:15 AM', label: 'Ticket Logged & Telemetry Flagged', done: true },
      { time: '09:22 AM', label: 'Auto-assigned to Tier-2 Shopfloor Automation Team', done: true },
      { time: '09:40 AM', label: 'Technician Dispatched with Siemens Simatic Replacement Panel', done: true },
      { time: '10:30 AM Est', label: 'Calibration & Safety Sign-off', done: false }
    ],
    notes: 'Operator reported screen frozen during milling cycle #208. Emergency stop verified functional. Backup terminal routed to station 5 temporarily.'
  },
  {
    id: 'THT-8839',
    subject: 'SAP S/4HANA IRN Generation Token Expired for Logistics Gate 2',
    category: 'ERP / Access',
    reporter: 'Sunil Rao',
    reporterRole: 'Dispatch Yard Supervisor',
    empId: 'AF-EMP-2108',
    department: 'Central Logistics Hub, Pune',
    assetTag: 'SRV-SAP-GT02',
    urgency: 'High',
    slaTime: 'Within 4 Hours',
    status: 'In Progress',
    assignedTech: 'Ananya Deshmukh (ERP Core Specialist)',
    createdAt: 'Today, 08:30 AM',
    timeline: [
      { time: '08:30 AM', label: 'Ticket Submitted via ERP Terminal', done: true },
      { time: '08:45 AM', label: 'GST NIC Portal Token Sync Failed', done: true },
      { time: '09:10 AM', label: 'API Security Token Re-generation Initiated', done: true },
      { time: '11:00 AM Est', label: 'Batch Invoicing Clearance', done: false }
    ],
    notes: '14 outbound fleet trucks queued at security dispatch gate. Immediate resolution required for e-Way bills.'
  },
  {
    id: 'THT-8820',
    subject: 'Thermal Barcode Dispatch Printer Head Streaking & Ribbon Jam',
    category: 'Printer & Labeling',
    reporter: 'Priya Nair',
    reporterRole: 'Packaging Lead',
    empId: 'AF-EMP-3312',
    department: 'Packaging & Dispatch, Faridabad',
    assetTag: 'PRN-ZBR-99',
    urgency: 'Medium',
    slaTime: 'Within 24 Hours',
    status: 'Open',
    assignedTech: 'Ganesh Pillai (IT Support Desk)',
    createdAt: 'Yesterday, 04:45 PM',
    timeline: [
      { time: '04:45 PM', label: 'Ticket Registered', done: true },
      { time: '05:15 PM', label: 'Spare printhead allocated from IT inventory', done: true },
      { time: 'Pending', label: 'Field Tech Replacement Scheduled for Shift A', done: false }
    ],
    notes: 'Zebra ZT411 thermal transfer unit printing faint QR codes that fail high-speed conveyor optical scanning.'
  },
  {
    id: 'THT-8798',
    subject: 'Wi-Fi AP Drop in Foundry Bay 3 Metallurgical Inspection Cell',
    category: 'Network & Wi-Fi',
    reporter: 'Deepak Verma',
    reporterRole: 'QC Metallurgist',
    empId: 'AF-EMP-5190',
    department: 'Foundry & Metallurgy, Faridabad Plant',
    assetTag: 'AP-CISCO-BAY3',
    urgency: 'Low',
    slaTime: 'Within 72 Hours',
    status: 'Resolved',
    assignedTech: 'Karthik Raja (Network Operations)',
    createdAt: 'Oct 14, 02:10 PM',
    timeline: [
      { time: 'Oct 14, 02:10 PM', label: 'Incident Created', done: true },
      { time: 'Oct 14, 03:00 PM', label: 'Switch port PoE renegotiation executed', done: true },
      { time: 'Oct 14, 04:30 PM', label: 'Signal RSSI verified at -58 dBm, Ticket Closed', done: true }
    ],
    notes: 'High ambient temperature caused optical SFP module to overheat. Replaced with industrial-rated 85°C transceiver.'
  }
];

// ==========================================
// 2. MAIN APPLICATION COMPONENT
// ==========================================

export default function App() {
  // Navigation: 'home' | 'product-details' | 'cart' | 'helpdesk' | 'raise-complaint'
  const [currentView, setCurrentView] = useState('home');

  // Products & Filtering
  const [products] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(INITIAL_PRODUCTS[0]);

  // Fitment Selector State
  const [fitmentMake, setFitmentMake] = useState('');
  const [fitmentModel, setFitmentModel] = useState('');
  const [fitmentEngine, setFitmentEngine] = useState('');

  // Cart State
  const [cart, setCart] = useState([
    { ...INITIAL_PRODUCTS[0], quantity: 2 },
    { ...INITIAL_PRODUCTS[3], quantity: 1 }
  ]);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  // Tickets & IT Desk State
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [ticketFilterStatus, setTicketFilterStatus] = useState('All');
  const [ticketSearch, setTicketSearch] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(INITIAL_TICKETS[0]);
  const [complaintTab, setComplaintTab] = useState('raise'); // 'raise' | 'track'

  // New Complaint / Ticket Form State
  const [formData, setFormData] = useState({
    empName: 'Rajesh Kumar',
    empId: 'AF-EMP-4091',
    department: 'Production Engineering, Manesar Plant 2',
    assetTag: '',
    category: 'Hardware',
    subject: '',
    urgency: 'High',
    description: '',
    isAnonymous: false,
    fileName: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Feedback Notification Toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (title, message, type = 'success') => {
    setToastMessage({ title, message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // ------------------------------------------
  // Cart Actions
  // ------------------------------------------
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    showToast(
      'Added to Procurement Cart',
      `${product.name} (x${qty}) added. Total items: ${cart.reduce((a, b) => a + b.quantity, 0) + qty}`,
      'success'
    );
  };

  const updateCartQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Item Removed', 'The selected item was removed from your cart.', 'info');
  };

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const cartGst = useMemo(() => Math.round(cartSubtotal * 0.18), [cartSubtotal]);
  const cartShipping = useMemo(() => (cartSubtotal > 5000 || cartSubtotal === 0 ? 0 : 350), [cartSubtotal]);
  const cartTotal = useMemo(() => cartSubtotal + cartGst + cartShipping, [cartSubtotal, cartGst, cartShipping]);
  const totalCartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  // ------------------------------------------
  // Product Filtering
  // ------------------------------------------
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchCat = selectedCategory === 'All' || prod.category === selectedCategory;
      const matchQuery =
        !searchQuery ||
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.fitment.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [products, selectedCategory, searchQuery]);

  // ------------------------------------------
  // Helpdesk Ticket Actions & Stats
  // ------------------------------------------
  const ticketStats = useMemo(() => {
    const total = tickets.length;
    const open = tickets.filter((t) => t.status === 'Open').length;
    const inProgress = tickets.filter((t) => t.status === 'In Progress').length;
    const resolved = tickets.filter((t) => t.status === 'Resolved').length;
    const critical = tickets.filter((t) => t.urgency === 'Critical' && t.status !== 'Resolved').length;
    return { total, open, inProgress, resolved, critical };
  }, [tickets]);

  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const matchStatus = ticketFilterStatus === 'All' || t.status === ticketFilterStatus;
      const matchSearch =
        !ticketSearch ||
        t.id.toLowerCase().includes(ticketSearch.toLowerCase()) ||
        t.subject.toLowerCase().includes(ticketSearch.toLowerCase()) ||
        t.department.toLowerCase().includes(ticketSearch.toLowerCase()) ||
        t.reporter.toLowerCase().includes(ticketSearch.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [tickets, ticketFilterStatus, ticketSearch]);

  const handleCreateTicket = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.empName.trim() && !formData.isAnonymous) {
      errors.empName = 'Employee Name is required';
    }
    if (!formData.empId.trim() && !formData.isAnonymous) {
      errors.empId = 'Employee ID is required';
    }
    if (!formData.subject.trim()) {
      errors.subject = 'Issue Subject / Headline is required';
    }
    if (!formData.description.trim()) {
      errors.description = 'Detailed incident description is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToast('Validation Error', 'Please complete all required fields marked with *', 'error');
      return;
    }

    // Generate new Ticket ID
    const newId = `THT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket = {
      id: newId,
      subject: formData.subject,
      category: formData.category,
      reporter: formData.isAnonymous ? 'Confidential (POSH / Whistleblower)' : formData.empName,
      reporterRole: formData.isAnonymous ? 'Restricted Identity' : 'Registered Staff',
      empId: formData.isAnonymous ? 'PROTECTED' : formData.empId,
      department: formData.department,
      assetTag: formData.assetTag || 'Not Specified',
      urgency: formData.urgency,
      slaTime:
        formData.urgency === 'Critical'
          ? '< 1 Hour (Line Stoppage)'
          : formData.urgency === 'High'
          ? 'Within 4 Hours'
          : formData.urgency === 'Medium'
          ? 'Within 24 Hours'
          : 'Within 72 Hours',
      status: 'Open',
      assignedTech: 'Automated Routing in Progress',
      createdAt: 'Just now',
      timeline: [
        { time: 'Just now', label: 'Ticket Logged & Encrypted via Service Portal', done: true },
        { time: 'Queued', label: 'Assigning to Plant Operations Field Supervisor', done: false }
      ],
      notes: formData.description
    };

    setTickets([newTicket, ...tickets]);
    setSelectedTicket(newTicket);
    setFormErrors({});
    // Reset Form
    setFormData({
      empName: 'Rajesh Kumar',
      empId: 'AF-EMP-4091',
      department: 'Production Engineering, Manesar Plant 2',
      assetTag: '',
      category: 'Hardware',
      subject: '',
      urgency: 'High',
      description: '',
      isAnonymous: false,
      fileName: ''
    });

    setComplaintTab('track');
    showToast(
      'Incident Ticket Registered!',
      `Ticket #${newId} has been generated with SLA Level: ${formData.urgency}. Routing to shift duty team.`,
      'success'
    );
  };

  const handleSimulatedCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const orderId = `AF-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderConfirmed({
      orderId,
      items: [...cart],
      total: cartTotal,
      subtotal: cartSubtotal,
      gst: cartGst,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    });
    setCart([]);
    showToast(
      'Commercial Order Placed!',
      `Demonstration Order ${orderId} generated successfully. Proforma GST invoice ready.`,
      'success'
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* ==================================================== */}
      {/* TOAST NOTIFICATION NOTIFIER                          */}
      {/* ==================================================== */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md w-full bg-slate-900 border-l-4 border-orange-500 text-white p-4 rounded-xl shadow-2xl flex items-start space-x-3 animate-fade-in">
          {toastMessage.type === 'success' && <CheckCircle2 className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />}
          {toastMessage.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />}
          {toastMessage.type === 'info' && <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />}
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-white">{toastMessage.title}</h4>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toastMessage.message}</p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ==================================================== */}
      {/* TOP EMERGENCY & HOTLINE BAR (MATCHING MOCKUP)        */}
      {/* ==================================================== */}
      <div className="bg-[#0f172a] text-slate-300 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5 text-slate-200">
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span>Support: <strong className="text-white">+91 1800-425-3674</strong> (24x7 Pan-India)</span>
            </div>
            <div className="hidden md:flex items-center space-x-1.5 text-slate-300">
              <Truck className="w-3.5 h-3.5 text-blue-400" />
              <span>Nationwide Express Logistics: 48-72hr Dispatch Guarantee</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline-block text-slate-400">
              GST Registered Enterprise Supplier
            </span>
            <button
              onClick={() => {
                setCurrentView('helpdesk');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-3 py-1 rounded text-xs flex items-center space-x-1.5 transition shadow-sm"
            >
              <Zap className="w-3 h-3 text-orange-200" />
              <span>INTERNAL EMPLOYEE PORTAL / IT HELPDESK</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* MAIN HEADER WITH LOGO, SEARCH, CART, IT DESK         */}
      {/* ==================================================== */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0a192f] border border-orange-500/30 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition">
                <Wrench className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#0a192f]">
                    AUTOFORGE
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded">
                    COMPONENTS PVT. LTD.
                  </span>
                </div>
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                  Precision Automotive Engineering &middot; ISO/TS 16949
                </p>
              </div>
            </div>

            {/* Global Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-4">
              <div className="flex w-full rounded-md border border-slate-300 overflow-hidden focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent transition bg-slate-50">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    if (currentView !== 'home') setCurrentView('home');
                  }}
                  className="bg-slate-100 border-r border-slate-300 text-xs px-3 py-2 text-slate-700 outline-none hover:bg-slate-200 transition cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  <option value="Engine Spares">Engine Spares</option>
                  <option value="Brake Systems">Brake Systems</option>
                  <option value="Maintenance Kits">Filters & Fluids</option>
                  <option value="Transmission">Transmission</option>
                  <option value="Suspension">Suspension</option>
                </select>

                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (currentView !== 'home' && currentView !== 'product-details') {
                        setCurrentView('home');
                      }
                    }}
                    placeholder="Search by Part Name, OEM No, or SKU (e.g. AF-BRK-1200-S)..."
                    className="w-full text-xs px-3 py-2 bg-transparent outline-none text-slate-800 placeholder-slate-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    if (currentView !== 'home') setCurrentView('home');
                  }}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 text-xs font-semibold flex items-center space-x-1 transition"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </button>
              </div>
            </div>

            {/* Quick Actions (Accounts, Cart, IT Helpdesk) */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="hidden sm:block text-right">
                <div className="text-[11px] text-slate-400">Welcome, Sign In</div>
                <div className="text-xs font-semibold text-slate-800">Accounts & Fleet</div>
              </div>

              {/* Cart Button */}
              <button
                onClick={() => {
                  setCurrentView('cart');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="relative flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3 py-2 rounded-lg text-slate-800 transition"
              >
                <div className="relative">
                  <ShoppingCart className="w-4 h-4 text-orange-600" />
                  {totalCartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {totalCartCount}
                    </span>
                  )}
                </div>
                <div className="hidden md:block text-left text-xs">
                  <span className="text-slate-500 text-[10px] block leading-none">Cart Total</span>
                  <span className="font-bold text-slate-900 leading-tight">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </button>

              {/* Dedicated IT Desk Button */}
              <button
                onClick={() => {
                  setCurrentView('helpdesk');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold transition shadow-sm ${
                  currentView === 'helpdesk' || currentView === 'raise-complaint'
                    ? 'bg-orange-600 text-white'
                    : 'bg-[#0a192f] hover:bg-slate-900 text-white'
                }`}
              >
                <Cpu className="w-4 h-4 text-orange-400" />
                <span>IT Desk</span>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="mt-3 lg:hidden">
            <div className="flex w-full rounded-md border border-slate-300 overflow-hidden focus-within:ring-2 focus-within:ring-orange-500 bg-slate-50">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentView !== 'home') setCurrentView('home');
                }}
                placeholder="Search part name, OEM, or SKU..."
                className="w-full text-xs px-3 py-2 bg-transparent outline-none text-slate-800"
              />
              <button
                onClick={() => {
                  if (currentView !== 'home') setCurrentView('home');
                }}
                className="bg-orange-600 text-white px-3 text-xs"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-[#0a192f] text-slate-200 text-xs border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 flex items-center overflow-x-auto no-scrollbar space-x-1 py-1">
            <button
              onClick={() => {
                setCurrentView('home');
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className={`px-3 py-2 font-medium rounded transition whitespace-nowrap flex items-center space-x-1.5 ${
                currentView === 'home'
                  ? 'bg-orange-600 text-white font-bold'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <span>Home & Spare-Parts</span>
            </button>

            <button
              onClick={() => setCurrentView('product-details')}
              className={`px-3 py-2 font-medium rounded transition whitespace-nowrap flex items-center space-x-1.5 ${
                currentView === 'product-details'
                  ? 'bg-orange-600 text-white font-bold'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <span>Product Details</span>
            </button>

            <button
              onClick={() => setCurrentView('cart')}
              className={`px-3 py-2 font-medium rounded transition whitespace-nowrap flex items-center space-x-1.5 ${
                currentView === 'cart'
                  ? 'bg-orange-600 text-white font-bold'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <span>Shopping Cart ({totalCartCount})</span>
            </button>

            <button
              onClick={() => setCurrentView('helpdesk')}
              className={`px-3 py-2 font-medium rounded transition whitespace-nowrap flex items-center space-x-1.5 ${
                currentView === 'helpdesk'
                  ? 'bg-orange-600 text-white font-bold'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-orange-400" />
              <span>Employee IT Helpdesk</span>
            </button>

            <button
              onClick={() => setCurrentView('raise-complaint')}
              className={`px-3 py-2 font-medium rounded transition whitespace-nowrap flex items-center space-x-1.5 ${
                currentView === 'raise-complaint'
                  ? 'bg-orange-600 text-white font-bold'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Raise & Track Complaints</span>
            </button>

            <div className="h-4 w-px bg-slate-700 mx-2 hidden md:block"></div>

            {/* Quick Category Jump Pills */}
            <button
              onClick={() => {
                setSelectedCategory('Brake Systems');
                setCurrentView('home');
              }}
              className="hidden lg:inline-block px-2.5 py-1 text-slate-400 hover:text-white rounded hover:bg-slate-800/60"
            >
              Brake Systems
            </button>
            <button
              onClick={() => {
                setSelectedCategory('Engine Spares');
                setCurrentView('home');
              }}
              className="hidden lg:inline-block px-2.5 py-1 text-slate-400 hover:text-white rounded hover:bg-slate-800/60"
            >
              Engine Parts
            </button>
            <button
              onClick={() => {
                setSelectedCategory('Transmission');
                setCurrentView('home');
              }}
              className="hidden lg:inline-block px-2.5 py-1 text-slate-400 hover:text-white rounded hover:bg-slate-800/60"
            >
              Transmission
            </button>
            <button
              onClick={() => {
                setSelectedCategory('Suspension');
                setCurrentView('home');
              }}
              className="hidden xl:inline-block px-2.5 py-1 text-slate-400 hover:text-white rounded hover:bg-slate-800/60"
            >
              Suspension
            </button>
          </div>
        </div>
      </header>

      {/* ==================================================== */}
      {/* VIEW ROUTING CONTROLLER                              */}
      {/* ==================================================== */}
      <main className="flex-1">
        {currentView === 'home' && (
          <StorefrontHomeView
            products={filteredProducts}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectProduct={(prod) => {
              setSelectedProduct(prod);
              setCurrentView('product-details');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={addToCart}
            fitmentMake={fitmentMake}
            setFitmentMake={setFitmentMake}
            fitmentModel={fitmentModel}
            setFitmentModel={setFitmentModel}
            fitmentEngine={fitmentEngine}
            setFitmentEngine={setFitmentEngine}
            onFindFitment={() => {
              if (fitmentMake) {
                showToast(
                  'Fitment Verification Filter Applied',
                  `Showing OEM compatible components verified for ${fitmentMake} ${fitmentModel} ${fitmentEngine}`,
                  'info'
                );
              } else {
                showToast('Vehicle Fitment Guide', 'Please select a vehicle manufacturer to filter exact parts.', 'info');
              }
            }}
            onOpenHelpdesk={() => {
              setCurrentView('helpdesk');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRaiseComplaint={(category = 'Hardware') => {
              setFormData((prev) => ({ ...prev, category }));
              setCurrentView('raise-complaint');
              setComplaintTab('raise');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'product-details' && (
          <ProductDetailsView
            product={selectedProduct}
            onBack={() => setCurrentView('home')}
            onAddToCart={addToCart}
            onBuyNow={(prod, qty) => {
              addToCart(prod, qty);
              setCurrentView('cart');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            allProducts={products}
            onSelectOtherProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {currentView === 'cart' && (
          <ShoppingCartCheckoutView
            cart={cart}
            subtotal={cartSubtotal}
            gst={cartGst}
            shipping={cartShipping}
            total={cartTotal}
            onUpdateQuantity={updateCartQuantity}
            onRemove={removeFromCart}
            onCheckout={handleSimulatedCheckout}
            orderConfirmed={orderConfirmed}
            onCloseOrderModal={() => setOrderConfirmed(null)}
            onContinueShopping={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'helpdesk' && (
          <HelpdeskDashboardView
            tickets={filteredTickets}
            allTickets={tickets}
            stats={ticketStats}
            filterStatus={ticketFilterStatus}
            setFilterStatus={setTicketFilterStatus}
            searchQuery={ticketSearch}
            setSearchQuery={setTicketSearch}
            selectedTicket={selectedTicket}
            onSelectTicket={setSelectedTicket}
            onOpenRaiseComplaint={() => {
              setCurrentView('raise-complaint');
              setComplaintTab('raise');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onUpdateTicketStatus={(ticketId, newStatus) => {
              setTickets((prev) =>
                prev.map((t) =>
                  t.id === ticketId
                    ? {
                        ...t,
                        status: newStatus,
                        timeline: [
                          ...t.timeline,
                          {
                            time: 'Just now',
                            label: `Status manually updated to ${newStatus} by Floor Lead`,
                            done: true
                          }
                        ]
                      }
                    : t
                )
              );
              showToast('Ticket Updated', `Ticket ${ticketId} status changed to ${newStatus}`, 'success');
            }}
          />
        )}

        {currentView === 'raise-complaint' && (
          <RaiseTrackComplaintsView
            complaintTab={complaintTab}
            setComplaintTab={setComplaintTab}
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
            onSubmit={handleCreateTicket}
            tickets={tickets}
            selectedTicket={selectedTicket}
            onSelectTicket={setSelectedTicket}
            onOpenTicket={(t) => {
              setSelectedTicket(t);
              setComplaintTab('track');
            }}
            showToast={showToast}
          />
        )}
      </main>

      {/* ==================================================== */}
      {/* ENTERPRISE FOOTER (MATCHING MOCKUP SPECIFICATION)    */}
      {/* ==================================================== */}
      <footer className="bg-[#0a192f] text-slate-300 pt-12 pb-6 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
            {/* Col 1 */}
            <div>
              <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-3 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span>PRODUCT CATALOG</span>
              </h3>
              <p className="text-slate-400 mb-3 leading-relaxed">
                ISO/TS 16949 certified automotive spares, commercial drivetrain components, and precision forged assemblies.
              </p>
              <ul className="space-y-1.5 text-slate-300">
                <li className="hover:text-orange-400 cursor-pointer transition">Passenger Vehicle Spares</li>
                <li className="hover:text-orange-400 cursor-pointer transition">Heavy Commercial Fleet Spares</li>
                <li className="hover:text-orange-400 cursor-pointer transition">EV Thermal & Battery Enclosures</li>
                <li className="hover:text-orange-400 cursor-pointer transition">High-Tolerance CNC Assemblies</li>
                <li className="hover:text-orange-400 cursor-pointer transition">OEM Technical Blueprints</li>
              </ul>
            </div>

            {/* Col 2 */}
            <div>
              <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-3 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span>CUSTOMER & COMMERCIAL</span>
              </h3>
              <p className="text-slate-400 mb-3 leading-relaxed">
                Dedicated commercial accounts for state transport units, corporate fleet operators, and authorized dealership service bays.
              </p>
              <ul className="space-y-1.5 text-slate-300">
                <li
                  onClick={() => setCurrentView('cart')}
                  className="hover:text-orange-400 cursor-pointer transition"
                >
                  GST B2B Billing & Invoicing
                </li>
                <li
                  onClick={() => {
                    setCurrentView('raise-complaint');
                    setComplaintTab('raise');
                  }}
                  className="hover:text-orange-400 cursor-pointer transition"
                >
                  Consignment Order Status & Claims
                </li>
                <li className="hover:text-orange-400 cursor-pointer transition">Warranty Claim & Core Return</li>
                <li className="hover:text-orange-400 cursor-pointer transition">Fleet Credit Lines</li>
                <li className="hover:text-orange-400 cursor-pointer transition">Regional Distributor Network</li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-3 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span>PLANTS & OPERATIONS</span>
              </h3>
              <div className="space-y-3 text-slate-300">
                <div>
                  <strong className="text-white block">Plant 1 (Forging & Metallurgy):</strong>
                  <span className="text-slate-400">Sector 24, Industrial Area, Faridabad, Haryana</span>
                </div>
                <div>
                  <strong className="text-white block">Plant 2 (Precision Machining):</strong>
                  <span className="text-slate-400">Chakan MIDC Phase II, Pune, Maharashtra</span>
                </div>
                <div>
                  <strong className="text-white block">Central Logistics Hub:</strong>
                  <span className="text-slate-400">Sriperumbudur Corridor, Chennai, Tamil Nadu</span>
                </div>
              </div>
            </div>

            {/* Col 4 */}
            <div>
              <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-3 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span>IT & INTERNAL SERVICES</span>
              </h3>
              <p className="text-slate-400 mb-3 leading-relaxed">
                Secure enterprise infrastructure for shopfloor terminal integration, ticket telemetry, and vendor ERP sync.
              </p>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg mb-3">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-slate-400">IT System Status:</span>
                  <span className="text-emerald-400 font-semibold flex items-center">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1 animate-pulse"></span>
                    OPERATIONAL
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">
                  SLA Resolution Target: &lt; 4 Hours
                </div>
              </div>
              <button
                onClick={() => {
                  setCurrentView('helpdesk');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full bg-black hover:bg-slate-900 text-white font-bold py-2 px-3 rounded text-center border border-slate-700 transition"
              >
                LAUNCH SERVICE DESK
              </button>
            </div>
          </div>

          {/* Payment & Compliance Bar */}
          <div className="py-6 flex flex-wrap items-center justify-between gap-4 text-slate-400 text-[11px]">
            <div className="flex flex-wrap items-center gap-3">
              <span>Payment & Security Standards:</span>
              <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded font-mono">UPI AutoPay</span>
              <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded font-mono">NetBanking</span>
              <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded font-mono">RuPay Fleet</span>
              <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded font-mono">Visa Business</span>
              <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded font-mono">GST Invoices (IRN Verified)</span>
            </div>
            <div className="text-slate-400">
              AIS-037 & IATF 16949 COMPLIANT OEM COMPONENTS
            </div>
          </div>

          <div className="text-center pt-4 border-t border-slate-800/80 text-[11px] text-slate-400">
            &copy; 2026 AutoForge Components Pvt. Ltd. All rights reserved. Precision Automotive Engineering Portal.
          </div>
        </div>
      </footer>
    </div>
  );
}

// ====================================================
// VIEW 1: HOME & SPARE PARTS STOREFRONT
// ====================================================
function StorefrontHomeView({
  products,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onSelectProduct,
  onAddToCart,
  fitmentMake,
  setFitmentMake,
  fitmentModel,
  setFitmentModel,
  fitmentEngine,
  setFitmentEngine,
  onFindFitment,
  onOpenHelpdesk,
  onRaiseComplaint
}) {
  const [quantities, setQuantities] = useState({});

  const handleQtyChange = (id, delta) => {
    setQuantities((prev) => {
      const cur = prev[id] || 1;
      const next = Math.max(1, cur + delta);
      return { ...prev, [id]: next };
    });
  };

  return (
    <div className="pb-16 space-y-10">
      {/* 1. HERO SECTION (MATCHING MOCKUP 1 & 2) */}
      <section className="bg-gradient-to-b from-[#0a192f] via-[#0f172a] to-[#1e293b] text-white pt-8 pb-12 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto">
          {/* Plant certification tag */}
          <div className="flex flex-wrap items-center gap-2 mb-4 text-[11px] font-mono text-slate-300">
            <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded font-semibold flex items-center">
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-1.5"></span>
              ISO 9001 CERTIFIED PLANT PRODUCTION
            </span>
            <span className="bg-slate-800 border border-slate-700 px-2 py-0.5 rounded">
              DEPT: LOGISTICS &amp; SHOPFLOOR
            </span>
            <span className="bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-slate-400 hidden sm:inline-block">
              Nationwide Logistics: Fleet &amp; Workshop Dispatch
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Col (Text & CTAs) */}
            <div className="lg:col-span-7 space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                High-Precision Automotive Spares &amp; Industrial Components
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Direct from manufacturing lines to commercial workshops and certified technicians. Genuine OEM tolerances, ISO/TS-16949 certified production, and same-day dispatch across India.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('fitment-bar');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-lg text-xs sm:text-sm shadow-lg hover:shadow-orange-600/30 flex items-center space-x-2 transition"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Shop Parts by Vehicle</span>
                </button>
                <button
                  onClick={() => {
                    alert('AutoForge Complete 2026 OEM Parts Catalog (PDF - 48MB) demonstration download initialized.');
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg text-xs sm:text-sm border border-slate-600 flex items-center space-x-2 transition"
                >
                  <FileText className="w-4 h-4 text-orange-400" />
                  <span>Download OEM Catalog</span>
                </button>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800 max-w-lg">
                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-base sm:text-lg font-black text-orange-400 font-mono">&lt; 0.005 mm</div>
                  <div className="text-[10px] text-slate-400 font-medium">CNC Tolerance</div>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-base sm:text-lg font-black text-blue-400 font-mono">100% QAP</div>
                  <div className="text-[10px] text-slate-400 font-medium">Quality Verified</div>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-base sm:text-lg font-black text-emerald-400 font-mono">Same-Day</div>
                  <div className="text-[10px] text-slate-400 font-medium">Fleet Dispatch</div>
                </div>
              </div>
            </div>

            {/* Right Col (Hero Visual Graphic) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900 group">
                <img
                  src="https://images.unsplash.com/photo-1600790142055-619df03207e6?auto=format&fit=crop&w=800&q=80"
                  alt="Industrial Automotive Components"
                  className="w-full h-80 object-cover opacity-85 group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                {/* Overlaid Badges */}
                <div className="absolute top-4 left-4 bg-black/75 backdrop-blur border border-white/20 text-white px-3 py-1.5 rounded text-[11px] font-mono">
                  <span className="text-orange-400 font-bold block text-[10px]">HEAT-TREATED ROTOR</span>
                  &gt; 11,000N High Braking Standard
                </div>

                <div className="absolute top-4 right-4 bg-black/75 backdrop-blur border border-white/20 text-white px-3 py-1.5 rounded text-[11px] font-mono">
                  <span className="text-blue-400 font-bold block text-[10px]">BILLET PISTON &amp; ROD</span>
                  12,700N Mpa Yield Alloy
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] bg-black/80 backdrop-blur p-2.5 rounded-lg border border-white/10">
                  <span className="text-orange-400 font-bold flex items-center">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mr-1.5 animate-pulse"></span>
                    FORGED IN PUNE &amp; FARIDABAD
                  </span>
                  <span className="text-slate-300 font-mono text-[10px]">
                    TURBOCHARGER 19,000 RPM Dynamic Balanced Cartridge
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. FAST VEHICLE FITMENT MATCH BAR (MATCHING MOCKUP) */}
          <div
            id="fitment-bar"
            className="mt-8 bg-white text-slate-800 rounded-xl p-4 shadow-xl border border-slate-200"
          >
            <div className="flex items-center space-x-2 text-xs font-bold text-orange-600 mb-3 uppercase tracking-wide">
              <Zap className="w-4 h-4 text-orange-500" />
              <span>Fast Vehicle Fitment Match</span>
              <span className="text-slate-400 font-normal normal-case text-[11px]">
                Guaranteed fitment or zero-fee exchange guarantee
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <select
                  value={fitmentMake}
                  onChange={(e) => setFitmentMake(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">1. Select Vehicle Make</option>
                  <option value="Mahindra">Mahindra (Scorpio / Thar / Bolero)</option>
                  <option value="Tata">Tata Motors (Safari / Harrier / Xenon)</option>
                  <option value="Maruti Suzuki">Maruti Suzuki Commercial (Super Carry / Brezza)</option>
                  <option value="Toyota">Toyota (Innova / Fortuner / Hilux)</option>
                  <option value="Ashok Leyland">Ashok Leyland (Dost / Bada Dost / Ecomet)</option>
                  <option value="Force Motors">Force Motors (Trax / Traveller)</option>
                </select>
              </div>

              <div>
                <select
                  value={fitmentModel}
                  onChange={(e) => setFitmentModel(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">2. Select Model / Year</option>
                  <option value="2024 Heavy Fleet">2024 Heavy Fleet Edition</option>
                  <option value="2022-2023 Euro VI / BS6">2022-2023 Euro VI / BS6</option>
                  <option value="2018-2021 Common Rail">2018-2021 Common Rail CRDe</option>
                  <option value="Pre-2018 Legacy Series">Pre-2018 Legacy Series</option>
                </select>
              </div>

              <div>
                <select
                  value={fitmentEngine}
                  onChange={(e) => setFitmentEngine(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">3. Select Engine Variant</option>
                  <option value="2.2L mHawk CRDe Turbo">2.2L mHawk CRDe Turbo</option>
                  <option value="2.0L Kryotec Turbocharged">2.0L Kryotec Turbocharged</option>
                  <option value="2.8L D-4D High Output">2.8L D-4D High Output Diesel</option>
                  <option value="1.5L Eco-Torq Commercial">1.5L Eco-Torq Commercial</option>
                </select>
              </div>

              <div>
                <button
                  onClick={onFindFitment}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center space-x-1.5 shadow transition"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Find Exact Fit Parts</span>
                </button>
              </div>
            </div>

            {/* Quick search tags */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
              <span className="font-semibold text-slate-700">Popular OEM Searches:</span>
              <button
                onClick={() => setSearchQuery('AF-BRK-1200-S')}
                className="bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded text-slate-700 transition"
              >
                #AF-BRK-1200-S (Brake Rotor)
              </button>
              <button
                onClick={() => setSearchQuery('Turbocharger')}
                className="bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded text-slate-700 transition"
              >
                #ENG-Turbocharger
              </button>
              <button
                onClick={() => setSearchQuery('Oil Filter')}
                className="bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded text-slate-700 transition"
              >
                #Micro-Pore-Filter
              </button>
              <button
                onClick={() => setSearchQuery('Flywheel')}
                className="bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded text-slate-700 transition"
              >
                #Dual-Mass-Flywheel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXPLORE SYSTEMS & ASSEMBLIES (CATEGORIES) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[11px] font-bold text-orange-600 uppercase tracking-widest block">
              ENGINEERING CATEGORIES
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Explore Systems &amp; Assemblies
            </h2>
          </div>
          <button
            onClick={() => setSelectedCategory('All')}
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center space-x-1"
          >
            <span>View All 12 Automotive Systems</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Engine & Internal Components',
              count: '1,120+ Parts',
              desc: 'Pistons, Camshafts, Cylinder Liners, Head Gaskets & Heavy-Duty Forgings',
              tags: ['Billet Steel', 'High Compression'],
              sku: 'SYS-ENG-01',
              category: 'Engine Spares',
              icon: Flame
            },
            {
              title: 'Brake Systems & Friction',
              count: '850+ Parts',
              desc: 'Ventilated Slotted Rotors, Ceramic Pads, Forged Calipers & ABS Wheel Sensors',
              tags: ['Low Dust Ceramic', 'High Heat Dissipation'],
              sku: 'SYS-BRK-02',
              category: 'Brake Systems',
              icon: ShieldCheck
            },
            {
              title: 'Performance Filters & Fluids',
              count: '620+ Parts',
              desc: 'High-Flow Dry Air Elements, Synthetic Micro-Pore Oil Filters & Heavy-Duty Coolants',
              tags: ['99.2% Micron Capture', 'Extended Service Life'],
              sku: 'SYS-FLT-03',
              category: 'Maintenance Kits',
              icon: Gauge
            },
            {
              title: 'Transmission & Drivetrain',
              count: '540+ Parts',
              desc: 'Heavy-Duty Clutch Kits, Dual Mass Flywheels, CV Axle Shafts & Synchro Hubs',
              tags: ['High Torque Bias', 'Anti-Vibration Hub'],
              sku: 'SYS-TRN-04',
              category: 'Transmission',
              icon: Settings
            },
            {
              title: 'Suspension & Steering',
              count: '780+ Parts',
              desc: 'Gas-Charged Monotube Struts, Lower Control Arms, Tie Rod Ends & Bushing Kits',
              tags: ['Nitrogen Charged', 'Polyurethane Dampers'],
              sku: 'SYS-SUS-05',
              category: 'Suspension',
              icon: Layers
            },
            {
              title: 'Electrical & Smart Sensors',
              count: '390+ Parts',
              desc: 'High-Output Alternators, Starter Motors, Oxygen/Lambda Sensors & ECU Relays',
              tags: ['12V / 24V Commercial', 'CAN-Bus Calibration'],
              sku: 'SYS-ELE-06',
              category: 'All',
              icon: Cpu
            }
          ].map((cat, idx) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.category;
            return (
              <div
                key={idx}
                onClick={() => {
                  setSelectedCategory(cat.category);
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-5 rounded-xl border cursor-pointer transition hover:shadow-md ${
                  isSelected
                    ? 'bg-orange-50 border-orange-500 ring-2 ring-orange-400'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800">
                    <Icon className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="text-[11px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {cat.count}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm mt-3">{cat.title}</h3>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">{cat.desc}</p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {cat.tags.map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs">
                  <span className="font-mono text-[10px] text-slate-400">{cat.sku}</span>
                  <span className="text-orange-600 font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition">
                    <span>Browse Category</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. INDUSTRIAL FAST-MOVERS & BESTSELLERS (PRODUCT GRID) */}
      <section id="products-section" className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-red-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
                TOP SELLER
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                REAL-TIME WHOLESALE INVENTORY
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              Industrial Fast-Movers &amp; Bestsellers
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar pb-1">
            {['All', 'Engine Spares', 'Brake Systems', 'Maintenance Kits', 'Transmission'].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition whitespace-nowrap ${
                  selectedCategory === c
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {c === 'All' ? 'All Bestsellers' : c}
              </button>
            ))}
          </div>
        </div>

        {/* If no products found */}
        {products.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
            <Package className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No matching spare parts found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn't find items matching "{searchQuery}". Try searching for rotor, filter, piston, or resetting filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold px-4 py-2 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const currentQty = quantities[product.id] || 1;
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col justify-between group"
                >
                  <div>
                    {/* Top image container */}
                    <div className="relative h-48 bg-slate-900 overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
                      />
                      <div className="absolute top-2 left-2 flex items-center space-x-1.5">
                        <span className="bg-black/70 backdrop-blur text-white text-[10px] font-mono px-2 py-0.5 rounded">
                          SKU: {product.sku}
                        </span>
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className={`${product.tagColor} text-[10px] font-bold px-2 py-0.5 rounded shadow`}>
                          {product.tag}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="font-bold text-slate-900 text-sm leading-snug hover:text-orange-600 cursor-pointer transition"
                      >
                        {product.name}
                      </h3>

                      <p className="text-[11px] text-slate-500 mt-1.5 flex items-center space-x-1">
                        <Wrench className="w-3 h-3 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{product.fitment}</span>
                      </p>

                      <div className="flex items-center justify-between mt-2.5 text-xs">
                        <div className="flex items-center space-x-1 text-amber-500">
                          <span>★</span>
                          <span className="font-bold text-slate-800">{product.rating}</span>
                          <span className="text-slate-400">({product.reviews} reviews)</span>
                        </div>
                        <span className="text-xs font-semibold text-emerald-600">
                          {product.stockText}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Add to cart footer */}
                  <div className="p-4 pt-0">
                    <div className="flex items-baseline space-x-2 pt-2 border-t border-slate-100">
                      <span className="text-xl font-black text-slate-900">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs line-through text-slate-400">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">
                        {product.discount}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          onClick={() => handleQtyChange(product.id, -1)}
                          className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 transition font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold text-slate-800">
                          {currentQty}
                        </span>
                        <button
                          onClick={() => handleQtyChange(product.id, 1)}
                          className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 transition font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => onAddToCart(product, currentQty)}
                        className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center space-x-1.5 shadow transition"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. WHY INDUSTRIAL FLEETS & GARAGES CHOOSE AUTOFORGE (MATCHING MOCKUP) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[11px] font-bold text-orange-600 uppercase tracking-widest block">
            ZERO DEFECT COMMITMENT
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Why Industrial Fleets &amp; Certified Garages Choose AutoForge
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            Engineered for severe duty cycles, commercial logistics uptime, and exact fitment reliability across Indian terrain.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 mb-3">
              <Gauge className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">100% Dimensional Inspection</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Automated coordinate measuring machines (CMM) test every sub-micron curvature before bench sign-off.
            </p>
            <div className="mt-3 text-[11px] font-mono text-orange-600 font-semibold">
              &lt; 0.005mm Tolerance Check
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Tier-1 Metallurgical Standard</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Die-cast and forged using high-tensile molybdenum alloys, aerospace-grade billet alloys, and friction linings.
            </p>
            <div className="mt-3 text-[11px] font-mono text-blue-600 font-semibold">
              Spectrometry Batch Verified
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Fast-Track Nationwide Dispatch</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Automated distribution centers in Pune, Chennai, Manesar, and Jamshedpur guarantee same-day line-haul transit.
            </p>
            <div className="mt-3 text-[11px] font-mono text-emerald-600 font-semibold">
              Same-Day Dispatch &lt; 4 PM
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">GST Verified Commercial Billing</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Instant invoice generation with valid GSTIN and HSN mapping for seamless Input Tax Credit (ITC) claiming for fleet operators.
            </p>
            <div className="mt-3 text-[11px] font-mono text-purple-600 font-semibold">
              Auto GSTR-1 Sync
            </div>
          </div>
        </div>

        {/* Numbers Strip */}
        <div className="mt-8 bg-[#0a192f] text-white rounded-xl p-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-orange-400">4</div>
            <div className="text-xs text-slate-300 font-medium mt-1">Foundry &amp; Forging Plants</div>
            <div className="text-[10px] text-slate-400">Faridabad, Pune, Chennai, Jamshedpur</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">45,000+</div>
            <div className="text-xs text-slate-300 font-medium mt-1">Parts Produced Monthly</div>
            <div className="text-[10px] text-slate-400">Engine, Drivetrain &amp; Braking Spares</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-blue-400">1,850+</div>
            <div className="text-xs text-slate-300 font-medium mt-1">Authorized Workshop Partners</div>
            <div className="text-[10px] text-slate-400">Across 28 States &amp; Union Territories</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">99.4%</div>
            <div className="text-xs text-slate-300 font-medium mt-1">First-Time Fitment Success</div>
            <div className="text-[10px] text-slate-400">Sub-millimeter OEM Tolerance</div>
          </div>
        </div>
      </section>

      {/* 6. INTEGRATED EMPLOYEE IT HELPDESK BANNER (MATCHING MOCKUP) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 flex items-center space-x-1.5 mb-1">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>INTERNAL WORKFORCE SERVICES &middot; AUTOFORGE ENTERPRISE PORTAL</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Integrated Employee IT Helpdesk &amp; Workplace Complaint Tracking
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  Empowering our factory shopfloor operators, supply chain managers, warehouse coordinators, and administrative teams with rapid technical resolution, equipment requisition, and transparent workplace grievance redressal.
                </p>
              </div>

              <button
                onClick={onOpenHelpdesk}
                className="bg-black hover:bg-slate-950 text-white font-bold text-xs px-5 py-3 rounded-lg border border-slate-700 flex items-center space-x-2 transition shadow flex-shrink-0"
              >
                <span>Launch IT Service Desk</span>
                <ArrowRight className="w-4 h-4 text-orange-400" />
              </button>
            </div>

            {/* Quick action cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 hover:border-slate-600 transition">
                <div className="flex items-center justify-between text-xs">
                  <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center">
                    <HardDrive className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-orange-400 bg-orange-950/60 px-2 py-0.5 rounded">
                    Priority &lt; 1hr SLA
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white mt-3">Hardware &amp; Shopfloor IT Diagnostics</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Report handheld barcode scanner dropouts, CNC lathe terminal network disconnects, packing line printer jams, or rugged tablet malfunctions.
                </p>
                <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>On-Duty Tech: <strong>Sec A, B, C</strong></span>
                  <button
                    onClick={() => onRaiseComplaint('Hardware')}
                    className="text-orange-400 hover:text-orange-300 font-semibold"
                  >
                    Log Hardware Ticket &rarr;
                  </button>
                </div>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 hover:border-slate-600 transition">
                <div className="flex items-center justify-between text-xs">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
                    <Key className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded">
                    Self-Service
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white mt-3">ERP, SAP &amp; Portal Access</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Reset password locks, SAP S/4HANA production plan module authorisation, warehouse bin transfer unlocking, and vendor IRN synchronisation requests.
                </p>
                <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>SLA: <strong>Instant / 1 hr</strong></span>
                  <button
                    onClick={() => onRaiseComplaint('ERP / Access')}
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Request Access / Credentials &rarr;
                  </button>
                </div>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 hover:border-slate-600 transition">
                <div className="flex items-center justify-between text-xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">
                    256-Bit Encrypted
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white mt-3">Anonymous Workplace Complaint &amp; Ethics</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Confidential, non-retaliatory channel for reporting workplace safety concerns, POSH compliance, vendor kickback irregularities, or plant floor supervisor grievances.
                </p>
                <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Whistleblower Desk</span>
                  <button
                    onClick={() => onRaiseComplaint('Ethics & Grievance')}
                    className="text-emerald-400 hover:text-emerald-300 font-semibold"
                  >
                    Lodge Confidential Complaint &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom telemetry status bar */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Live IT Infrastructure Status: <strong>All systems operational</strong></span>
                <span className="hidden sm:inline-block">| SAP Core: <strong>99.78%</strong></span>
                <span className="hidden sm:inline-block">| Assembly IoT: <strong>100%</strong></span>
                <span className="hidden sm:inline-block">| Dispatch API: <strong>Active</strong></span>
              </div>
              <div>
                <span>Avg Ticket Resolution: <strong>41 mins</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ====================================================
// VIEW 2: PRODUCT DETAILS VIEW
// ====================================================
function ProductDetailsView({
  product,
  onBack,
  onAddToCart,
  onBuyNow,
  allProducts,
  onSelectOtherProduct
}) {
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-slate-500">
        <button onClick={onBack} className="hover:text-orange-600 transition flex items-center space-x-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span className="font-semibold text-slate-800 truncate">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Product Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200 h-80 sm:h-96">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-black/75 backdrop-blur text-white text-xs font-mono px-2.5 py-1 rounded">
              SKU: {product.sku}
            </div>
            <div className="absolute top-3 right-3">
              <span className={`${product.tagColor} text-xs font-bold px-3 py-1 rounded shadow`}>
                {product.tag}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border-2 border-orange-500 overflow-hidden h-20 bg-slate-900">
              <img src={product.image} alt="Thumbnail 1" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-lg border border-slate-200 overflow-hidden h-20 bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-medium">
              3D CAD Model
            </div>
            <div className="rounded-lg border border-slate-200 overflow-hidden h-20 bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-medium">
              Packaging Specs
            </div>
          </div>
        </div>

        {/* Product Purchase & Spec Column */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                {product.category}
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs text-emerald-600 font-semibold flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                In Stock &middot; Ready for Dispatch
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center space-x-4 mt-3 text-xs">
              <div className="flex items-center text-amber-500 font-bold">
                <span>★</span>
                <span className="ml-1 text-slate-800">{product.rating}</span>
                <span className="ml-1 text-slate-400 font-normal">({product.reviews} verified reviews)</span>
              </div>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 font-medium">OEM Part Ref: {product.sku}</span>
            </div>

            <p className="text-slate-600 text-sm mt-4 leading-relaxed">
              {product.description}
            </p>

            {/* Fitment Alert Box */}
            <div className="mt-4 bg-orange-50/60 border border-orange-200 rounded-lg p-3 text-xs flex items-start space-x-2.5">
              <Wrench className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-slate-900 block font-semibold">Verified Vehicle Compatibility</strong>
                <span className="text-slate-600">{product.fitment}</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-black text-slate-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-sm line-through text-slate-400">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded">
                  {product.discount} (B2B Fleet Rate)
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Prices exclude 18% GST (Calculated at simulated checkout). Includes free transit insurance.
              </p>

              {/* Wholesale Tier Pricing */}
              <div className="mt-3 pt-3 border-t border-slate-200 grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="bg-white p-1.5 rounded border border-slate-200">
                  <span className="text-slate-400 block">1-5 Units</span>
                  <span className="font-bold text-slate-800">Standard Rate</span>
                </div>
                <div className="bg-white p-1.5 rounded border border-slate-200">
                  <span className="text-slate-400 block">6-20 Units</span>
                  <span className="font-bold text-orange-600">8% Wholesale</span>
                </div>
                <div className="bg-white p-1.5 rounded border border-slate-200">
                  <span className="text-slate-400 block">21+ Units</span>
                  <span className="font-bold text-emerald-600">15% Fleet Tier</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex items-center space-x-3">
              {/* Stepper */}
              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-100">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-2 text-slate-700 hover:bg-slate-200 font-bold"
                >
                  -
                </button>
                <span className="px-4 text-sm font-semibold text-slate-900">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-2 text-slate-700 hover:bg-slate-200 font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={() => onAddToCart(product, qty)}
                className="flex-1 bg-white hover:bg-slate-100 text-orange-600 border-2 border-orange-600 font-bold text-xs sm:text-sm py-2.5 px-4 rounded-lg flex items-center justify-center space-x-2 transition"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add {qty} to Cart</span>
              </button>

              {/* Buy Now */}
              <button
                onClick={() => onBuyNow(product, qty)}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-lg flex items-center justify-center space-x-2 transition shadow"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now &rarr;</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
              <span className="flex items-center">
                <Truck className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Dispatches in 24 hrs from Pune Central Hub
              </span>
              <span className="flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-slate-400" />
                12 Months / 50,000 km Warranty
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for Tech Specs, Compatibility, Warranty */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="flex border-b border-slate-200 bg-slate-50 px-6">
          <button
            onClick={() => setActiveTab('specs')}
            className={`py-3 px-4 font-bold text-xs border-b-2 transition ${
              activeTab === 'specs'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Technical Specifications &amp; Metallurgy
          </button>
          <button
            onClick={() => setActiveTab('fitment')}
            className={`py-3 px-4 font-bold text-xs border-b-2 transition ${
              activeTab === 'fitment'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Vehicle Fitment Chart
          </button>
          <button
            onClick={() => setActiveTab('warranty')}
            className={`py-3 px-4 font-bold text-xs border-b-2 transition ${
              activeTab === 'warranty'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Warranty &amp; Core Return Policy
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {product.specs &&
                Object.entries(product.specs).map(([key, val], idx) => (
                  <div
                    key={idx}
                    className="flex justify-between py-2 border-b border-slate-100"
                  >
                    <span className="text-slate-500 font-medium">{key}</span>
                    <span className="font-semibold text-slate-800 text-right">{val}</span>
                  </div>
                ))}
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">HSN Classification Code</span>
                <span className="font-semibold text-slate-800 text-right">8708.29.00 (Auto Components)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Country of Origin</span>
                <span className="font-semibold text-slate-800 text-right">India (Make in India Initiative)</span>
              </div>
            </div>
          )}

          {activeTab === 'fitment' && (
            <div className="space-y-3 text-xs">
              <p className="text-slate-600">
                This component is certified for exact replacement without mechanical adaptation or ECU retuning on:
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <ul className="list-disc list-inside space-y-1.5 text-slate-700">
                  <li><strong>Target Applications:</strong> {product.fitment}</li>
                  <li><strong>Torque Spec:</strong> Standard OEM torque wrench spec as defined in workshop technical service bulletin.</li>
                  <li><strong>Cross Reference Numbers:</strong> Bosch, Brembo, Valeo, and Delphi equivalent crossings mapped in catalog.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'warranty' && (
            <div className="space-y-3 text-xs text-slate-600">
              <p>
                All AutoForge components are backed by a comprehensive commercial fleet replacement warranty:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong className="text-slate-900 block font-semibold mb-1">Standard Warranty</strong>
                  <span>12 Months or 50,000 km against casting porosity, metallurgical fractures, and dimensional defects.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong className="text-slate-900 block font-semibold mb-1">Hassle-Free Core Return</strong>
                  <span>Return your depleted core unit within 30 days for instant core credit deposit onto your fleet account.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong className="text-slate-900 block font-semibold mb-1">Direct Technical Support</strong>
                  <span>Access on-duty factory application engineers for torque sequencing and installation guidance.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Recommendation */}
      <div>
        <h3 className="text-base font-bold text-slate-900 mb-4">
          Other Precision Components from AutoForge
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {allProducts
            .filter((p) => p.id !== product.id)
            .slice(0, 3)
            .map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectOtherProduct(p)}
                className="bg-white p-3 rounded-xl border border-slate-200 hover:border-orange-500 cursor-pointer transition flex items-center space-x-3 shadow-sm"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-14 h-14 rounded-lg object-cover bg-slate-900"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 truncate">{p.name}</h4>
                  <div className="text-[11px] text-slate-400 font-mono">{p.sku}</div>
                  <div className="text-xs font-bold text-orange-600 mt-1">₹{p.price.toLocaleString('en-IN')}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

// ====================================================
// VIEW 3: SHOPPING CART & SIMULATED CHECKOUT
// ====================================================
function ShoppingCartCheckoutView({
  cart,
  subtotal,
  gst,
  shipping,
  total,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  orderConfirmed,
  onCloseOrderModal,
  onContinueShopping
}) {
  const [checkoutStep, setCheckoutStep] = useState('billing'); // 'billing' | 'shipping' | 'payment'
  const [billingDetails, setBillingDetails] = useState({
    companyName: 'Apex Logistics & Transport Pvt. Ltd.',
    gstin: '27AABCA1234F1Z8',
    workshopAddress: 'Plot 44, MIDC Bhosari Industrial Area, Pune 411026',
    contactPerson: 'Karan Mehra',
    phone: '+91 98220 54120',
    email: 'procurement@apexlogistics.in'
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Procurement Cart &amp; Fleet Billing
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            B2B Commercial checkout with instant automated GST tax invoicing and logistics dispatch scheduling.
          </p>
        </div>
        <button
          onClick={onContinueShopping}
          className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center space-x-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Your procurement cart is empty</h2>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            You currently have no automotive components or spare parts scheduled for dispatch. Browse our catalog to add items.
          </p>
          <button
            onClick={onContinueShopping}
            className="mt-6 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow transition"
          >
            Browse Spares Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Item &amp; Specifications</span>
                <span>Subtotal (INR)</span>
              </div>

              <div className="divide-y divide-slate-100">
                {cart.map((item) => (
                  <div key={item.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover bg-slate-900 border border-slate-200 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono text-orange-600 font-bold block">
                          SKU: {item.sku}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Unit: ₹{item.price.toLocaleString('en-IN')} &middot;{' '}
                          <span className="text-emerald-600 font-medium">In Stock</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-4 w-full sm:w-auto">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 font-semibold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="text-right">
                        <div className="text-sm font-black text-slate-900">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                        <button
                          onClick={() => onRemove(item.id)}
                          className="text-[10px] text-red-500 hover:text-red-700 flex items-center space-x-0.5 ml-auto mt-0.5"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated Checkout Form Accordion */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <Building className="w-4 h-4 text-orange-600" />
                <span>Simulated Commercial Fleet Checkout Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Company / Fleet Entity Name</label>
                  <input
                    type="text"
                    value={billingDetails.companyName}
                    onChange={(e) => setBillingDetails({ ...billingDetails, companyName: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">GSTIN Number (for ITC Tax Credit)</label>
                  <input
                    type="text"
                    value={billingDetails.gstin}
                    onChange={(e) => setBillingDetails({ ...billingDetails, gstin: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 bg-slate-50 font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-600 font-semibold mb-1">Workshop / Depot Delivery Address</label>
                  <input
                    type="text"
                    value={billingDetails.workshopAddress}
                    onChange={(e) => setBillingDetails({ ...billingDetails, workshopAddress: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Authorised Workshop Manager</label>
                  <input
                    type="text"
                    value={billingDetails.contactPerson}
                    onChange={(e) => setBillingDetails({ ...billingDetails, contactPerson: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={billingDetails.phone}
                    onChange={(e) => setBillingDetails({ ...billingDetails, phone: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 bg-slate-50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary & Simulated Payment */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5 sticky top-24">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3">
              Order Pricing Summary
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} units)</span>
                <span className="font-semibold text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST (18% Commercial B2B Tax Rate)</span>
                <span className="font-semibold text-slate-800">₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Nationwide Express Logistics Freight</span>
                <span className="font-semibold text-emerald-600">
                  {shipping === 0 ? 'FREE (Above ₹5,000)' : `₹${shipping}`}
                </span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-black text-slate-900">
                <span>Total Amount Payable</span>
                <span className="text-orange-600">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Payment Method Selector (Simulation) */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-800 mb-2">
                Simulated Payment Method
              </label>
              <div className="space-y-2 text-xs">
                <label className="flex items-center space-x-2.5 p-2.5 rounded-lg border border-orange-500 bg-orange-50/50 cursor-pointer">
                  <input type="radio" name="payment" defaultChecked className="text-orange-600" />
                  <span className="font-semibold text-slate-800">
                    Corporate NetBanking / NEFT / RTGS (Demo)
                  </span>
                </label>
                <label className="flex items-center space-x-2.5 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <input type="radio" name="payment" className="text-orange-600" />
                  <span className="text-slate-700">30-Day Fleet Credit Line (Pre-approved)</span>
                </label>
                <label className="flex items-center space-x-2.5 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <input type="radio" name="payment" className="text-orange-600" />
                  <span className="text-slate-700">Commercial UPI AutoPay QR</span>
                </label>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm py-3 px-4 rounded-lg shadow-lg hover:shadow-orange-600/30 transition flex items-center justify-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simulate Checkout &amp; Generate Invoice</span>
            </button>

            <div className="bg-slate-50 rounded-lg p-3 text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center space-x-1.5 text-slate-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero-Risk Commercial Demonstration</span>
              </div>
              <p>
                All payment processing and order confirmations are demonstrations. No real transactions or charges will occur.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {orderConfirmed && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>

            <div className="text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                SIMULATION ORDER SUCCESSFUL
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2">
                Order #{orderConfirmed.orderId} Confirmed!
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Proforma GST Tax Invoice generated. Dispatch request sent to Pune Central Logistics Warehouse.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Invoice Date:</span>
                <span className="font-semibold text-slate-800">{orderConfirmed.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Items Ordered:</span>
                <span className="font-semibold text-slate-800">{orderConfirmed.items.length} product lines</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">GST (18% ITC Applied):</span>
                <span className="font-semibold text-slate-800">₹{orderConfirmed.gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-slate-900">
                <span>Total Demo Amount:</span>
                <span className="text-orange-600 text-sm">₹{orderConfirmed.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  alert(`Downloading Demo Tax Invoice: INV-${orderConfirmed.orderId}.pdf`);
                }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-2.5 rounded-lg border border-slate-300 transition"
              >
                Download GST Invoice (PDF)
              </button>
              <button
                onClick={onCloseOrderModal}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs py-2.5 rounded-lg transition"
              >
                Return to Storefront
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ====================================================
// VIEW 4: EMPLOYEE IT HELPDESK DASHBOARD
// ====================================================
function HelpdeskDashboardView({
  tickets,
  allTickets,
  stats,
  filterStatus,
  setFilterStatus,
  searchQuery,
  setSearchQuery,
  selectedTicket,
  onSelectTicket,
  onOpenRaiseComplaint,
  onUpdateTicketStatus
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Top Header Badge & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500 mb-1">
            <span className="bg-slate-200 text-slate-800 font-bold px-2 py-0.5 rounded">
              ISO/IEC 20000 COMPLIANT
            </span>
            <span className="flex items-center text-emerald-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1 animate-pulse"></span>
              Shopfloor Node 09 Online
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Employee IT Helpdesk &amp; Incident Operations
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            AutoForge internal engineering service desk, telemetry diagnostics, and equipment redressal management.
          </p>
        </div>

        <button
          onClick={onOpenRaiseComplaint}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg flex items-center space-x-2 shadow transition self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Raise New Ticket / Grievance</span>
        </button>
      </div>

      {/* Derived Metric Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[11px] text-slate-500 font-medium">Total Tickets</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{stats.total}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Plant-wide records</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[11px] text-slate-500 font-medium">Open Unassigned</div>
          <div className="text-2xl font-black text-blue-600 mt-1">{stats.open}</div>
          <div className="text-[10px] text-blue-500 mt-0.5">Awaiting triage</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[11px] text-slate-500 font-medium">In Progress</div>
          <div className="text-2xl font-black text-orange-600 mt-1">{stats.inProgress}</div>
          <div className="text-[10px] text-orange-500 mt-0.5">Active tech assigned</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[11px] text-slate-500 font-medium">Critical SLA Alerts</div>
          <div className="text-2xl font-black text-red-600 mt-1">{stats.critical}</div>
          <div className="text-[10px] text-red-500 mt-0.5">&lt; 1hr Line Stoppage</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[11px] text-slate-500 font-medium">Avg Response</div>
          <div className="text-2xl font-black text-slate-900 mt-1">12.4m</div>
          <div className="text-[10px] text-emerald-600 mt-0.5">Exceeds standard</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[11px] text-slate-500 font-medium">Critical MTTR</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">1h 18m</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Mean Time To Resolve</div>
        </div>
      </div>

      {/* Main Split View: Tickets List + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Filter & Ticket List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter ticket ID, subject, dept..."
                  className="w-full text-xs pl-8 pr-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50"
                />
              </div>

              {/* Status Tabs */}
              <div className="flex items-center space-x-1 w-full sm:w-auto overflow-x-auto no-scrollbar">
                {['All', 'Open', 'In Progress', 'Resolved'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
                      filterStatus === st
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Ticket Cards List */}
            <div className="space-y-2.5 pt-2">
              {tickets.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  No tickets found matching the specified filters.
                </div>
              ) : (
                tickets.map((t) => {
                  const isSelected = selectedTicket && selectedTicket.id === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => onSelectTicket(t)}
                      className={`p-4 rounded-xl border cursor-pointer transition ${
                        isSelected
                          ? 'bg-orange-50/70 border-orange-500 shadow-sm'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-slate-900">#{t.id}</span>
                          <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                            {t.category}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1.5">
                          {t.urgency === 'Critical' && (
                            <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded">
                              CRITICAL
                            </span>
                          )}
                          {t.urgency === 'High' && (
                            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                              HIGH
                            </span>
                          )}
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              t.status === 'Resolved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : t.status === 'In Progress'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-slate-100 text-slate-800'
                            }`}
                          >
                            {t.status}
                          </span>
                        </div>
                      </div>

                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 mt-2 leading-snug">
                        {t.subject}
                      </h4>

                      <div className="flex items-center justify-between mt-3 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                        <span>
                          Reporter: <strong>{t.reporter}</strong>
                        </span>
                        <span>{t.createdAt}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Selected Ticket Inspector */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5 sticky top-24">
          {selectedTicket ? (
            <>
              <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-orange-600">
                      #{selectedTicket.id}
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {selectedTicket.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mt-1 leading-snug">
                    {selectedTicket.subject}
                  </h3>
                </div>

                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded ${
                    selectedTicket.status === 'Resolved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : selectedTicket.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {selectedTicket.status}
                </span>
              </div>

              {/* Meta details */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px]">Employee / Reporter</span>
                  <span className="font-semibold text-slate-800">{selectedTicket.reporter}</span>
                  <span className="text-[10px] text-slate-500 block">{selectedTicket.empId}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Facility &amp; Department</span>
                  <span className="font-semibold text-slate-800">{selectedTicket.department}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Asset / Machine Tag</span>
                  <span className="font-mono font-semibold text-slate-800">{selectedTicket.assetTag}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Production SLA Target</span>
                  <span className="font-semibold text-red-600">{selectedTicket.slaTime}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <span className="text-[11px] font-bold text-slate-700 block mb-1">
                  Diagnostics &amp; Incident Notes
                </span>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                  {selectedTicket.notes}
                </p>
              </div>

              {/* Assigned Technician */}
              <div className="text-xs bg-blue-50/60 p-3 rounded-lg border border-blue-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-blue-800 uppercase block">
                    Assigned Field Specialist
                  </span>
                  <span className="font-semibold text-slate-800">{selectedTicket.assignedTech}</span>
                </div>
                <Wrench className="w-4 h-4 text-blue-600" />
              </div>

              {/* Timeline Progress */}
              <div>
                <span className="text-[11px] font-bold text-slate-700 block mb-3">
                  Resolution Progress Timeline
                </span>
                <div className="space-y-3 relative pl-4 border-l-2 border-slate-200 ml-2 text-xs">
                  {selectedTicket.timeline.map((step, idx) => (
                    <div key={idx} className="relative">
                      <span
                        className={`absolute -left-[21px] top-0.5 w-3 h-3 rounded-full border-2 bg-white ${
                          step.done ? 'border-orange-500 bg-orange-500' : 'border-slate-300'
                        }`}
                      ></span>
                      <div className="font-semibold text-slate-800 text-[11px]">{step.label}</div>
                      <div className="text-[10px] text-slate-400">{step.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulated Technician Status Action Buttons */}
              <div className="pt-3 border-t border-slate-200">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-2">
                  Simulate Desk Supervisor Action
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onUpdateTicketStatus(selectedTicket.id, 'In Progress')}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs py-2 rounded-lg font-medium transition"
                  >
                    Mark In-Progress
                  </button>
                  <button
                    onClick={() => onUpdateTicketStatus(selectedTicket.id, 'Resolved')}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-2 rounded-lg font-bold transition shadow"
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-xs text-slate-500">
              Select a ticket to inspect telemetry and response timeline.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ====================================================
// VIEW 5: RAISE COMPLAINT & TRACK COMPLAINTS
// (PIXEL-FOR-PIXEL MATCH WITH IMAGE 4 DESIGN)
// ====================================================
function RaiseTrackComplaintsView({
  complaintTab,
  setComplaintTab,
  formData,
  setFormData,
  formErrors,
  onSubmit,
  tickets,
  selectedTicket,
  onSelectTicket,
  onOpenTicket,
  showToast
}) {
  const categoriesList = [
    {
      id: 'Hardware',
      num: '1',
      title: 'Hardware',
      desc: 'CNC terminals, PCs, rugged tablets, scanners',
      icon: HardDrive
    },
    {
      id: 'Software',
      num: '2',
      title: 'Software',
      desc: 'AutoCAD, Edgecam, Windows OS, drivers',
      icon: Cpu
    },
    {
      id: 'Network & Wi-Fi',
      num: '3',
      title: 'Network & Wi-Fi',
      desc: 'Plant AP drop, industrial Ethernet, Gateway VPN',
      icon: Wifi
    },
    {
      id: 'Printer & Labeling',
      num: '4',
      title: 'Printer & Labeling',
      desc: 'Thermal dispatch units, barcode roll errors',
      icon: Printer
    },
    {
      id: 'ERP / Access',
      num: '5',
      title: 'ERP / Access',
      desc: 'SAP S/4HANA credentials, IRN dispatch sync',
      icon: Key
    },
    {
      id: 'Ethics & Grievance',
      num: '6',
      title: 'Ethics & Grievance',
      desc: 'Confidential POSH, shopfloor safety, ethics',
      icon: ShieldAlert
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Top Banner (Matching Mockup 4) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500 mb-1">
            <span className="bg-slate-200 text-slate-800 font-bold px-2 py-0.5 rounded">
              ISO/IEC 20000 COMPLIANT
            </span>
            <span className="flex items-center text-emerald-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1 animate-pulse"></span>
              Shopfloor Node 09 Online
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Enterprise Service &amp; Grievance Redressal
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            AutoForge Internal Employee Service, IT Diagnostics &amp; Workplace Grievance Redressal System. Rapid response protocol for precision shopfloor and corporate operations.
          </p>
        </div>

        {/* Tab switcher: Raise New Ticket vs Track Complaints */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setComplaintTab('raise')}
            className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center space-x-1.5 transition ${
              complaintTab === 'raise'
                ? 'bg-black text-white shadow'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5 text-orange-400" />
            <span>Raise New Ticket / Request</span>
          </button>

          <button
            onClick={() => setComplaintTab('track')}
            className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center space-x-1.5 transition ${
              complaintTab === 'track'
                ? 'bg-black text-white shadow'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-orange-400" />
            <span>Track Complaints &amp; Tickets</span>
            <span className="bg-orange-600 text-white text-[10px] px-1.5 py-0.2 rounded-full ml-1">
              {tickets.filter((t) => t.status !== 'Resolved').length} Active
            </span>
          </button>
        </div>
      </div>

      {/* VIEW SUB-TAB: RAISE COMPLAINT (IMAGE 4 REPLICA) */}
      {complaintTab === 'raise' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Left Column */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Ticket Details &amp; Diagnostics
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Fields tagged with an asterisk (*) are mandatory for plant SLA tracking.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-2 py-1 rounded">
                SYS_REV: 4.8.2
              </span>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              {/* Row 1: Employee Name & ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Employee Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      disabled={formData.isAnonymous}
                      value={formData.isAnonymous ? 'Protected Whistleblower Identity' : formData.empName}
                      onChange={(e) => setFormData({ ...formData, empName: e.target.value })}
                      className="w-full text-xs pl-8 pr-3 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50"
                      placeholder="e.g. Rajesh Kumar"
                    />
                  </div>
                  {formErrors.empName && (
                    <span className="text-[10px] text-red-500 mt-1 block">{formErrors.empName}</span>
                  )}
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Verified Active Directory record
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Employee ID <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Key className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      disabled={formData.isAnonymous}
                      value={formData.isAnonymous ? 'ANON-SECURE' : formData.empId}
                      onChange={(e) => setFormData({ ...formData, empId: e.target.value })}
                      className="w-full text-xs pl-8 pr-3 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 font-mono"
                      placeholder="e.g. AF-EMP-4091"
                    />
                  </div>
                  {formErrors.empId && (
                    <span className="text-[10px] text-red-500 mt-1 block">{formErrors.empId}</span>
                  )}
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Role: Senior Shopfloor Engineer
                  </span>
                </div>
              </div>

              {/* Row 2: Department & Facility + Affected Asset Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Department &amp; Facility <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50"
                  >
                    <option value="Production Engineering, Manesar Plant 2">
                      Production Engineering, Manesar Plant 2
                    </option>
                    <option value="Foundry & Metallurgy, Faridabad Plant">
                      Foundry &amp; Metallurgy, Faridabad Plant
                    </option>
                    <option value="Precision Machining, Chakan MIDC Pune">
                      Precision Machining, Chakan MIDC Pune
                    </option>
                    <option value="Packaging & Dispatch, Central Warehouse">
                      Packaging &amp; Dispatch, Central Warehouse
                    </option>
                    <option value="Corporate IT & Administration, Gurgaon">
                      Corporate IT &amp; Administration, Gurgaon
                    </option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Affected Asset Tag / Machine ID
                    </label>
                    <span className="text-[10px] text-slate-400">Optional</span>
                  </div>
                  <input
                    type="text"
                    value={formData.assetTag}
                    onChange={(e) => setFormData({ ...formData, assetTag: e.target.value })}
                    placeholder="e.g. MC-CNC-04B or SCN-ZBR-12"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 font-mono"
                  />
                </div>
              </div>

              {/* Row 3: Issue Classification Category (Grid Cards) */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Issue Classification Category <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categoriesList.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = formData.category === cat.id;
                    return (
                      <div
                        key={cat.id}
                        onClick={() => setFormData({ ...formData, category: cat.id })}
                        className={`p-3 rounded-xl border cursor-pointer transition flex items-start space-x-2.5 ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50/70 ring-2 ring-orange-400'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isSelected ? 'bg-orange-600 text-white' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-slate-900 leading-none">
                            {cat.num}. {cat.title}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-1 leading-snug">
                            {cat.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Row 4: Subject / Headline */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Issue Subject / Headline <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Zebra Handheld Barcode Scanner 04 Laser Reader Failure at Loading Dock 2"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50"
                />
                {formErrors.subject && (
                  <span className="text-[10px] text-red-500 mt-1 block">{formErrors.subject}</span>
                )}
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Keep descriptive and specify the physical cell or machine area
                </span>
              </div>

              {/* Row 5: Urgency / Production Impact SLA */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Urgency / Production Impact SLA <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  {[
                    { label: 'Low', desc: 'Standard SLA (72h)', dot: 'bg-slate-400' },
                    { label: 'Medium', desc: 'Within 24 Hours', dot: 'bg-blue-500' },
                    { label: 'High', desc: 'Within 4 Hours', dot: 'bg-amber-500' },
                    { label: 'Critical', desc: 'Line Stoppage (<1h)', dot: 'bg-red-500' }
                  ].map((level) => {
                    const isSelected = formData.urgency === level.label;
                    return (
                      <div
                        key={level.label}
                        onClick={() => setFormData({ ...formData, urgency: level.label })}
                        className={`p-3 rounded-lg border cursor-pointer transition text-center ${
                          isSelected
                            ? level.label === 'Critical'
                              ? 'border-red-500 bg-red-50 ring-2 ring-red-400'
                              : 'border-orange-500 bg-orange-50 ring-2 ring-orange-400'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-1.5 font-bold text-slate-900">
                          <span className={`w-2 h-2 rounded-full ${level.dot}`}></span>
                          <span>{level.label}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{level.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Row 6: Detailed Description */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-800">
                    Detailed Diagnostics / Incident Description <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400">
                    {formData.description.length} / 1200
                  </span>
                </div>
                <textarea
                  rows={4}
                  maxLength={1200}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide specific error codes, symptoms observed, machine stop alarms, sequence of events prior to breakdown..."
                  className="w-full text-xs p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 leading-relaxed"
                ></textarea>
                {formErrors.description && (
                  <span className="text-[10px] text-red-500 mt-1 block">{formErrors.description}</span>
                )}
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Supported format tips: Bullet points (-) or numbers (1.) for step replication.
                </span>
              </div>

              {/* Row 7: File & Telemetry Screenshot Dropzone */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  File &amp; Telemetry Screenshot Dropzone
                </label>
                <div
                  onClick={() => {
                    setFormData({
                      ...formData,
                      fileName: 'telemetry_dump_station04_crash.log'
                    });
                    showToast('Log Attached', 'telemetry_dump_station04_crash.log simulated attach.', 'info');
                  }}
                  className="border-2 border-dashed border-slate-300 hover:border-orange-500 rounded-xl p-6 text-center cursor-pointer bg-slate-50/60 transition group"
                >
                  <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-orange-500 mx-auto mb-2 transition" />
                  <div className="text-xs font-semibold text-slate-700">
                    {formData.fileName ? (
                      <span className="text-orange-600 font-mono">Attached: {formData.fileName}</span>
                    ) : (
                      'Click to upload diagnostic crash dump, logs, or shopfloor photos'
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Accepts PNG, JPG, PDF, TXT or ZIP archives up to 10MB each
                  </div>
                </div>
              </div>

              {/* Anonymous Whistleblower Toggle */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    Submit as Anonymous / POSH Protected Grievance
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Hides identity from shift lead; routed only to Internal Oversight Committee.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isAnonymous}
                  onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                  className="w-4 h-4 text-orange-600 rounded"
                />
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      empName: 'Rajesh Kumar',
                      empId: 'AF-EMP-4091',
                      department: 'Production Engineering, Manesar Plant 2',
                      assetTag: '',
                      category: 'Hardware',
                      subject: '',
                      urgency: 'High',
                      description: '',
                      isAnonymous: false,
                      fileName: ''
                    });
                    showToast('Draft Discarded', 'Form fields have been reset.', 'info');
                  }}
                  className="px-5 py-2.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
                >
                  Discard Draft
                </button>

                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg shadow-lg hover:shadow-orange-600/30 transition flex items-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit IT Ticket / Grievance</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Telemetry & Guidelines (Matching Mockup 4) */}
          <div className="lg:col-span-4 space-y-5">
            {/* HELPDESK TELEMETRY CARD */}
            <div className="bg-[#0f172a] text-white rounded-xl p-5 border border-slate-800 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-orange-400 font-bold tracking-widest uppercase">
                  HELPDESK TELEMETRY
                </span>
                <Activity className="w-4 h-4 text-orange-500 animate-pulse" />
              </div>

              <div>
                <h3 className="font-bold text-sm text-white">Active Plant S.L.A Protocol</h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Tier-1 emergency tickets regarding CNC machining bays &amp; packaging printers are routed directly to on-duty field supervisors.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Avg First Response:</span>
                  <span className="text-emerald-400 font-bold">12.4 Mins</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Critical MTTR (Today):</span>
                  <span className="text-orange-400 font-bold">1 Hr 18 Mins</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Shift Duty Lead:</span>
                  <span className="text-white font-semibold">M. K. Deshmukh (Ext 204)</span>
                </div>
              </div>
            </div>

            {/* CONFIDENTIALITY & ETHICS */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-orange-600" />
                <span>Confidentiality &amp; Ethics</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                AutoForge operates under strict compliance with the POSH Act 2013 and Whistleblower Protection Directives. Workplace grievances tagged under ethics are encrypted end-to-end and bypass plant operational staff, landing exclusively with the Internal Corporate Oversight Committee.
              </p>
              <div className="p-2.5 bg-orange-50 rounded-lg text-[10px] text-orange-800 font-medium">
                Anonymous reporting enabled upon toggling Ethics category.
              </div>
            </div>

            {/* QUICK JUMP TO OPEN TICKETS */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Quick Jump to Open Tickets</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Recent 3</span>
              </div>

              <div className="space-y-2">
                {tickets.slice(0, 3).map((t) => (
                  <div
                    key={t.id}
                    onClick={() => onOpenTicket(t)}
                    className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-800">#{t.id}</span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          t.urgency === 'Critical'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {t.urgency.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium mt-1 truncate">
                      {t.subject}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW SUB-TAB: TRACK COMPLAINTS (TIMELINE & STATUS) */}
      {complaintTab === 'track' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-2">
              Registered Complaint &amp; Ticket Telemetry Tracker
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Track live status, field technician assignments, and diagnostic milestone progress across plant locations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tickets list */}
              <div className="space-y-3 md:col-span-1 border-r border-slate-200 pr-0 md:pr-4">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Ticket to Track ({tickets.length})
                </h3>
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                  {tickets.map((t) => {
                    const isSelected = selectedTicket && selectedTicket.id === t.id;
                    return (
                      <div
                        key={t.id}
                        onClick={() => onSelectTicket(t)}
                        className={`p-3 rounded-xl border cursor-pointer transition text-xs ${
                          isSelected
                            ? 'bg-orange-50 border-orange-500 ring-1 ring-orange-400'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-slate-900">#{t.id}</span>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                              t.status === 'Resolved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : t.status === 'In Progress'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-slate-100 text-slate-800'
                            }`}
                          >
                            {t.status}
                          </span>
                        </div>
                        <h4 className="font-semibold text-slate-800 mt-1 line-clamp-1">
                          {t.subject}
                        </h4>
                        <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                          <span>{t.category}</span>
                          <span>{t.createdAt}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected Ticket Active Tracker */}
              <div className="md:col-span-2 space-y-6">
                {selectedTicket ? (
                  <div className="space-y-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono text-orange-600 font-bold">
                            TICKET #{selectedTicket.id} &middot; {selectedTicket.category}
                          </span>
                          <h3 className="text-base font-bold text-slate-900 mt-0.5">
                            {selectedTicket.subject}
                          </h3>
                        </div>
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full ${
                            selectedTicket.status === 'Resolved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : selectedTicket.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-200 text-slate-800'
                          }`}
                        >
                          Status: {selectedTicket.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-200 text-xs">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Logged By</span>
                          <span className="font-semibold text-slate-800">{selectedTicket.reporter}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Emp / Role</span>
                          <span className="font-semibold text-slate-800">{selectedTicket.empId}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Urgency / SLA</span>
                          <span className="font-semibold text-red-600">{selectedTicket.urgency}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Assigned Specialist</span>
                          <span className="font-semibold text-blue-600">{selectedTicket.assignedTech}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Timeline Tracker */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
                        Incident Resolution Milestones
                      </h4>
                      <div className="relative pl-6 border-l-2 border-orange-500/40 space-y-6 ml-3 text-xs">
                        {selectedTicket.timeline.map((step, idx) => (
                          <div key={idx} className="relative">
                            <span
                              className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full flex items-center justify-center ${
                                step.done
                                  ? 'bg-orange-600 text-white shadow'
                                  : 'bg-white border-2 border-slate-300'
                              }`}
                            >
                              {step.done ? <Check className="w-2.5 h-2.5" /> : null}
                            </span>
                            <div className="font-bold text-slate-900 text-xs">{step.label}</div>
                            <div className="text-[11px] text-slate-400 mt-0.5">{step.time}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Incident Diagnostic Description */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <span className="text-[11px] font-bold text-slate-700 block mb-1">
                        Reported Symptoms &amp; Diagnostic Details
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {selectedTicket.notes}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-12 text-center text-xs text-slate-400">
                    Select a ticket from the left column to view its resolution progress.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
