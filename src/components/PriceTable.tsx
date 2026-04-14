import { TableItem } from "@/data/tables";
import { useInView } from "@/hooks/use-in-view";

interface PriceTableProps {
  title: string;
  items: TableItem[];
  icon: string;
  percentInfo?: { item: string; preco: string; parceria: string };
}

const PriceTable = ({ title, items, icon, percentInfo }: PriceTableProps) => {
  const { ref, isVisible } = useInView();

  return (
    <div
      ref={ref}
      className={`glass rounded-2xl overflow-hidden group hover:neon-glow transition-all duration-500 opacity-0 ${isVisible ? "animate-in" : ""}`}
    >
      <div className="px-5 py-4 flex items-center gap-3 border-b border-border/50">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-extrabold text-lg tracking-wide text-foreground uppercase">{title}</h3>
        <div className="ml-auto h-2 w-2 rounded-full bg-primary animate-pulse" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-muted-foreground text-xs uppercase tracking-widest">
              <th className="px-5 py-3 text-left font-medium">Uni</th>
              <th className="px-5 py-3 text-left font-medium">Item</th>
              <th className="px-5 py-3 text-right font-medium">Preço</th>
              <th className="px-5 py-3 text-right font-medium">Parceria</th>
            </tr>
          </thead>
          <tbody>
            {percentInfo && (
              <tr className="border-t border-primary/20 bg-primary/5">
                <td className="px-5 py-3 text-center font-mono text-muted-foreground">1</td>
                <td className="px-5 py-3 font-bold text-primary">{percentInfo.item}</td>
                <td className="px-5 py-3 text-right font-mono font-semibold text-primary">{percentInfo.preco}</td>
                <td className="px-5 py-3 text-right font-mono font-semibold text-primary">{percentInfo.parceria}</td>
              </tr>
            )}
            {items.map((item, i) => (
              <tr
                key={item.item}
                className="border-t border-border/30 hover:bg-primary/5 transition-colors duration-200"
              >
                <td className="px-5 py-3 text-center font-mono text-muted-foreground text-xs">1</td>
                <td className="px-5 py-3 font-semibold">{item.item}</td>
                <td className="px-5 py-3 text-right font-mono font-semibold text-primary">{item.precoLabel}</td>
                <td className="px-5 py-3 text-right font-mono font-semibold text-foreground/70">{item.parceriaLabel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceTable;
