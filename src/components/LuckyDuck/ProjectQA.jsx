// ProjectQA.jsx — Lucky Duck brief Q&A with inline diagrams
// Embed: <ProjectQA client:visible />

const RATE = "$80";

const YELLOW = "#FFD600";
const BLACK  = "#0A0A0A";
const g      = n => `hsl(220,9%,${n}%)`;
const mono   = { fontFamily: "'DM Mono','Courier New',monospace" };

// ─── Visuals ─────────────────────────────────────────────────────────────────

const SCREENS = ["Landing","Signup","Wallet","Discovery","Portfolio","Celebration"];

const StateFlowDiagram = () => (
  <div style={{ background:g(98), border:`1px solid ${g(91)}`, borderRadius:8, padding:"14px 16px", overflowX:"auto", marginTop:14 }}>
    <div style={{ fontSize:9, color:g(50), ...mono, marginBottom:10, letterSpacing:"0.1em", textTransform:"uppercase" }}>
      Screen state machine · 6 screens · directional transitions
    </div>
    <div style={{ display:"flex", alignItems:"center", minWidth:500 }}>
      {SCREENS.map((s,i) => (
        <div key={s} style={{ display:"flex", alignItems:"center" }}>
          <div style={{ border:`1.5px solid ${BLACK}`, borderRadius:4, padding:"4px 8px", fontSize:8, fontWeight:600, color:BLACK, whiteSpace:"nowrap", background:"#fff" }}>
            {s}
          </div>
          {i < SCREENS.length-1 && (
            <div style={{ display:"flex", alignItems:"center" }}>
              <div style={{ width:12, height:1.5, background:g(65) }}/>
              <div style={{ width:0, height:0, borderTop:"3px solid transparent", borderBottom:"3px solid transparent", borderLeft:`4px solid ${g(65)}` }}/>
            </div>
          )}
        </div>
      ))}
    </div>
    <div style={{ display:"flex", alignItems:"center", minWidth:500, paddingTop:2 }}>
      <div style={{ width:0, height:0, borderTop:"3px solid transparent", borderBottom:"3px solid transparent", borderRight:`4px solid ${g(72)}` }}/>
      <div style={{ flex:1, height:1.5, background:g(72) }}/>
    </div>
    <div style={{ background:"#fffde7", border:`1.5px solid ${YELLOW}`, borderRadius:5, padding:"7px 10px", marginTop:7, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:4 }}>
      <span style={{ fontSize:9, fontWeight:700, color:BLACK, ...mono }}>Palette &#123; mode: light | dark &#125;</span>
      <span style={{ fontSize:8, color:g(45), ...mono }}>mounted client:only · no hydration flash</span>
    </div>
  </div>
);

const PilotfitFlow = () => (
  <div style={{ background:g(98), border:`1px solid ${g(91)}`, borderRadius:8, padding:"14px 16px", marginTop:10 }}>
    <div style={{ fontSize:9, color:g(50), ...mono, marginBottom:10, letterSpacing:"0.1em", textTransform:"uppercase" }}>
      Pilotfit · job-match interface data flow
    </div>
    <div style={{ display:"flex", alignItems:"flex-start", overflowX:"auto" }}>
      {[
        { node:"pgvector\n+ Gemini embeddings", sub:"hybrid index" },
        { node:"async search\nresults", sub:"streaming" },
        { node:"ranked UI\n+ score display", sub:"partial load states" },
      ].map((item, i) => (
        <div key={i} style={{ display:"flex", alignItems:"center" }}>
          <div style={{ border:`1.5px solid ${g(80)}`, borderRadius:5, padding:"6px 10px", minWidth:90, background:"#fff" }}>
            <div style={{ fontSize:8, fontWeight:600, color:BLACK, lineHeight:1.4, whiteSpace:"pre-line" }}>{item.node}</div>
            <div style={{ fontSize:7, color:g(55), ...mono, marginTop:2 }}>{item.sub}</div>
          </div>
          {i < 2 && (
            <div style={{ display:"flex", alignItems:"center", padding:"0 4px" }}>
              <div style={{ width:14, height:1.5, background:g(65) }}/>
              <div style={{ width:0, height:0, borderTop:"3px solid transparent", borderBottom:"3px solid transparent", borderLeft:`4px solid ${g(65)}` }}/>
            </div>
          )}
        </div>
      ))}
    </div>
    <div style={{ marginTop:10, fontSize:8, color:g(45), ...mono, lineHeight:1.6 }}>
      Challenge: data arrives async in chunks → UI must update without jarring layout shifts.<br/>
      Solved with: optimistic skeleton states + stable container dimensions before data lands.
    </div>
  </div>
);

