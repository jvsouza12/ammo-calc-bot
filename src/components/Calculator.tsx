import { useState, useMemo } from "react";
import { armas, municao, lavagem, desmanche, drogas, formatNumber, TableItem } from "@/data/tables";

type PriceType = "preco" | "parceria";

const allCategories = [
  { label: "Armas", items: armas },
  { label: "Munição", items: municao },
  { label: "Lavagem", items: lavagem },
  { label: "Desmanche", items: desmanche },
  { label: "Drogas", items: drogas },
];

// Build flat list of all items with category
const allItems = allCategories.flatMap(cat =>
  cat.items.map(item => ({ ...item, category: cat.label }))
);

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

  // Auto-select first item when category changes
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
    <div className="rounded-lg border border-primary/30 bg-card p-6 neon-border-strong">
      <h3 className="font-display text-3xl text-primary neon-text mb-6 text-center tracking-wider">
        CALCULADORA
      </h3>

      <div className="flex items-center gap-2 justify-center mb-6">
        <button
          onClick={() => setPriceType("preco")}
          className={`px-4 py-2 rounded font-bold text-sm transition-all ${priceType === "preco" ? "bg-primary text-primary-foreground neon-border" : "bg-secondary text-secondary-foreground"}`}
        >
          PREÇO NORMAL
        </button>
        <button
          onClick={() => setPriceType("parceria")}
          className={`px-4 py-2 rounded font-bold text-sm transition-all ${priceType === "parceria" ? "bg-primary text-primary-foreground neon-border" : "bg-secondary text-secondary-foreground"}`}
        >
          PARCERIA
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Source */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Tenho / Quero usar</label>
          <select
            value={sourceCategory}
            onChange={e => handleSourceCat(e.target.value)}
            className="w-full bg-secondary text-secondary-foreground rounded px-3 py-2 text-sm font-semibold border border-border focus:border-primary focus:outline-none"
          >
            {allCategories.map(c => <option key={c.label} value={c.label}>{c.label}</option>)}
          </select>
          <select
            value={sourceItem}
            onChange={e => setSourceItem(e.target.value)}
            className="w-full bg-secondary text-secondary-foreground rounded px-3 py-2 text-sm font-semibold border border-border focus:border-primary focus:outline-none"
          >
            {sourceItems.map(i => (
              <option key={i.item} value={i.item}>{i.item} — {priceType === "preco" ? i.precoLabel : i.parceriaLabel}</option>
            ))}
          </select>
          {source && (
            <div className="text-xs text-muted-foreground">
              Valor unitário: <span className="text-primary font-mono font-bold">{formatNumber(priceType === "preco" ? source.preco : source.parceria)}</span>
            </div>
          )}
        </div>

        {/* Target */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Quero comprar</label>
          <select
            value={targetCategory}
            onChange={e => handleTargetCat(e.target.value)}
            className="w-full bg-secondary text-secondary-foreground rounded px-3 py-2 text-sm font-semibold border border-border focus:border-primary focus:outline-none"
          >
            {allCategories.map(c => <option key={c.label} value={c.label}>{c.label}</option>)}
          </select>
          <select
            value={targetItem}
            onChange={e => setTargetItem(e.target.value)}
            className="w-full bg-secondary text-secondary-foreground rounded px-3 py-2 text-sm font-semibold border border-border focus:border-primary focus:outline-none"
          >
            {targetItems.map(i => (
              <option key={i.item} value={i.item}>{i.item} — {priceType === "preco" ? i.precoLabel : i.parceriaLabel}</option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <label className="text-xs text-muted-foreground">Qtd:</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 bg-secondary text-secondary-foreground rounded px-3 py-2 text-sm font-mono border border-border focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Result */}
      {result && source && target && (
        <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/30 text-center">
          <p className="text-lg font-bold">
            Para comprar <span className="text-primary">{quantity}x {target.item}</span>
          </p>
          <p className="text-3xl font-display text-primary neon-text mt-2 tracking-wider">
            {result.needed}x {source.item}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Custo total: {formatNumber(result.totalTarget)} | Valor em {source.item}: {formatNumber(result.totalSource)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Calculator;
