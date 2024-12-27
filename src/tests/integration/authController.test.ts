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
});
