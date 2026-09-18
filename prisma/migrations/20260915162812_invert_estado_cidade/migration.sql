/*
  Warnings:

  - You are about to drop the column `cidadeId` on the `Estado` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Estado" DROP CONSTRAINT "Estado_cidadeId_fkey";

-- AlterTable
ALTER TABLE "Cidade" ADD COLUMN     "estadoId" TEXT;

-- AlterTable
ALTER TABLE "Estado" DROP COLUMN "cidadeId";

-- AddForeignKey
ALTER TABLE "Cidade" ADD CONSTRAINT "Cidade_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "Estado"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Seed: 27 estados do Brasil (UFs)
INSERT INTO "Estado" ("id", "descricao") VALUES
  ('est-AC', 'AC'),
  ('est-AL', 'AL'),
  ('est-AP', 'AP'),
  ('est-AM', 'AM'),
  ('est-BA', 'BA'),
  ('est-CE', 'CE'),
  ('est-DF', 'DF'),
  ('est-ES', 'ES'),
  ('est-GO', 'GO'),
  ('est-MA', 'MA'),
  ('est-MT', 'MT'),
  ('est-MS', 'MS'),
  ('est-MG', 'MG'),
  ('est-PA', 'PA'),
  ('est-PB', 'PB'),
  ('est-PR', 'PR'),
  ('est-PE', 'PE'),
  ('est-PI', 'PI'),
  ('est-RJ', 'RJ'),
  ('est-RN', 'RN'),
  ('est-RS', 'RS'),
  ('est-RO', 'RO'),
  ('est-RR', 'RR'),
  ('est-SC', 'SC'),
  ('est-SP', 'SP'),
  ('est-SE', 'SE'),
  ('est-TO', 'TO')
ON CONFLICT ("id") DO NOTHING;
