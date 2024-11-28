-- CreateTable
CREATE TABLE "workshop" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "professor" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "horas" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "workshop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "workshop_descricao_key" ON "workshop"("descricao");
