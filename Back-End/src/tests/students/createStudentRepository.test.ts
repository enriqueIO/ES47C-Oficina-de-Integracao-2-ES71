import { createStudentRepository } from "../../repository/students/createStudentRepository";
import { prisma } from "../../lib/prisma";

jest.mock("../../lib/prisma", () => ({
  prisma: {
    student: {
      create: jest.fn(),
    },
  },
}));

describe("createStudentRepository", () => {
  it("deve criar um estudante e retornar o registro", async () => {
    const mockStudent = {
      id: "123",
      name: "Maria Silva",
      userName: "mariasilva",
      password: "hashedPassword123",
      phone: "987654321",
      email: "maria.silva@example.com",
    };

    (prisma.student.create as jest.Mock).mockResolvedValue(mockStudent);

    const inputData = {
      name: "Maria Silva",
      userName: "mariasilva",
      password: "hashedPassword123",
      phone: "987654321",
      email: "maria.silva@example.com",
    };

    const result = await createStudentRepository(inputData);

    expect(prisma.student.create).toHaveBeenCalledWith({ data: inputData });
    expect(result).toEqual(mockStudent);
  });

  it("deve lançar um erro se prisma.student.create falhar", async () => {
    const mockError = new Error("Erro no banco de dados");

    (prisma.student.create as jest.Mock).mockRejectedValue(mockError);

    const inputData = {
      name: "Lucas Pereira",
      userName: "lucaspereira",
      password: "hashedPassword456",
      phone: "1122334455",
      email: "lucas.pereira@example.com",
    };

    await expect(createStudentRepository(inputData)).rejects.toThrow(
      "Erro no banco de dados"
    );
  });
});
