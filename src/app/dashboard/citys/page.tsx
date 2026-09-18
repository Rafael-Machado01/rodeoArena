import getAllCidades, { getAllUfs } from "@/actions/citys";
import DataCity from "@/components/ui/dashboard/citys/DataCity";
import NewCity from "@/components/ui/dashboard/citys/NewCity";
import HeaderNav from "@/components/ui/dashboard/HeaderNav";

export default async function Citys() {
  const ufs = await getAllUfs();
  const ufsTyped = ufs.map((u) => ({
    label: u.descricao,
    value: u.id,
  }));
  const citys = await getAllCidades();
  return (
    <>
      <HeaderNav title="Cidades" description="Gerencie as cidades do sistema">
        <NewCity ufs={ufsTyped} />
      </HeaderNav>
      <main>
        <DataCity citys={citys} ufs={ufsTyped} />
      </main>
    </>
  );
}
