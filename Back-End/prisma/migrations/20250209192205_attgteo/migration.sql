/*
  Warnings:

  - You are about to drop the `workshop_alunos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "workshop_alunos" DROP CONSTRAINT "workshop_alunos_aluno_id_fkey";

-- DropForeignKey
ALTER TABLE "workshop_alunos" DROP CONSTRAINT "workshop_alunos_workshop_id_fkey";

-- DropTable
DROP TABLE "workshop_alunos";

-- CreateTable
CREATE TABLE "StudentWorkshop" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "workshopId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentWorkshop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentWorkshop_studentId_workshopId_key" ON "StudentWorkshop"("studentId", "workshopId");

-- AddForeignKey
ALTER TABLE "StudentWorkshop" ADD CONSTRAINT "StudentWorkshop_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentWorkshop" ADD CONSTRAINT "StudentWorkshop_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "workshop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
