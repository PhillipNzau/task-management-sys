import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import { useUser } from "../hooks/useUser";

const Home = () => {
  const { user } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is not available, then redirect to "/login"
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <div>
      <SEO
        title="Task Management"
        description="FAO's ultimate project management system"
        type="article"
      />
      Home
    </div>
  );
};

export default Home;
