import { User } from "../models/userModel";

// Mock user data for testing purposes
const mockUserData = {
  id: 1,
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
  role: "user",
  token: "mockAccessToken",
};

async function performMockUserAction(
  actionType: "login" | "signup",
  credentials: Record<string, string>
): Promise<User> {
  // Simulate an API response with a delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (actionType === "login") {
        // Mock login logic
        const isInvalidCredentials =
          credentials.email !== "john.doe@example.com" ||
          credentials.password !== "mockPassword";

        if (isInvalidCredentials) {
          reject(new Error("Invalid email or password"));
        } else {
          resolve(mockUserData);
        }
      } else if (actionType === "signup") {
        // Mock user registration logic
        const isInvalidEmail = credentials.email === "existing.user@example.com";

        if (isInvalidEmail) {
          reject(new Error("Email already exists"));
        } else {
          // Registration is successful
          const user = {
            ...mockUserData,
            email: credentials.email,
          };
          resolve(user);
        }
      } else {
        reject(new Error("Invalid action type"));
      }
    }, 1000); // Simulate a 1-second delay
  });
}

export const LOGIN_USER = async (credentials: {
  email: string;
  password: string;
}): Promise<User> => {
  return performMockUserAction("login", credentials);
};

export const SIGNUP_USER = async (registrationData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}): Promise<User> => {
  return performMockUserAction("signup", registrationData);
};
