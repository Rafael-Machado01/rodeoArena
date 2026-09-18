import { getAnimals, getTiposAnimals } from "@/actions/animals";
import { DataAnimal } from "@/components/ui/dashboard/animals/DataAnimal";
import NewAnimal from "@/components/ui/dashboard/animals/NewAnimal";
import HeaderNav from "@/components/ui/dashboard/HeaderNav";

export default async function AnimalsPage() {
  const tipoAnimals = await getTiposAnimals();
  const typedAnimals = tipoAnimals.map((t) => ({
    label: t.descricao,
    value: t.id,
  }));

  const animals = await getAnimals();
  return (
    <main className="m-3 p-2 w-full">
      <HeaderNav
        title="Animais"
        description=" Acompanhamento e estatisticas dos atletas de quatro patas."
      >
        <NewAnimal tiposAnimal={typedAnimals} />
      </HeaderNav>
      <div>
        <DataAnimal animais={animals} tipoAnimal={typedAnimals} />
      </div>
    </main>
  );
}
