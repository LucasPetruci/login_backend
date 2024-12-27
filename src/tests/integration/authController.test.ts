import request from "supertest";
import app from "../../app";
import * as authService from "../../services/authService";

jest.mock("../../services/authService");

describe("Auth Controller", () => {
  describe("POST /register", () => {
    //success case
    test("Should register a user successfully", async () => {
      // Arrange
      const mockUser = { id: 1, email: "test@example.com" };
      // Mocking the register function
      (authService.register as jest.Mock).mockResolvedValue(mockUser);
      const payload = { email: "test@example.com", password: "123456" };

      // Act
      const response = await request(app).post("/register").send(payload);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
      expect(authService.register).toHaveBeenCalledWith(
        payload.email,
        payload.password
      );
    });
  });

  //failure case
  test("Should return 400 if email or password is missing", async () => {
    // Arrange
    const payload = { email: "test@example.com" };

    // Act
    const response = await request(app).post("/register").send(payload);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Email and password are required",
    });
  });

  //failure case - error handle
  test("Should return 400 if an error occurs", async () => {
    // Arrange
    const errorMesssage = "Registration failed";
    (authService.register as jest.Mock).mockRejectedValue(
      new Error(errorMesssage)
    );
    const payload = { email: "test@example.com", password: "123456" };

    // Act
    const response = await request(app).post("/register").send(payload);

    // Assert
    expect(response.status).toBe(400);
  });
});
