import { useState, useMemo } from "react";
import { armas, municao, lavagem, desmanche, drogas, formatNumber } from "@/data/tables";

type PriceType = "preco" | "parceria";

const allCategories = [
  { label: "Munição", items: municao, icon: "🔫" },
  { label: "Armas", items: armas, icon: "💣" },
  { label: "Lavagem", items: lavagem, icon: "💰" },
  { label: "Desmanche", items: desmanche, icon: "🔧" },
  { label: "Drogas", items: drogas, icon: "💊" },
];

const Calculator = () => {
  const [sourceCategory, setSourceCategory] = useState("Munição");
  const [sourceItem, setSourceItem] = useState("Glock");
  const [targetCategory, setTargetCategory] = useState("Armas");
  const [targetItem, setTargetItem] = useState("Glock");
  const [priceType, setPriceType] = useState<PriceType>("preco");
  const [quantity, setQuantity] = useState(1);

  const sourceItems = allCategories.find(c => c.label === sourceCategory)?.items || [];
  const targetItems = allCategories.find(c => c.label === targetCategory)?.items || [];

  const source = sourceItems.find(i => i.item === sourceItem);
  const target = targetItems.find(i => i.item === targetItem);

  const result = useMemo(() => {
    if (!source || !target) return null;
    const sourceVal = priceType === "preco" ? source.preco : source.parceria;
    const targetVal = priceType === "preco" ? target.preco : target.parceria;
    if (sourceVal === 0) return null;
    const needed = Math.ceil((targetVal * quantity) / sourceVal);
    const totalSource = needed * sourceVal;
    const totalTarget = targetVal * quantity;
    return { needed, totalSource, totalTarget };
  }, [source, target, priceType, quantity]);

  const handleSourceCat = (cat: string) => {
    setSourceCategory(cat);
    const items = allCategories.find(c => c.label === cat)?.items || [];
    if (items.length) setSourceItem(items[0].item);
  };
  const handleTargetCat = (cat: string) => {
    setTargetCategory(cat);
    const items = allCategories.find(c => c.label === cat)?.items || [];
    if (items.length) setTargetItem(items[0].item);
  };

  return (
    <div className="glass rounded-2xl p-6 md:p-8 neon-glow-strong">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-extrabold text-2xl md:text-3xl tracking-tight">
            Calculadora
          </h3>
          <p className="text-muted-foreground text-sm mt-1">Calcule trocas entre qualquer item</p>
        </div>
        <div className="flex bg-secondary rounded-xl p-1 gap-1">
          {(["preco", "parceria"] as const).map(t => (
            <button
              key={t}
              onClick={() => setPriceType(t)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                priceType === t
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "preco" ? "Preço" : "Parceria"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-end">
        {/* Source */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Tenho / Quero usar</label>
          <select
            value={sourceCategory}
            onChange={e => handleSourceCat(e.target.value)}
            className="w-full bg-secondary/80 text-foreground rounded-xl px-4 py-3 text-sm font-semibold border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          >
            {allCategories.map(c => <option key={c.label} value={c.label}>{c.icon} {c.label}</option>)}
          </select>
          <select
            value={sourceItem}
            onChange={e => setSourceItem(e.target.value)}
            className="w-full bg-secondary/80 text-foreground rounded-xl px-4 py-3 text-sm font-semibold border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          >
            {sourceItems.map(i => (
              <option key={i.item} value={i.item}>
                {i.item} — {priceType === "preco" ? i.precoLabel : i.parceriaLabel}
              </option>
            ))}
          </select>
          {source && (
            <p className="text-xs text-muted-foreground">
              Unitário: <span className="text-primary font-mono font-bold">{formatNumber(priceType === "preco" ? source.preco : source.parceria)}</span>
            </p>
          )}
        </div>

        {/* Arrow */}
        <div className="hidden md:flex items-center justify-center text-primary text-3xl pb-6">
          →
        </div>

        {/* Target */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Quero comprar</label>
          <select
            value={targetCategory}
            onChange={e => handleTargetCat(e.target.value)}
            className="w-full bg-secondary/80 text-foreground rounded-xl px-4 py-3 text-sm font-semibold border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          >
            {allCategories.map(c => <option key={c.label} value={c.label}>{c.icon} {c.label}</option>)}
          </select>
          <select
            value={targetItem}
            onChange={e => setTargetItem(e.target.value)}
            className="w-full bg-secondary/80 text-foreground rounded-xl px-4 py-3 text-sm font-semibold border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          >
            {targetItems.map(i => (
              <option key={i.item} value={i.item}>
                {i.item} — {priceType === "preco" ? i.precoLabel : i.parceriaLabel}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-3">
            <label className="text-xs text-muted-foreground font-medium">Qtd:</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-24 bg-secondary/80 text-foreground rounded-xl px-4 py-3 text-sm font-mono border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Result */}
      {result && source && target && (
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 text-center">
          <p className="text-sm text-muted-foreground">
            Para comprar <span className="text-foreground font-bold">{quantity}x {target.item}</span>
          </p>
          <p className="text-4xl md:text-5xl font-extrabold text-primary neon-text mt-3 tracking-tight">
            {result.needed.toLocaleString('pt-BR')}x {source.item}
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
            <span>Custo: <span className="text-foreground font-mono">{formatNumber(result.totalTarget)}</span></span>
            <span className="h-3 w-px bg-border" />
            <span>Total em {source.item}: <span className="text-foreground font-mono">{formatNumber(result.totalSource)}</span></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;
