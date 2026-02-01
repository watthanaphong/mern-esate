import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
const Header = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Residences", path: "/residences" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-[#120D0A] border-b border-[#2A1F18] relative z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={() => setOpen(false)}>
          <h1 className="text-xl tracking-[0.25em] uppercase">
            <span className="font-light text-[#E6D6C3]">GOOD</span>{" "}
            <span className="font-semibold text-[#B08D57]">Luxe</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-xs tracking-[0.3em] uppercase">
          {menuItems.map((item) => (
            <Link key={item.label} to={item.path}>
              <span className="relative text-[#9C8A75] hover:text-[#E6D6C3] transition">
                {item.label}
                <span className="absolute left-0 -bottom-3 w-0 h-[1px] bg-[#B08D57] transition-all hover:w-full"></span>
              </span>
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Desktop Search */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 border border-[#2A1F18] rounded-full bg-[#1C1410]/80">
            <input
              type="text"
              placeholder="Search estates"
              className="bg-transparent focus:outline-none text-xs w-44 text-[#E6D6C3] placeholder:text-[#9C8A75]"
            />
            <FaSearch className="text-[#B08D57]" />
          </div>

          {/* Desktop Login */}
          <Link
            to="/profile"
            className="hidden md:inline text-xs tracking-[0.25em] uppercase text-[#E6D6C3] hover:text-[#B08D57] transition"
          >
            {currentUser ? (
              <img className="rounded-full h-7 w-7" src={currentUser.avatar} alt="profile" />
            ) : (
              <label className="hidden md:inline text-xs tracking-[0.25em] uppercase text-[#E6D6C3] hover:text-[#B08D57] transition">Login</label> 
            )
            }
           
          </Link>
          {/* <Link
            to="/sign-up"
            className="hidden md:inline text-xs tracking-[0.25em] uppercase text-[#E6D6C3] hover:text-[#B08D57] transition"
          >
            Sign Up
          </Link> */}

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-[#B08D57] text-lg"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#120D0A] border-t border-[#2A1F18]">
          <ul className="flex flex-col items-center py-10 gap-7 text-xs tracking-[0.3em] uppercase">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setOpen(false)}
                className="text-[#E6D6C3] hover:text-[#B08D57] transition"
              >
                {item.label}
              </Link>
            ))}

            {/* Divider */}
            <div className="w-12 h-[1px] bg-[#2A1F18] my-2"></div>

            {/* Mobile Login */}
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="text-[#B08D57] tracking-[0.35em] hover:text-[#E6D6C3] transition"
            >
              {currentUser ? (
              <img className="rounded-full h-7 w-7" src={currentUser.avatar} alt="profile" />
            ) : (
              <label className="hidden md:inline text-xs tracking-[0.25em] uppercase text-[#E6D6C3] hover:text-[#B08D57] transition">Login</label> 
            )
            }
            </Link>
            {/* <Link
              to="/sign-up"
              onClick={() => setOpen(false)}
              className="text-[#B08D57] tracking-[0.35em] hover:text-[#E6D6C3] transition"
            >
              Sign Up
            </Link> */}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
