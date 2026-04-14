import { useState } from "react";
import PriceTable from "@/components/PriceTable";
import Calculator from "@/components/Calculator";
import MuniCalculator from "@/components/MuniCalculator";
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
              <span className="text-primary font-extrabold text-lg">B</span>
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-tight">Brasil RP</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Tabelas de Preços</p>
            </div>
          </div>

          {/* Tabs */}
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

          <span className="text-xs text-muted-foreground hidden md:block px-3 py-1.5 rounded-lg bg-secondary/80 border border-border/50">
            FAC MUNIÇÃO
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
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

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            Desenvolvido por <span className="text-primary font-bold">Modesto</span>
          </p>
          <p className="text-muted-foreground/40 text-xs mt-1">Brasil RP — 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
