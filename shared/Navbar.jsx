import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { useSignOutMutation } from "../redux/features/auth/authApi";
import { logout as clearCredentials } from "../redux/features/auth/authSlice";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    dropdown: [
      { label: "Moving Services", href: "/services/moving" },
      { label: "Cleaning Services", href: "/services/cleaning" },
      { label: "Laundry Services", href: "/services/laundry" },
      { label: "Home Repair", href: "/services/repair" },
    ],
  },
];

/* ── Logout Confirmation Modal ── */
const LogoutModal = ({ onConfirm, onCancel, isLoading }) => (
  <div className="fixed inset-0 z-999 flex items-center justify-center px-4">
    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={onCancel}
    />
    {/* Card */}
    <div className="relative z-10 w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-6">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#EF4444"
          strokeWidth="1.8"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </div>
      {/* Text */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="font-rethink text-[#0B1714] text-xl font-semibold leading-[140%]">
          Logging out?
        </h3>
        <p className="font-rethink text-[#595959] text-sm leading-[160%]">
          Are you sure you want to log out of your account? You'll need to sign
          in again to continue.
        </p>
      </div>
      {/* Buttons */}
      <div className="flex gap-3 w-full">
        <button
          onClick={onCancel}
          className="font-rethink flex-1 py-3 rounded-2xl border border-[#E2E6EF] bg-white text-[#0B1714] text-sm font-semibold hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
        >
          No, Stay
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="font-rethink flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Logging out..." : "Yes, Logout"}
        </button>
      </div>
    </div>
  </div>
);

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, accessToken, refreshToken } = useSelector(
    (state) => state.auth,
  );
  const isLoggedIn = !!accessToken;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef(null);
  const avatarDropdownRef = useRef(null);

  const [signOut, { isLoading: isLoggingOut }] = useSignOutMutation();

  const isActive = (href) =>
    location.pathname === href || location.pathname.startsWith(href + "/");

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
      if (
        avatarDropdownRef.current &&
        !avatarDropdownRef.current.contains(e.target)
      )
        setAvatarDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close modal on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowLogoutModal(false);
  }, [location.pathname]);

  const handleLogoutConfirm = async () => {
    try {
      if (refreshToken) await signOut({ refresh_token: refreshToken }).unwrap();
      // eslint-disable-next-line no-unused-vars
    } catch (_) {
      /* empty */
    } finally {
      dispatch(clearCredentials());
      setShowLogoutModal(false);
      setAvatarDropdownOpen(false);
      setMobileMenuOpen(false);
      toast.success("Logged out successfully!");
      navigate("/login");
    }
  };

  const getInitial = () => {
    if (user?.full_name) return user.full_name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <>
      {/* Logout Modal */}
      {showLogoutModal && (
        <LogoutModal
          onConfirm={handleLogoutConfirm}
          onCancel={() => setShowLogoutModal(false)}
          isLoading={isLoggingOut}
        />
      )}

      <div
        className={`sticky top-0 py-4 z-50 bg-[#08203C] transition-all duration-300 ${
          scrolled ? "" : "mt-2 mx-2 rounded-t-3xl"
        }`}
      >
        <div className="mxw mx-2">
          <nav className="relative flex h-14 items-center px-4 md:px-6 bg-[#08203C]">
            {/* LEFT — Logo */}

            <div className="flex items-center shrink-0">
              <a href="/" className="outline-none group">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-12 md:h-24 w-auto object-contain transition-all duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter =
                      "brightness(0) saturate(100%) invert(73%) sepia(55%) saturate(500%) hue-rotate(5deg) brightness(95%) contrast(90%)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = "brightness(1)";
                  }}
                />
              </a>
            </div>

            {/* CENTER — Nav Links */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {NAV_LINKS.map((link) =>
                link.dropdown ? (
                  <div key={link.label} ref={dropdownRef} className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`flex items-center gap-1.5 no-underline transition-colors duration-200 text-sm lg:text-base leading-[140%] font-rethink bg-transparent border-none cursor-pointer ${
                        isActive(link.href)
                          ? "text-white font-semibold"
                          : "text-[#8899b8] font-normal"
                      }`}
                    >
                      {isActive(link.href) && (
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                      )}
                      {link.label}
                      <span
                        style={{
                          display: "inline-block",
                          transform: dropdownOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.2s",
                          fontSize: "10px",
                          marginLeft: "2px",
                        }}
                      >
                        ▾
                      </span>
                    </button>

                    {dropdownOpen && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-2xl shadow-xl overflow-hidden"
                        style={{ minWidth: "180px", zIndex: 100 }}
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            onClick={() => setDropdownOpen(false)}
                            className={`block px-5 py-3 font-rethink text-sm no-underline transition-colors duration-150 ${
                              location.pathname === item.href
                                ? "bg-[#08203C] text-white font-semibold"
                                : "text-[#0B1714] hover:bg-[#f5f5f5]"
                            }`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`flex items-center gap-1.5 no-underline transition-colors duration-200 text-sm lg:text-base leading-[140%] font-rethink ${
                      isActive(link.href)
                        ? "text-white font-semibold"
                        : "text-[#8899b8] font-normal"
                    }`}
                  >
                    {isActive(link.href) && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                    )}
                    {link.label}
                  </a>
                ),
              )}
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3 ml-auto">
              {isLoggedIn ? (
                <div
                  ref={avatarDropdownRef}
                  className="relative hidden md:block"
                >
                  <button
                    onClick={() => setAvatarDropdownOpen(!avatarDropdownOpen)}
                    className="flex items-center gap-2 cursor-pointer bg-transparent border-none p-0"
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.full_name || "User"}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white/30 hover:border-white transition-all duration-200"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white text-[#08203C] font-semibold text-sm grid place-items-center border-2 border-white/30 hover:border-white transition-all duration-200">
                        {getInitial()}
                      </div>
                    )}
                  </button>

                  {avatarDropdownOpen && (
                    <div
                      className="absolute top-full right-0 mt-3 bg-white rounded-2xl shadow-xl overflow-hidden"
                      style={{ minWidth: "190px", zIndex: 100 }}
                    >
                      <div className="px-5 py-3 border-b border-gray-100">
                        <p className="font-rethink text-[#0B1714] text-sm font-semibold truncate">
                          {user?.full_name || "User"}
                        </p>
                        <p className="font-rethink text-[#595959] text-xs truncate">
                          {user?.email || ""}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setAvatarDropdownOpen(false)}
                        className="flex items-center gap-2 px-5 py-3 font-rethink text-sm text-[#0B1714] no-underline hover:bg-[#f5f5f5] transition-colors duration-150"
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          setAvatarDropdownOpen(false);
                          setShowLogoutModal(true);
                        }}
                        className="w-full flex items-center gap-2 px-5 py-3 font-rethink text-sm text-red-500 hover:bg-red-50 transition-colors duration-150 bg-transparent border-none cursor-pointer"
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href="/login"
                  className="font-rethink hidden md:inline-flex items-center px-7 py-3 rounded-3xl border bg-white text-[#08203C] text-sm font-semibold leading-[140%] no-underline transition-all duration-300 ease-in-out hover:scale-105 shadow-md hover:shadow-xl shrink-0"
                >
                  Login
                </a>
              )}

              {/* Contact Us */}
              <Link
                to="/contact"
                className="group hidden md:inline-flex items-center rounded-3xl bg-white cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 shadow-md hover:shadow-xl shrink-0 pl-5 pr-2 py-2"
              >
                <span className="font-rethink text-[#08203C] text-sm font-semibold leading-[140%]">
                  Contact Us
                </span>
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#08203C] text-white text-base  ml-2 ">
                  →
                </span>
              </Link>

              {/* Hamburger */}
              <button
                className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-none p-1"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
                />
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                />
              </button>
            </div>
          </nav>

          {/* MOBILE MENU */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-2 rounded-2xl px-4 py-4 bg-[#08203C] border border-white/10">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) =>
                  link.dropdown ? (
                    <div key={link.label}>
                      <button
                        onClick={() =>
                          setMobileServicesOpen(!mobileServicesOpen)
                        }
                        className={`w-full flex items-center justify-between no-underline transition-colors duration-200 py-2.5 px-3 rounded-xl text-sm leading-[140%] font-rethink bg-transparent border-none cursor-pointer ${
                          isActive(link.href)
                            ? "text-white font-semibold bg-white/10"
                            : "text-[#8899b8] font-normal hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          {isActive(link.href) && (
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                          )}
                          {link.label}
                        </span>
                        <span
                          style={{
                            transform: mobileServicesOpen
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.2s",
                            fontSize: "10px",
                          }}
                        >
                          ▾
                        </span>
                      </button>

                      {mobileServicesOpen && (
                        <div className="ml-4 mt-1 flex flex-col gap-1">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.label}
                              to={item.href}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileServicesOpen(false);
                              }}
                              className={`block py-2 px-3 rounded-xl font-rethink text-sm no-underline transition-colors duration-150 ${
                                location.pathname === item.href
                                  ? "text-white font-semibold bg-white/10"
                                  : "text-[#8899b8] hover:text-white hover:bg-white/5"
                              }`}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-1.5 no-underline transition-colors duration-200 py-2.5 px-3 rounded-xl text-sm leading-[140%] font-rethink ${
                        isActive(link.href)
                          ? "text-white font-semibold bg-white/10"
                          : "text-[#8899b8] font-normal hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {isActive(link.href) && (
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                      )}
                      {link.label}
                    </a>
                  ),
                )}

                {/* Mobile — logged in */}
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center gap-3 mt-2 px-3 py-2.5">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt="avatar"
                          className="w-9 h-9 rounded-full object-cover border-2 border-white/30"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-white text-[#08203C] font-semibold text-sm grid place-items-center">
                          {getInitial()}
                        </div>
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="font-rethink text-white text-sm font-semibold truncate">
                          {user?.full_name || "User"}
                        </span>
                        <span className="font-rethink text-[#8899b8] text-xs truncate">
                          {user?.email || ""}
                        </span>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-rethink w-full flex items-center justify-center rounded-2xl border border-white/30 text-white hover:bg-white/10 transition-all duration-200 py-2.5 text-sm font-semibold no-underline"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setShowLogoutModal(true);
                      }}
                      className="font-rethink w-full flex items-center justify-center rounded-2xl bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all duration-200 mt-1 py-2.5 text-sm font-semibold border-none cursor-pointer"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <a
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-rethink w-full flex items-center justify-center rounded-2xl border border-white/30 text-white hover:bg-white/10 transition-all duration-200 mt-2 py-2.5 text-sm font-semibold no-underline"
                  >
                    Login
                  </a>
                )}

                {/* Mobile Contact Us */}
                <a
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-rethink w-full flex items-center justify-center rounded-2xl bg-white hover:opacity-90 transition-opacity mt-2 py-2.5 text-[#08203C] text-sm font-semibold no-underline"
                >
                  Contact Us →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}