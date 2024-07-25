"use client";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../components/productList";
import { removeCart, removeItem, updateItem } from "@/redux/slices/cartSlice";
import { useState } from "react";

export default function Cart() {
  // const cart = [
  //   {
  //     _id: "111",
  //     name: "Trà sữa Phúc Long",
  //     price: 50000,
  //     image: "tra-sua-phuc-long.png",
  //     size: "S",
  //     quantity: 10,
  //   },
  //   {
  //     _id: "222",
  //     name: "Trà sữa Long Phúc",
  //     price: 55000,
  //     image: "tra-sua-phuc-long.png",
  //     size: "S",
  //     quantity: 20,
  //   },
  // ];
  let cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const submit = (e) => {
    e.preventDafault();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          fullname,
          phone,
          address,
        },
        detail: cart,
        total_money: total,
      }),
    });
  };
  return (
    <>
      <div className="container mt-5">
        <h1>Giỏ hàng</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th className="text-end">Giá bán</th>
              <th className="text-center">Số lượng</th>
              <th className="text-end">Thành tiền</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product) => {
              return (
                <tr key={product._id} className="align-middle">
                  <td>
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${product.image}`}
                      className="img-thumbnail me-3"
                      style={{ width: 48 + "px" }}
                      alt="..."
                    />
                    <strong>{product.name}</strong> - Size:{" "}
                    <strong>{product.size}</strong>
                  </td>
                  <td className="text-end">
                    {product.price.toLocaleString()}đ
                  </td>
                  <td className="text-center">
                    <input
                      type="number"
                      className="form-control m-auto"
                      defaultValue={product.quantity}
                      onChange={(e) =>
                        dispatch(
                          updateItem({
                            product,
                            quantity: e.target.value,
                            size: product.size,
                          })
                        )
                      }
                      style={{ width: 100 + "px" }}
                    />
                  </td>
                  <td className="text-end">
                    {(product.price * product.quantity).toLocaleString()}đ
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={(e) =>
                        dispatch(removeItem({ product, size: product.size }))
                      }
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={3} className="text-end">
                TỔNG THÀNH TIỀN
              </th>
              <th className="text-end">{total.toLocaleString()}đ</th>
              <th>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => dispatch(removeCart())}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </th>
            </tr>
          </tfoot>
        </table>

        <button
          type="button"
          className="btn btn-dark btn-lg"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Đặt hàng
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <form className="modal-dialog" onSubmit={submit}>
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Thông tin giao hàng
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div class="mb-3">
                  <label for="fullname" class="form-label">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="fullname"
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </div>
                <div class="mb-3">
                  <label for="phone" class="form-label">
                    Số điện thoại
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="phone"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div class="mb-3">
                  <label for="address" class="form-label">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Hủy
                </button>
                <button type="submit" className="btn btn-dark">
                  Xác nhận
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
