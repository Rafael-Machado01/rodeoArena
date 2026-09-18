import { ArrowRight, ListOrdered, MapPinHouse, PawPrint, Trophy, UserGroup } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getAllAnimals } from "@/actions/animals";
import getAllCidades from "@/actions/citys";
import { getAllCompetitors } from "@/actions/Competitor";
import { getAllRounds } from "@/actions/round";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import getCurrentUser from "@/lib/user";

const medalColors = [
  "bg-rodeo-gold",
  "bg-rodeo-bronze",
  "bg-rodeo-warning/80",
];

export default async function Dashboard() {
  const user = await getCurrentUser();
  const competitors = await getAllCompetitors();
  const animals = (await getAllAnimals()) ?? [];
  const citys = await getAllCidades();
  const rounds = await getAllRounds();

  const firstName = user?.name?.split(" ")[0] ?? "Usuário";
  const sortedCompetitors = [...competitors]
    .sort((a, b) => b.vitorias - a.vitorias)
    .slice(0, 5);
  const latestRounds = rounds.slice(0, 6);

  const stats = [
    {
      label: "Competidores",
      value: competitors.length,
      icon: UserGroup,
      href: "/dashboard/competitors",
    },
    {
      label: "Animais",
      value: animals.length,
      icon: PawPrint,
      href: "/dashboard/animals",
    },
    {
      label: "Rounds",
      value: rounds.length,
      icon: ListOrdered,
      href: "/dashboard/rounds",
    },
    {
      label: "Cidades",
      value: citys.length,
      icon: MapPinHouse,
      href: "/dashboard/citys",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-3xl text-text">
            Bem-vindo, <span className="text-rodeo-gold">{firstName}</span>
          </h1>
          <p className="text-text-muted">
            Acompanhe a performance da sua arena em tempo real.
          </p>
        </div>
        <Link href="/dashboard/rounds">
          <Button
            size="lg"
            className="border-rodeo-gold/40 bg-rodeo-surface text-rodeo-gold hover:bg-rodeo-gold/10"
          >
            Registrar Round
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="group">
            <Card className="border-rodeo-gold/15 bg-rodeo-surface transition-all duration-300 hover:-translate-y-1 hover:border-rodeo-gold/50 hover:shadow-xl hover:shadow-rodeo-gold/10">
              <CardHeader className="gap-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-text-muted">
                    {stat.label}
                  </CardTitle>
                  <div className="rounded-lg bg-rodeo-gold/10 p-2 text-rodeo-gold transition-colors group-hover:bg-rodeo-gold/20">
                    <stat.icon className="size-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-text">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="border-rodeo-gold/15 bg-rodeo-surface lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-text">
              <Trophy className="size-5 text-rodeo-gold" />
              Ranking de Competidores
            </CardTitle>
            <CardDescription className="text-text-muted">
              Top 5 por vitórias
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {sortedCompetitors.map((competitor, index) => (
              <div
                key={competitor.id}
                className="flex items-center gap-3 rounded-lg border border-rodeo-gold/10 bg-rodeo-bg p-3"
              >
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                    medalColors[index] ?? "bg-rodeo-bronze/40"
                  }`}
                >
                  {index + 1}
                </span>
                {competitor.imageUrl ? (
                  <Image
                    src={competitor.imageUrl}
                    width={32}
                    height={32}
                    className="size-8 shrink-0 rounded-full object-cover"
                    alt={`Foto de ${competitor.nome}`}
                  />
                ) : (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-rodeo-gold/20 font-heading text-sm font-semibold text-rodeo-gold">
                    {competitor.nome.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <span className="min-w-0 flex-1 truncate text-sm text-text">
                  {competitor.nome}
                </span>
                <span className="shrink-0 rounded-full bg-rodeo-gold/15 px-2.5 py-0.5 text-xs font-semibold text-rodeo-gold">
                  {competitor.vitorias} vit.
                </span>
              </div>
            ))}
            {sortedCompetitors.length === 0 && (
              <p className="text-sm text-text-muted">
                Nenhum competidor registrado ainda.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-rodeo-gold/15 bg-rodeo-surface lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-text">
              <ListOrdered className="size-5 text-rodeo-gold" />
              Últimos Rounds
            </CardTitle>
            <CardDescription className="text-text-muted">
              Registros mais recentes da arena
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Competidor</TableHead>
                  <TableHead>Animal</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Notas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestRounds.map((round) => (
                  <TableRow key={round.id}>
                    <TableCell className="font-medium text-text">
                      {round.competidor.nome}
                    </TableCell>
                    <TableCell className="text-text-muted">
                      {round.animal.nome}
                    </TableCell>
                    <TableCell className="text-text-muted">
                      {round.data}
                    </TableCell>
                    <TableCell className="text-right text-text-muted">
                      {round.notaAnimal} / {round.notaCompetidor}
                    </TableCell>
                  </TableRow>
                ))}
                {latestRounds.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-text-muted">
                      Nenhum round registrado ainda.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}