const StackGrid = () => (
  <div style={{ background:g(98), border:`1px solid ${g(91)}`, borderRadius:8, padding:"12px 14px", marginTop:14 }}>
    <div style={{ fontSize:9, color:g(50), ...mono, marginBottom:10, letterSpacing:"0.1em", textTransform:"uppercase" }}>Stack layers</div>
    {[
      { layer:"App",  items:["React","TypeScript"] },
      { layer:"UI",   items:["Tailwind CSS","Framer Motion"] },
      { layer:"Data", items:["REST API","pgvector","OpenAI · Gemini"] },
    ].map((row,ri) => (
      <div key={row.layer} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:ri<2?6:0 }}>
        <span style={{ fontSize:8, color:g(55), ...mono, width:30, textAlign:"right", flexShrink:0 }}>{row.layer}</span>
        <div style={{ width:1.5, height:14, background:g(85), flexShrink:0 }}/>
        <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
          {row.items.map(item => (
            <div key={item} style={{ border:`1px solid ${g(84)}`, borderRadius:3, padding:"2px 8px", fontSize:8, color:BLACK, background:"#fff", ...mono }}>{item}</div>
          ))}
        </div>
      </div>
    ))}
    <div style={{ marginTop:10, borderTop:`1px solid ${g(92)}`, paddingTop:8, fontSize:8, color:g(45), ...mono }}>
      Production projects shipped on this stack in the last two years: 3
    </div>
  </div>
);

const PhaseBreakdown = () => (
  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:14 }}>
    {[
      { phase:"Phase 1", type:"Fixed milestone", dot:YELLOW,
        items:["Design system + tokens","User loops 1–2","HUB Panel foundation"] },
      { phase:"Phase 2", type:"Hourly · ongoing", dot:g(78),
        items:["Loops 3–5","All 9 screens","Animation + polish"] },
    ].map(p => (
      <div key={p.phase} style={{ border:`1.5px solid ${g(88)}`, borderRadius:6, padding:"10px 12px" }}>
        <div style={{ fontSize:9, fontWeight:700, color:BLACK, ...mono }}>{p.phase}</div>
        <div style={{ fontSize:8, color:g(55), ...mono, marginBottom:8 }}>{p.type}</div>
        {p.items.map(item => (
          <div key={item} style={{ display:"flex", gap:5, alignItems:"flex-start", marginBottom:4 }}>
            <div style={{ width:4, height:4, background:p.dot, borderRadius:"50%", marginTop:4, flexShrink:0 }}/>
            <span style={{ fontSize:8, color:g(32), lineHeight:1.5 }}>{item}</span>
          </div>
        ))}
      </div>
    ))}
  </div>
);

