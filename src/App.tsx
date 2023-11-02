import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import AuthContext from "./feature/authentication/context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { TaskProvider } from "./feature/todo/context/TaskContext";
import { SearchProvider } from "./feature/todo/context/SearchContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, setUser } = useAuth();
  const location = useLocation();

  const shouldHideNavbar =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <HelmetProvider>
      <AuthContext.Provider value={{ user, setUser }}>
        <SearchProvider>
          <TaskProvider>
            <div className="overflow-x-hidden bg-slate-900 h-screen ">
              {!shouldHideNavbar && <Navbar />}
              <div>{children}</div>
              <ToastContainer />
            </div>
          </TaskProvider>
        </SearchProvider>
      </AuthContext.Provider>
    </HelmetProvider>
  );
};

export default App;
