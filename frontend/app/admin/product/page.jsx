"use client";
import useSWR from "swr";

export default function Product() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: productList,
    error: errorProduct,
    isLoading: isLoadingProduct,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/products`, fetcher);

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
          <a href="product_add.html" className="btn btn-primary rounded-0">
            Add Product
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card border-0 rounded-0 bg-primary-subtle text-primary">
            <div className="card-body text-end">
              <div className="display-6 d-flex justify-content-between">
                <i className="fal fa-box"></i>
                20
              </div>
              PRODUCTS
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card border-0 rounded-0 bg-danger-subtle text-danger">
            <div className="card-body text-end">
              <div className="display-6 d-flex justify-content-between">
                <i className="fal fa-box-open"></i>3
              </div>
              RUNNING OUT
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card border-0 rounded-0 bg-success-subtle text-success">
            <div className="card-body text-end">
              <div className="display-6 d-flex justify-content-between">
                <i className="fal fa-boxes"></i>5
              </div>
              CATEGORIES
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card border-0 rounded-0 bg-dark-subtle text-dark">
            <div className="card-body text-end">
              <div className="display-6 d-flex justify-content-between">
                <i className="fal fa-archive"></i>0
              </div>
              ARCHIVE
            </div>
          </div>
        </div>
      </div>

      <div className="card rounded-0 border-0 shadow-sm">
        <div className="card-body">
          <table className="table text-center">
            <thead>
              <tr>
                <th className="text-start" colspan="2">
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
                      />
                    </td>
                    <td className="text-start">
                      <strong>{item.name}</strong>
                      <br />
                      <small>
                        Id: <strong>{item._id}</strong> | Category:{" "}
                        <a href="#" className="text-decoration-none fw-bold">
                          Điện thoại
                        </a>
                      </small>
                    </td>
                    <td c>{item.price.toLocaleString()}đ</td>
                    <td>
                      {item.rating}
                      <br />
                      <div className="text-warning">
                        {[...Array(Math.floor(item.rating))].map((i) => {
                          return <i class="fas fa-star fa-xs"></i>;
                        })}
                        {[...Array(5 - Math.floor(item.rating))].map((i) => {
                          return <i class="far fa-star fa-xs"></i>;
                        })}
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
                      <a href="#" className="btn btn-outline-warning btn-sm">
                        <i className="fas fa-pencil fa-fw"></i>
                      </a>
                      <a href="#" className="btn btn-outline-danger btn-sm">
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
