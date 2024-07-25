export default function Product() {
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
                <th>Instock</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              <tr>
                <td style={{ width: 64 + "px" }}>
                  <img
                    src="assets/img/products/iphone.webp"
                    className="w-100"
                  />
                </td>
                <td className="text-start">
                  <strong>iPhone 15 Pro Max 256GB Gold Rose</strong>
                  <br />
                  <small>
                    Id: <strong>1</strong> | Category:{" "}
                    <a href="#" className="text-decoration-none fw-bold">
                      Điện thoại
                    </a>
                  </small>
                </td>
                <td c>
                  24,000,000đ
                  <br />
                  <del>25,000,000đ</del>
                </td>
                <td>50</td>
                <td>
                  4.6
                  <br />
                  <i className="fas fa-star fa-xs text-warning"></i>
                  <i className="fas fa-star fa-xs text-warning"></i>
                  <i className="fas fa-star fa-xs text-warning"></i>
                  <i className="fas fa-star fa-xs text-warning"></i>
                  <i className="far fa-star fa-xs text-warning"></i>
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
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
