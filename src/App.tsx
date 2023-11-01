import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import AuthContext from "./feature/authentication/context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

const App: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, setUser } = useAuth();
  const location = useLocation();

  const shouldHideNavbar =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <HelmetProvider>
      <AuthContext.Provider value={{ user, setUser }}>
        <div className="overflow-hidden">
          {!shouldHideNavbar && <Navbar />}
          <div>{children}</div>
        </div>
      </AuthContext.Provider>
    </HelmetProvider>
  );
};

export default App;
