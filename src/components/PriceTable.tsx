import { TableItem } from "@/data/tables";

interface PriceTableProps {
  title: string;
  items: TableItem[];
  percentInfo?: { item: string; preco: string; parceria: string };
}

const PriceTable = ({ title, items, percentInfo }: PriceTableProps) => {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden neon-border">
      <div className="bg-primary/10 border-b border-primary/30 px-4 py-3">
        <h3 className="font-display text-2xl tracking-wider text-primary neon-text">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-2 text-left font-semibold text-muted-foreground">UNI</th>
              <th className="px-4 py-2 text-left font-semibold text-muted-foreground">ITEM</th>
              <th className="px-4 py-2 text-right font-semibold text-muted-foreground">PREÇO</th>
              <th className="px-4 py-2 text-right font-semibold text-muted-foreground">PARCERIA</th>
            </tr>
          </thead>
          <tbody>
            {percentInfo && (
              <tr className="border-b border-border/50 bg-primary/5">
                <td className="px-4 py-2 text-center">1</td>
                <td className="px-4 py-2 font-bold text-primary">{percentInfo.item}</td>
                <td className="px-4 py-2 text-right font-mono">{percentInfo.preco}</td>
                <td className="px-4 py-2 text-right font-mono">{percentInfo.parceria}</td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item.item} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-2 text-center">1</td>
                <td className="px-4 py-2 font-bold">{item.item}</td>
                <td className="px-4 py-2 text-right font-mono text-primary">{item.precoLabel}</td>
                <td className="px-4 py-2 text-right font-mono text-primary">{item.parceriaLabel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceTable;
