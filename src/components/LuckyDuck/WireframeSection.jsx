// WireframeSection.jsx
// Lucky Duck Case Study — Screen Architecture & Wireframes
// Drop into Astro project as: <WireframeSection client:visible />

const YELLOW = "#FFD600";
const BLACK  = "#0A0A0A";
const g = n  => `hsl(220,9%,${n}%)`;
const mono   = { fontFamily: "'DM Mono','Courier New',monospace" };

// ─── Atoms ──────────────────────────────────────────────────────────────────

const Ph = ({ w="100%", h=10, r=2 }) => (
  <div style={{ width:w, height:h, background:g(91), borderRadius:r, flexShrink:0 }} />
);

const Bar = ({ pct, h=4 }) => (
  <div style={{ width:"100%", height:h, background:g(91), borderRadius:99, overflow:"hidden" }}>
    <div style={{ width:`${pct}%`, height:"100%", background:BLACK, borderRadius:99 }} />
  </div>
);

const Btn = ({ label, primary, yellow }) => (
  <div style={{
    width:"100%", padding:"6px 0", borderRadius:6, textAlign:"center",
    background: yellow ? YELLOW : primary ? BLACK : "transparent",
    border: primary||yellow ? "none" : `1.5px solid ${g(85)}`,
    color: yellow ? BLACK : primary ? "#fff" : g(55),
    fontSize:9, fontWeight:600, ...mono
  }}>{label}</div>
);

const TabBar = ({ active=0 }) => (
  <div style={{ display:"flex", justifyContent:"space-around", borderTop:`1px solid ${g(94)}`, paddingTop:4, flexShrink:0 }}>
    {[0,1,2,3,4].map(i=>(
      <div key={i} style={{
        width: i===2?22:14, height: i===2?22:14,
        background: i===active ? BLACK : i===2 ? YELLOW : g(91),
        borderRadius: i===2 ? "50%" : 3,
        border: i===2 ? `2px solid ${BLACK}` : "none"
      }}/>
    ))}
  </div>
);

// ─── Screens ────────────────────────────────────────────────────────────────

const Landing = () => (
  <div style={{ display:"flex", flexDirection:"column", height:"100%", gap:5 }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingBottom:5, borderBottom:`1px solid ${g(95)}` }}>
      <Ph w={40} h={8}/>
      <Ph w={14} h={14} r={3}/>
    </div>
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8 }}>
      <div style={{ width:58, height:58, border:`1.5px dashed ${g(78)}`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontSize:7, color:g(62), ...mono }}>MASCOT</span>
      </div>
      <div style={{ textAlign:"center", display:"flex", flexDirection:"column", gap:3 }}>
        <div style={{ fontSize:13, fontWeight:800, color:BLACK, lineHeight:1.2 }}>Play More.<br/>Win More.</div>
        <Ph w="55%" h={7}/>
      </div>
      <Btn label="Get Started →" primary/>
      <span style={{ fontSize:7, color:g(58), ...mono }}>Already a member?</span>
    </div>
    <div style={{ display:"flex", justifyContent:"space-around", borderTop:`1px solid ${g(95)}`, paddingTop:5 }}>
      {["12K","140+","$2M"].map(n=>(
        <div key={n} style={{ textAlign:"center" }}>
          <div style={{ fontSize:9, fontWeight:700, color:BLACK }}>{n}</div>
          <Ph w={24} h={5}/>
        </div>
      ))}
    </div>
  </div>
);

