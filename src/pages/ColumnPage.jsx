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
import { analyzeColumn } from "@engines/structuralEngine";
import { SavePanel, SaveToast } from "@components/SavePanel";
import { useSaveToProject } from "../hooks/useSaveToProject";

function ColumnSketch({ b, d, material, P, Mx, My, Le }) {
  const fill = material === 'concrete' ? 'url(#concrete)' : 'url(#steel)'
  const stroke = material === 'concrete' ? C.borderMid : C.inkMid
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 40 }}>
      {/* Elevation View */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 10, color: C.inkLight, fontFamily: F.mono, marginBottom: 8, letterSpacing: '1px', fontWeight: 700 }}>ELEVATION</p>
        <svg width={140} height={230} style={{ overflow: 'visible' }}>
          {/* Main Column Body */}
          <motion.rect 
            layout
            initial={{ height: 0 }}
            animate={{ height: 170 }}
            x={50} y={30} width={50} height={170} 
            fill={fill} stroke={stroke} strokeWidth={2} rx={material === 'concrete' ? 2 : 0} 
            filter="url(#shadow)"
          />
          
          {/* Rebar visualization for concrete */}
          <AnimatePresence>
            {material === 'concrete' && (
              <motion.g 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
              >
                {/* Vertical bars (simplified elevation) */}
                <motion.line x1={57} y1={30} x2={57} y2={200} stroke={C.inkMid} strokeWidth={1.5} opacity={0.6} strokeDasharray="2,2" />
                <motion.line x1={93} y1={30} x2={93} y2={200} stroke={C.inkMid} strokeWidth={1.5} opacity={0.6} strokeDasharray="2,2" />
                {/* Ties/Stirrups */}
                {[50, 80, 110, 140, 170].map(ty => (
                  <motion.line key={ty} x1={50} y1={ty} x2={100} y2={ty} stroke={C.inkLight} strokeWidth={1} opacity={0.3} />
                ))}
              </motion.g>
            )}
          </AnimatePresence>

          {/* Steel section details */}
          <AnimatePresence>
            {material === 'steel' && (
              <motion.g 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
              >
                <rect x={50} y={30} width={50} height={14} fill={stroke} opacity={0.8} />
                <rect x={50} y={186} width={50} height={14} fill={stroke} opacity={0.8} />
                <rect x={71} y={44} width={8} height={142} fill={stroke} opacity={0.4} />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Load Vector */}
          <motion.g animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <line x1={75} y1={0} x2={75} y2={28} stroke={C.red} strokeWidth={3} strokeLinecap="round" />
            <polygon points="75,30 69,18 81,18" fill={C.red} />
            <text x={84} y={12} fill={C.red} fontSize={10} fontWeight={800} fontFamily={F.mono}>{P} kN</text>
          </motion.g>
          
          {/* Moment Arrow (Elevation) */}
          <motion.g animate={{ opacity: Mx > 0 ? 1 : 0 }}>
            <path d="M 110 115 Q 130 105 120 95" stroke={C.orange} strokeWidth={2.5} fill="none" strokeLinecap="round" />
            <polygon points="120,93 113,101 122,103" fill={C.orange} />
            <text x={115} y={134} fill={C.orange} fontSize={9} fontWeight={800} fontFamily={F.mono}>Mx={Mx}</text>
          </motion.g>
          
          {/* Dimension Label */}
          <line x1={20} y1={30} x2={20} y2={200} stroke={C.inkFaint} strokeWidth={1} strokeDasharray="4,4" />
          <text x={14} y={115} fill={C.inkMid} fontSize={9} fontWeight={600} fontFamily={F.mono} transform="rotate(-90,14,115)">Le = {Le} m</text>
          
          <text x={75} y={222} textAnchor="middle" fill={C.inkMid} fontSize={10} fontWeight={700} fontFamily={F.mono}>{b}×{d} mm</text>
        </svg>
      </div>

      {/* Plan View */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 10, color: C.inkLight, fontFamily: F.mono, marginBottom: 8, letterSpacing: '1px', fontWeight: 700 }}>PLAN VIEW</p>
        <svg width={120} height={130} style={{ overflow: 'visible' }}>
          <motion.rect 
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            x={10} y={10} width={100} height={100} 
            fill={fill} stroke={stroke} strokeWidth={2.5} rx={material === 'concrete' ? 4 : 0} 
            filter="url(#shadow)"
          />

          {/* Concrete Reinforcing Bars (Plan) */}
          <AnimatePresence>
            {material === 'concrete' && (
              <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                {[[22,22],[98,22],[22,98],[98,98], [60,22], [60,98], [22,60], [98,60]].map(([cx,cy],i) =>
                  <motion.circle 
                    key={i} 
                    layout
                    cx={cx} cy={cy} r={4.5} 
                    fill={C.ink} 
                    filter="url(#glow)"
                  />
                )}
                {/* Internal tie */}
                <rect x={22} y={22} width={76} height={76} fill="none" stroke={C.inkMid} strokeWidth={1} opacity={0.4} />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Center Lines */}
          <line x1={0} y1={60} x2={120} y2={60} stroke={C.inkFaint} strokeWidth={1} strokeDasharray="5,5" />
          <line x1={60} y1={0} x2={60} y2={120} stroke={C.inkFaint} strokeWidth={1} strokeDasharray="5,5" />
          
          {/* Moments (Plan) */}
          <motion.g animate={{ opacity: Mx > 0 ? 1 : 0 }}>
            <path d="M 115 60 Q 125 50 115 40" stroke={C.orange} strokeWidth={2.5} fill="none" />
            <polygon points="115,38 108,46 120,47" fill={C.orange} />
            <text x={122} y={54} fill={C.orange} fontSize={9} fontWeight={800} fontFamily={F.mono}>Mx</text>
          </motion.g>
          
          <motion.g animate={{ opacity: My > 0 ? 1 : 0 }}>
            <path d="M 60 5 Q 72 1 76 9" stroke={C.purple} strokeWidth={2.5} fill="none" />
            <polygon points="76,10 66,7 70,15" fill={C.purple} />
            <text x={78} y={6} fill={C.purple} fontSize={9} fontWeight={800} fontFamily={F.mono}>My</text>
          </motion.g>
          
          <text x={60} y={124} textAnchor="middle" fill={C.inkMid} fontSize={10} fontWeight={700} fontFamily={F.mono}>{b} mm</text>
        </svg>
      </div>
    </div>
  )
}


