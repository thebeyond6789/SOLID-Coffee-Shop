export default function Register() {
  return (
    <>
      <div className="container mt-5">
        <h1>Đăng ký</h1>
        <form>
          <div className="mb-3">
            <label for="fullname" className="form-label">
              Họ và tên
            </label>
            <input type="text" className="form-control" id="fullname" />
          </div>
          <div className="mb-3">
            <label for="email" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="mb-3">
            <label for="password" className="form-label">
              Mật khẩu
            </label>
            <input type="password" className="form-control" id="password" />
          </div>
          <button type="submit" className="btn btn-dark">
            Đăng ký
          </button>
        </form>
      </div>
    </>
  );
}
