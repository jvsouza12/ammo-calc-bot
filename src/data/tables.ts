export interface TableItem {
  item: string;
  preco: number;
  parceria: number;
  precoLabel: string;
  parceriaLabel: string;
}

export interface PercentItem {
  item: string;
  preco: string;
  parceria: string;
}

function parseValue(val: string): number {
  // Don't strip dots — they are decimal separators here (1.8K = 1800)
  const v = val.trim();
  if (v.includes('KK')) return parseFloat(v.replace('KK', '')) * 1_000_000;
  if (v.includes('K')) return parseFloat(v.replace('K', '')) * 1_000;
  return parseFloat(v);
}

function makeItem(item: string, preco: string, parceria: string): TableItem {
  return { item, preco: parseValue(preco), parceria: parseValue(parceria), precoLabel: preco, parceriaLabel: parceria };
}

export const armas: TableItem[] = [
  makeItem("Glock", "380K", "280K"),
  makeItem("Tec 9", "450K", "350K"),
  makeItem("Five", "450K", "350K"),
  makeItem("MP-5", "600K", "500K"),
  makeItem("AK MK2", "750K", "650K"),
  makeItem("MTAR", "780K", "720K"),
  makeItem("Carabina MK2", "980K", "900K"),
  makeItem("G-36", "1.1KK", "1KK"),
];

export const municao: TableItem[] = [
  makeItem("Glock", "1.8K", "1.6K"),
  makeItem("Tec 9", "2.2K", "2K"),
  makeItem("Five", "2.5K", "2.3K"),
  makeItem("MP-5", "2.5K", "2.3K"),
  makeItem("AK MK2", "2.6K", "2.4K"),
  makeItem("MTAR", "2.8K", "2.6K"),
  makeItem("Carabina MK2", "3K", "2.9K"),
  makeItem("G-36", "3.3K", "3K"),
];

export const lavagem: TableItem[] = [
  makeItem("Capuz", "50K", "40K"),
  makeItem("Corda", "50K", "40K"),
  makeItem("C4", "40K", "20K"),
  makeItem("Ticket", "50K", "40K"),
  makeItem("Algema", "50K", "40K"),
  makeItem("Prego", "230K", "200K"),
  makeItem("Colete", "450K", "350K"),
  makeItem("Mochila", "1.2KK", "1KK"),
  makeItem("Identidade Falsa", "10KK", "7KK"),
];

export const lavagemPercent: PercentItem = {
  item: "Lavagem",
  preco: "40%",
  parceria: "35%",
};

export const desmanche: TableItem[] = [
  makeItem("Lockpick", "80K", "40K"),
  makeItem("Alicate", "600K", "500K"),
  makeItem("Masterpick", "2.2KK", "1.5KK"),
];

export const desmanchemPercent: PercentItem = {
  item: "Desmanche",
  preco: "60%/40%",
  parceria: "50%/50%",
};

export const drogas: TableItem[] = [
  makeItem("Maconha", "5K", "4K"),
  makeItem("Metanfe/Tamina", "5K", "4K"),
  makeItem("Balinha", "5K", "4K"),
  makeItem("Heroína", "5K", "4K"),
  makeItem("Cocaína", "5K", "4K"),
];

export function formatNumber(n: number): string {
  if (n >= 1_000_000) {
    const val = n / 1_000_000;
    const str = val % 1 === 0 ? val.toFixed(0) : val.toFixed(1).replace('.', ',');
    return str + 'KK';
  }
  if (n >= 1_000) {
    const val = n / 1_000;
    const str = val % 1 === 0 ? val.toFixed(0) : val.toFixed(1).replace('.', ',');
    return str + 'K';
  }
  return n.toLocaleString('pt-BR');
}
