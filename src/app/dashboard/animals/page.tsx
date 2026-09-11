import NewAnimal from "@/components/ui/dashboard/animals/NewAnimal";
import { getTiposAnimals } from "@/actions/animals";

export default async function AnimalsPage() {
  const tipoAnimais = await getTiposAnimals();
  const typedAnimais = tipoAnimais.map((t) => ({
    label: t.descricao,
    value: t.id,
  }));
  return (
    <main className="m-3 p-2 flex justify-between items-center gap-4">
      <div>
        <h1 className="text-text font-bold font-heading text-2xl">Animais</h1>
        <p className="text-text-muted">
          Acompanhamento e estatisticas dos atletas de quatro patas.
        </p>
      </div>
      <NewAnimal tipoAnimal={typedAnimais} />
    </main>
  );
}
