import { useContext } from "react";
import AuthContext from "../feature/authentication/context/AuthContext";
import { useLocalStorage } from "./useLocalStorage";
import { User } from "../feature/authentication/models/userModel";


// Create a custom hook to manage user-related data
export const useUser = () => {
  // Use the useContext hook to access the AuthContext
  const authContext = useContext(AuthContext) as {
    user: User | null; // The user data
    setUser: (user: User | null) => void; // A function to set the user data
  };
  // Destructure user and setUser from authContext
  const { user, setUser } = authContext;
  // Use the useLocalStorage hook to manage local storage
  const { setItem } = useLocalStorage();

  // Define a function to add a user to the context and local storage
  const addUser = (user: User | null) => {
    
    // Check if the user is not null before updating
    if (user !== null) {
      // Set the user data in the context
      setUser(user);
      
      // Store the user data in local storage as a JSON string
      setItem("user", JSON.stringify(user));
    }
  };

  // Define a function to remove the user from the context and local storage
  const removeUser = () => {
    // Set the user data in the context to null
    setUser(null);
    // Remove the user data from local storage
    setItem("user", "");
  };

  // Return user-related functions and data as an object
  return { user, addUser, removeUser };
};