const Signup = () => (
  <div style={{ display:"flex", flexDirection:"column", height:"100%", gap:7 }}>
    <span style={{ fontSize:8, color:g(55), ...mono }}>← Back</span>
    <div style={{ fontSize:11, fontWeight:700, color:BLACK }}>Create Account</div>
    <div style={{ display:"flex", alignItems:"center", gap:2 }}>
      {[1,2,3].map((s,i)=>(
        <div key={s} style={{ display:"flex", alignItems:"center" }}>
          <div style={{ width:17, height:17, borderRadius:"50%", background:i===0?BLACK:g(91), display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:7, color:i===0?"#fff":g(58) }}>{s}</span>
          </div>
          {i<2 && <div style={{ width:18, height:1.5, background:i===0?BLACK:g(85) }}/>}
        </div>
      ))}
    </div>
    <div style={{ flex:1, display:"flex", flexDirection:"column", gap:6 }}>
      {["Email","Password"].map(f=>(
        <div key={f} style={{ display:"flex", flexDirection:"column", gap:3 }}>
          <span style={{ fontSize:7, color:g(50), ...mono }}>{f}</span>
          <div style={{ height:26, border:`1.5px solid ${g(85)}`, borderRadius:5 }}/>
        </div>
      ))}
    </div>
    <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
      <Btn label="Continue →" primary/>
      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
        <div style={{ flex:1, height:1, background:g(91) }}/><span style={{ fontSize:7, color:g(62) }}>or</span><div style={{ flex:1, height:1, background:g(91) }}/>
      </div>
      <div style={{ height:26, border:`1.5px solid ${g(85)}`, borderRadius:5, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontSize:8, color:g(50), ...mono }}>G  Continue with Google</span>
      </div>
    </div>
  </div>
);

const Discovery = () => (
  <div style={{ display:"flex", flexDirection:"column", height:"100%", gap:5 }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingBottom:4, borderBottom:`1px solid ${g(95)}` }}>
      <Ph w={34} h={8}/>
      <div style={{ display:"flex", gap:3, alignItems:"center" }}>
        <div style={{ background:g(95), borderRadius:4, padding:"2px 5px", fontSize:7, ...mono }}>250 cr</div>
        <div style={{ width:14, height:14, background:g(93), borderRadius:3 }}/>
      </div>
    </div>
    <span style={{ fontSize:7, color:g(50), letterSpacing:"0.1em", textTransform:"uppercase", ...mono }}>Featured</span>
    <div style={{ border:`1.5px solid ${BLACK}`, borderRadius:6, padding:"7px", flexShrink:0 }}>
      <Ph w="55%" h={9}/>
      <div style={{ marginTop:4 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:2 }}>
          <span style={{ fontSize:7, color:g(55), ...mono }}>Pool</span>
          <span style={{ fontSize:7, color:g(55), ...mono }}>78%</span>
        </div>
        <Bar pct={78}/>
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:4 }}>
        <span style={{ fontSize:7, color:g(55), ...mono }}>Odds 1:24</span>
        <div style={{ background:YELLOW, borderRadius:3, padding:"2px 6px", fontSize:7, fontWeight:700 }}>50 cr</div>
      </div>
    </div>
    <div style={{ display:"flex", gap:4, flexShrink:0 }}>
      {["All","New","Hot","Ending"].map((f,i)=>(
        <div key={f} style={{ padding:"2px 7px", border:`1px solid ${i===0?BLACK:g(87)}`, borderRadius:20, fontSize:7, color:i===0?BLACK:g(60), ...mono, flexShrink:0 }}>{f}</div>
      ))}
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4, flex:1 }}>
      {[62,45,88,31].map((pct,i)=>(
        <div key={i} style={{ border:`1px solid ${g(91)}`, borderRadius:5, padding:5, display:"flex", flexDirection:"column", gap:4 }}>
          <Ph h={8}/><Bar pct={pct}/><Ph w="50%" h={5}/>
        </div>
      ))}
    </div>
    <TabBar active={0}/>
  </div>
);

