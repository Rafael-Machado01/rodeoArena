import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.$transaction([
    prisma.round.deleteMany(),
    prisma.competidor.deleteMany(),
    prisma.animal.deleteMany(),
    prisma.cidade.deleteMany(),
    prisma.estado.deleteMany(),
    prisma.tipoAnimal.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const sp = await prisma.estado.create({ data: { descricao: "São Paulo" } });

  const cidadeNames = [
    "Assis",
    "Cândido Mota",
    "Palmital",
    "Maracaí",
    "Paraguaçu Paulista",
    "Quatá",
    "Tarumã",
    "Florínea",
    "Ibirarema",
    "Pedrinhas Paulista",
  ];
  const cidades = [];
  for (const nome of cidadeNames) {
    cidades.push(
      await prisma.cidade.create({
        data: { descricao: nome, estadoId: sp.id },
      }),
    );
  }

  const touro = await prisma.tipoAnimal.create({
    data: { descricao: "Touro" },
  });
  const boi = await prisma.tipoAnimal.create({ data: { descricao: "Boi" } });
  const cavalo = await prisma.tipoAnimal.create({
    data: { descricao: "Cavalo" },
  });
  const tipos = [touro.id, boi.id, cavalo.id];

  const animalData = [
    { nome: "Trovão Vermelho", tipo: 0 },
    { nome: "Furacão", tipo: 0 },
    { nome: "Terror do Sertão", tipo: 1 },
    { nome: "Bala de Prata", tipo: 0 },
    { nome: "Majestoso", tipo: 2 },
    { nome: "Punhal", tipo: 0 },
    { nome: "Relâmpago", tipo: 1 },
    { nome: "Jaguar", tipo: 0 },
    { nome: "Tempestade", tipo: 1 },
    { nome: "Sombra Negra", tipo: 0 },
  ];
  const animais = [];
  for (let i = 0; i < animalData.length; i++) {
    animais.push(
      await prisma.animal.create({
        data: {
          nome: animalData[i].nome,
          tipoAnimalId: tipos[animalData[i].tipo],
          imageUrl: `/seed/animal-${i + 1}.jpg`,
        },
      }),
    );
  }

  const competidorData = [
    { nome: "José Pereira", idade: 27, vitorias: 12 },
    { nome: "Rafael Souza", idade: 24, vitorias: 8 },
    { nome: "Bruno Almeida", idade: 31, vitorias: 18 },
    { nome: "Marcos Vinícius", idade: 22, vitorias: 5 },
    { nome: "Thiago Lima", idade: 29, vitorias: 15 },
    { nome: "Carlos Eduardo", idade: 26, vitorias: 10 },
    { nome: "André Santos", idade: 33, vitorias: 22 },
    { nome: "Lucas Ferreira", idade: 20, vitorias: 4 },
    { nome: "Pedro Henrique", idade: 28, vitorias: 14 },
    { nome: "Gustavo Rocha", idade: 25, vitorias: 9 },
  ];
  const competidores = [];
  for (let i = 0; i < competidorData.length; i++) {
    competidores.push(
      await prisma.competidor.create({
        data: {
          nome: competidorData[i].nome,
          idade: competidorData[i].idade,
          vitorias: competidorData[i].vitorias,
          cidadeId: cidades[i % cidades.length].id,
          imageUrl: `/seed/competidor-${i + 1}.jpg`,
        },
      }),
    );
  }

  const datas = [
    "2026-06-14",
    "2026-06-21",
    "2026-06-28",
    "2026-07-05",
    "2026-07-12",
    "2026-07-19",
    "2026-07-26",
    "2026-08-02",
    "2026-08-09",
    "2026-08-16",
    "2026-08-23",
    "2026-08-30",
    "2026-09-06",
    "2026-09-13",
    "2026-09-17",
    "2026-09-20",
  ];
  for (let i = 0; i < 20; i++) {
    const animal = animais[i % animais.length];
    const competidor = competidores[(i * 7 + 3) % competidores.length];
    await prisma.round.create({
      data: {
        animalId: animal.id,
        competidorId: competidor.id,
        data: datas[i % datas.length],
        notaAnimal: String(78 + ((i * 13) % 22)),
        notaCompetidor: String(80 + ((i * 17) % 20)),
        penalidade: String((i * 3) % 9),
      },
    });
  }

  const [rounds] = await Promise.all([
    prisma.round.count(),
    prisma.competidor.count(),
    prisma.animal.count(),
    prisma.cidade.count(),
  ]);

  console.log("Seed concluído:");
  console.log("  Estados:", 1);
  console.log("  Cidades:", cidades.length);
  console.log("  Tipos de animal:", tipos.length);
  console.log("  Animais:", animais.length);
  console.log("  Competidores:", competidores.length);
  console.log("  Rounds:", rounds);
  console.log("  Usuários: 0");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });