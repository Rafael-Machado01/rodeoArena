import type { LucideIcon } from "lucide-react";
import { MonitorCog, Trophy, Calculator } from "lucide-react";
interface WhatsCardsContentType {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const WhatsCardsContent: WhatsCardsContentType[] = [
  {
    id: 1,
    icon: MonitorCog,
    title: "Gestão Completa",
    description:
      "Controle absoluto sobre inscrições, sorterios de touros, notas dos juízes e cronômetro de 8 segundos em tempo real.",
  },
  {
    id: 2,
    icon: Trophy,
    title: "Ranking Inteligente",
    description:
      "Tabelas atualizadas automaticamente por competições com cálculo de médias, melhores notas e índice de paradas.",
  },
  {
    id: 3,
    icon: Calculator,
    title: "Simulação Realista",
    description:
      "Simule montarias com probabilidades reais calculadas pelo histórico de desempenho de cada competidor e animal.",
  },
];