export default function ColumnPage({ onDataChange }) {
  const [P, setP]               = useState(800)
  const [Mx, setMx]             = useState(60)
  const [My, setMy]             = useState(30)
  const [b, setB]               = useState(400)
  const [d, setD]               = useState(400)
  const [Le, setLe]             = useState(3.5)
  const [material, setMaterial] = useState('concrete')
  const [fck, setFck]           = useState(25)
  const [fy, setFy]             = useState(415)
  const [steelPct, setSteelPct] = useState(2)

  const result = analyzeColumn({ P, Mx, My, b, d, Le, material, fck, fy, steelPct })

  useEffect(() => {
    onDataChange?.({ P, Mx, My, b, d, Le, material, fck, fy, steelPct, result })
  }, [P, Mx, My, b, d, Le, material, fck, fy, steelPct])

  const moduleData = { P, Mx, My, b, d, Le, material, fck, fy, steelPct, result }
  const { projectName, setProjectName, existingNames, save, isSaving, toastMsg } = useSaveToProject('column', moduleData)

  return (
    <>
      <TwoCol
        left={<>
          <Card>
            <SectionTitle>Material</SectionTitle>
            <div style={{ display: 'flex', gap: 8 }}>
              <TabBtn active={material === 'concrete'} onClick={() => setMaterial('concrete')}>Concrete</TabBtn>
              <TabBtn active={material === 'steel'} onClick={() => setMaterial('steel')} color={C.orange}>Steel</TabBtn>
            </div>
          </Card>
          <Card>
            <SectionTitle>Applied Loads</SectionTitle>
            <Inp label="Axial Load P (kN)" value={P} onChange={setP} min={0} />
            <Inp label="Moment Mx (kNm) — about x-axis" value={Mx} onChange={setMx} min={0} />
            <Inp label="Moment My (kNm) — about y-axis" value={My} onChange={setMy} min={0} />
          </Card>
          <Card>
            <SectionTitle>Section Dimensions</SectionTitle>
            <Inp label="Width b (mm)" value={b} onChange={setB} min={100} />
            <Inp label="Depth d (mm)" value={d} onChange={setD} min={100} />
            <Inp label="Effective Length Le (m)" value={Le} onChange={setLe} min={0.5} step={0.1} />
          </Card>
          {material === 'concrete' && (
            <Card>
              <SectionTitle>Material Grade</SectionTitle>
              <Inp label="Concrete fck (MPa)" value={fck} onChange={setFck} options={[{v:20,l:'M20'},{v:25,l:'M25'},{v:30,l:'M30'},{v:35,l:'M35'},{v:40,l:'M40'}]} />
              <Inp label="Steel fy (MPa)" value={fy} onChange={setFy} options={[{v:250,l:'Fe250'},{v:415,l:'Fe415'},{v:500,l:'Fe500'},{v:550,l:'Fe550'}]} />
              <Inp label="Steel Ratio (%)" value={steelPct} onChange={setSteelPct}
                options={[{v:0.8,l:'0.8%'},{v:1,l:'1.0%'},{v:1.5,l:'1.5%'},{v:2,l:'2.0%'},{v:2.5,l:'2.5%'},{v:3,l:'3.0%'},{v:4,l:'4.0%'},{v:5,l:'5.0%'},{v:6,l:'6.0%'}]} />
            </Card>
          )}
        </>}

        right={<>
          <SavePanel moduleLabel="Column Design" moduleIcon="║" accentColor={C.navyBright}
            projectName={projectName} setProjectName={setProjectName} existingNames={existingNames}
            onSave={save} isSaving={isSaving} hasData={true} />

          <Card>
            <SectionTitle>Column Schematic</SectionTitle>
            <ColumnSketch b={b} d={d} material={material} P={P} Mx={Mx} My={My} Le={Le} />
          </Card>
          <Card>
            <StatGrid cols={3}>
              <StatBox label="Axial Capacity" value={result.Pu_cap} unit="kN" color={C.blue} />
              <StatBox label="λ (x-axis)" value={result.lx} color={result.isSlender ? C.red : C.green} />
              <StatBox label="Column Type" value={result.isSlender ? 'SLENDER' : 'SHORT'} color={result.isSlender ? C.orange : C.green} />
            </StatGrid>
          </Card>
          <Card accentColor={result.pass ? C.green : C.red}>
            <PassFail pass={P <= parseFloat(result.Pu_cap)} code={`${result.code} Cl. 39.3 — Axial Capacity`} />
            <StatGrid cols={2}>
              <StatBox label="Applied P" value={P} unit="kN" color={C.ink} />
              <StatBox label="Capacity Pu" value={result.Pu_cap} unit="kN" color={C.green} />
            </StatGrid>
            <div style={{ height: 10 }} />
            <UtilBar pct={((P / parseFloat(result.Pu_cap)) * 100).toFixed(1)} label="Axial Load Utilization" />
          </Card>
          {material === 'concrete' && (
            <Card accentColor={result.biaxialPass ? C.green : C.red}>
              <PassFail pass={result.biaxialPass} code={`${result.code} Cl. 39.6 — Biaxial Bending`} />
              <ResultRow label="Design Mx (incl. emin)" value={result.Mx_design} unit="kNm" />
              <ResultRow label="Design My (incl. emin)" value={result.My_design} unit="kNm" />
              <Divider />
              <ResultRow label="Uniaxial Capacity Mux1" value={result.Mux1} unit="kNm" />
              <ResultRow label="Uniaxial Capacity Muy1" value={result.Muy1} unit="kNm" />
              <Divider />
              <ResultRow label="Exponent αn" value={result.alphaN} />
              <ResultRow label="Interaction Value (≤ 1.0)" value={result.biaxial_lhs} highlight />
              <div style={{ height: 10 }} />
              <UtilBar pct={(parseFloat(result.biaxial_lhs) * 100).toFixed(1)} label="Biaxial Interaction" />
            </Card>
          )}
          {material === 'concrete' && (
            <Card>
              <SectionTitle>Min Eccentricity Check (IS 456 Cl. 25.4)</SectionTitle>
              <ResultRow label="emin,x" value={`${result.emin_x} mm`} />
              <ResultRow label="emin,y" value={`${result.emin_y} mm`} />
              <ResultRow label="Slenderness λx" value={result.lx} />
              <ResultRow label="Slenderness λy" value={result.ly} />
              {result.isSlender && (
                <div style={{ marginTop: 10 }}>
                  <InfoBox color={C.yellow} lightColor={C.yellowLight}>
                    ⚠ Slender column (λ = {result.lambda}). Additional moments per IS 456 Cl. 39.7 must be included.
                  </InfoBox>
                </div>
              )}
            </Card>
          )}
          <Card accentColor={result.pass ? C.green : C.red}>
            <PassFail pass={result.pass} code={`${result.code} — Overall Design Check`} />
            {material === 'concrete' && (
              <InfoBox color={C.blue} lightColor={C.blueLight}>
                Steel provided: {result.steelPct}% of Ag = <strong>{result.Asc} mm²</strong><br />
                Limits: 0.8%–6.0% of Ag = {(b * d * 0.008).toFixed(0)}–{(b * d * 0.06).toFixed(0)} mm²
              </InfoBox>
            )}
          </Card>
        </>}
      />
      <SaveToast msg={toastMsg} />
    </>
  )
}