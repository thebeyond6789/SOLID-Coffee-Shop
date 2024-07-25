"use client";
import useSWR from "swr";
import ProductList from "../components/productList";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { sortASC, sortDefault, sortDESC } from "@/redux/slices/sortSlice";
import { setMax, setMin } from "@/redux/slices/filterSlice";

export default function Layout({ children }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const pathname = usePathname();
  const dispatch = useDispatch();
  const sortType = useSelector((state) => state.sort);
  const {
    data: categoryList,
    error: errorCategory,
    isLoading: isLoadingCategory,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/categories`, fetcher);
  if (errorCategory) return <strong>Có lỗi xảy ra ...</strong>;
  if (isLoadingCategory) return <strong>Đang tải dữ liệu ...</strong>;

  return (
    <>
      <div className="container mt-5">
        <h1>Menu</h1>
        <div className="row">
          <div className="col-sm-3">
            <div className="card mb-3">
              <div className="card-header">
                <h5 className="mb-0">Danh mục</h5>
              </div>
              <div className="list-group list-group-flush">
                <Link
                  className={`list-group-item list-group-item-action ${
                    pathname == "/menu" ? "text-bg-dark" : ""
                  }`}
                  href="/menu"
                >
                  Tất cả sản phẩm
                </Link>
                {categoryList.map((item) => {
                  return (
                    <Link
                      key={item._id}
                      className={`list-group-item list-group-item-action ${
                        pathname == "/menu/" + item._id ? "text-bg-dark" : ""
                      }`}
                      href={`/menu/${item._id}`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-header">
                <h5 className="mb-0">Sắp xếp</h5>
              </div>
              <div className="card-body">
                <div className="btn-group">
                  <button
                    className={`btn btn-${
                      sortType == null ? "" : "outline-"
                    }dark`}
                    onClick={() => dispatch(sortDefault())}
                  >
                    Mặc định
                  </button>
                  <button
                    className={`btn btn-${
                      sortType == "ASC" ? "" : "outline-"
                    }dark`}
                    onClick={() => dispatch(sortASC())}
                  >
                    Giá tăng
                  </button>
                  <button
                    className={`btn btn-${
                      sortType == "DESC" ? "" : "outline-"
                    }dark`}
                    onClick={() => dispatch(sortDESC())}
                  >
                    Giá giảm
                  </button>
                </div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-header">
                <h5 className="mb-0">Khoảng giá</h5>
              </div>
              <div className="card-body">
                <div className="input-group">
                  <div className="input-group-text">Từ</div>
                  <input
                    type="number"
                    className="form-control"
                    min={10000}
                    max={100000}
                    step={5000}
                    defaultValue={10000}
                    onChange={(e) => dispatch(setMin(e.target.value))}
                  />
                  <div className="input-group-text">Đến</div>
                  <input
                    type="number"
                    className="form-control"
                    min={10000}
                    max={100000}
                    step={5000}
                    defaultValue={99999999999}
                    onChange={(e) => dispatch(setMax(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-9">{children}</div>
        </div>
      </div>
    </>
  );
}
