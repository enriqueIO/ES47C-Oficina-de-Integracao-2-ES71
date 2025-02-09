-- CreateTable
CREATE TABLE "Certificate" (
    "id" SERIAL NOT NULL,
    "pdfLink" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
