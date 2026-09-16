import getAllCidades from "@/actions/citys";
import { getAllCompetitors } from "@/actions/Competitor";
import DataCompetitor from "@/components/ui/dashboard/competitors/DataCompetitor";
import NewCompetitor from "@/components/ui/dashboard/competitors/NewCompetitor";

export default async function Competitors() {
  const citys = await getAllCidades();
  const citysTyped = citys.map((c) => ({
    label: c.descricao + " " + c.estado?.descricao,
    value: c.id,
  }));
  const competitors = await getAllCompetitors();
  return (
    <main className="m-3 p-2 w-full">
      <header className="flex justify-between items-center gap-4 mb-4">
        <div className="flex flex-col">
          <h1 className="text-text font-bold font-heading text-2xl">
            Competidores
          </h1>
          <p className="text-text-muted">
            Gerenciamento e ficha dos atletas da arena.
          </p>
        </div>
        <NewCompetitor citys={citysTyped} />
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {competitors.map((competitor) => (
          <DataCompetitor
            key={competitor.id}
            competitors={competitor}
            citys={citysTyped}
          />
        ))}
      </div>
    </main>
  );
}
