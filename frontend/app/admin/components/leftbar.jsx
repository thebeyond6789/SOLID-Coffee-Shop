"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Leftbar() {
  const pathname = usePathname();
  return (
    <>
      <ul className="nav nav-pills flex-column mb-auto" data-bs-themes>
        <li className="nav-item">
          <Link
            href="/admin"
            className={`nav-link rounded-0 ${
              pathname == "/admin" ? "active" : "text-white"
            }`}
          >
            <i class="fa-solid fa-gauge-high"></i>
            <span className="d-none d-sm-inline-block ms-2">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/order"
            className={`nav-link rounded-0 ${
              pathname == "/admin/order" ? "active" : "text-white"
            }`}
          >
            <i class="fa-solid fa-cart-shopping"></i>
            <span className="d-none d-sm-inline-block ms-2">Orders</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/product"
            className={`nav-link rounded-0 ${
              pathname == "/admin/product" ? "active" : "text-white"
            }`}
          >
            <i class="fa-solid fa-layer-group"></i>
            <span className="d-none d-sm-inline-block ms-2">Products</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/user"
            className={`nav-link rounded-0 ${
              pathname == "/admin/user" ? "active" : "text-white"
            }`}
          >
            <i class="fa-solid fa-users"></i>
            <span className="d-none d-sm-inline-block ms-2">Users</span>
          </Link>
        </li>
      </ul>
    </>
  );
}
