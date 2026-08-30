interface WhatsCardsContentType {
  id: number;
  src: string;
  title: string;
  description: string;
}

export const WhatsCardsContent: WhatsCardsContentType[] = [
  {
    id: 1,
    src: "/config.svg",
    title: "Gestão Completa",
    description:
      "Controle absoluto sobre inscrições, sorterios de touros, notas dos juízes e cronômetro de 8 segundos em tempo real.",
  },
  {
    id: 2,
    src: "/trophy.svg",
    title: "Ranking Inteligente",
    description:
      "Tabelas atualizadas automaticamente por competições com cálculo de médias, melhores notas e índice de paradas.",
  },
  {
    id: 3,
    src: "/calc.svg",
    title: "Simulação Realista",
    description:
      "Simule montarias com probabilidades reais calculadas pelo histórico de desempenho de cada competidor e animal.",
  },
];
