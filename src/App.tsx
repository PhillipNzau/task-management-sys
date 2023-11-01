import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import AuthContext from "./feature/authentication/context/AuthContext";
import { useAuth } from "./hooks/useAuth";

const App: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, setUser } = useAuth();
  return (
    <HelmetProvider>
      <AuthContext.Provider value={{ user, setUser }}>
        <>{children}</>
      </AuthContext.Provider>
    </HelmetProvider>
  );
};

export default App;
