import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { C, F } from "@styles/tokens";
import {
  Card,
  TwoCol,
  StatGrid,
  StatBox,
  TabBtn,
  Inp,
  SectionTitle,
  InfoBox,
  ResultRow,
  Divider,
  PassFail,
  UtilBar,
} from "@components/ui";
import {
  analyzeHorizontalCurve,
  analyzeVerticalCurve,
  analyzePavement,
} from "@engines/roadEngine";
import { SavePanel, SaveToast } from "@components/SavePanel";
import { useSaveToProject } from "../hooks/useSaveToProject";

function RoadPlanSketch({ R, delta, V }) {
  const cx=140, cy=100, r=70
  const ang = Math.min((delta||30)*Math.PI/180, Math.PI*0.8)
  const half = ang/2
  const x1 = cx - r*Math.sin(half)*2.2, y1 = cy + r*Math.cos(half)*0.8
  const x2 = cx + r*Math.sin(half)*2.2, y2 = cy + r*Math.cos(half)*0.8
  const midX = cx, midY = cy - r*0.7
  
  return (
    <motion.svg width={280} height={180} style={{display:'block',margin:'0 auto', overflow: 'visible'}}>
      {/* Background road surface */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <line x1={x1} y1={y1} x2={midX-8} y2={midY+8} stroke="#1e293b" strokeWidth={18} strokeLinecap="round" opacity={0.8}/>
        <line x1={x2} y1={y2} x2={midX+8} y2={midY+8} stroke="#1e293b" strokeWidth={18} strokeLinecap="round" opacity={0.8}/>
        <path d={`M ${x1} ${y1} Q ${midX} ${midY-20} ${x2} ${y2}`} stroke="#1e293b" strokeWidth={18} strokeLinecap="round" fill="none" opacity={0.8}/>
      </motion.g>

      {/* Tracing Centerline Animation */}
      <AnimatePresence>
        <motion.path 
          key={delta}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d={`M ${x1} ${y1} Q ${midX} ${midY-20} ${x2} ${y2}`}
          stroke={C.purple}
          strokeWidth={3}
          strokeLinecap="round"
          fill="none"
          filter="url(#glow)"
        />
      </AnimatePresence>

      {/* Dashed Centerline (Tracing) */}
      <motion.path 
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        d={`M ${x1} ${y1} Q ${midX} ${midY-20} ${x2} ${y2}`}
        stroke="#fff"
        strokeWidth={1}
        strokeDasharray="6,6"
        fill="none"
        opacity={0.6}
      />
      
      {/* Radius Indicator */}
      <motion.g layout>
        <line x1={midX} y1={cy+50} x2={midX} y2={midY-14} stroke={C.orange} strokeWidth={1.5} strokeDasharray="5,4" opacity={0.6}/>
        <motion.circle 
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          cx={midX} cy={cy+50} r={4} fill={C.orange} filter="url(#glow)"
        />
        <text x={midX+10} y={(cy+50+midY-14)/2} fill={C.orange} fontSize={10} fontWeight={800} fontFamily={F.mono}>R = {R}m</text>
      </motion.g>
      
      {/* HUD Info */}
      <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transform="translate(140, 24)">
        <text textAnchor="middle" fill={C.purple} fontSize={15} fontWeight={900} fontFamily={F.sans} letterSpacing="-0.5px">Δ = {delta}°</text>
        <text y={16} textAnchor="middle" fill={C.inkLight} fontSize={10} fontWeight={700} fontFamily={F.mono} textTransform="uppercase" letterSpacing="1.5px">V = {V} km/h</text>
      </motion.g>
    </motion.svg>
  )
}

export default function RoadPage({ onDataChange }) {
  const [tab,    setTab]    = useState('hcurve')
  const [V,      setV]      = useState(80)
  const [R,      setR]      = useState(360)
  const [delta,  setDelta]  = useState(40)
  const [e,      setE]      = useState(7)
  const [road,   setRoad]   = useState('NH')

  // Vert curve
  const [g1,     setG1]     = useState(-3)
  const [g2,     setG2]     = useState(2)
  const [L,      setL]      = useState(200)

  // Pavement
  const [msaLog, setMsaLog] = useState(7.5)
  const [cbr,    setCbr]    = useState(5)
  const [layers, setLayers] = useState([
    { name:'BC',    t:40  },
    { name:'DBM',   t:60  },
    { name:'WMM',   t:250 },
    { name:'GSB',   t:200 },
  ])

  const hCurve  = analyzeHorizontalCurve({ V, R, delta, e, road })
  const vCurve  = analyzeVerticalCurve({ g1, g2, L, V })
  const pavement = analyzePavement({ msaLog, cbr, layers })

  useEffect(()=>{ onDataChange?.({ V, R, delta, e, road, g1, g2, L, msaLog, cbr, layers, hCurve, vCurve, pavement }) },
    [V, R, delta, e, road, g1, g2, L, msaLog, cbr, layers])

  const moduleData = { V, R, delta, e, road, g1, g2, L, msaLog, cbr, layers, hCurve, vCurve, pavement }
  const { projectName, setProjectName, existingNames, save, isSaving, toastMsg } = useSaveToProject('road', moduleData)

  return (
    <>
      <TwoCol
        left={<>
          <Card>
            <SectionTitle>Road Class & Speed</SectionTitle>
            <Inp label="Design Speed V (km/h)" value={V} onChange={setV}
              options={[{v:30,l:'30'},{v:40,l:'40'},{v:50,l:'50'},{v:60,l:'60'},{v:80,l:'80'},{v:100,l:'100'},{v:120,l:'120'}]}/>
            <Inp label="Road Classification" value={road} onChange={setRoad}
              options={[{v:'NH',l:'NH — National Highway'},{v:'SH',l:'SH — State Highway'},{v:'MDR',l:'MDR — Major District Road'},{v:'ODR',l:'ODR — Other District Road'}]}/>
          </Card>

          <div style={{display:'flex',gap:8,marginBottom:8}}>
            {[['hcurve','Horizontal Curve'],['vcurve','Vertical Curve'],['pavement','Pavement']].map(([t,lbl])=>(
              <TabBtn key={t} active={tab===t} onClick={()=>setTab(t)} color={C.purple}>{lbl}</TabBtn>
            ))}
          </div>

          {tab==='hcurve' && <Card>
            <SectionTitle>Horizontal Curve (IRC 73)</SectionTitle>
            <Inp label="Radius R (m)"         value={R}     onChange={setR}     min={10}/>
            <Inp label="Deflection Angle Δ (°)" value={delta} onChange={setDelta} min={1} max={180}/>
            <Inp label="Superelevation e (%)"  value={e}     onChange={setE}     min={1} max={10} step={0.5}/>
          </Card>}

          {tab==='vcurve' && <Card>
            <SectionTitle>Vertical Curve (IRC 52)</SectionTitle>
            <Inp label="Grade g1 (%)" value={g1} onChange={setG1} min={-10} max={10} step={0.5}/>
            <Inp label="Grade g2 (%)" value={g2} onChange={setG2} min={-10} max={10} step={0.5}/>
            <Inp label="Curve Length L (m)" value={L} onChange={setL} min={20}/>
          </Card>}

          {tab==='pavement' && <Card>
            <SectionTitle>Flexible Pavement (IRC 37)</SectionTitle>
            <Inp label="Traffic (log MSA)" value={msaLog} onChange={setMsaLog}
              options={[{v:6,l:'1 MSA'},{v:6.5,l:'3 MSA'},{v:7,l:'10 MSA'},{v:7.5,l:'30 MSA'},{v:8,l:'100 MSA'},{v:8.5,l:'300 MSA'}]}/>
            <Inp label="Subgrade CBR (%)" value={cbr} onChange={setCbr}
              options={[{v:3,l:'3%'},{v:4,l:'4%'},{v:5,l:'5%'},{v:7,l:'7%'},{v:10,l:'10%'},{v:15,l:'15%'}]}/>
            <div style={{marginTop:10}}>
              <SectionTitle>Layer Thicknesses</SectionTitle>
              {layers.map((layer,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                  <div style={{width:48,fontSize:11,fontFamily:F.mono,color:C.inkMid,flexShrink:0}}>{layer.name}</div>
                  <input type="number" value={layer.t}
                    onChange={e=>setLayers(prev=>prev.map((l,j)=>j===i?{...l,t:parseFloat(e.target.value)||0}:l))}
                    style={{flex:1,padding:'5px 8px',borderRadius:6,border:`1px solid ${C.border}`,background:C.bgAlt,fontFamily:F.mono,fontSize:12,color:C.ink,outline:'none'}}/>
                  <span style={{fontSize:11,color:C.inkFaint,fontFamily:F.mono,flexShrink:0}}>mm</span>
                </div>
              ))}
            </div>
          </Card>}
        </>}

        right={<>
          <SavePanel moduleLabel="Road Design" moduleIcon="↗" accentColor="#7c3aed"
            projectName={projectName} setProjectName={setProjectName} existingNames={existingNames}
            onSave={save} isSaving={isSaving} hasData={true}/>

          <Card>
            <SectionTitle>Alignment Plan</SectionTitle>
            <RoadPlanSketch R={R} delta={delta} V={V}/>
          </Card>

          <Card>
            <StatGrid cols={3}>
              <StatBox label="Min Radius" value={hCurve.Rmin}    unit="m"  color={C.purple}/>
              <StatBox label="Curve L"    value={hCurve.L}       unit="m"  color={C.blue}/>
              <StatBox label="Sight Dist" value={hCurve.SSD}     unit="m"  color={C.green}/>
            </StatGrid>
          </Card>
          <Card accentColor={hCurve.passRadius?C.green:C.red}>
            <PassFail pass={hCurve.passRadius} code="IRC 73 — Minimum Radius Check"/>
            <ResultRow label="Provided radius R" value={R}           unit="m"/>
            <ResultRow label="Minimum Rmin"      value={hCurve.Rmin} unit="m" highlight/>
            <Divider/>
            <ResultRow label="Transition length Ls" value={hCurve.Ls} unit="m"/>
            <ResultRow label="Curve length Lc"       value={hCurve.L}  unit="m"/>
            <ResultRow label="Superelevation e"      value={`${e}%`}/>
          </Card>

          {tab==='vcurve' && <>
            <Card>
              <StatGrid cols={3}>
                <StatBox label="Algebraic diff A" value={Math.abs(g2-g1).toFixed(1)} unit="%" color={C.orange}/>
                <StatBox label="K-value"           value={vCurve.K}   color={C.blue}/>
                <StatBox label="Min L req."        value={vCurve.Lmin} unit="m" color={C.purple}/>
              </StatGrid>
            </Card>
            <Card accentColor={vCurve.pass?C.green:C.red}>
              <PassFail pass={vCurve.pass} code="IRC 52 — Vertical Curve Design"/>
              <ResultRow label="Provided L"  value={L}         unit="m"/>
              <ResultRow label="Min L (sight)" value={vCurve.Lmin} unit="m" highlight/>
              <ResultRow label="K-value"     value={vCurve.K}/>
              <ResultRow label="Curve type"  value={vCurve.type}/>
            </Card>
          </>}

          {tab==='pavement' && <>
            <Card>
              <SectionTitle>Pavement Layer Summary</SectionTitle>
              {layers.map((layer,i)=>(
                <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:`1px solid ${C.border}`}}>
                  <span style={{fontSize:12,fontFamily:F.sans,color:C.inkMid}}>{layer.name}</span>
                  <span style={{fontSize:12.5,fontFamily:F.mono,fontWeight:700,color:C.ink}}>{layer.t} mm</span>
                </div>
              ))}
              <div style={{display:'flex',justifyContent:'space-between',padding:'8px 0 0'}}>
                <span style={{fontSize:12.5,fontFamily:F.sans,fontWeight:700,color:C.navy}}>Total</span>
                <span style={{fontSize:14,fontFamily:F.mono,fontWeight:800,color:C.navy}}>{pavement.total} mm</span>
              </div>
            </Card>
            <Card accentColor={pavement.pass?C.green:C.red}>
              <PassFail pass={pavement.pass} code="IRC 37:2018 — Pavement Thickness"/>
              <ResultRow label="Required total thickness" value={pavement.required} unit="mm"/>
              <ResultRow label="Provided thickness"       value={pavement.total}    unit="mm" highlight/>
              <UtilBar pct={Math.min((pavement.required/pavement.total)*100,100).toFixed(1)} label="Pavement Utilization"/>
            </Card>
          </>}
        </>}
      />
      <SaveToast msg={toastMsg}/>
    </>
  )
}