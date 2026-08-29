import React, { useState } from "react";
import {
  Store, Camera, Users, Sparkles, Upload, DollarSign, Check, X,
  MessageCircle, ChevronLeft, Send, Plus, ArrowRight, Briefcase,
  Info, ShieldCheck, Instagram, FileText, LifeBuoy, AlertTriangle,
  Bot, ChevronRight,
} from "lucide-react";

// ---------------- design tokens (black / creme, gen z minimal) ----------------
const C = {
  cream: "#F7F2E7",
  creamDim: "#EDE6D6",
  black: "#0E0E0E",
  blackSoft: "#1B1B1B",
  pop: "#C6F24E",
  red: "#E24B3D",
};
const display = { fontFamily: "'Archivo', sans-serif", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em" };
const body = { fontFamily: "'Space Grotesk', sans-serif" };
const mono = { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, letterSpacing: "0.04em" };

const PLATFORM_FEE_PCT = 10;

function useFonts() {
  React.useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Archivo:wght@400;600;900&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
}

let uid = 1;
const nextId = () => uid++;

// ---------------- generic UI ----------------
function Btn({ children, onClick, variant = "primary", full, small, disabled, type }) {
  const base = { ...body, fontWeight: 600, borderRadius: 999, cursor: disabled ? "default" : "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, border: `1.5px solid ${C.black}`, transition: "transform .15s ease", opacity: disabled ? 0.4 : 1 };
  const sizes = small ? { padding: "8px 16px", fontSize: 12 } : { padding: "13px 22px", fontSize: 14 };
  const variants = {
    primary: { background: C.black, color: C.cream },
    outline: { background: "transparent", color: C.black },
    pop: { background: C.pop, color: C.black },
    danger: { background: C.red, color: C.cream, border: `1.5px solid ${C.red}` },
  };
  return (
    <button type={type || "button"} disabled={disabled} onClick={onClick} style={{ ...base, ...sizes, ...variants[variant], width: full ? "100%" : "auto" }}
      onMouseEnter={(e) => !disabled && (e.currentTarget.style.transform = "translateY(-2px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
      {children}
    </button>
  );
}

function Field({ label, ...props }) {
  return (
    <div className="mb-4">
      <label style={{ ...mono, color: C.black, fontSize: 10 }} className="uppercase tracking-wide block mb-1 opacity-60">{label}</label>
      <input {...props} style={{ ...body, borderColor: C.black }} className="w-full px-3 py-2.5 rounded-md border bg-transparent outline-none text-sm" />
    </div>
  );
}
function TextArea({ label, ...props }) {
  return (
    <div className="mb-4">
      <label style={{ ...mono, color: C.black, fontSize: 10 }} className="uppercase tracking-wide block mb-1 opacity-60">{label}</label>
      <textarea {...props} style={{ ...body, borderColor: C.black }} className="w-full px-3 py-2.5 rounded-md border bg-transparent outline-none text-sm" rows={3} />
    </div>
  );
}
function FileInput({ label, onFiles }) {
  return (
    <div className="mb-4">
      <label style={{ ...mono, color: C.black, fontSize: 10 }} className="uppercase tracking-wide block mb-1 opacity-60">{label}</label>
      <label className="flex items-center gap-2 p-3 rounded-md cursor-pointer" style={{ border: `1.5px dashed ${C.black}` }}>
        <Upload size={16} style={{ color: C.black }} />
        <span style={{ ...body, fontSize: 13, color: C.black }} className="truncate">Choose file</span>
        <input type="file" className="hidden" onChange={(e) => e.target.files[0] && onFiles(e.target.files[0].name)} />
      </label>
    </div>
  );
}
function Pill({ children, pop, danger }) {
  const bg = pop ? C.pop : danger ? C.red : C.creamDim;
  const color = danger ? C.cream : C.black;
  return <span style={{ ...mono, fontSize: 10, background: bg, border: `1px solid ${danger ? C.red : C.black}`, color }} className="px-2.5 py-1 rounded-full uppercase inline-block">{children}</span>;
}
function VerifiedBadge({ size = 11 }) {
  return (
    <span style={{ ...mono, fontSize: size, background: C.black, color: C.pop }} className="px-2 py-0.5 rounded-full inline-flex items-center gap-1">
      <ShieldCheck size={size + 2} /> Verified
    </span>
  );
}
function Card({ children, sticker, dark, onClick }) {
  const style = dark
    ? { background: C.black, color: C.cream, borderRadius: 16, padding: 18 }
    : { background: C.cream, border: `1.5px solid ${C.black}`, borderRadius: 16, padding: 18, boxShadow: sticker ? `5px 5px 0 ${C.black}` : "none" };
  return <div onClick={onClick} style={style} className={onClick ? "cursor-pointer" : ""}>{children}</div>;
}
function Sheet({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: "rgba(14,14,14,0.5)" }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: C.cream, maxWidth: 420, width: "100%", maxHeight: "88vh", overflowY: "auto" }} className="rounded-t-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div style={{ ...display, fontSize: 18, color: C.black }}>{title}</div>
          <button onClick={onClose}><X size={20} style={{ color: C.black }} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
function Avatar({ label, size = 40 }) {
  return <div style={{ width: size, height: size, background: C.black, color: C.cream, ...display, fontSize: size * 0.4, borderRadius: "50%" }} className="flex items-center justify-center flex-shrink-0">{label}</div>;
}
function InfoNote({ children }) {
  return (
    <div className="flex items-start gap-2 mb-4 p-3 rounded-lg" style={{ background: C.creamDim }}>
      <Info size={14} style={{ color: C.black, flexShrink: 0, marginTop: 2 }} />
      <div style={{ ...body, fontSize: 11, color: C.black }} className="opacity-70">{children}</div>
    </div>
  );
}

// ---------------- seed / sample data ----------------
const seedDeals = [
  { id: nextId(), brand: "Salt & Seam", verified: true, category: "Knitwear", budget: "$400", deliverable: "3 Reels + 5 photos", description: "Launching our autumn capsule — want a creator with a styling eye to shoot and post the drop.",
    applicants: [
      { id: nextId(), name: "Mei Lin", status: "chosen", pitch: "I shoot editorial-style lookbooks and have worked with 2 other knitwear labels this year.", link: "instagram.com/meilin.shoots", files: [] },
      { id: nextId(), name: "Theo Brandt", status: "pending", pitch: "Styling background, can also pull in a photographer from my network.", link: "instagram.com/theostyles", files: [] },
    ] },
  { id: nextId(), brand: "Rook Studio", verified: true, category: "Accessories", budget: "$250", deliverable: "Lookbook shoot", description: "Debut season, small batch. First paid shoot budget — looking for someone building their portfolio.",
    applicants: [
      { id: nextId(), name: "Jordan Reyes", status: "chosen", pitch: "Been shooting lookbooks for 2 seasons, based nearby and can shoot this week.", link: "instagram.com/jordan.shoots", files: [] },
    ] },
  { id: nextId(), brand: "Fauve", verified: false, category: "Vintage resale", budget: "$150 + product", deliverable: "2 TikToks/month, ongoing", description: "High posting frequency. Want a recurring creator relationship, not a one-off.", applicants: [] },
  { id: nextId(), brand: "Norr Studio", verified: true, category: "Footwear", budget: "$500", deliverable: "1 campaign video", description: "Winter boot campaign — need someone comfortable with outdoor/on-location shoots.", applicants: [] },
];

const seedSwaps = [
  { id: nextId(), name: "Priya", role: "Makeup Artist", offering: "Editorial + bridal makeup", seeking: "Portfolio photography", tags: ["MUA", "SFX"] },
  { id: nextId(), name: "Theo", role: "Stylist", offering: "Streetwear styling", seeking: "Video editing", tags: ["Styling", "Thrift"] },
  { id: nextId(), name: "Salt & Seam", role: "Brand", offering: "Product + store credit", seeking: "Videographer for a 1-day shoot", tags: ["Brand", "Shoot"] },
  { id: nextId(), name: "Mei", role: "Model", offering: "Modelling for test shoots", seeking: "Makeup done for a shoot", tags: ["Model", "TFP"] },
  { id: nextId(), name: "Jordan", role: "Photographer", offering: "Portrait + street photography", seeking: "A stylist for a personal project", tags: ["Photography"] },
];

const seedChats = [
  { id: nextId(), name: "Mei Lin", kind: "deal", dealTitle: "Autumn capsule launch", paidAmount: null, messages: [
    { from: "system", text: 'You chose Mei Lin for "Autumn capsule launch"' },
    { from: "them", text: "Hey! So excited about this — when's the shoot?" },
    { from: "me", text: "Great pitch — thinking next Thursday, does that work?" },
  ] },
  { id: nextId(), name: "Jordan Reyes", kind: "deal", dealTitle: "Lookbook shoot", paidAmount: "$250.00", messages: [
    { from: "system", text: 'You chose Jordan Reyes for "Lookbook shoot"' },
    { from: "them", text: "Shoot's done, sending over the final gallery today!" },
    { from: "system", text: `💸 $250.00 sent · $225.00 to Jordan Reyes after Label's ${PLATFORM_FEE_PCT}% fee (demo payment)` },
  ] },
];

const faqData = [
  { keys: ["verify", "verification", "legit"], a: "Only businesses need to verify on Label — a registration number + document at signup. Creators don't need verification, just a profile with your niche and portfolio." },
  { keys: ["pay", "payment", "fee", "commission", "revenue"], a: `Payments happen inside a deal chat. Label takes a ${PLATFORM_FEE_PCT}% platform fee on completed deal payments — the breakdown is shown before you send.` },
  { keys: ["apply", "application", "portfolio"], a: "Go to Deals, tap a brand deal, then Apply — you can write a short pitch and upload portfolio files or a link." },
  { keys: ["swap", "skill"], a: "Skill Swap is open to everyone — post what you offer and what you want in return, no payment needed. Great for trading services like makeup-for-photography." },
  { keys: ["scam", "report", "fraud"], a: "You can report a scam or suspicious user from the Support tab — our team reviews reports and follows up." },
  { keys: ["delete", "account", "privacy", "data"], a: "This is a hackathon prototype, so nothing is saved to a server yet — everything resets on refresh. A production version would need proper encryption and access controls before storing real user data." },
  { keys: ["resume", "instagram", "social"], a: "Creators can link their Instagram and upload a resume from their Profile — brands see this alongside applications." },
];
function faqAnswer(q) {
  const lower = q.toLowerCase();
  const hit = faqData.find((f) => f.keys.some((k) => lower.includes(k)));
  return hit ? hit.a : "I'm not sure about that one — try the Report a Scam form or contact support@label.app for anything urgent.";
}

function BackButton({ onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1 mb-5" style={{ ...mono, fontSize: 12, color: C.black }}>
      <ChevronLeft size={16} /> Back
    </button>
  );
}

// ---------------- Landing / Role / Onboard / Verify ----------------
function Landing({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col justify-between px-6 py-10" style={{ background: C.black }}>
      <div style={{ ...mono, color: C.pop, fontSize: 11 }} className="tracking-widest uppercase">Label</div>
      <div>
        <h1 style={{ ...display, color: C.cream, fontSize: "clamp(2.4rem,9vw,3.6rem)", lineHeight: 1.02 }} className="mb-6">
          Swap skills.<br />Land deals.<br /><span style={{ color: C.pop }}>Get paid.</span>
        </h1>
        <p style={{ ...body, color: C.cream }} className="text-sm opacity-70 mb-8 max-w-xs">
          Label connects fashion creatives to learn from each other and discover paid, verified opportunities with emerging fashion brands.
        </p>
        <Btn variant="pop" onClick={onStart}>Get started <ArrowRight size={16} /></Btn>
      </div>
      <div style={{ ...mono, color: "#6B6B6B", fontSize: 10 }}>made for the fashion creative economy</div>
    </div>
  );
}

function RoleSelect({ onPick, onBack }) {
  const roles = [
    { id: "business", title: "Business", desc: "Post brand deals, review applicants, chat & pay creators", icon: Store },
    { id: "creator", title: "Creator", desc: "Model, influencer or content creator — apply to deals with your portfolio", icon: Camera },
    { id: "normal", title: "Community", desc: "Just here to skill-swap — e.g. trade makeup for photography", icon: Users },
  ];
  return (
    <div className="min-h-screen flex flex-col justify-center px-6" style={{ background: C.cream }}>
      {onBack && <BackButton onClick={onBack} />}
      <div style={{ ...mono, color: C.black, fontSize: 11 }} className="uppercase tracking-widest opacity-50 mb-2">Step 1 of 3</div>
      <h2 style={{ ...display, color: C.black, fontSize: 26 }} className="mb-6">How will you use Label?</h2>
      <div className="flex flex-col gap-3">
        {roles.map((r) => (
          <button key={r.id} onClick={() => onPick(r.id)} className="text-left p-4 rounded-2xl flex items-center gap-3" style={{ background: C.cream, border: `1.5px solid ${C.black}`, boxShadow: `5px 5px 0 ${C.black}` }}>
            <r.icon size={22} style={{ color: C.black, flexShrink: 0 }} />
            <div>
              <div style={{ ...display, fontSize: 15, color: C.black }}>{r.title}</div>
              <div style={{ ...body, color: C.black, fontSize: 12 }} className="opacity-60">{r.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Onboard({ role, onDone, onBack }) {
  const [name, setName] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [ig, setIg] = useState("");
  const [resume, setResume] = useState("");
  const copy = {
    business: { a: "Brand name", ap: "e.g. Salt & Seam", b: "What you sell", bp: "e.g. Sustainable knitwear" },
    creator: { a: "Your niche", ap: "e.g. Styling, Photography", b: "Short bio", bp: "e.g. 3 yrs freelance styling" },
    normal: { a: "A skill you offer", ap: "e.g. Makeup", b: "A skill you want", bp: "e.g. Photography" },
  }[role];
  return (
    <div className="min-h-screen flex flex-col justify-center px-6" style={{ background: C.cream }}>
      {onBack && <BackButton onClick={onBack} />}
      <div style={{ ...mono, color: C.black, fontSize: 11 }} className="uppercase tracking-widest opacity-50 mb-2">Step 2 of 3</div>
      <h2 style={{ ...display, color: C.black, fontSize: 26 }} className="mb-6">Quick profile</h2>
      <Field label="Your name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Alex Rivera" />
      <Field label={copy.a} value={a} onChange={(e) => setA(e.target.value)} placeholder={copy.ap} />
      <Field label={copy.b} value={b} onChange={(e) => setB(e.target.value)} placeholder={copy.bp} />
      {role === "creator" && (
        <>
          <Field label="Instagram handle" value={ig} onChange={(e) => setIg(e.target.value)} placeholder="@yourhandle" />
          <FileInput label="Upload resume" onFiles={setResume} />
          {resume && <div style={{ ...mono, fontSize: 11, color: C.black }} className="mb-4 -mt-2 opacity-60">Attached: {resume}</div>}
        </>
      )}
      <Btn full disabled={!name} onClick={() => onDone({ name: name || "You", a, b, instagram: ig, resume })}>{role === "business" ? "Continue to verification" : "Enter Label"} <ArrowRight size={16} /></Btn>
    </div>
  );
}

function Verify({ onDone, onBack }) {
  const [regNumber, setRegNumber] = useState("");
  const [doc, setDoc] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: C.cream }}>
        <ShieldCheck size={40} style={{ color: C.black }} className="mb-4" />
        <h2 style={{ ...display, color: C.black, fontSize: 24 }} className="mb-2">You're verified</h2>
        <p style={{ ...body, color: C.black }} className="text-sm opacity-60 mb-8 max-w-xs">
          Your business is marked as verified — deals you post will show a verified badge to creators.
        </p>
        <Btn variant="pop" onClick={onDone}>Enter Label <ArrowRight size={16} /></Btn>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-6" style={{ background: C.cream }}>
      {onBack && <BackButton onClick={onBack} />}
      <div style={{ ...mono, color: C.black, fontSize: 11 }} className="uppercase tracking-widest opacity-50 mb-2">Step 3 of 3</div>
      <h2 style={{ ...display, color: C.black, fontSize: 26 }} className="mb-4">Verify your business</h2>
      <InfoNote>
        Only businesses need verification on Label — instantly approved for this demo. A real version would check this against a business registry before approving.
      </InfoNote>
      <Field label="Business registration / ABN number" value={regNumber} onChange={(e) => setRegNumber(e.target.value)} placeholder="e.g. 51 824 753 556" />
      <FileInput label="Proof of business (registration doc)" onFiles={setDoc} />
      {doc && <div style={{ ...mono, fontSize: 11, color: C.black }} className="mb-4 -mt-2 opacity-60">Attached: {doc}</div>}
      <Btn full variant="primary" disabled={!regNumber} onClick={() => setSubmitted(true)}>Submit for verification</Btn>
    </div>
  );
}

// ---------------- Deals: Business side ----------------
function BusinessDeals({ deals, addDeal, chooseApplicant, passApplicant, profile, onMessage, onPay }) {
  const [posting, setPosting] = useState(false);
  const [active, setActive] = useState(null);
  const [viewApplicant, setViewApplicant] = useState(null);
  const [form, setForm] = useState({ title: "", category: "", budget: "", deliverable: "", description: "" });
  const myDeals = deals.filter((d) => d.brand === (profile.a || profile.name));

  return (
    <div className="px-5 pt-8 pb-24">
      <div className="flex items-center justify-between mb-5">
        <h2 style={{ ...display, color: C.black, fontSize: 22 }}>My Deals</h2>
        <Btn small variant="pop" onClick={() => setPosting(true)}><Plus size={14} /> Post</Btn>
      </div>
      {myDeals.length === 0 && <Card sticker><div style={{ ...body, color: C.black }} className="text-sm opacity-70">No deals posted yet — tap Post to create your first brand deal.</div></Card>}
      <div className="flex flex-col gap-3">
        {myDeals.map((d) => (
          <Card key={d.id} sticker onClick={() => setActive(d)}>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2"><div style={{ ...display, fontSize: 15, color: C.black }}>{d.title}</div>{d.verified && <VerifiedBadge size={9} />}</div>
                <div style={{ ...body, fontSize: 12, color: C.black }} className="opacity-60">{d.category} · {d.budget}</div>
              </div>
              <Pill pop>{d.applicants.length} applied</Pill>
            </div>
          </Card>
        ))}
      </div>

      {posting && (
        <Sheet title="Post a Deal" onClose={() => setPosting(false)}>
          <Field label="Deal title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Autumn capsule launch" />
          <Field label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Knitwear" />
          <Field label="Budget" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="e.g. $300" />
          <Field label="Deliverable" value={form.deliverable} onChange={(e) => setForm({ ...form, deliverable: e.target.value })} placeholder="e.g. 3 Reels + 5 photos" />
          <TextArea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="What's the shoot / campaign about?" />
          <Btn full variant="primary" disabled={!form.title} onClick={() => { addDeal({ ...form, brand: profile.a || profile.name, verified: !!profile.verified }); setForm({ title: "", category: "", budget: "", deliverable: "", description: "" }); setPosting(false); }}>Post deal</Btn>
        </Sheet>
      )}

      {active && (
        <Sheet title={active.title} onClose={() => setActive(null)}>
          <div style={{ ...body, color: C.black }} className="text-sm opacity-70 mb-4">{active.description}</div>
          <div style={{ ...mono, fontSize: 10, color: C.black }} className="uppercase opacity-50 mb-2">Applicants ({active.applicants.length})</div>
          {active.applicants.length === 0 && <div style={{ ...body }} className="text-xs opacity-50">No applications yet.</div>}
          <div className="flex flex-col gap-2">
            {active.applicants.map((ap) => (
              <div key={ap.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ border: `1px solid ${C.black}` }}>
                <Avatar label={ap.name[0]} size={34} />
                <div className="flex-1">
                  <div style={{ ...body, fontWeight: 600, fontSize: 13, color: C.black }}>{ap.name}</div>
                  <div style={{ ...body, fontSize: 11, color: C.black }} className="opacity-50 capitalize">{ap.status}</div>
                </div>
                {ap.status === "chosen" ? (
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button onClick={() => onMessage(ap.name, active.title)} style={{ ...mono, fontSize: 9, border: `1px solid ${C.black}`, color: C.black }} className="px-2 py-1.5 rounded-full flex items-center gap-1"><MessageCircle size={11} /> Message</button>
                    <button onClick={() => onPay(ap.name, active.title)} style={{ ...mono, fontSize: 9, background: C.pop, border: `1px solid ${C.black}`, color: C.black }} className="px-2 py-1.5 rounded-full flex items-center gap-1"><DollarSign size={11} /> Pay</button>
                  </div>
                ) : (
                  <button onClick={() => setViewApplicant(ap)} style={{ ...mono, fontSize: 10, color: C.black }} className="underline flex-shrink-0">View</button>
                )}
              </div>
            ))}
          </div>
        </Sheet>
      )}

      {viewApplicant && (
        <Sheet title={viewApplicant.name} onClose={() => setViewApplicant(null)}>
          <div style={{ ...mono, fontSize: 10, color: C.black }} className="uppercase opacity-50 mb-2">Pitch</div>
          <div style={{ ...body, color: C.black }} className="text-sm mb-4">{viewApplicant.pitch || "—"}</div>
          {viewApplicant.link && (<><div style={{ ...mono, fontSize: 10, color: C.black }} className="uppercase opacity-50 mb-2">Portfolio link</div><div style={{ ...body, color: C.black }} className="text-sm mb-4">{viewApplicant.link}</div></>)}
          <div style={{ ...mono, fontSize: 10, color: C.black }} className="uppercase opacity-50 mb-2">Uploaded files</div>
          <div className="flex flex-wrap gap-2 mb-5">
            {(!viewApplicant.files || viewApplicant.files.length === 0) && <div style={{ ...body }} className="text-xs opacity-50">None</div>}
            {(viewApplicant.files || []).map((f, i) => f.isImage ? (
              <img key={i} src={f.url} alt={f.name} className="w-20 h-20 object-cover rounded-lg" style={{ border: `1px solid ${C.black}` }} />
            ) : <div key={i} style={{ ...mono, fontSize: 10, border: `1px solid ${C.black}` }} className="px-2 py-1 rounded">{f.name}</div>)}
          </div>
          <div className="flex gap-2">
            <Btn variant="outline" full onClick={() => { passApplicant(active.id, viewApplicant.id); setViewApplicant(null); }}><X size={14} /> Pass</Btn>
            <Btn variant="pop" full onClick={() => { chooseApplicant(active.id, viewApplicant); setViewApplicant(null); setActive(null); }}><Check size={14} /> Choose & chat</Btn>
          </div>
        </Sheet>
      )}
    </div>
  );
}

// ---------------- Deals: Creator side ----------------
function CreatorDeals({ deals, applyToDeal, profile }) {
  const [active, setActive] = useState(null);
  const [applying, setApplying] = useState(false);
  const [pitch, setPitch] = useState("");
  const [link, setLink] = useState(profile.instagram || "");
  const [files, setFiles] = useState([]);
  const myApplications = deals.flatMap((d) => d.applicants.filter((a) => a.name === profile.name).map((a) => ({ ...a, dealTitle: d.title })));

  const handleFiles = (e) => {
    const list = Array.from(e.target.files).map((f) => ({ name: f.name, url: URL.createObjectURL(f), isImage: f.type.startsWith("image/") }));
    setFiles(list);
  };

  return (
    <div className="px-5 pt-8 pb-24">
      <h2 style={{ ...display, color: C.black, fontSize: 22 }} className="mb-1">Brand Deals</h2>
      <div style={{ ...body, color: C.black }} className="text-xs opacity-50 mb-5">AI-suggested for your niche</div>
      <div className="flex flex-col gap-3 mb-6">
        {deals.map((d) => (
          <Card key={d.id} sticker>
            <div className="flex justify-between items-start cursor-pointer" onClick={() => setActive(d)}>
              <div>
                <div className="flex items-center gap-2"><div style={{ ...display, fontSize: 15, color: C.black }}>{d.brand}</div>{d.verified && <VerifiedBadge size={9} />}</div>
                <div style={{ ...body, fontSize: 12, color: C.black }} className="opacity-60">{d.title}</div>
              </div>
              <Pill pop>{d.budget}</Pill>
            </div>
            <div className="flex justify-end mt-3">
              <Btn small variant="pop" onClick={(e) => { e.stopPropagation(); setActive(d); setApplying(true); }}>Apply</Btn>
            </div>
          </Card>
        ))}
      </div>
      {myApplications.length > 0 && (
        <>
          <div style={{ ...mono, fontSize: 10, color: C.black }} className="uppercase opacity-50 mb-2">My applications</div>
          <div className="flex flex-col gap-2">
            {myApplications.map((a, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ border: `1px solid ${C.black}` }}>
                <div style={{ ...body, fontSize: 13, color: C.black }}>{a.dealTitle}</div>
                <Pill>{a.status}</Pill>
              </div>
            ))}
          </div>
        </>
      )}

      {active && (
        <Sheet title={active.brand} onClose={() => setActive(null)}>
          {active.verified && <div className="mb-2"><VerifiedBadge /></div>}
          <div style={{ ...display, fontSize: 16, color: C.black }} className="mb-1">{active.title}</div>
          <div className="flex gap-2 mb-3"><Pill>{active.category}</Pill><Pill pop>{active.budget}</Pill></div>
          <div style={{ ...body, color: C.black }} className="text-sm opacity-70 mb-2">{active.description}</div>
          <div style={{ ...mono, fontSize: 10, color: C.black }} className="uppercase opacity-50 mb-4">Deliverable: {active.deliverable}</div>
          <Btn full variant="pop" onClick={() => setApplying(true)}>Apply now</Btn>
        </Sheet>
      )}

      {applying && (
        <Sheet title="Apply" onClose={() => setApplying(false)}>
          <TextArea label="Short pitch" value={pitch} onChange={(e) => setPitch(e.target.value)} placeholder="Why you're a fit for this deal..." />
          <Field label="Instagram / portfolio link" value={link} onChange={(e) => setLink(e.target.value)} placeholder="instagram.com/you" />
          <label style={{ ...mono, fontSize: 10, color: C.black }} className="uppercase tracking-wide block mb-1 opacity-60">Portfolio files</label>
          <label className="flex items-center gap-2 p-3 rounded-md mb-2 cursor-pointer" style={{ border: `1.5px dashed ${C.black}` }}>
            <Upload size={16} style={{ color: C.black }} />
            <span style={{ ...body, fontSize: 13, color: C.black }}>Upload images / PDF</span>
            <input type="file" multiple accept="image/*,.pdf" className="hidden" onChange={handleFiles} />
          </label>
          <div className="flex flex-wrap gap-2 mb-5">
            {files.map((f, i) => f.isImage ? <img key={i} src={f.url} className="w-16 h-16 object-cover rounded-lg" style={{ border: `1px solid ${C.black}` }} /> : <div key={i} style={{ ...mono, fontSize: 10, border: `1px solid ${C.black}` }} className="px-2 py-1 rounded">{f.name}</div>)}
          </div>
          <Btn full variant="primary" onClick={() => { applyToDeal(active.id, { id: nextId(), name: profile.name, pitch, link, files, status: "pending" }); setApplying(false); setActive(null); setPitch(""); setFiles([]); }}>Submit application</Btn>
        </Sheet>
      )}
    </div>
  );
}

// ---------------- Skill Swap ----------------
function SkillSwap({ swaps, addSwap, requestSwap, profile }) {
  const [posting, setPosting] = useState(false);
  const [form, setForm] = useState({ offering: "", seeking: "" });
  return (
    <div className="px-5 pt-8 pb-24">
      <div className="flex items-center justify-between mb-5">
        <h2 style={{ ...display, color: C.black, fontSize: 22 }}>Skill Swap</h2>
        <Btn small variant="pop" onClick={() => setPosting(true)}><Plus size={14} /> Post</Btn>
      </div>
      <div style={{ ...body, color: C.black }} className="text-xs opacity-50 mb-5">Trade a skill directly — no money required.</div>
      <div className="flex flex-col gap-3">
        {swaps.map((s) => (
          <Card key={s.id} sticker>
            <div className="flex items-center gap-3 mb-3">
              <Avatar label={s.name[0]} size={38} />
              <div><div style={{ ...display, fontSize: 14, color: C.black }}>{s.name}</div><div style={{ ...body, fontSize: 11, color: C.black }} className="opacity-50">{s.role}</div></div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">{s.tags.map((t) => <Pill key={t}>{t}</Pill>)}</div>
            <div style={{ ...body, fontSize: 12, color: C.black }} className="mb-1"><b>Offers:</b> {s.offering}</div>
            <div style={{ ...body, fontSize: 12, color: C.black }} className="mb-3 opacity-80"><b>Wants:</b> {s.seeking}</div>
            <Btn full variant="primary" onClick={() => requestSwap(s)}>Request swap</Btn>
          </Card>
        ))}
      </div>
      {posting && (
        <Sheet title="Post a skill swap" onClose={() => setPosting(false)}>
          <Field label="What you offer" value={form.offering} onChange={(e) => setForm({ ...form, offering: e.target.value })} placeholder="e.g. Makeup for a shoot" />
          <Field label="What you want in return" value={form.seeking} onChange={(e) => setForm({ ...form, seeking: e.target.value })} placeholder="e.g. Portfolio photography" />
          <Btn full variant="primary" disabled={!form.offering} onClick={() => { addSwap({ id: nextId(), name: profile.name, role: "You", offering: form.offering, seeking: form.seeking, tags: [] }); setForm({ offering: "", seeking: "" }); setPosting(false); }}>Post it</Btn>
        </Sheet>
      )}
    </div>
  );
}

// ---------------- Chats ----------------
function ChatsList({ chats, onOpen }) {
  return (
    <div className="px-5 pt-8 pb-24">
      <h2 style={{ ...display, color: C.black, fontSize: 22 }} className="mb-5">Chats</h2>
      {chats.length === 0 && <div style={{ ...body, color: C.black }} className="text-sm opacity-50">No chats yet — connect via a Deal or Skill Swap first.</div>}
      <div className="flex flex-col gap-2">
        {chats.map((c) => (
          <button key={c.id} onClick={() => onOpen(c)} className="flex items-center gap-3 p-3 rounded-xl text-left" style={{ border: `1px solid ${C.black}` }}>
            <Avatar label={c.name[0]} size={38} />
            <div className="flex-1">
              <div style={{ ...body, fontWeight: 600, fontSize: 13, color: C.black }}>{c.name}</div>
              <div style={{ ...body, fontSize: 11, color: C.black }} className="opacity-50">{c.kind === "deal" ? c.dealTitle : "Skill swap"}{c.paidAmount ? ` · Paid ${c.paidAmount}` : ""}</div>
            </div>
            <MessageCircle size={16} style={{ color: C.black }} />
          </button>
        ))}
      </div>
    </div>
  );
}

function ChatView({ chat, onBack, sendMessage, sendPayment, role }) {
  const [draft, setDraft] = useState("");
  const [paying, setPaying] = useState(!!chat.openPay);
  const [amount, setAmount] = useState("");
  const numeric = parseFloat((amount || "").replace(/[^0-9.]/g, "")) || 0;
  const fee = Math.round(numeric * (PLATFORM_FEE_PCT / 100) * 100) / 100;
  const payout = Math.round((numeric - fee) * 100) / 100;

  return (
    <div className="min-h-screen flex flex-col pb-24">
      <div className="flex items-center gap-3 px-5 pt-8 pb-3" style={{ borderBottom: `1px solid ${C.black}` }}>
        <button onClick={onBack}><ChevronLeft size={20} style={{ color: C.black }} /></button>
        <Avatar label={chat.name[0]} size={34} />
        <div className="flex-1">
          <div style={{ ...body, fontWeight: 600, fontSize: 14, color: C.black }}>{chat.name}</div>
          <div style={{ ...body, fontSize: 10, color: C.black }} className="opacity-50">{chat.kind === "deal" ? chat.dealTitle : "Skill swap"}</div>
        </div>
        {chat.kind === "deal" && role === "business" && (
          <button onClick={() => setPaying(true)} style={{ background: C.pop, border: `1px solid ${C.black}` }} className="p-2 rounded-full"><DollarSign size={16} style={{ color: C.black }} /></button>
        )}
      </div>
      <div className="flex-1 px-5 py-4 flex flex-col gap-2">
        {chat.messages.map((m, i) => (
          <div key={i} className="max-w-[78%] text-sm px-3 py-2 rounded-xl" style={{ ...body, alignSelf: m.from === "me" ? "flex-end" : m.from === "system" ? "center" : "flex-start", background: m.from === "me" ? C.black : m.from === "system" ? C.pop : C.creamDim, color: m.from === "me" ? C.cream : C.black, fontSize: m.from === "system" ? 11 : 13, textAlign: m.from === "system" ? "center" : "left" }}>{m.text}</div>
        ))}
      </div>
      <div className="flex gap-2 px-5">
        <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && draft.trim() && (sendMessage(chat.id, draft), setDraft(""))} placeholder="Message..." style={{ ...body, borderColor: C.black }} className="flex-1 px-3 py-2 rounded-full border bg-transparent outline-none text-sm" />
        <button onClick={() => { if (draft.trim()) { sendMessage(chat.id, draft); setDraft(""); } }} style={{ background: C.black, color: C.pop }} className="px-3 rounded-full"><Send size={16} /></button>
      </div>

      {paying && (
        <Sheet title="Send payment" onClose={() => setPaying(false)}>
          <InfoNote>Demo only — no real money moves. A production build would connect this to a payment processor like Stripe.</InfoNote>
          <Field label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 400" />
          {numeric > 0 && (
            <div className="mb-4 p-3 rounded-lg" style={{ background: C.creamDim }}>
              <div style={{ ...body, fontSize: 12, color: C.black }} className="flex justify-between"><span>Deal amount</span><span>${numeric.toFixed(2)}</span></div>
              <div style={{ ...body, fontSize: 12, color: C.black }} className="flex justify-between opacity-60"><span>Label fee ({PLATFORM_FEE_PCT}%)</span><span>-${fee.toFixed(2)}</span></div>
              <div style={{ ...body, fontSize: 12, color: C.black, fontWeight: 700, borderTop: `1px dashed ${C.black}` }} className="flex justify-between pt-1 mt-1"><span>{chat.name} receives</span><span>${payout.toFixed(2)}</span></div>
            </div>
          )}
          <Btn full variant="pop" disabled={!numeric} onClick={() => { sendPayment(chat.id, `$${numeric.toFixed(2)}`, `$${payout.toFixed(2)}`); setPaying(false); }}>Send payment</Btn>
        </Sheet>
      )}
    </div>
  );
}

// ---------------- Support (FAQ bot + report scam) ----------------
function Support({ profile, reports, addReport }) {
  const [view, setView] = useState("home");
  const [botMsgs, setBotMsgs] = useState([{ from: "bot", text: "Hi! Ask me anything about Label — verification, payments, deals, or skill swaps." }]);
  const [draft, setDraft] = useState("");
  const [reportText, setReportText] = useState("");
  const [reportUser, setReportUser] = useState("");
  const [reportSent, setReportSent] = useState(false);

  const ask = () => {
    if (!draft.trim()) return;
    const q = draft;
    setBotMsgs((m) => [...m, { from: "me", text: q }, { from: "bot", text: faqAnswer(q) }]);
    setDraft("");
  };

  if (view === "faq") {
    return (
      <div className="min-h-screen flex flex-col pb-24">
        <div className="flex items-center gap-3 px-5 pt-8 pb-3" style={{ borderBottom: `1px solid ${C.black}` }}>
          <button onClick={() => setView("home")}><ChevronLeft size={20} style={{ color: C.black }} /></button>
          <Bot size={18} style={{ color: C.black }} />
          <div style={{ ...body, fontWeight: 600, fontSize: 14, color: C.black }}>FAQ Bot</div>
        </div>
        <div className="flex-1 px-5 py-4 flex flex-col gap-2">
          {botMsgs.map((m, i) => (
            <div key={i} className="max-w-[80%] text-sm px-3 py-2 rounded-xl" style={{ ...body, alignSelf: m.from === "me" ? "flex-end" : "flex-start", background: m.from === "me" ? C.black : C.creamDim, color: m.from === "me" ? C.cream : C.black }}>{m.text}</div>
          ))}
        </div>
        <div className="flex gap-2 px-5">
          <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ask()} placeholder="Ask a question..." style={{ ...body, borderColor: C.black }} className="flex-1 px-3 py-2 rounded-full border bg-transparent outline-none text-sm" />
          <button onClick={ask} style={{ background: C.black, color: C.pop }} className="px-3 rounded-full"><Send size={16} /></button>
        </div>
      </div>
    );
  }

  if (view === "report") {
    return (
      <div className="px-5 pt-8 pb-24">
        <div className="flex items-center gap-2 mb-5"><button onClick={() => setView("home")}><ChevronLeft size={20} style={{ color: C.black }} /></button><h2 style={{ ...display, color: C.black, fontSize: 20 }}>Report a scam</h2></div>
        {reportSent ? (
          <Card sticker><div style={{ ...body, color: C.black }} className="text-sm">Thanks — our team will review this and follow up. Reference #{reports.length}.</div></Card>
        ) : (
          <>
            <InfoNote>Reports go to the Label trust & safety team. Never send payment outside the app's chat + pay flow.</InfoNote>
            <Field label="User or brand involved (optional)" value={reportUser} onChange={(e) => setReportUser(e.target.value)} placeholder="e.g. @username" />
            <TextArea label="What happened" value={reportText} onChange={(e) => setReportText(e.target.value)} placeholder="Describe the issue..." />
            <Btn full variant="danger" disabled={!reportText} onClick={() => { addReport({ id: nextId(), user: reportUser, text: reportText }); setReportSent(true); }}>Submit report</Btn>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="px-5 pt-8 pb-24">
      <h2 style={{ ...display, color: C.black, fontSize: 22 }} className="mb-5">Support</h2>
      <button onClick={() => setView("faq")} className="w-full flex items-center gap-3 p-4 rounded-2xl mb-3 text-left" style={{ border: `1.5px solid ${C.black}`, boxShadow: `5px 5px 0 ${C.black}` }}>
        <Bot size={20} style={{ color: C.black }} />
        <div className="flex-1"><div style={{ ...display, fontSize: 14, color: C.black }}>FAQ Bot</div><div style={{ ...body, fontSize: 11, color: C.black }} className="opacity-60">Instant answers about payments, verification & more</div></div>
        <ChevronRight size={16} style={{ color: C.black }} />
      </button>
      <button onClick={() => setView("report")} className="w-full flex items-center gap-3 p-4 rounded-2xl mb-3 text-left" style={{ border: `1.5px solid ${C.black}`, boxShadow: `5px 5px 0 ${C.black}` }}>
        <AlertTriangle size={20} style={{ color: C.red }} />
        <div className="flex-1"><div style={{ ...display, fontSize: 14, color: C.black }}>Report a Scam</div><div style={{ ...body, fontSize: 11, color: C.black }} className="opacity-60">Flag a suspicious user, brand or deal</div></div>
        <ChevronRight size={16} style={{ color: C.black }} />
      </button>
      <Card dark>
        <div className="flex items-center gap-2 mb-1"><LifeBuoy size={16} style={{ color: C.pop }} /><div style={{ ...mono, fontSize: 11, color: C.pop }} className="uppercase">Contact us</div></div>
        <div style={{ ...body, fontSize: 12 }}>support@label.app · we reply within 24-48h</div>
      </Card>
    </div>
  );
}

// ---------------- Profile ----------------
function Profile({ profile, role, onSwitchRole }) {
  return (
    <div className="px-5 pt-8 pb-24">
      <Avatar label={profile.name[0]} size={64} />
      <h2 style={{ ...display, color: C.black, fontSize: 22 }} className="mt-4 mb-1">{profile.name}</h2>
      <div className="flex gap-2 flex-wrap items-center">
        <Pill pop>{role === "business" ? "Business" : role === "creator" ? "Creator" : "Community"}</Pill>
        {profile.verified && <VerifiedBadge />}
        <button onClick={onSwitchRole} style={{ ...mono, fontSize: 10, color: C.black }} className="underline ml-1">Switch role</button>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <Card dark><div style={{ ...mono, fontSize: 10, color: C.pop }} className="uppercase mb-1 opacity-80">{role === "business" ? "Brand" : role === "creator" ? "Niche" : "Offers"}</div><div style={{ ...body }} className="text-sm">{profile.a || "—"}</div></Card>
        <Card dark><div style={{ ...mono, fontSize: 10, color: C.pop }} className="uppercase mb-1 opacity-80">{role === "business" ? "Sells" : role === "creator" ? "Bio" : "Wants"}</div><div style={{ ...body }} className="text-sm">{profile.b || "—"}</div></Card>
        {role === "creator" && profile.instagram && (
          <Card dark><div className="flex items-center gap-2"><Instagram size={14} style={{ color: C.pop }} /><span style={{ ...body }} className="text-sm">{profile.instagram}</span></div></Card>
        )}
        {role === "creator" && profile.resume && (
          <Card dark><div className="flex items-center gap-2"><FileText size={14} style={{ color: C.pop }} /><span style={{ ...body }} className="text-sm">{profile.resume}</span></div></Card>
        )}
      </div>
      <div className="mt-5 p-3 rounded-lg flex items-start gap-2" style={{ background: C.creamDim }}>
        <ShieldCheck size={14} style={{ color: C.black, flexShrink: 0, marginTop: 2 }} />
        <div style={{ ...body, fontSize: 11, color: C.black }} className="opacity-70">
          Trust & Safety: this prototype doesn't store your data anywhere yet — it's all local to this session. A live version would need encrypted storage and access controls before holding real user data.
        </div>
      </div>
    </div>
  );
}

// ---------------- Bottom nav ----------------
function BottomNav({ role, tab, setTab }) {
  const items = [
    ...(role !== "normal" ? [{ id: "deals", label: "Deals", icon: Briefcase }] : []),
    { id: "swap", label: "Swap", icon: Sparkles },
    { id: "chats", label: "Chats", icon: MessageCircle },
    { id: "support", label: "Support", icon: LifeBuoy },
    { id: "profile", label: "Profile", icon: Camera },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around py-3 max-w-[420px] mx-auto" style={{ background: C.cream, borderTop: `1.5px solid ${C.black}` }}>
      {items.map(({ id, label, icon: Icon }) => (
        <button key={id} onClick={() => setTab(id)} className="flex flex-col items-center gap-1">
          <Icon size={17} style={{ color: C.black, opacity: tab === id ? 1 : 0.4 }} />
          <span style={{ ...mono, fontSize: 8.5, color: C.black, opacity: tab === id ? 1 : 0.4 }} className="uppercase">{label}</span>
        </button>
      ))}
    </div>
  );
}

// ---------------- App shell ----------------
export default function Label() {
  useFonts();
  const [screen, setScreen] = useState("landing");
  const [role, setRole] = useState(null);
  const [profile, setProfile] = useState(null);
  const [tab, setTab] = useState("swap");

  const [deals, setDeals] = useState(seedDeals);
  const [swaps, setSwaps] = useState(seedSwaps);
  const [chats, setChats] = useState(seedChats);
  const [activeChat, setActiveChat] = useState(null);
  const [reports, setReports] = useState([]);

  const addDeal = (d) => setDeals((prev) => [{ ...d, id: nextId(), applicants: [] }, ...prev]);
  const applyToDeal = (dealId, applicant) => setDeals((prev) => prev.map((d) => d.id === dealId ? { ...d, applicants: [...d.applicants, applicant] } : d));
  const passApplicant = (dealId, appId) => setDeals((prev) => prev.map((d) => d.id === dealId ? { ...d, applicants: d.applicants.map((a) => a.id === appId ? { ...a, status: "passed" } : a) } : d));
  const chooseApplicant = (dealId, applicant) => {
    setDeals((prev) => prev.map((d) => d.id === dealId ? { ...d, applicants: d.applicants.map((a) => a.id === applicant.id ? { ...a, status: "chosen" } : a) } : d));
    const deal = deals.find((d) => d.id === dealId);
    const chat = { id: nextId(), name: applicant.name, kind: "deal", dealTitle: deal.title, paidAmount: null, messages: [{ from: "system", text: `You chose ${applicant.name} for "${deal.title}"` }] };
    setChats((prev) => [...prev, chat]); setActiveChat(chat); setTab("chats");
  };
  const addSwap = (s) => setSwaps((prev) => [s, ...prev]);
  const requestSwap = (s) => {
    const chat = { id: nextId(), name: s.name, kind: "swap", dealTitle: null, paidAmount: null, messages: [{ from: "system", text: `You requested a swap: your skill for their "${s.offering}"` }] };
    setChats((prev) => [...prev, chat]); setActiveChat(chat); setTab("chats");
  };
  const openChatFor = (name, dealTitle, { openPay } = {}) => {
    let chat = chats.find((c) => c.name === name && c.kind === "deal" && c.dealTitle === dealTitle);
    if (!chat) {
      chat = { id: nextId(), name, kind: "deal", dealTitle, paidAmount: null, messages: [{ from: "system", text: `Chat started with ${name} for "${dealTitle}"` }] };
      setChats((prev) => [...prev, chat]);
    }
    setActiveChat({ ...chat, openPay: !!openPay });
    setTab("chats");
  };
  const sendMessage = (chatId, text) => setChats((prev) => prev.map((c) => c.id === chatId ? { ...c, messages: [...c.messages, { from: "me", text }] } : c));
  const sendPayment = (chatId, amount, payout) => setChats((prev) => prev.map((c) => c.id === chatId ? { ...c, paidAmount: amount, messages: [...c.messages, { from: "system", text: `💸 ${amount} sent · ${payout} to ${c.name} after Label's ${PLATFORM_FEE_PCT}% fee (demo payment)` }] } : c));
  const addReport = (r) => setReports((prev) => [...prev, r]);

  const needsVerify = role === "business";

  return (
    <div style={{ ...body, maxWidth: 420, background: C.cream, minHeight: "100vh" }} className="mx-auto relative">
      {screen === "landing" && <Landing onStart={() => setScreen("role")} />}
      {screen === "role" && <RoleSelect onPick={(r) => { setRole(r); setTab(r === "normal" ? "swap" : "deals"); setScreen("onboard"); }} onBack={profile ? () => { setScreen("app"); setTab("profile"); } : () => setScreen("landing")} />}
      {screen === "onboard" && <Onboard role={role} onDone={(p) => { setProfile(p); setScreen(needsVerify ? "verify" : "app"); }} onBack={() => setScreen("role")} />}
      {screen === "verify" && <Verify onDone={() => { setProfile((p) => ({ ...p, verified: true })); setScreen("app"); }} onBack={() => setScreen("onboard")} />}

      {screen === "app" && !activeChat && (
        <>
          {tab === "deals" && role === "business" && <BusinessDeals deals={deals} addDeal={addDeal} chooseApplicant={chooseApplicant} passApplicant={passApplicant} profile={profile} onMessage={(name, dealTitle) => openChatFor(name, dealTitle)} onPay={(name, dealTitle) => openChatFor(name, dealTitle, { openPay: true })} />}
          {tab === "deals" && role === "creator" && <CreatorDeals deals={deals} applyToDeal={applyToDeal} profile={profile} />}
          {tab === "swap" && <SkillSwap swaps={swaps} addSwap={addSwap} requestSwap={requestSwap} profile={profile} />}
          {tab === "chats" && <ChatsList chats={chats} onOpen={setActiveChat} />}
          {tab === "support" && <Support profile={profile} reports={reports} addReport={addReport} />}
          {tab === "profile" && <Profile profile={profile} role={role} onSwitchRole={() => setScreen("role")} />}
          <BottomNav role={role} tab={tab} setTab={setTab} />
        </>
      )}

      {screen === "app" && activeChat && (
        <ChatView chat={{ ...(chats.find((c) => c.id === activeChat.id) || activeChat), openPay: activeChat.openPay }} onBack={() => setActiveChat(null)} sendMessage={sendMessage} sendPayment={sendPayment} role={role} />
      )}
    </div>
  );
}
