"use client";

import Link from "next/link";
import useSWR, { mutate } from "swr";

export default function Product() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: productList,
    error: errorProduct,
    isLoading: isLoadingProduct,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/products`, fetcher);

  const handleDeleteProduct = async (productId) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/id/${productId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          const data = await response.json();
          alert(data.message);
          mutate(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        } else {
          const errorData = await response.json();
          alert(errorData.message);
        }
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        alert("Có lỗi xảy ra khi xóa sản phẩm");
      }
    }
  };

  if (errorProduct) return <strong>Có lỗi xảy ra ...</strong>;
  if (isLoadingProduct) return <strong>Đang tải dữ liệu ...</strong>;

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3 className="mb-4">Products</h3>
        <div>
          <a href="#" className="btn btn-outline-success rounded-0">
            Manage Categories
          </a>
          <Link href="/admin/product/add" className="btn btn-primary rounded-0">
            Add Product
          </Link>
        </div>
      </div>

      <div className="card rounded-0 border-0 shadow-sm">
        <div className="card-body">
          <table className="table text-center">
            <thead>
              <tr>
                <th className="text-start" colSpan="2">
                  Product
                </th>
                <th>Price</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {productList.map((item) => {
                return (
                  <tr key={item._id}>
                    <td style={{ width: 64 + "px" }}>
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.image}`}
                        className="w-100"
                        alt={item.name}
                      />
                    </td>
                    <td className="text-start">
                      <strong>{item.name}</strong>
                      <br />
                      <small>
                        Id: <strong>{item._id}</strong> | Category:{" "}
                        <a href="#" className="text-decoration-none fw-bold">
                          {item.category.name}
                        </a>
                      </small>
                    </td>
                    <td>{item.price.toLocaleString()}đ</td>
                    <td>
                      {item.rating}
                      <br />
                      <div className="text-warning">
                        {[...Array(Math.floor(item.rating))].map((_, i) => (
                          <i key={i} className="fas fa-star fa-xs"></i>
                        ))}
                        {[...Array(5 - Math.floor(item.rating))].map((_, i) => (
                          <i key={i} className="far fa-star fa-xs"></i>
                        ))}
                      </div>
                    </td>
                    <td>
                      <a
                        href="#"
                        target="_blank"
                        className="btn btn-primary btn-sm"
                      >
                        <i className="fas fa-eye fa-fw"></i>
                      </a>
                      <Link
                        href={`/admin/product/edit/${item._id}`}
                        className="btn btn-outline-warning btn-sm"
                      >
                        <i className="fas fa-pencil fa-fw"></i>
                      </Link>
                      <a
                        href="#"
                        className="btn btn-outline-danger btn-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteProduct(item._id);
                        }}
                      >
                        <i className="fas fa-times fa-fw"></i>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
