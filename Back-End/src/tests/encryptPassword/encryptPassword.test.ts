import { encryptPassword } from "../../lib/encryptPassword";
import bcrypt from "bcryptjs";

jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
}));

describe("encryptPassword", () => {
  it("deve retornar uma senha encriptada", async () => {
    const mockHash = bcrypt.hash as jest.Mock;

    mockHash.mockResolvedValue("hashedPassword123");

    const password = "mySecretPassword";
    const result = await encryptPassword(password);

    expect(mockHash).toHaveBeenCalledWith(password, 10);

    expect(result).toBe("hashedPassword123");
  });

  it("deve lançar um erro se o bcrypt falhar", async () => {
    const mockHash = bcrypt.hash as jest.Mock;

    mockHash.mockRejectedValue(new Error("Erro ao gerar hash"));

    const password = "mySecretPassword";

    await expect(encryptPassword(password)).rejects.toThrow(
      "Erro ao gerar hash"
    );
  });
});
