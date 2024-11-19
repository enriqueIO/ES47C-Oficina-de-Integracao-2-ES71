-- CreateTable
CREATE TABLE "professores" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "e-mail" TEXT NOT NULL,

    CONSTRAINT "professores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "professores_usuario_key" ON "professores"("usuario");