// Timezone overlap: 9:00–24:00 CEST axis (15h range)
// CEST = UTC+2, EDT = UTC-4, PDT = UTC-7
// US East 9am–6pm EDT  = 15:00–24:00 CEST
// US West 9am–2pm PDT  = 18:00–23:00 CEST
// Her window: 15:00–23:00 CEST  →  full ET, solid PT morning
const TimezoneOverlap = () => {
  const START = 9, END = 24, RANGE = 15;
  const pct  = h => `${((h - START) / RANGE) * 100}%`;
  const wpct = (s, e) => `${((e - s) / RANGE) * 100}%`;
  const ticks = [9, 12, 15, 18, 21, 24];

  const rows = [
    { label:"Available (CET)", s:15, e:23, color:YELLOW, note:"3pm – 11pm" },
    { label:"US · East Coast",  s:15, e:24, color:BLACK,  note:"9am – 6pm ET" },
    { label:"US · West Coast",  s:18, e:24, color:g(60),  note:"9am – 4pm PT" },
  ];

  return (
    <div style={{ background:g(98), border:`1px solid ${g(91)}`, borderRadius:8, padding:"14px 16px", marginTop:14 }}>
      <div style={{ fontSize:9, color:g(50), ...mono, marginBottom:12, letterSpacing:"0.1em", textTransform:"uppercase" }}>
        Timezone overlap · CEST (UTC+2)
      </div>

      {/* Tick row — same proportions as bars */}
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
        <div style={{ width:110, flexShrink:0 }}/>
        <div style={{ flex:1, position:"relative", height:14 }}>
          {ticks.map(t => (
            <span key={t} style={{
              position:"absolute", left:pct(t),
              transform:"translateX(-50%)",
              fontSize:7, color:g(58), ...mono,
            }}>{t}:00</span>
          ))}
        </div>
        <div style={{ width:84, flexShrink:0 }}/>
      </div>

      {/* Data rows */}
      {rows.map(row => (
        <div key={row.label} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:7 }}>
          <div style={{ width:110, fontSize:8, color:g(40), ...mono, flexShrink:0, textAlign:"right" }}>
            {row.label}
          </div>
          <div style={{ flex:1, position:"relative", height:14 }}>
            {/* Track */}
            <div style={{ position:"absolute", inset:0, background:g(91), borderRadius:3 }}/>
            {/* Bar */}
            <div style={{
              position:"absolute",
              left:pct(row.s), width:wpct(row.s, row.e),
              height:"100%", background:row.color, borderRadius:3,
            }}/>
          </div>
          <div style={{ width:84, fontSize:8, color:g(50), ...mono, flexShrink:0 }}>
            {row.note}
          </div>
        </div>
      ))}

      {/* Overlap annotation */}
      <div style={{ marginTop:10, padding:"8px 10px", background:"#fffde7", border:`1.5px solid ${YELLOW}`, borderRadius:5 }}>
        <div style={{ fontSize:8, color:g(30), ...mono, lineHeight:1.6 }}>
          <strong>15:00 – 23:00 CEST</strong> = full US East Coast business hours · 5h West Coast morning overlap<br/>
          Happy to shift further or split into morning + evening blocks — whatever works on your end.
        </div>
      </div>
    </div>
  );
};

// ─── Q&A Items ────────────────────────────────────────────────────────────────

