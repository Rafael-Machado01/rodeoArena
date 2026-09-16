/*
  Warnings:

  - You are about to drop the column `estado` on the `Cidade` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cidade" DROP COLUMN "estado";

-- CreateTable
CREATE TABLE "Estado" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "cidadeId" TEXT,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Estado" ADD CONSTRAINT "Estado_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "Cidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
