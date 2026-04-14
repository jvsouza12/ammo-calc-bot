import { useState } from "react";
import PriceTable from "@/components/PriceTable";
import Calculator from "@/components/Calculator";
import MuniCalculator from "@/components/MuniCalculator";
import { useInView } from "@/hooks/use-in-view";
import {
  armas, municao, lavagem, lavagemPercent,
  desmanche, desmanchemPercent, drogas,
} from "@/data/tables";

const tabs = [
  { id: "calc", label: "Calculadora", icon: "⚡" },
  { id: "tables", label: "Tabelas", icon: "📋" },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("calc");
  const { ref: heroRef, isVisible: heroVisible } = useInView();
  const { ref: footerRef, isVisible: footerVisible } = useInView();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg" style={{ animation: "float 3s ease-in-out infinite" }}>
              <span className="text-primary-foreground font-extrabold text-lg">M</span>
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-tight">Brasil RP</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">by Modesto</p>
            </div>
          </div>

          <nav className="flex bg-secondary/80 rounded-xl p-1 gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-card text-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>

          <span className="text-xs text-primary font-bold hidden md:block px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
            FAC MUNIÇÃO
          </span>
        </div>
      </header>

      {/* Hero Banner */}
      <div
        ref={heroRef}
        className={`max-w-6xl mx-auto px-4 pt-10 pb-6 opacity-0 ${heroVisible ? "animate-in" : ""}`}
      >
        <div className="glass rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Sistema de cálculo</p>
            <h2 className="font-extrabold text-4xl md:text-5xl tracking-tight">
              Tabelas <span className="text-primary" style={{ animation: "glowPulse 3s ease-in-out infinite" }}>Brasil RP</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto text-sm">
              Todas as tabelas de preços e calculadora automática para a facção de munição.
            </p>
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                5 categorias
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                30+ itens
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Cálculo automático
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 pb-8 space-y-8 relative z-10">
        {activeTab === "calc" && (
          <>
            <Calculator />
            <MuniCalculator />
          </>
        )}

        {activeTab === "tables" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PriceTable title="Armas" items={armas} icon="🔫" />
              <PriceTable title="Munição" items={municao} icon="💥" />
              <PriceTable title="Lavagem" items={lavagem} icon="💰" percentInfo={lavagemPercent} />
              <PriceTable title="Desmanche" items={desmanche} icon="🔧" percentInfo={desmanchemPercent} />
            </div>
            <div className="max-w-lg mx-auto">
              <PriceTable title="Drogas" items={drogas} icon="💊" />
            </div>
          </>
        )}
      </main>

      {/* Footer with strong Modesto branding */}
      <footer ref={footerRef} className={`border-t border-border/50 py-12 mt-12 relative opacity-0 ${footerVisible ? "animate-in" : ""}`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-primary-foreground font-extrabold text-sm">M</span>
            </div>
            <span className="font-extrabold text-2xl text-primary" style={{ animation: "glowPulse 3s ease-in-out infinite" }}>
              MODESTO
            </span>
          </div>
          <p className="text-muted-foreground text-xs">
            Desenvolvedor & Designer
          </p>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <p className="text-muted-foreground/40 text-[10px] mt-4 uppercase tracking-widest">Brasil RP — 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
