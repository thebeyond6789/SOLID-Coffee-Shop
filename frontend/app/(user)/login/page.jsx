export default function Login() {
  return (
    <>
      <div className="container mt-5">
        <h1>Đăng nhập</h1>
        <form>
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
            Đăng nhập
          </button>
        </form>
      </div>
    </>
  );
}
