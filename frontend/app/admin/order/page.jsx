"use client";

import Link from "next/link";
import useSWR, { mutate } from "swr";

export default function Orders() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: orderList,
    error: errorOrder,
    isLoading: isLoadingOrder,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/orders`, fetcher);

  const handleDeleteOrder = async (orderId) => {
    if (confirm("Bạn có chắc chắn muốn xóa (hoàn thành) đơn hàng này không?")) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/id/${orderId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          const data = await response.json();
          alert(data.message);
          mutate(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
        } else {
          const errorData = await response.json();
          alert(errorData.message);
        }
      } catch (error) {
        console.error("Lỗi khi xóa đơn hàng:", error);
        alert("Có lỗi xảy ra khi xóa đơn hàng");
      }
    }
  };

  if (errorOrder) return <strong>Có lỗi xảy ra ...</strong>;
  if (isLoadingOrder) return <strong>Đang tải dữ liệu ...</strong>;

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3 className="mb-4">Đơn hàng</h3>
        <div>
          <Link href="/admin/order/add" className="btn btn-primary rounded-0">
            Thêm đơn hàng
          </Link>
        </div>
      </div>

      <div className="card rounded-0 border-0 shadow-sm">
        <div className="card-body">
          <table className="table text-center">
            <thead>
              <tr>
                <th>Order Code</th>
                <th>User Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {orderList &&
                orderList.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.user?.fullname}</td>
                      <td>{item.user?.phone}</td>
                      <td>{item.user?.address}</td>
                      <td>{item.total_money?.toLocaleString()}đ</td>
                      <td>
                        <Link
                          href={`/admin/order/edit/${item._id}`}
                          className="btn btn-outline-warning btn-sm"
                        >
                          <i className="fas fa-pencil fa-fw"></i>
                        </Link>
                        <a
                          href="#"
                          className="btn btn-outline-success btn-sm"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteOrder(item._id);
                          }}
                        >
                          <i class="fa-solid fa-check"></i>
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
