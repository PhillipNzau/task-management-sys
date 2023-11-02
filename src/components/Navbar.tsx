import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useSearch } from "@/feature/todo/context/SearchContext";

const Navbar = () => {
  const [t, i18n] = useTranslation("global");
  const { logout } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useSearch();
  const handleSearchInputChange = (e: {
    target: { value: string | undefined };
  }) => {
    setSearchQuery(e.target.value);
  };
  const handleLogout = () => {
    // Simulate a logout action
    logout();
    navigate(`/login`);
  };

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  useEffect(() => {
    // Check if the user is not available, then redirect to "/login"
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <nav className="border-b border-b-gray-700 text-white flex flex-col flex-wrap md:flex-nowrap md:flex-row items-center justify-between gap-4 md:gap-10 py-6 px-6 md:px-20 md:py-4 ">
      <div className="">
        <img
          src="/fao.webp"
          className="min-w-[40px]"
          alt="logo"
          width={40}
          height={40}
        />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4  w-full">
        <div>
          <p className="font-metrophobic">
            {t("header.message")} {user?.first_name}
          </p>
          <p className="font-metrophobic text-sm text-gray-500">
            {t("home.body")}
          </p>
        </div>
        <div className="flex items-center w-full  md:w-auto bg-gray-800 h-10 px-2 rounded-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-gray-500 min-w-[30px]"
          >
            <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
          </svg>
          <input
            className="bg-transparent h-full outline-none px-2"
            type="search"
            name="search"
            id="search"
            value={searchQuery || ""}
            onChange={handleSearchInputChange}
          />
        </div>
        <div></div>
      </div>
      <div className="flex items-center gap-4 justify-center ">
        <select
          className="appearance-none h-[35px] px-4 bg-gray-700 rounded-sm"
          value={i18n.language}
          onChange={(e) => handleChangeLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>

        {user && (
          <button
            onClick={handleLogout}
            className="min-w-[100px] h-[35px] px-4 bg-[#5792c9] text-white text-base hover:bg-blue-800 rounded-sm transition-all duration-200 font-metrophobic"
          >
            {t("tabs.logout")}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
