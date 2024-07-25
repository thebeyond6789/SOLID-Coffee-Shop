export default function RecentOrder(props) {
  const order = props.order;
  return (
    <>
      <div className="d-flex text-body-secondary pt-3">
        <div className="p-2 me-2 bg-warning text-white">
          <i className="fal fa-receipt"></i>
        </div>
        <a
          href="#"
          className="py-2 mb-0 small lh-sm border-bottom w-100 text-decoration-none text-body-secondary"
        >
          <strong className="d-flex justify-content-between">
            Đơn #{order._id}
            <div>
              <span className="badge text-bg-warning">
                <i className="far fa-box"></i> {order.totalProduct}
              </span>
              <span className="badge bg-success-subtle text-success">
                <i className="far fa-money-bill-wave"></i>{" "}
                {order.totalMoney.toLocaleString()}
              </span>
            </div>
          </strong>
          Đặt bởi <i>{order.user.fullname}</i> lúc {order.create_at}
        </a>
      </div>
    </>
  );
}
