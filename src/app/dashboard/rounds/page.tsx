import { getAllAnimals } from "@/actions/animals";
import { getAllCompetitors } from "@/actions/Competitor";
import { getAllRounds } from "@/actions/round";
import HeaderNav from "@/components/ui/dashboard/HeaderNav";

import DataRound from "./DataRound";
import NewRound from "./NewRound";

export default async function Rounds() {
  const animals = (await getAllAnimals()) ?? [];
  const animalsType = animals.map((a) => ({
    label: a.nome + " " + a.tipoAnimal.descricao,
    value: a.id,
  }));
  const competitors = await getAllCompetitors();
  const competitorsType = competitors.map((c) => ({
    label: c.nome,
    value: c.id,
  }));
  const rounds = await getAllRounds();
  return (
    <main className="m-3 p-2 w-full">
      <HeaderNav
        title="Rounds"
        description="Listagem e gerenciamento de rounds do sistema"
      >
        <NewRound animals={animalsType} competitors={competitorsType} />
      </HeaderNav>
      <DataRound
        rounds={rounds}
        animals={animalsType}
        competitors={competitorsType}
      />
    </main>
  );
}
