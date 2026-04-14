import { useState, useMemo } from "react";
import { armas, municao, formatNumber } from "@/data/tables";
import { useInView } from "@/hooks/use-in-view";

type PriceType = "preco" | "parceria";

const MuniCalculator = () => {
  const [priceType, setPriceType] = useState<PriceType>("preco");
  const { ref, isVisible } = useInView();

  const rows = useMemo(() => {
    return armas.map((arma) => {
      const muni = municao.find(m => m.item === arma.item);
      if (!muni) return null;
      const armaVal = priceType === "preco" ? arma.preco : arma.parceria;
      const muniVal = priceType === "preco" ? muni.preco : muni.parceria;
      const qtd = Math.ceil(armaVal / muniVal);
      return { item: arma.item, armaVal, muniVal, qtd };
    }).filter(Boolean) as { item: string; armaVal: number; muniVal: number; qtd: number }[];
  }, [priceType]);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
        transition: "opacity 0.6s ease-out 0.1s, transform 0.6s ease-out 0.1s",
      }}
      className="glass rounded-2xl overflow-hidden neon-glow"
    >
      <div className="px-5 py-4 flex items-center justify-between border-b border-border/50">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚡</span>
          <div>
            <h3 className="font-extrabold text-lg tracking-wide uppercase">Munição → Arma</h3>
            <p className="text-xs text-muted-foreground">Cálculo automático</p>
          </div>
        </div>
        <div className="flex bg-secondary rounded-xl p-1 gap-1">
          {(["preco", "parceria"] as const).map(t => (
            <button
              key={t}
              onClick={() => setPriceType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
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
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-muted-foreground text-xs uppercase tracking-widest">
              <th className="px-5 py-3 text-left font-medium">Arma</th>
              <th className="px-5 py-3 text-right font-medium">Preço Arma</th>
              <th className="px-5 py-3 text-right font-medium">Preço Muni</th>
              <th className="px-5 py-3 text-right font-medium text-primary">Qtd Muni</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.item} className="border-t border-border/30 hover:bg-primary/5 transition-colors duration-200">
                <td className="px-5 py-3 font-semibold">{row.item}</td>
                <td className="px-5 py-3 text-right font-mono text-foreground/70">{formatNumber(row.armaVal)}</td>
                <td className="px-5 py-3 text-right font-mono text-foreground/70">{formatNumber(row.muniVal)}</td>
                <td className="px-5 py-3 text-right">
                  <span className="inline-flex items-center justify-center bg-primary/10 text-primary font-mono font-bold px-3 py-1 rounded-lg text-base">
                    {row.qtd.toLocaleString('pt-BR')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MuniCalculator;
