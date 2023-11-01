import { createContext } from "react";
import { User } from "../models/userModel";

// Define the AuthContext interface specifying user and setUser
interface AuthContext {
  user: User | null; // The user data
  setUser: (user: User | null) => void; // A function to set the user data
}

// Create an instance of the AuthContext using createContext
const AuthContext = createContext<AuthContext>({
  user: null, // Initialize user as null
  setUser: () => {}, // Initialize setUser as an empty function
});

export default AuthContext; // Export AuthContext as the default export
