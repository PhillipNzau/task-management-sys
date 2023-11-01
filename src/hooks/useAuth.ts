import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";
import { User } from "../feature/authentication/models/userModel";

// Create a custom hook for authentication-related functions
export const useAuth = () => {
  // Use the useUser hook to access user-related data and functions
  const { addUser, removeUser } = useUser();
  // Use the useLocalStorage hook to access local storage functions
  const { getItem } = useLocalStorage();
  // Use useState to manage the user state
  const [user, setUser] = useState<User | null>(null);


  // Use the useEffect hook to load the user data from local storage when the component mounts
  useEffect(() => {
    // Retrieve user data from local storage
    const storedUser = getItem("user");
    // If user data exists in local storage, add it to the context
    if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        addUser(parsedUser);
        setUser(parsedUser);
    }
     // Cleanup function
    return () => {
        // Perform cleanup here if needed
        // For example, unsubscribe from any subscriptions or clear timers
    };
}, []);

  // Define a function to handle user login
  const login = (user: User) => {
    // Add the user to the context and local storage
    setUser(user);
    addUser(user);
  };

  // Define a function to handle user logout
  const logout = () => {   
    // Remove the user from the context and local storage
    removeUser();
    setUser(null);
  };
  

//   // Define a function to set user data (if needed)
//   const setUsers = (user: User | null) => {
//     // Add or remove user data based on the provided user object
//     addUser(user);
//   };

  // Return user-related functions and data as an object
  return { user, login, logout, setUser};
};