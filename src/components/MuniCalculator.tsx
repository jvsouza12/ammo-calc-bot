import { useState, useMemo } from "react";
import { armas, municao, formatNumber } from "@/data/tables";

type PriceType = "preco" | "parceria";

const MuniCalculator = () => {
  const [priceType, setPriceType] = useState<PriceType>("preco");

  const rows = useMemo(() => {
    return armas.map((arma) => {
      const muni = municao.find(m => m.item === arma.item);
      if (!muni) return null;
      const armaVal = priceType === "preco" ? arma.preco : arma.parceria;
      const muniVal = priceType === "preco" ? muni.preco : muni.parceria;
      const qtd = Math.ceil(armaVal / muniVal);
      return {
        item: arma.item,
        armaVal,
        muniVal,
        qtd,
        totalMuni: qtd * muniVal,
      };
    }).filter(Boolean);
  }, [priceType]);

  return (
    <div className="rounded-lg border border-primary/30 bg-card overflow-hidden neon-border">
      <div className="bg-primary/10 border-b border-primary/30 px-4 py-3 flex items-center justify-between">
        <h3 className="font-display text-2xl tracking-wider text-primary neon-text">
          MUNIÇÃO → ARMA (AUTOMÁTICO)
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setPriceType("preco")}
            className={`px-3 py-1 rounded text-xs font-bold transition-all ${priceType === "preco" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
          >
            PREÇO
          </button>
          <button
            onClick={() => setPriceType("parceria")}
            className={`px-3 py-1 rounded text-xs font-bold transition-all ${priceType === "parceria" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
          >
            PARCERIA
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-2 text-left text-muted-foreground font-semibold">ARMA</th>
              <th className="px-4 py-2 text-right text-muted-foreground font-semibold">PREÇO ARMA</th>
              <th className="px-4 py-2 text-right text-muted-foreground font-semibold">PREÇO MUNI</th>
              <th className="px-4 py-2 text-right text-primary font-bold">QTD MUNI</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row: any) => (
              <tr key={row.item} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-2 font-bold">{row.item}</td>
                <td className="px-4 py-2 text-right font-mono">{formatNumber(row.armaVal)}</td>
                <td className="px-4 py-2 text-right font-mono">{formatNumber(row.muniVal)}</td>
                <td className="px-4 py-2 text-right font-mono text-primary font-bold text-lg">{row.qtd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MuniCalculator;
