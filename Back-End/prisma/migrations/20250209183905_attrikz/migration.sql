/*
  Warnings:

  - You are about to drop the `Certificate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Certificate" DROP CONSTRAINT "Certificate_studentId_fkey";

-- DropTable
DROP TABLE "Certificate";

-- CreateTable
CREATE TABLE "workshop_alunos" (
    "id" SERIAL NOT NULL,
    "aluno_id" INTEGER NOT NULL,
    "workshop_id" INTEGER NOT NULL,

    CONSTRAINT "workshop_alunos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "workshop_alunos_aluno_id_workshop_id_key" ON "workshop_alunos"("aluno_id", "workshop_id");

-- AddForeignKey
ALTER TABLE "workshop_alunos" ADD CONSTRAINT "workshop_alunos_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workshop_alunos" ADD CONSTRAINT "workshop_alunos_workshop_id_fkey" FOREIGN KEY ("workshop_id") REFERENCES "workshop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
