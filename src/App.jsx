import React, { useState, useEffect } from "react";
import { IMG } from "./images";
import { PHONE, TEL, NAV, PROJECTS, FILTERS, POLICY, SPOTS, LAYERS, ISO, ESCROW, QUIZ } from "./data";




// Projects database with REAL images


const LOGO_SRC = import.meta.env.BASE_URL + "logo.svg";

function Logo({ height = 40 }) {
  return <img src={LOGO_SRC} alt="Важное Решение" style={{ height: height + "px", width: "auto" }} />;
}


function Header({ onOpenConsult }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md" style={{ paddingTop: "env(safe-area-inset-top,0px)" }}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a href="#top" aria-label="Важное Решение"><Logo /></a>
        <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.2em] text-zinc-300 lg:flex">
          {NAV.map(([t,h]) => <a key={h} href={h} className="transition hover:text-gold-light">{t}</a>)}
        </nav>
        <div className="flex items-center gap-5">
          <a href={TEL} className="hidden text-sm font-semibold tracking-wide transition hover:text-gold-light md:block">{PHONE}</a>
          <button onClick={onOpenConsult} className="hidden rounded-full gold-gradient px-5 py-2.5 text-[11px] font-extrabold uppercase tracking-wider text-noir-900 transition hover:scale-105 sm:block">Заказать звонок</button>
          <button aria-label="Меню" onClick={() => setOpen(!open)} className="p-2 text-white lg:hidden">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">{open ? <path d="M6 6l12 12M18 6 6 18"/> : <path d="M4 8h16M4 16h16"/>}</svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-zinc-950/95 px-6 pb-6 lg:hidden">
          {NAV.map(([t,h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="block border-b border-white/5 py-4 text-sm uppercase tracking-widest text-zinc-200">{t}</a>)}
          <a href={TEL} className="block py-4 font-semibold">{PHONE}</a>
          <button onClick={() => { setOpen(false); onOpenConsult(); }} className="w-full rounded-full gold-gradient py-3.5 text-xs font-extrabold uppercase tracking-wider text-noir-900">Заказать звонок</button>
        </div>
      )}
    </header>
  );
}

function Hero({ onOpenConsult }) {
  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 z-0">
        <img src={IMG["barn-107-hero"]} alt="Барн Классик 107" className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-900 via-noir-900/70 to-noir-900/40" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold text-xs uppercase tracking-widest mb-8">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span> Гарантия 10 лет • Счета Эскроу
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white leading-tight tracking-tight mb-8">
          Энергоэффективные дома <br className="hidden sm:inline"/><span className="italic font-normal gold-text">Барнхаус & Сканди</span>
        </h1>
        <p className="text-zinc-300 text-base sm:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
          Строительство под ключ в Москве и Казани за 90 дней. Одобрение Семейной и IT-ипотеки от 6% со встроенным брокериджем.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#calculator" className="w-full sm:w-auto px-8 py-4 rounded-full gold-gradient text-noir-900 font-extrabold text-xs uppercase tracking-widest hover:scale-105 transition duration-300">
            Рассчитать платеж по ипотеке
          </a>
          <a href="#projects" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-xs uppercase tracking-widest hover:bg-white/20 transition">
            Смотреть каталог домов
          </a>
        </div>
      </div>
    </section>
  );
}

