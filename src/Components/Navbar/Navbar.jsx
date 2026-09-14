import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { CounterContext } from "../../context/CounterContext";
import { NavLink, useNavigate } from "react-router-dom";
import Feed from "./../Feed/Feed";
import Profile from "./../Profile/Profile";
import Notifications from "./../Notifications/Notifications";
import { AuthContext } from "../../context/Authcontext";

export default function Navbar() {
  //icon
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  ///////////////////////////////////////
  let { userToken, setuserToken, userData } = useContext(AuthContext);
  let x = useContext(AuthContext);
  //console.log(x);
  let { setcounter, counter } = useContext(CounterContext);

  function Logout() {
    localStorage.removeItem("token");
    setuserToken(null);
    nevagaite("/login");
  }

  return (
    <div>
      <nav className="bg-neutral-primary  border-b border-default">
        <div className="max-w-7xl flex flex-nowrap items-center justify-between mx-auto p-4">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-7"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
              Routes Post
            </span>
          </a>

          {userToken !== null ? (
            <>
              <div
                className="md:w-auto border-2 border-blue-200 rounded-2xl  bg-blue-200/15"
                id="navbar-default"
              >
                <ul className="font-bold flex md:p-3 md:gap-4 ">
                  <li>
                    <NavLink
                      to="/feed"
                      className="flex items-center gap-2 py-2 px-3 text-black bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                      aria-current="page"
                    >
                      <i className="fa-regular fa-house"></i>
                      <span className="hidden md:inline">Feed</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/profile"
                      className="flex items-center gap-2 py-2 px-3 text-black bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                      aria-current="page"
                    >
                      <i className="fa-regular fa-user"></i>
                      <span className="hidden md:inline">Profile</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/notifications"
                      className="flex items-center gap-2 py-2 px-3 text-black bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                      aria-current="page"
                    >
                      <i className="fa-regular fa-comment"></i>
                      <span className="hidden md:inline">Notifications</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
  
                {/* tooooooogleeeeeeeeeeee  */}
              <div onClick={toggleMenu} className="flex justify-center items-center gap-3 hover:bg-blue-400 duration-150 rounded-2xl p-2 hover:cursor-pointer">
                <button>
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth={2}
                      d="M5 7h14M5 12h14M5 17h14"
                    />
                  </svg>
                </button>

                
                <div className="relative" ref={menuRef}>
                  <img
                    
                    src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                    alt="profile"
                    className="h-10 w-10 rounded-full cursor-pointer object-cover"
                  />

                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={18}
                          height={18}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx={12} cy={7} r={4} />
                        </svg>
                        Profile
                      </button>

                      <button
                        onClick={() => {
                          navigate("/settings");
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={18}
                          height={18}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx={12} cy={12} r={3} />
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                        Settings
                      </button>

                      <hr className="my-1 border-slate-200" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            "error in navbar  "
          )}
        </div>
      </nav>
    </div>
  );
}

{
  /* data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body  hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-default" aria-expanded="false */
}
