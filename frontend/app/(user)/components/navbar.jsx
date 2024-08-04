"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import { logout } from "../../../redux/slices/authSlice";

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth || {});

  const totalItem = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container">
          <Link className="navbar-brand" href="/">
            <i className="fa-solid fa-mug-saucer"></i> SOLID Coffee Shop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${pathname == "/" ? "active" : ""}`}
                  href="/"
                >
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${pathname == "/menu" ? "active" : ""}`}
                  href="/menu"
                >
                  Menu
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control"
                type="search"
                placeholder="Bạn muốn uống gì?"
                aria-label="Search"
              />
            </form>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${pathname == "/cart" ? "active" : ""}`}
                  href="/cart"
                >
                  Giỏ hàng
                  <div className="badge text-bg-light ms-1">{totalItem}</div>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {isAuthenticated && user
                    ? `Xin chào, ${user.username}`
                    : "Tài khoản"}
                </Link>
                <ul className="dropdown-menu dropdown-menu-end">
                  {isAuthenticated ? (
                    <li>
                      <a
                        className="dropdown-item"
                        href="http://localhost:3001"
                        onClick={handleLogout}
                      >
                        Đăng xuất
                      </a>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link
                          className={`dropdown-item ${
                            pathname == "/login" ? "active" : ""
                          }`}
                          href="/login"
                        >
                          Đăng nhập
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`dropdown-item ${
                            pathname == "/register" ? "active" : ""
                          }`}
                          href="/register"
                        >
                          Đăng ký
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
