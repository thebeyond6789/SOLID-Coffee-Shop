"use client";
import Link from "next/link";
import useSWR, { mutate } from "swr";

export default function User() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: accountList,
    error: errorAccount,
    isLoading: isLoadingAccount,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/users`, fetcher);

  const handleDeleteAccount = async (accountId) => {
    if (confirm("Bạn có thật sự muốn xóa tài khoản này không?")) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${accountId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          const data = await response.json();
          alert(data.message);
          mutate(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        } else {
          const errorData = await response.json();
          alert(errorData.message);
        }
      } catch (error) {
        console.error("Lỗi khi xóa tài khoản này:", error);
        alert("Đã xảy ra lỗi khi xóa tài khoản!");
      }
    }
  };

  if (errorAccount) return <strong>An error occurred ...</strong>;
  if (isLoadingAccount) return <strong>Loading data ...</strong>;

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3 className="mb-4">Accounts</h3>
      </div>

      <div className="card rounded-0 border-0 shadow-sm">
        <div className="card-body">
          <table className="table text-center">
            <thead>
              <tr>
                <th className="text-start">Username</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {accountList &&
                accountList.map((item) => (
                  <tr key={item._id}>
                    <td className="text-start">
                      <strong>{item.username}</strong>
                      <br />
                      <small>
                        Id: <strong>{item._id}</strong>
                      </small>
                    </td>
                    <td>{item.email}</td>
                    <td>
                      <Link
                        href={`/admin/user/edit/${item._id}`}
                        className="btn btn-outline-warning btn-sm"
                      >
                        <i className="fas fa-pencil fa-fw"></i>
                      </Link>
                      <a
                        href="#"
                        className="btn btn-outline-danger btn-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteAccount(item._id);
                        }}
                      >
                        <i className="fas fa-times fa-fw"></i>
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
