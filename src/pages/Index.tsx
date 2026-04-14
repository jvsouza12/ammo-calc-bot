import PriceTable from "@/components/PriceTable";
import Calculator from "@/components/Calculator";
import MuniCalculator from "@/components/MuniCalculator";
import {
  armas,
  municao,
  lavagem,
  lavagemPercent,
  desmanche,
  desmanchemPercent,
  drogas,
} from "@/data/tables";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-display text-3xl md:text-4xl text-primary neon-text tracking-widest">
            TABELAS BRASIL RP
          </h1>
          <span className="text-xs text-muted-foreground">
            FAC MUNIÇÃO
          </span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Calculator */}
        <Calculator />

        {/* Muni → Arma auto table */}
        <MuniCalculator />

        {/* Price Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PriceTable title="ARMAS" items={armas} />
          <PriceTable title="MUNIÇÃO" items={municao} />
          <PriceTable title="LAVAGEM" items={lavagem} percentInfo={lavagemPercent} />
          <PriceTable title="DESMANCHE" items={desmanche} percentInfo={desmanchemPercent} />
        </div>

        <div className="max-w-lg mx-auto">
          <PriceTable title="DROGAS" items={drogas} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            Desenvolvido por <span className="text-primary font-bold neon-text">Modesto</span>
          </p>
          <p className="text-muted-foreground/50 text-xs mt-1">Brasil RP — Tabelas de Preços</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
