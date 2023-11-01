import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";

const Navbar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Simulate a logout action
    logout();
    navigate(`/login`);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return (
    <nav className="bg-white md:flex items-center justify-between gap-10 py-6  md:px-12 md:py-4 ">
      <div className="flex items-center gap-4 px-4 mb-6 md:mb-0">
        <img src="/fao.webp" alt="logo" width={40} height={40} />
      </div>
      <div className="flex items-center justify-between gap-4  w-full">
        <div>
          <p className="font-metrophobic">Welcome back {user?.first_name}</p>
          <p className="font-metrophobic text-sm text-gray-600">
            Here is a summary of your Tasks
          </p>
        </div>
        <div className="flex items-center border h-8 px-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-slate-300"
          >
            <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
          </svg>
          <input
            className="h-full outline-none px-2"
            type="search"
            name="search"
            id="search"
          />
        </div>
        <div></div>
      </div>
      <div className="flex items-center justify-center ">
        <ul className="flex items-center gap-10 ">
          <li className=" text-base w-20 transition-all duration-150 text-center hover:underline underline-offset-8">
            <Link
              to="/"
              className={
                isActive("/")
                  ? "underline underline-offset-8 font-metrophobic"
                  : ""
              }
            >
              HOME
            </Link>
          </li>
        </ul>

        {user && (
          <button
            onClick={handleLogout}
            className="w-24 h-[25px] bg-blue-500 text-white text-base hover:bg-blue-800 transition-all duration-200 font-metrophobic"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
