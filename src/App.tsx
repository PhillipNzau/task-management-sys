import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";

const App: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <HelmetProvider>
      <>{children}</>
    </HelmetProvider>
  );
};

export default App;
