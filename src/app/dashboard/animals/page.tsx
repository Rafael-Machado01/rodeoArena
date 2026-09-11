import NewAnimal from "@/components/ui/dashboard/animals/NewAnimal";
import { getTiposAnimals, getAnimals } from "@/actions/animals";
import { DataAnimal } from "@/components/ui/dashboard/animals/DataAnimal";

export default async function AnimalsPage() {
  const tipoAnimals = await getTiposAnimals();
  const typedAnimals = tipoAnimals.map((t) => ({
    label: t.descricao,
    value: t.id,
  }));

  const animals = await getAnimals();
  return (
    <main className="m-3 p-2 flex justify-between items-center gap-4">
      <div>
        <h1 className="text-text font-bold font-heading text-2xl">Animais</h1>
        <p className="text-text-muted">
          Acompanhamento e estatisticas dos atletas de quatro patas.
        </p>
      </div>
      <NewAnimal tipoAnimal={typedAnimals} />
      <div>
        <DataAnimal animais={animals} tipoAnimal={typedAnimals} />
      </div>
    </main>
  );
}