function CountUp({ to, pre = "", suf = "" }) {
  const ref = React.useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) { setV(to); return; }
    let raf, done = false;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done) {
        done = true; const t0 = performance.now();
        const tick = (t) => { const k = Math.min(1, (t - t0) / 1600); setV(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(tick); };
        raf = requestAnimationFrame(tick); io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{pre}{v.toLocaleString("ru-RU")}{suf}</span>;
}

function Stats() {
  const list = [
    { to: 90, pre: "", suf: " дней", label: "Средний срок сдачи дома под ключ" },
    { to: 4500, pre: "до ", suf: " ₽", label: "Расходы на отопление зимой (Класс А+)" },
    { to: 6, pre: "от ", suf: "%", label: "Ставка по Семейной и IT-ипотеке" },
    { to: 10, pre: "", suf: " лет", label: "Официальная гарантия по договору" },
  ];
  return (
    <section className="bg-noir-800 border-y border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {list.map(s => (
          <div key={s.label} className="space-y-2">
            <div className="font-serif text-3xl sm:text-4xl font-bold gold-text"><CountUp to={s.to} pre={s.pre} suf={s.suf} /></div>
            <div className="text-xs text-zinc-400 font-light">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}


function PlanSVG({ p }) {
  const [w, h] = p.dims.replace(" м","").split("×").map(x => parseFloat(x.trim()));
  const U = 36, PAD = 34, W = w*U, H = h*U;
  const lw = W*0.5, rx = lw, rw = W-lw;
  const bathH = H*(p.ba > 1 ? 0.42 : 0.3), bedH = (H-bathH)/p.bd;
  const T = (x,y,t,sz=11,fill="#A1A1AA",anchor="middle") => <text x={x} y={y} fontSize={sz} fill={fill} textAnchor={anchor} fontFamily="Manrope, sans-serif">{t}</text>;
  const rooms = [];
  for (let i=0;i<p.bd;i++) rooms.push(<g key={"b"+i}><rect x={rx} y={i*bedH} width={rw} height={bedH} fill="none" stroke="#fff" strokeOpacity=".3"/>{T(rx+rw/2,i*bedH+bedH/2+4,"Спальня")}</g>);
  const baths = [];
  for (let i=0;i<p.ba;i++) { const bh = bathH/p.ba; baths.push(<g key={"s"+i}><rect x={rx} y={H-bathH+i*bh} width={rw} height={bh} fill="none" stroke="#fff" strokeOpacity=".3"/>{T(rx+rw/2,H-bathH+i*bh+bh/2+4,"Санузел")}</g>); }
  return (
    <svg viewBox={`${-PAD} ${-PAD} ${W+PAD*2} ${H+PAD*2}`} className="h-full w-full" role="img" aria-label={"Схема планировки " + p.name}>
      <rect x={-PAD} y={-PAD} width={W+PAD*2} height={H+PAD*2} fill="#0E0E11"/>
      <rect x="0" y="0" width={W} height={H} fill="#16161A" stroke="#C5A059" strokeWidth="3"/>
      <rect x="0" y="0" width={lw} height={H} fill="none" stroke="#fff" strokeOpacity=".3"/>
      {rooms}{baths}
      {T(lw/2,H/2,"Кухня-гостиная",13,"#DFC28F")}
      <path d={`M${lw*0.3} ${H} h${U*0.9}`} stroke="#0E0E11" strokeWidth="5"/>
      {T(W/2,-12,w+" м",11,"#C5A059")}{T(-14,H/2,h+" м",11,"#C5A059")}
    </svg>
  );
}

function ProjectCard({ p, onSelectProject }) {
  const [view, setView] = useState("facade");
  const tab = (k, t) => (
    <button onClick={() => setView(k)} aria-pressed={view===k} className={`rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition ${view===k ? "gold-gradient text-noir-900" : "text-zinc-300 hover:text-white"}`}>{t}</button>
  );
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-noir-800 transition duration-500 hover:border-amber-400/30">
      <div className="relative h-64 overflow-hidden">
        {view === "facade"
          ? (p.image
              ? <img src={p.image} alt={"Фасад " + p.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              : <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-zinc-800 to-zinc-900"><svg width="64" height="40" viewBox="0 0 64 40" fill="none" stroke="#C5A059" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true"><path d="M4 38h56M10 38V20L28 6l18 14v18M36 38V24l14-8 10 8v14"/></svg><span className="text-[11px] font-light tracking-wide text-zinc-400">Фото фасада готовится</span></div>)
          : (p.plan
              ? <div className="flex h-full w-full items-center justify-center bg-white p-4"><img src={p.plan} alt={"Планировка " + p.name} className="max-h-full max-w-full object-contain" /></div>
              : <><PlanSVG p={p} /><div className="absolute bottom-3 left-4 z-10 rounded-full bg-zinc-950/75 px-3 py-1 text-[10px] font-light text-zinc-400 backdrop-blur-xl">Схема по габаритам</div></>)}
        <div className="absolute left-4 top-4 z-10 flex gap-1 rounded-full border border-white/15 bg-zinc-950/75 p-1 backdrop-blur-xl">{tab("facade","Фасад")}{tab("plan","Планировка")}</div>
        <div className="absolute right-4 top-4 z-10 rounded-full border border-gold/30 bg-zinc-950/75 px-3 py-1 text-xs font-bold text-gold-light backdrop-blur-xl">{p.area}</div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-8">
        <div>
          <h3 className="mb-2 font-serif text-2xl font-bold text-white">{p.name}</h3>
          <p className="mb-5 text-xs font-light text-zinc-400">{p.rooms} · {p.dims}</p>
          <p className="mb-6 text-xs font-light leading-relaxed text-zinc-300">{p.desc}</p>
        </div>
        <div className="border-t border-white/10 pt-6">
          <div className="mb-5 flex items-baseline justify-between">
            <div><div className="text-[10px] uppercase tracking-wider text-zinc-500">В ипотеку</div><div className="text-lg font-bold text-gold-light">{p.mortgage}</div></div>
            <div className="text-right"><div className="text-[10px] uppercase tracking-wider text-zinc-500">Теплый контур от</div><div className="text-sm font-semibold text-white">{p.price}</div></div>
          </div>
          <button onClick={() => { window.dispatchEvent(new CustomEvent("vr-calc", { detail: p.id })); const el = document.getElementById("calculator"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="mb-3 w-full rounded-xl border border-gold/30 py-3 text-xs font-bold uppercase tracking-wider text-gold-light transition hover:bg-gold/10">Рассчитать платёж</button>
          <button onClick={() => onSelectProject(p)} className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-bold uppercase tracking-wider text-white transition duration-300 hover:border-transparent hover:bg-gold hover:text-noir-900">Получить смету и планировку</button>
        </div>
      </div>
    </div>
  );
}


function Projects({ onSelectProject }) {
  const [shown, setShown] = useState(6);
  const [f, setF] = useState({ area: "all", bd: "all", pay: "all" });
  const setFilter = (k, v) => { setF({ ...f, [k]: v }); setShown(6); };
  const reset = () => { setF({ area: "all", bd: "all", pay: "all" }); setShown(6); };
  const isFiltered = f.area !== "all" || f.bd !== "all" || f.pay !== "all";
  const list = PROJECTS.filter(pr => {
    const a = parseFloat(pr.area), pay = Number(pr.mortgage.replace(/\D/g, ""));
    return (f.area === "all" || (f.area === "s" && a < 60) || (f.area === "m" && a >= 60 && a < 100) || (f.area === "l" && a >= 100))
      && (f.bd === "all" || (f.bd === "3" ? pr.bd >= 3 : pr.bd === Number(f.bd)))
      && (f.pay === "all" || pay <= Number(f.pay));
  });
  return (
    <section id="projects" className="bg-noir-900 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">Каталог проектов 2026</div>
            <h2 className="font-serif text-3xl font-bold text-white sm:text-5xl">Реализованные Барнхаусы</h2>
          </div>
          <p className="max-w-md text-sm font-light text-zinc-400">Проекты расположены от меньшей площади к большей. Смета фиксируется в договоре до рубля.</p>
        </div>
        <div className="mb-12 rounded-2xl border border-white/10 bg-zinc-950/60 p-6 backdrop-blur-xl sm:p-8">
          <div className="grid gap-6 md:grid-cols-3">
            {FILTERS.map(g => (
              <div key={g.k}>
                <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">{g.t}</div>
                <div className="flex flex-wrap gap-2">
                  {g.o.map(([v, t]) => <button key={v} onClick={() => setFilter(g.k, v)} aria-pressed={f[g.k] === v} className={`rounded-full border px-4 py-2 text-xs transition ${f[g.k] === v ? "gold-gradient border-transparent font-bold text-noir-900" : "border-white/10 font-medium text-zinc-300 hover:border-amber-400/30"}`}>{t}</button>)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-xs text-zinc-400">
            <span>Найдено: <b className="text-white">{list.length}</b> из {PROJECTS.length}</span>
            {isFiltered && <button onClick={reset} className="text-gold-light underline underline-offset-4">Сбросить фильтры</button>}
          </div>
        </div>
        {list.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-noir-800 p-12 text-center">
            <p className="mb-6 text-sm font-light text-zinc-300">По этим условиям проектов нет. Измените фильтры или оставьте заявку: подберём дом под ваш бюджет.</p>
            <button onClick={reset} className="rounded-full gold-gradient px-8 py-3 text-xs font-extrabold uppercase tracking-widest text-noir-900">Показать все проекты</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {list.slice(0, shown).map(pr => <ProjectCard key={pr.id} p={pr} onSelectProject={onSelectProject} />)}
          </div>
        )}
        <div className="mt-14 text-center">
          <p className="mb-5 text-xs font-light text-zinc-500">Показано {Math.min(shown, list.length)} из {list.length}</p>
          {shown < list.length && <button onClick={() => setShown(shown + 6)} className="rounded-full border border-gold/40 bg-white/5 px-10 py-4 text-xs font-extrabold uppercase tracking-widest text-gold-light transition duration-300 hover:bg-gold hover:text-noir-900">Показать ещё {Math.min(6, list.length - shown)}</button>}
        </div>
      </div>
    </section>
  );
}

function Calculator({ onOpenConsult }) {
  const [cost, setCost] = useState(6200000);
  const [downPercent, setDownPercent] = useState(20);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(30);
  const [pid, setPid] = useState("");
  const pick = (id) => { setPid(id); const pr = PROJECTS.find(x => x.id === id); if (pr) setCost(Math.min(15000000, Math.max(2000000, Number(pr.price.replace(/\D/g, ""))))); };
  useEffect(() => { const h = (e) => pick(e.detail); window.addEventListener("vr-calc", h); return () => window.removeEventListener("vr-calc", h); }, []);

  const downPayment = Math.round(cost * (downPercent / 100));
  const loanAmount = cost - downPayment;
  const monthlyRate = rate / 12 / 100;
  const totalMonths = years * 12;
  const monthlyPayment = Math.round(
    loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  return (
    <section id="calculator" className="py-28 bg-noir-800 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-gold mb-3 font-semibold">Ипотечный калькулятор 2026</div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-6">Рассчитайте ежемесячный платеж</h2>
            <p className="text-zinc-400 text-sm font-light leading-relaxed mb-10">
              «Важное Решение» является аккредитованным партнером крупнейших банков (Сбер, ДОМ.РФ, ВТБ, Альфа). Одобряем сложные кейсы, IT-ипотеку и семейную ипотеку от 6% без первоначального взноса при наличии маткапитала.
            </p>

            <div className="space-y-6"><div><label className="mb-2 block text-sm text-zinc-400">Проект из каталога</label><select value={pid} onChange={e => pick(e.target.value)} className="w-full rounded-xl border border-white/10 bg-noir-700 px-4 py-3 text-sm text-white"><option value="">Своя сумма</option>{PROJECTS.map(pr => <option key={pr.id} value={pr.id}>{pr.name} · {pr.price}</option>)}</select></div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-400">Стоимость строительства:</span>
                  <span className="text-white font-bold">{cost.toLocaleString()} ₽</span>
                </div>
                <input type="range" min="2000000" max="15000000" step="100000" value={cost} onChange={e => setCost(Number(e.target.value))} className="w-full h-2 bg-noir-700 rounded-lg cursor-pointer" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-400">Первоначальный взнос ({downPercent}%):</span>
                  <span className="text-white font-bold">{downPayment.toLocaleString()} ₽</span>
                </div>
                <input type="range" min="10" max="50" step="5" value={downPercent} onChange={e => setDownPercent(Number(e.target.value))} className="w-full h-2 bg-noir-700 rounded-lg cursor-pointer" />
              </div>

              <div className="flex gap-4 pt-2">
                <button onClick={() => setRate(6)} className={`flex-1 py-3 rounded-xl border text-xs font-bold transition ${rate === 6 ? 'border-gold text-gold bg-gold/10' : 'border-white/10 text-zinc-400'}`}>
                  Семейная / IT (6%)
                </button>
                <button onClick={() => setRate(8)} className={`flex-1 py-3 rounded-xl border text-xs font-bold transition ${rate === 8 ? 'border-gold text-gold bg-gold/10' : 'border-white/10 text-zinc-400'}`}>
                  Базовая (8%+)
                </button>
              </div>
            </div>
          </div>

          <div className="bg-noir-900 p-8 sm:p-12 rounded-3xl border border-gold/30 relative">
            <div className="text-xs uppercase tracking-widest text-zinc-400 mb-2">Расчетный платеж</div>
            <div className="font-serif text-4xl sm:text-6xl font-bold gold-text mb-6">
              {monthlyPayment.toLocaleString()} <span className="text-lg font-sans text-white/50 font-normal">₽ / мес</span>
            </div>
            
            <div className="space-y-4 py-6 border-y border-white/10 text-xs text-zinc-300">
              <div className="flex justify-between">
                <span>Сумма кредита:</span>
                <span className="font-bold text-white">{loanAmount.toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between">
                <span>Срок кредита:</span>
                <span className="font-bold text-white">{years} лет</span>
              </div>
              <div className="flex justify-between">
                <span>Одобрение в банках:</span>
                <span className="font-bold text-gold-light">9 из 10 заявок</span>
              </div>
            </div>

            <button onClick={() => onOpenConsult({ calc: { project: (PROJECTS.find(x => x.id === pid) || {}).name, cost, downPercent, downPayment, rate, years, monthlyPayment } })} className="mt-8 w-full py-4 rounded-xl gold-gradient text-noir-900 font-extrabold text-xs uppercase tracking-widest hover:opacity-90 transition">
              Зафиксировать условия и получить одобрение
            </button>
            <p className="mt-4 text-[10px] text-center text-zinc-500 font-light">
              Расчет является предварительным. Точные условия утверждаются банком.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Specs() {
  return (
    <section id="specs" className="py-28 bg-noir-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-gold mb-3 font-semibold">Прозрачные сметы</div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">Что входит в стоимость?</h2>
          <p className="text-zinc-400 text-sm font-light">Любую комплектацию можно оформить в ипотеку без первоначального взноса.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">{["Rehau","Grand Line","Knauf","Пароизоляция Delta"].map(b => <span key={b} className="rounded-full border border-gold/30 bg-white/5 px-4 py-1.5 text-xs tracking-wider text-gold-light">{b}</span>)}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-noir-800 p-8 sm:p-10 rounded-3xl border border-white/5">
            <div className="text-gold text-xs uppercase tracking-widest font-bold mb-2">Комплектация 1</div>
            <h3 className="font-serif text-2xl font-bold text-white mb-6">Теплый контур (База)</h3>
            <ul className="space-y-4 text-xs text-zinc-300 font-light">
              <li className="flex items-center gap-3"><span className="text-gold font-bold">✓</span> Железобетонный свайный фундамент 150×150 мм</li>
              <li className="flex items-center gap-3"><span className="text-gold font-bold">✓</span> Сухой силовой каркас (доска камерной сушки 12-14% с антисептированием)</li>
              <li className="flex items-center gap-3"><span className="text-gold font-bold">✓</span> Энергоэффективное утепление: 200 мм стены / 250 мм кровля</li>
              <li className="flex items-center gap-3"><span className="text-gold font-bold">✓</span> Профессиональные диффузионные мембраны с проклейкой скотчем Delta</li>
              <li className="flex items-center gap-3"><span className="text-gold font-bold">✓</span> Окна ПВХ с двухкамерным мультифункциональным стеклопакетом (Rehau)</li>
              <li className="flex items-center gap-3"><span className="text-gold font-bold">✓</span> Кровля — кликфальц / металлочерепица 0.5 мм (Grand Line)</li>
              <li className="flex items-center gap-3"><span className="text-gold font-bold">✓</span> Фасадная отделка — планкен из лиственницы + фальц</li>
            </ul>
          </div>

          <div className="bg-noir-800 p-8 sm:p-10 rounded-3xl border border-gold/40 relative">
            <div className="absolute top-6 right-6 px-3 py-1 rounded-full gold-gradient text-noir-900 text-[10px] font-extrabold uppercase tracking-widest">
              Выбор 85% клиентов
            </div>
            <div className="text-gold text-xs uppercase tracking-widest font-bold mb-2">Комплектация 2</div>
            <h3 className="font-serif text-2xl font-bold text-white mb-6">White Box + Инженерия</h3>
            <p className="text-zinc-400 text-xs mb-6">Включает всё из базового Теплого контура, плюс:</p>
            <ul className="space-y-4 text-xs text-zinc-300 font-light">
              <li className="flex items-center gap-3"><span className="text-gold font-bold">★</span> Полная разводка электрики (медный кабель ВВГнг-LS в негорючей гофре)</li>
              <li className="flex items-center gap-3"><span className="text-gold font-bold">★</span> Разводка водоснабжения и канализации до точек подключения</li>
              <li className="flex items-center gap-3"><span className="text-gold font-bold">★</span> Система отопления (теплый водяной пол / конвекторы)</li>
              <li className="flex items-center gap-3"><span className="text-gold font-bold">★</span> Приточно-вытяжная вентиляция с рекуперацией тепла</li>
              <li className="flex items-center gap-3"><span className="text-gold font-bold">★</span> Внутренняя предчистовая отделка стен ГСП / гипсокартоном Knauf под обои/покраску</li>
              <li className="flex items-center gap-3"><span className="text-gold font-bold">★</span> Входная утепленная дверь с терморазрывом</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onPolicy }) {
  return (
    <footer id="contacts" className="bg-noir-900 border-t border-white/10 py-16 text-zinc-400 text-xs font-light">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="space-y-4">
          <Logo height={36} />
          <p className="leading-relaxed">Энергоэффективные каркасные дома под ключ и одобрение сложной ипотеки.</p>
          <p className="text-[10px] text-zinc-600">© 2014 – 2026 ООО "Важное решение"</p>
        </div>
        <div>
          <div className="font-bold text-white uppercase tracking-wider text-[11px] mb-4">Офис в Москве</div>
          <p>г. Москва, м. Проспект Мира,</p>
          <p>Слесарный переулок, д. 3</p>
          <p className="mt-2 text-gold">Пн-Сб с 9:00 до 20:00</p>
        </div>
        <div>
          <div className="font-bold text-white uppercase tracking-wider text-[11px] mb-4">Офис в Казани</div>
          <p>г. Казань, строительные площадки</p>
          <p>и мобильный офис продаж</p>
          <p className="mt-2 text-gold">По предварительной записи</p>
        </div>
        <div>
          <div className="font-bold text-white uppercase tracking-wider text-[11px] mb-4">Контакты</div>
          <p className="text-white text-sm font-bold mb-1"><a href={TEL}>{PHONE}</a></p>
          <p className="text-[10px] text-zinc-500">Бесплатно по всей России</p>
          <p className="mt-2">creditvr.ru/house</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-zinc-600">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6"><span>Информация на сайте не является публичной офертой.</span><button onClick={onPolicy} className="underline decoration-white/20 underline-offset-4 transition hover:text-gold-light">Политика конфиденциальности</button></div>
        <div>Соответствие Федеральному закону № 152-ФЗ «О персональных данных»</div>
      </div>
    </footer>
  );
}




function Hotspots() {
  const [a, setA] = useState(2);
  return (
    <section className="border-t border-white/5 bg-noir-900 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">Технологии на фасаде</div>
          <h2 className="mb-5 font-serif text-3xl font-bold text-white sm:text-5xl">Что скрыто в каждой детали дома</h2>
          <p className="text-sm font-light leading-relaxed text-zinc-400">Нажмите на точку на фасаде проекта Барн Классик 66. Всё перечисленное входит в «Тёплый контур».</p>
        </div>
        <div className="grid items-start gap-10 lg:grid-cols-5">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 lg:col-span-3">
            <img src={IMG["f66"]} alt="Фасад Барн Классик 66" className="block w-full" />
            {SPOTS.map((sp, i) => (
              <button key={sp.t} aria-label={sp.t} onClick={() => setA(i)} onMouseEnter={() => setA(i)} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: sp.x + "%", top: sp.y + "%" }}>
                <span className={"absolute inset-0 rounded-full bg-gold/60 motion-reduce:animate-none " + (i === a ? "animate-ping" : "")} />
                <span className={"relative block h-5 w-5 rounded-full border-2 transition " + (i === a ? "scale-125 border-white bg-gold" : "border-white/80 bg-zinc-950/70")} />
                {i === a && <span className={"absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/15 bg-zinc-950/80 px-3 py-1 text-[11px] text-white backdrop-blur-xl " + (sp.x > 70 ? "right-7" : "left-7")}>{sp.t}</span>}
              </button>
            ))}
          </div>
          <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-8 backdrop-blur-xl sm:p-10 lg:col-span-2">
            <div key={a}>
              <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gold">{a + 1} / {SPOTS.length}</div>
              <h3 className="mb-4 font-serif text-2xl font-bold text-white">{SPOTS[a].t}</h3>
              <p className="min-h-[5.5rem] text-sm font-light leading-relaxed text-zinc-300">{SPOTS[a].b}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2 border-t border-white/10 pt-6">
              {SPOTS.map((sp, i) => <button key={sp.t} onClick={() => setA(i)} aria-pressed={i === a} className={"rounded-full border px-4 py-2 text-xs transition " + (i === a ? "gold-gradient border-transparent font-bold text-noir-900" : "border-white/10 text-zinc-300 hover:border-amber-400/30")}>{sp.t}</button>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




function WallIso({ p, active }) {
  const W = 150, H = 210, c = 0.866, ox = 272, oy = 240;
  const g = 6 + p * 42;
  const pr = (X, Y, Z) => [(X - Z) * c + ox, (X + Z) * 0.5 - Y + oy];
  const poly = (pts) => pts.map(q => q[0].toFixed(1) + "," + q[1].toFixed(1)).join(" ");
  let z = 0;
  const items = ISO.map((l, i) => { const z0 = z; z += l.t + g; return { ...l, i, z0, z1: z0 + l.t }; });
  return (
    <svg viewBox="0 0 520 480" className="h-80 w-full sm:h-[28rem]" role="img" aria-label="Изометрический разрез стены по слоям">
      <defs>
        <pattern id="tx-wood" width="15" height="60" patternUnits="userSpaceOnUse"><rect width="15" height="60" fill="#9a6b3f"/><rect width="1.4" height="60" fill="#5e3d1f"/><path d="M5 4v22M9 18v30M12 8v14" stroke="#b68455" strokeWidth=".8"/></pattern>
        <pattern id="tx-mem" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#d9c9a3"/><path d="M0 8L8 0" stroke="#b5a47a" strokeWidth="1"/></pattern>
        <pattern id="tx-wool" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#e3d39a"/><path d="M0 4q3.5-4 7 0t7 0M0 11q3.5-4 7 0t7 0" stroke="#c4b06a" fill="none" strokeWidth="1"/></pattern>
        <pattern id="tx-vap" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#9fb3bd"/><circle cx="3" cy="3" r=".7" fill="#7e96a2"/></pattern>
        <pattern id="tx-gkl" width="40" height="30" patternUnits="userSpaceOnUse"><rect width="40" height="30" fill="#ece9e2"/><path d="M0 29.5H40" stroke="#d3cfc4" strokeWidth="1"/></pattern>
      </defs>
      {items.map(l => {
        const act = l.i === active;
        const face = [pr(0, 0, l.z1), pr(W, 0, l.z1), pr(W, H, l.z1), pr(0, H, l.z1)];
        const right = [pr(W, 0, l.z0), pr(W, 0, l.z1), pr(W, H, l.z1), pr(W, H, l.z0)];
        const top = [pr(0, H, l.z0), pr(W, H, l.z0), pr(W, H, l.z1), pr(0, H, l.z1)];
        const lab = pr(W / 2, H, (l.z0 + l.z1) / 2);
        return (
          <g key={l.k} style={{ opacity: act ? 1 : 0.5, transition: "opacity .5s, filter .5s", filter: act ? "drop-shadow(0 0 16px rgba(197,160,89,.55))" : "none" }}>
            <polygon points={poly(right)} fill={l.c} /><polygon points={poly(right)} fill="#000" opacity=".38" />
            <polygon points={poly(top)} fill={l.c} /><polygon points={poly(top)} fill="#fff" opacity=".3" />
            <g transform={`matrix(${c} .5 0 -1 ${(-l.z1 * c + ox).toFixed(1)} ${(0.5 * l.z1 + oy).toFixed(1)})`}>
              <rect width={W} height={H} fill={`url(#tx-${l.k})`} />
              {l.k === "wool" && [0, 48, 96, 144].map(x => <rect key={x} x={x} width="6" height={H} fill="#9a6b3f" stroke="#5e3d1f" strokeWidth=".8" />)}
              {l.k === "wool" && [70, 140].map(y => <rect key={y} x="0" y={y} width={W} height="3" fill="#b9a56a" opacity=".8" />)}
            </g>
            <polygon points={poly(face)} fill="none" stroke={act ? "#DFC28F" : "rgba(255,255,255,.2)"} strokeWidth={act ? 2.5 : 1} />
            {l.k === "wool" && <text x={lab[0]} y={lab[1] - 10} fill="#DFC28F" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Manrope, sans-serif">200 мм</text>}
          </g>
        );
      })}
    </svg>
  );
}

function WallSection() {
  const ref = React.useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => { const el = ref.current; if (!el) return; const r = el.getBoundingClientRect(); const total = r.height - window.innerHeight; setP(Math.min(1, Math.max(0, -r.top / total))); };
    on(); window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);
  const active = Math.min(LAYERS.length - 1, Math.floor(p * LAYERS.length));
  return (
    <section ref={ref} className="relative border-t border-white/5 bg-noir-900" style={{ height: "320vh" }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden" style={{ paddingTop: "80px" }}>
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 md:grid-cols-2">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">Разрез стены</div>
            <h2 className="mb-8 font-serif text-3xl font-bold text-white sm:text-5xl">Из чего сделано тепло</h2>
            <ul className="mb-8 space-y-3">
              {LAYERS.map((l, i) => <li key={l.t} className={`flex items-center gap-3 text-sm transition duration-500 ${i === active ? "text-white" : "text-zinc-600"}`}><span className={`h-px transition-all duration-500 ${i === active ? "w-10 bg-gold" : "w-4 bg-zinc-700"}`} />{l.t}</li>)}
            </ul>
            <p key={active} className="min-h-[4.5rem] max-w-md text-sm font-light leading-relaxed text-zinc-300">{LAYERS[active].d}</p>
          </div>
          <div className="flex items-center justify-center"><WallIso p={p} active={active} /></div>
        </div>
      </div>
    </section>
  );
}

function Seasons() {
  const [winter, setWinter] = useState(true);
  const flakes = React.useMemo(() => Array.from({ length: 36 }, (_, i) => ({ l: (i * 29) % 100, d: (i * 0.37) % 6, s: 2 + (i % 4), t: 5 + (i % 5) })), []);
  const pill = (on, t, f) => <button onClick={f} aria-pressed={on} className={`rounded-full px-6 py-2 text-xs font-bold uppercase tracking-widest transition ${on ? "gold-gradient text-noir-900" : "text-zinc-300 hover:text-white"}`}>{t}</button>;
  return (
    <section className="border-t border-white/5 bg-noir-800 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">Круглый год</div>
            <h2 className="font-serif text-3xl font-bold text-white sm:text-5xl">Дом зимой и летом</h2>
          </div>
          <div className="flex gap-1 self-start rounded-full border border-white/15 bg-zinc-950/75 p-1 backdrop-blur-xl">{pill(!winter, "Лето", () => setWinter(false))}{pill(winter, "Зима", () => setWinter(true))}</div>
        </div>
        <div className="relative h-[420px] overflow-hidden rounded-3xl border border-white/10 sm:h-[520px]">
          <img src={IMG["barn-107-hero"]} alt="Барн Классик 107" className="absolute inset-0 h-full w-full object-cover" style={{ transition: "filter 1s", filter: winter ? "saturate(.5) brightness(.85) hue-rotate(185deg)" : "saturate(1.1)" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          {winter && flakes.map((f, i) => <span key={i} className="vr-flake absolute top-0 rounded-full bg-white/80" style={{ left: f.l + "%", width: f.s, height: f.s, animation: `vr-fall ${f.t}s linear ${f.d}s infinite` }} />)}
          <div className="absolute bottom-6 left-6 right-6 max-w-md rounded-2xl border border-white/15 bg-zinc-950/75 p-8 backdrop-blur-xl">
            <div className="font-serif text-2xl font-bold text-white">{winter ? "Отопление до 4 500 ₽/мес" : "Дом «дышит»"}</div>
            <p className="mt-3 text-xs font-light leading-relaxed text-zinc-300">{winter ? "Класс А+, утепление 200 мм, никаких мостиков холода: дом держит тепло как термос." : "Обязательные вентзазоры не дают появиться плесени, а окна ПВХ с двухкамерным стеклопакетом защищают от жары."}</p>
          </div>
        </div>
        <p className="mt-4 text-[11px] font-light text-zinc-500">Зимний вид — стилизация летнего фото.</p>
      </div>
    </section>
  );
}


function Escrow({ onOpenConsult }) {
  return (
    <section id="escrow" className="relative overflow-hidden border-t border-white/5 bg-noir-900 py-28">
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">Безопасная сделка</div>
          <h2 className="mb-5 font-serif text-3xl font-bold text-white sm:text-5xl">Ваши деньги в безопасности до сдачи дома</h2>
          <p className="text-sm font-light leading-relaxed text-zinc-300">Оплата идёт через эскроу-счёт, а смета зафиксирована в договоре. Вам не нужно рисковать предоплатой.</p>
        </div>
        <div className="relative grid gap-6 md:grid-cols-4">
          <div className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent md:block" />
          {ESCROW.map(([t, d], i) => (
            <div key={t} className="relative rounded-2xl border border-white/10 bg-zinc-950/60 p-8 backdrop-blur-xl transition duration-500 hover:border-amber-400/30">
              <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-noir-900 font-serif text-xl font-bold gold-text">{i + 1}</div>
              <h3 className="mb-3 font-serif text-xl font-bold text-white">{t}</h3>
              <p className="text-xs font-light leading-relaxed text-zinc-400">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button onClick={onOpenConsult} className="rounded-full gold-gradient px-8 py-4 text-xs font-extrabold uppercase tracking-widest text-noir-900 transition duration-300 hover:scale-105">Уточнить условия сделки</button>
        </div>
      </div>
    </section>
  );
}

function Tech({ onOpenConsult }) {
  const proofs = [
    ["Тест герметичности Blower Door","Дом закрывается, вентилятор в дверном проёме создаёт перепад давления, и приборы показывают, где контур пропускает воздух. Проверяем до отделки, когда щели ещё можно устранить."],
    ["Тепловизионный аудит","Тепловизор в мороз показывает мостики холода в стыках каркаса, кровле и окнах. Перекрестное утепление 200 мм должно давать ровную картину без тёплых пятен."],
    ["Контроль материалов на объекте","Влагомер для доски камерной сушки, лазерный нивелир для стен, проверка проклейки мембран скотчем Delta на каждом этапе."],
  ];
  return (
    <section id="tech" className="relative overflow-hidden border-t border-white/5 bg-noir-800 py-28">
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">Технологии и контроль качества</div>
          <h2 className="mb-6 font-serif text-3xl font-bold text-white sm:text-5xl">Мы доказываем тепло приборами</h2>
          <p className="text-sm font-light leading-relaxed text-zinc-300 sm:text-base">Класс А+, отопление зимой до 4 500 ₽/мес, перекрестное утепление 200 мм без мостиков холода. Картинки в интернете у всех красивые, поэтому показываем измерения и приглашаем на стройку.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {proofs.map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-zinc-950/60 p-10 backdrop-blur-xl transition duration-500 hover:border-amber-400/30">
              <div className="mb-6 h-px w-10 bg-gold" />
              <h3 className="mb-4 font-serif text-xl font-bold text-white">{t}</h3>
              <p className="text-xs font-light leading-relaxed text-zinc-400">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[["Москва","м. Проспект Мира, Слесарный пер., д. 3","Показ строящихся объектов и офис"],["Казань","Строящиеся объекты в Татарстане","Показ по предварительной записи"]].map(([c, a, n]) => (
            <div key={c} className="rounded-2xl border border-gold/30 bg-white/5 p-10 backdrop-blur-xl">
              <div className="font-serif text-2xl font-bold text-white">{c}</div>
              <p className="mt-3 text-sm text-zinc-300">{a}</p>
              <p className="mt-1 text-xs font-light text-gold-light">{n}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <button onClick={onOpenConsult} className="rounded-full gold-gradient px-8 py-4 text-xs font-extrabold uppercase tracking-widest text-noir-900 transition duration-300 hover:scale-105">Записаться на экскурсию на объект</button>
        </div>
      </div>
    </section>
  );
}


function Quiz({ onPolicy }) {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [agree, setAgree] = useState(false);
  const [sent, setSent] = useState(false);
  const total = QUIZ.length + 1;
  const pick = (v) => { const a = [...ans]; a[step] = v; setAns(a); setStep(step + 1); };
  const ok = name.trim().length > 1 && (contact.replace(/\D/g, "").length >= 10 || contact.includes("@")) && agree;
  const send = () => {
    const payload = { source: "quiz", name, contact, answers: QUIZ.map((x, i) => ({ q: x.k, a: ans[i] })) };
    try { if (window.VR_SUBMIT) window.VR_SUBMIT(payload); } catch (e) {}
    setSent(true);
  };
  const restart = () => { setStep(0); setAns([]); setSent(false); setAgree(false); };
  const field = "w-full rounded-xl border border-white/10 bg-noir-700 px-5 py-3.5 text-sm text-white placeholder:text-zinc-500 focus:border-gold focus:outline-none";
  return (
    <section id="quiz" className="relative overflow-hidden border-t border-white/5 bg-noir-800 py-28">
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">Подбор за 1 минуту</div>
          <h2 className="mb-6 font-serif text-3xl font-bold text-white sm:text-5xl">Узнайте стоимость вашего идеального дома</h2>
          <p className="mb-8 text-sm font-light leading-relaxed text-zinc-300">Ответьте на четыре вопроса. Пришлём каталог проектов 2026 и смету под ваши параметры.</p>
          <ul className="space-y-3 text-sm text-zinc-300">
            {["Каталог проектов 2026", "Смета, зафиксированная в договоре", "Расчёт ипотеки от брокера"].map(t => <li key={t} className="flex items-center gap-3"><span className="h-px w-8 bg-gold" />{t}</li>)}
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-8 backdrop-blur-xl sm:p-12 lg:col-span-3">
          {sent ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full gold-gradient text-2xl font-bold text-noir-900">✓</div>
              <h3 className="mb-3 font-serif text-2xl font-bold text-white">Готово, {name}!</h3>
              <p className="mx-auto max-w-sm text-xs font-light leading-relaxed text-zinc-400">Отправим каталог и смету на {contact}. Ваши ответы уже у менеджера: {ans.filter(Boolean).join(" · ")}.</p>
              <button onClick={restart} className="mt-8 text-xs text-gold-light underline underline-offset-4">Пройти заново</button>
            </div>
          ) : (
            <div>
              <div className="mb-2 flex justify-between text-[10px] uppercase tracking-widest text-zinc-500"><span>Шаг {step + 1} из {total}</span>{step > 0 && <button onClick={() => setStep(step - 1)} className="text-zinc-300 hover:text-gold-light">← Назад</button>}</div>
              <div className="mb-10 h-px w-full bg-white/10"><div className="h-px bg-gold transition-all duration-500" style={{ width: ((step + 1) / total * 100) + "%" }} /></div>
              {step < QUIZ.length ? (
                <div key={step}>
                  <h3 className="mb-8 font-serif text-2xl font-bold text-white sm:text-3xl">{QUIZ[step].q}</h3>
                  <div className="grid gap-3">
                    {QUIZ[step].o.map(o => <button key={o} onClick={() => pick(o)} className={`rounded-xl border px-6 py-5 text-left text-sm transition duration-300 ${ans[step] === o ? "border-gold bg-gold/10 text-white" : "border-white/10 text-zinc-300 hover:border-amber-400/30 hover:bg-white/5"}`}>{o}</button>)}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="mb-3 font-serif text-2xl font-bold text-white sm:text-3xl">Куда отправить расчёт?</h3>
                  <p className="mb-8 text-xs font-light text-zinc-400">Каталог проектов 2026 и смета придут на указанный контакт.</p>
                  <div className="space-y-4">
                    <input type="text" placeholder="Ваше имя" value={name} onChange={e => setName(e.target.value)} className={field} />
                    <input type="text" placeholder="Телефон или e-mail" value={contact} onChange={e => setContact(e.target.value)} className={field} />
                    <label className="flex cursor-pointer items-start gap-3 text-[11px] font-light leading-snug text-zinc-400">
                      <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0" style={{ accentColor: "#C5A059" }} />
                      <span>Я согласен на обработку персональных данных в соответствии с 152-ФЗ и <button type="button" onClick={onPolicy} className="text-gold-light underline underline-offset-2">политикой конфиденциальности</button>.</span>
                    </label>
                    <button disabled={!ok} onClick={send} className="w-full rounded-xl gold-gradient py-4 text-xs font-extrabold uppercase tracking-widest text-noir-900 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">Получить материалы</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Modal({ isOpen, onClose, title, project, onPolicy, summary = [] }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [sent, setSent] = useState(false);
  useEffect(() => { if (isOpen) setSent(false); }, [isOpen]);
  if (!isOpen) return null;
  const ok = name.trim().length > 1 && phone.replace(/\D/g, "").length >= 10 && agree;
  const field = "w-full rounded-xl border border-white/10 bg-noir-700 px-5 py-3.5 text-sm text-white placeholder:text-zinc-500 focus:border-gold focus:outline-none";
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={onClose}>
      <div role="dialog" aria-modal="true" className="relative w-full max-w-md rounded-3xl border border-gold/40 bg-noir-800 p-8 sm:p-10" onClick={e => e.stopPropagation()}>
        <button aria-label="Закрыть" onClick={onClose} className="absolute right-6 top-6 text-xl text-zinc-400 hover:text-white">✕</button>
        {sent ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full gold-gradient text-2xl font-bold text-noir-900">✓</div>
            <h3 className="mb-3 font-serif text-2xl font-bold text-white">Заявка принята</h3>
            <p className="text-xs font-light leading-relaxed text-zinc-400">Спасибо, {name}! Ипотечный брокер свяжется с вами по номеру {phone} в течение 15 минут.{summary.length > 0 ? " Выбранный проект и расчёт уже у него." : ""}</p>
            <button onClick={onClose} className="mt-8 rounded-full gold-gradient px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-noir-900">Закрыть</button>
          </div>
        ) : (
          <div>
            <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gold">Важное Решение</div>
            <h3 className="mb-4 font-serif text-2xl font-bold text-white">{project ? "Смета и планировка: " + project.name : title || "Консультация ипотечного брокера"}</h3>
            <p className="mb-8 text-xs font-light text-zinc-400">Оставьте контакты. Пришлём смету и проверим одобрение по льготной ипотеке.</p>
            {summary.length > 0 && (
              <div className="mb-6 rounded-xl border border-gold/30 bg-white/5 p-4 text-[11px] font-light leading-relaxed text-zinc-300">
                <div className="mb-1 font-bold uppercase tracking-wider text-gold-light">Передадим брокеру</div>
                {summary.map((t, i) => <div key={i}>{t}</div>)}
              </div>
            )}
            <div className="space-y-4">
              <input type="text" placeholder="Ваше имя" value={name} onChange={e => setName(e.target.value)} className={field} />
              <input type="tel" inputMode="tel" placeholder="+7 (___) ___-__-__" value={phone} onChange={e => setPhone(e.target.value)} className={field} />
              <label className="flex cursor-pointer items-start gap-3 text-[11px] font-light leading-snug text-zinc-400">
                <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0" style={{ accentColor: "#C5A059" }} />
                <span>Я согласен на обработку персональных данных в соответствии с 152-ФЗ и <button type="button" onClick={onPolicy} className="text-gold-light underline underline-offset-2">политикой конфиденциальности</button>.</span>
              </label>
              <button disabled={!ok} onClick={() => { const payload = { source: "modal", name, phone, summary }; try { if (window.VR_SUBMIT) window.VR_SUBMIT(payload); } catch (e) {} setSent(true); }} className="w-full rounded-xl gold-gradient py-4 text-xs font-extrabold uppercase tracking-widest text-noir-900 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">Получить расчет условий</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PolicyModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm" onClick={onClose}>
      <div role="dialog" aria-modal="true" className="relative flex max-h-[85vh] w-full max-w-2xl flex-col rounded-3xl border border-white/10 bg-noir-800" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">
          <h3 className="font-serif text-2xl font-bold text-white">Политика конфиденциальности</h3>
          <button aria-label="Закрыть" onClick={onClose} className="text-xl text-zinc-400 hover:text-white">✕</button>
        </div>
        <div className="space-y-6 overflow-y-auto px-8 py-8">
          {POLICY.map(([h, t]) => <div key={h}><h4 className="mb-2 text-sm font-bold text-gold-light">{h}</h4><p className="text-xs font-light leading-relaxed text-zinc-300">{t}</p></div>)}
        </div>
      </div>
    </div>
  );
}

function CookieBar() {
  const [show, setShow] = useState(true);
  useEffect(() => { try { if (localStorage.getItem("vr-cookie") === "1") setShow(false); } catch (e) {} }, []);
  if (!show) return null;
  const accept = () => { try { localStorage.setItem("vr-cookie", "1"); } catch (e) {} setShow(false); };
  return (
    <div className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-3xl rounded-2xl border border-white/10 bg-zinc-950/80 p-5 backdrop-blur-xl sm:flex sm:items-center sm:justify-between sm:gap-6" style={{ marginBottom: "env(safe-area-inset-bottom,0px)" }}>
      <p className="text-xs font-light leading-relaxed text-zinc-300">Мы используем файлы cookie, чтобы сайт работал корректно и мы могли улучшать его. Продолжая пользоваться сайтом, вы соглашаетесь с их использованием.</p>
      <button onClick={accept} className="mt-4 w-full shrink-0 rounded-full gold-gradient px-7 py-2.5 text-xs font-extrabold uppercase tracking-wider text-noir-900 sm:mt-0 sm:w-auto">Принять</button>
    </div>
  );
}

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [project, setProject] = useState(null);
  const [extra, setExtra] = useState(null);
  const [policy, setPolicy] = useState(false);
  const openConsult = (title = "", ex = null) => { setProject(null); setExtra(ex); setModalTitle(title); setModalOpen(true); };
  const fmt = (n) => n.toLocaleString("ru-RU");
  const summary = [];
  if (project) summary.push("Проект: " + project.name + ", " + project.area + ", от " + project.price + ", ипотека " + project.mortgage);
  if (extra && extra.calc) { const c = extra.calc; summary.push("Расчёт: " + (c.project ? c.project + ", " : "") + "стоимость " + fmt(c.cost) + " ₽, взнос " + c.downPercent + "% (" + fmt(c.downPayment) + " ₽), ставка " + c.rate + "%, " + c.years + " лет, платёж " + fmt(c.monthlyPayment) + " ₽/мес"); }
  return (
    <div>
      <Header onOpenConsult={() => openConsult("Заказать обратный звонок")} />
      <Hero onOpenConsult={() => openConsult("Расчет стоимости и ипотеки")} />
      <Stats />
      <Projects onSelectProject={p => { setProject(p); setExtra(null); setModalOpen(true); }} />
      <Quiz onPolicy={() => setPolicy(true)} />
      <Calculator onOpenConsult={(ex) => openConsult("Одобрение ипотеки по расчету", ex)} />
      <Escrow onOpenConsult={() => openConsult("Консультация по безопасной сделке")} />
      <Specs />
      <Hotspots />
      <WallSection />
      <Seasons />
      <Tech onOpenConsult={() => openConsult("Запись на экскурсию на объект")} />
      <Footer onPolicy={() => setPolicy(true)} />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle} project={project} summary={summary} onPolicy={() => setPolicy(true)} />
      <PolicyModal isOpen={policy} onClose={() => setPolicy(false)} />
      <CookieBar />
    </div>
  );
}

export default App;