const HubPanel = () => (
  <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
    <div style={{ flex:1, background:g(97), display:"flex", alignItems:"center", justifyContent:"center" }}>
      <span style={{ fontSize:7, color:g(72), ...mono }}>discovery (dimmed)</span>
    </div>
    <div style={{ background:"#fff", borderTop:`2px solid ${BLACK}`, borderRadius:"12px 12px 0 0", padding:"10px 10px 4px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
        <span style={{ fontSize:10, fontWeight:700, color:BLACK }}>My HUB</span>
        <span style={{ fontSize:10, color:g(55), ...mono }}>×</span>
      </div>
      <div style={{ height:1, background:g(93), marginBottom:5 }}/>
      {["Sneakers · 50 cr","Console · 100 cr"].map((item,i)=>(
        <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
          <span style={{ fontSize:8, color:"#374151", ...mono }}>{item}</span>
          <span style={{ fontSize:9, color:g(62), ...mono }}>×</span>
        </div>
      ))}
      <div style={{ height:1, background:g(93), margin:"5px 0" }}/>
      {[["Total","150 cr"],["Potential","3.2×"]].map(([k,v])=>(
        <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
          <span style={{ fontSize:7, color:g(50), ...mono }}>{k}</span>
          <span style={{ fontSize:9, fontWeight:700, color:BLACK, ...mono }}>{v}</span>
        </div>
      ))}
      <div style={{ marginTop:6 }}><Btn label="Confirm Allocation" primary/></div>
      <div style={{ display:"flex", justifyContent:"center", marginTop:8 }}>
        <div style={{ width:28, height:28, background:YELLOW, borderRadius:"50%", border:`2px solid ${BLACK}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700 }}>+</div>
      </div>
    </div>
  </div>
);

const Portfolio = () => (
  <div style={{ display:"flex", flexDirection:"column", height:"100%", gap:5 }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
      <span style={{ fontSize:11, fontWeight:700, color:BLACK }}>My Portfolio</span>
      <div style={{ background:YELLOW, padding:"2px 7px", borderRadius:3, fontSize:7, fontWeight:700 }}>Gold</div>
    </div>
    <span style={{ fontSize:8, color:g(50), ...mono }}>2,450 pts total</span>
    <div style={{ height:1, background:g(93) }}/>
    <span style={{ fontSize:7, color:g(55), letterSpacing:"0.1em", textTransform:"uppercase", ...mono }}>Active</span>
    {[{n:"Sneakers",p:80,e:3},{n:"Console",p:40,e:1}].map(c=>(
      <div key={c.n} style={{ border:`1px solid ${g(91)}`, borderRadius:6, padding:"7px 8px", display:"flex", flexDirection:"column", gap:5, flexShrink:0 }}>
        <div style={{ display:"flex", justifyContent:"space-between" }}>
          <span style={{ fontSize:9, fontWeight:600, color:BLACK }}>{c.n}</span>
          <span style={{ fontSize:7, color:g(60), ...mono }}>{c.e} entries</span>
        </div>
        <Bar pct={c.p}/>
      </div>
    ))}
    <span style={{ fontSize:7, color:g(55), letterSpacing:"0.1em", textTransform:"uppercase", ...mono, marginTop:2 }}>Recent Wins</span>
    {[{n:"Watch",v:"+$240"},{n:"Book",v:"+$15"}].map(w=>(
      <div key={w.n} style={{ display:"flex", justifyContent:"space-between", padding:"3px 0", borderBottom:`1px solid ${g(95)}` }}>
        <span style={{ fontSize:8, color:"#374151", ...mono }}>{w.n}</span>
        <span style={{ fontSize:8, fontWeight:600, color:BLACK, ...mono }}>{w.v}</span>
      </div>
    ))}
    <div style={{ marginTop:"auto" }}><TabBar active={3}/></div>
  </div>
);

const Celebration = () => (
  <div style={{ display:"flex", flexDirection:"column", height:"100%", background:BLACK, padding:"10px 10px 8px", borderRadius:"inherit" }}>
    <div style={{ display:"flex", justifyContent:"space-around", marginBottom:6 }}>
      {"✦✧✦✧✦".split("").map((s,i)=>(
        <span key={i} style={{ fontSize:8, color:YELLOW, opacity:0.35+i*0.15 }}>{s}</span>
      ))}
    </div>
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10 }}>
      <div style={{ width:56, height:56, border:`2px dashed ${YELLOW}`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontSize:7, color:YELLOW, ...mono }}>MASCOT</span>
      </div>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:15, fontWeight:800, color:"#fff", letterSpacing:"-0.01em" }}>YOU WON!</div>
        <div style={{ height:1, background:"#1e1e1e", margin:"6px auto", width:56 }}/>
        <div style={{ border:`1.5px solid ${YELLOW}`, borderRadius:6, padding:"7px 14px", display:"inline-block", marginTop:4 }}>
          <div style={{ fontSize:17, fontWeight:800, color:YELLOW }}>$240</div>
          <Ph w={38} h={6} r={2}/>
        </div>
      </div>
    </div>
    <div style={{ display:"flex", justifyContent:"space-around", marginBottom:8 }}>
      {"✧✦✧✦✧".split("").map((s,i)=>(
        <span key={i} style={{ fontSize:8, color:YELLOW, opacity:0.25+i*0.15 }}>{s}</span>
      ))}
    </div>
    <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
      <Btn label="Share Win" yellow/>
      <div style={{ textAlign:"center", fontSize:8, color:g(52), ...mono }}>Keep playing →</div>
    </div>
  </div>
);

// ─── Phone Frame ────────────────────────────────────────────────────────────

const Phone = ({ label, tag, children }) => (
  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
    <div style={{ background:BLACK, borderRadius:30, padding:3, boxShadow:"0 12px 40px rgba(0,0,0,0.18)", flexShrink:0 }}>
      <div style={{ background:"#fff", borderRadius:27, width:174, height:346, overflow:"hidden" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 12px 3px" }}>
          <span style={{ fontSize:7, fontWeight:700, color:BLACK }}>9:41</span>
          <div style={{ display:"flex", gap:2.5, alignItems:"flex-end" }}>
            {[4,6,8].map((h,i)=>(
              <div key={i} style={{ width:2.5, height:h, background:BLACK, borderRadius:1 }}/>
            ))}
            <div style={{ width:10, height:5, border:`1.5px solid ${BLACK}`, borderRadius:1.5, marginLeft:2, display:"flex", alignItems:"center", padding:"0 1px" }}>
              <div style={{ width:"65%", height:3, background:BLACK, borderRadius:0.5 }}/>
            </div>
          </div>
        </div>
        <div style={{ padding:"0 10px 6px", height:"calc(100% - 26px)", overflow:"hidden" }}>
          {children}
        </div>
      </div>
    </div>
    <div style={{ textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
      <div style={{ background:YELLOW, padding:"1px 8px", borderRadius:2, fontSize:7, fontWeight:700, letterSpacing:"0.07em", textTransform:"uppercase", ...mono }}>{tag}</div>
      <span style={{ fontSize:8.5, color:g(38), ...mono }}>{label}</span>
    </div>
  </div>
);

// ─── Flow Diagram ────────────────────────────────────────────────────────────

const FlowDiagram = () => {
  const phases = [
    { label:"Acquisition", sub:"Landing" },
    { label:"Activation",  sub:"Signup + Wallet" },
    { label:"Engagement",  sub:"Discovery + HUB" },
    { label:"Retention",   sub:"Portfolio" },
  ];
  const Arrow = () => (
    <div style={{ display:"flex", alignItems:"center", flexShrink:0, marginBottom:14 }}>
      <div style={{ width:20, height:1.5, background:g(68) }}/>
      <div style={{ width:0, height:0, borderTop:"4px solid transparent", borderBottom:"4px solid transparent", borderLeft:`5px solid ${g(68)}` }}/>
    </div>
  );
  return (
    <div style={{ width:"100%" }}>
      <div style={{ display:"flex", alignItems:"flex-start", overflowX:"auto", paddingBottom:4, gap:0 }}>
        {phases.map((p,i)=>(
          <div key={p.label} style={{ display:"flex", alignItems:"center" }}>
            <div style={{ border:`1.5px solid ${BLACK}`, borderRadius:5, padding:"8px 12px", textAlign:"center", background:"#fff", minWidth:110, flexShrink:0 }}>
              <div style={{ fontSize:9, fontWeight:700, color:BLACK, ...mono }}>{p.label}</div>
              <div style={{ fontSize:7, color:g(52), marginTop:2, ...mono }}>{p.sub}</div>
            </div>
            {i<phases.length-1 && <Arrow/>}
          </div>
        ))}
      </div>
      <div style={{ display:"flex", marginTop:6, paddingLeft:55, paddingRight:55 }}>
        <div style={{ width:0, height:0, borderTop:"4px solid transparent", borderBottom:"4px solid transparent", borderRight:`5px solid ${g(68)}` }}/>
        <div style={{ flex:1, height:1.5, background:g(68) }}/>
      </div>
      <div style={{ display:"flex", justifyContent:"center", marginTop:8 }}>
        <div style={{ border:`1.5px dashed ${YELLOW}`, borderRadius:4, padding:"4px 14px", display:"inline-flex", alignItems:"center", gap:6, background:"#fffde7" }}>
          <div style={{ width:6, height:6, background:YELLOW, borderRadius:"50%", flexShrink:0 }}/>
          <span style={{ fontSize:7, color:g(35), ...mono }}>Celebration fires within Engagement loop — exits back to Portfolio</span>
        </div>
      </div>
    </div>
  );
};

// ─── HUB Anatomy ─────────────────────────────────────────────────────────────

const HubAnatomy = () => {
  const zones = [
    { label:"Header", note:"title + close", state:"panelOpen: bool" },
    { label:"Item List", note:"dynamic entries", state:"items: Entry[]" },
    { label:"Live Calc", note:"total + multiplier", state:"derived from items + odds" },
    { label:"Confirm CTA", note:"triggers allocation", state:"disabled if items = []" },
  ];
  return (
    <div style={{ display:"flex", gap:24, flexWrap:"wrap", alignItems:"flex-start" }}>
      {/* Panel diagram */}
      <div style={{ flexShrink:0, width:160 }}>
        <div style={{ background:BLACK, borderRadius:"10px 10px 0 0", padding:2 }}>
          <div style={{ background:"#fff", borderRadius:"8px 8px 0 0", padding:"8px 10px" }}>
            {zones.map((z,i)=>(
              <div key={z.label}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"4px 0" }}>
                  <span style={{ fontSize:8, fontWeight:600, color:BLACK }}>{z.label}</span>
                  <span style={{ fontSize:7, color:g(60), ...mono }}>{z.note}</span>
                </div>
                {i<zones.length-1 && <div style={{ height:1, background:g(93) }}/>}
              </div>
            ))}
          </div>
        </div>
        <div style={{ background:g(93), borderRadius:"0 0 8px 8px", height:6 }}/>
        <div style={{ display:"flex", justifyContent:"center", marginTop:8 }}>
          <div style={{ width:28, height:28, background:YELLOW, borderRadius:"50%", border:`2px solid ${BLACK}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700 }}>+</div>
        </div>
        <div style={{ textAlign:"center", marginTop:4 }}>
          <span style={{ fontSize:7, color:g(50), ...mono }}>FAB (persistent)</span>
        </div>
      </div>
      {/* State annotations */}
      <div style={{ flex:1, minWidth:180, display:"flex", flexDirection:"column", gap:6 }}>
        <div style={{ fontSize:8, fontWeight:700, color:BLACK, marginBottom:2 }}>State Map</div>
        {zones.map(z=>(
          <div key={z.label} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
            <div style={{ width:3, height:3, background:YELLOW, borderRadius:"50%", marginTop:5, flexShrink:0 }}/>
            <div>
              <span style={{ fontSize:8, fontWeight:600, color:BLACK }}>{z.label} — </span>
              <span style={{ fontSize:8, color:g(45), ...mono }}>{z.state}</span>
            </div>
          </div>
        ))}
        <div style={{ marginTop:6, background:g(97), border:`1px solid ${g(91)}`, borderRadius:5, padding:8 }}>
          <div style={{ fontSize:7, color:g(40), lineHeight:1.6, ...mono }}>
            Panel state is global — FAB badge count reflects items.length across all screens.
            Odds multiplier is injected from the backend odds engine; frontend renders it as read-only.
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Export ──────────────────────────────────────────────────────────────────

export default function WireframeSection() {
  const screens = [
    { tag:"Acquisition", label:"01 · Landing",    content:<Landing/> },
    { tag:"Activation",  label:"02 · Sign Up",    content:<Signup/> },
    { tag:"Engagement",  label:"03 · Discovery",  content:<Discovery/> },
    { tag:"Engagement",  label:"04 · HUB Panel",  content:<HubPanel/> },
    { tag:"Retention",   label:"05 · Portfolio",  content:<Portfolio/> },
    { tag:"Celebration", label:"06 · Win Moment", content:<Celebration/> },
  ];

  return (
    <section style={{ fontFamily:"system-ui,sans-serif", padding:"48px 20px", maxWidth:960, margin:"0 auto", color:BLACK }}>

      {/* Header */}
      <div style={{ marginBottom:28 }}>
        <div style={{ fontSize:10, letterSpacing:"0.14em", textTransform:"uppercase", color:g(50), ...mono, marginBottom:5 }}>Design Process</div>
        <h2 style={{ fontSize:22, fontWeight:800, letterSpacing:"-0.02em", margin:"0 0 8px" }}>Screen Architecture & User Loops</h2>
        <p style={{ fontSize:12, color:g(42), margin:0, maxWidth:520, lineHeight:1.65 }}>
          Every screen maps to a growth loop. Before any visual decisions, the interaction logic and entry/exit conditions for each loop were mapped out below.
        </p>
      </div>

      {/* Loop Flow */}
      <div style={{ background:g(98), border:`1px solid ${g(92)}`, borderRadius:8, padding:"18px 20px", marginBottom:36 }}>
        <FlowDiagram/>
      </div>

      {/* Screen Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(174px,1fr))", gap:"28px 12px", justifyItems:"center" }}>
        {screens.map(s=>(
          <Phone key={s.label} label={s.label} tag={s.tag}>{s.content}</Phone>
        ))}
      </div>

      {/* HUB Anatomy */}
      <div style={{ marginTop:44, borderTop:`1px solid ${g(92)}`, paddingTop:28 }}>
        <div style={{ fontSize:10, letterSpacing:"0.14em", textTransform:"uppercase", color:g(50), ...mono, marginBottom:4 }}>Component Breakdown</div>
        <h3 style={{ fontSize:15, fontWeight:700, letterSpacing:"-0.01em", margin:"0 0 16px" }}>HUB Panel + FAB</h3>
        <HubAnatomy/>
      </div>

      {/* Component Notes */}
      <div style={{ marginTop:36, borderTop:`1px solid ${g(92)}`, paddingTop:24 }}>
        <div style={{ fontSize:10, letterSpacing:"0.14em", textTransform:"uppercase", color:g(50), ...mono, marginBottom:14 }}>Component Notes</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:10 }}>
          {[
            { title:"Pool Fill Bars", note:"Visual saturation of each reward pool. Updates affect displayed odds in real time as entries come in." },
            { title:"Design Tokens",  note:"Single Palette object drives light and dark across all screens — no per-screen style drift, no theme flash on hydration." },
            { title:"Tab Bar / FAB",  note:"FAB in center slot of tab bar. Badge count reflects HUB items.length globally across navigation." },
            { title:"Celebration",    note:"Full-screen overlay with confetti. Fires within Engagement loop on win confirmation, exits to Portfolio." },
          ].map(n=>(
            <div key={n.title} style={{ border:`1px solid ${g(91)}`, borderRadius:6, padding:12 }}>
              <div style={{ fontSize:9, fontWeight:700, marginBottom:4 }}>{n.title}</div>
              <div style={{ fontSize:8, color:g(42), lineHeight:1.65, ...mono }}>{n.note}</div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