const items = [
  {
    n:"01", label:"Shipped Work",
    hint:"1–2 live links to products you personally designed and built front-end for",
    answer:(
      <span>
        You're looking at one — the{" "}
        <a href="https://shueny.github.io/lucky-duck" style={{ color:BLACK, fontWeight:600 }}>Lucky Duck prototype</a>
        {" "}on this page, designed and built end-to-end. Trickiest part: the theme-aware screen state machine — diagrammed below.
        <br/><br/>
        Second:{" "}
        <strong style={{ color:BLACK, fontWeight:600 }}>Pilotfit</strong>
        {" "}— AI career platform, zero to one. Hard part: async hybrid vector search results feeding a ranked UI that has to stay smooth throughout.
      </span>
    ),
    visual: null,
  },
  {
    n:"02", label:"Tech Stack",
    hint:"Primary front-end stack and production projects shipped in the last two years",
    answer:(
      <span>
        React + TypeScript + Tailwind CSS, Framer Motion for motion-heavy work.
        Three production projects on this stack in the last two years: this concept,
        Pilotfit, and the Threat Intelligence CMS at VicOne — React + GraphQL + OpenAI pipeline
        for an automotive cybersecurity company.
      </span>
    ),
    visual: <StackGrid/>,
  },
  {
    n:"03", label:"Complex Component",
    hint:"Most complex interactive component — state, animation, real-time data",
    answer:(
      <span>
        The Lucky Duck screen state machine. Six screens, directional Framer Motion transitions,
        light/dark switching in lockstep — with one hard constraint: a dark-mode visitor can't
        see a flash of the light palette while the React island hydrates. The fix: couple the
        state machine and theme system into one unit, one Palette object, one source of truth.
        <br/><br/>
        For something data-heavier: the Pilotfit job-match interface. Async hybrid vector search,
        ranked results with confidence scores, partial loading states that never freeze or jolt mid-scroll.
      </span>
    ),
    visual: (
      <>
        <StateFlowDiagram/>
        <PilotfitFlow/>
      </>
    ),
  },
  {
    n:"04", label:"Rate",
    hint:"Proposed hourly rate and any adjustment for fixed-scope or longer engagement",
    answer:(
      <span>
        {RATE}/hr. For Phase 1 — design system plus the first couple of user loops —
        I'm happy to structure a fixed milestone so you have cost predictability and
        a quality checkpoint before committing to the full timeline.
      </span>
    ),
    visual: <PhaseBreakdown/>,
  },
  {
    n:"05", label:"Availability",
    hint:"Hours per week over 8–12 weeks and typical work cadence",
    answer:(
      <span>
        15–20 hours a week across the full 8–12 weeks. I'm in Germany (CET) and happy
        to work around whatever hours suit you — 3pm–11pm CET maps directly to US East
        Coast business hours with solid West Coast morning overlap. Async-first,
        daily updates, one weekly sync. Just say what works on your end.
      </span>
    ),
    visual: <TimezoneOverlap/>,
  },
];

// ─── Export ───────────────────────────────────────────────────────────────────

export default function ProjectQA() {
  return (
    <section style={{ fontFamily:"system-ui,sans-serif", padding:"56px 20px", maxWidth:720, margin:"0 auto", color:BLACK }}>

      <div style={{ marginBottom:36 }}>
        <div style={{ fontSize:10, letterSpacing:"0.14em", textTransform:"uppercase", color:g(50), ...mono, marginBottom:6 }}>
          Client Brief
        </div>
        <h2 style={{ fontSize:22, fontWeight:800, letterSpacing:"-0.02em", margin:"0 0 10px" }}>
          Proposal Q&amp;A
        </h2>
        <p style={{ fontSize:13, color:g(42), margin:0, lineHeight:1.65 }}>
          Responses to the five questions in the Lucky Duck brief — read top to
          bottom, feathers and all.
        </p>
      </div>

      <div style={{ display:"flex", flexDirection:"column" }}>
        {items.map((item,i) => (
          <div key={item.n} style={{ borderTop:`1px solid ${g(i===0?82:92)}`, padding:"26px 0" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
              <div style={{ background:YELLOW, padding:"1px 7px", borderRadius:2, fontSize:9, fontWeight:800, letterSpacing:"0.06em", color:BLACK, ...mono }}>
                {item.n}
              </div>
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:BLACK, ...mono }}>
                {item.label}
              </span>
            </div>
            <div style={{ fontSize:11, color:g(55), ...mono, marginBottom:10, lineHeight:1.5 }}>
              {item.hint}
            </div>
            <div style={{ fontSize:14, lineHeight:1.78, color:g(18), letterSpacing:"-0.01em" }}>
              {item.answer}
            </div>
            {item.visual}
          </div>
        ))}

        <div style={{ borderTop:`1px solid ${g(88)}`, paddingTop:20, marginTop:4 }}>
          <span style={{ fontSize:10, color:g(60), ...mono }}>shueny.github.io · available for project-based work</span>
        </div>
      </div>

    </section>
  );
}
