"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function UserEdit({ params }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const router = useRouter();
  const [error, setError] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    data: user,
    error: errorUser,
    isLoading: isLoadingUser,
    mutate,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`, fetcher);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      if (values.newPassword !== values.confirmPassword) {
        setError("New passwords do not match");
        return;
      }

      const updateData = {
        username: values.username,
        email: values.email,
      };

      if (values.currentPassword && values.newPassword) {
        updateData.currentPassword = values.currentPassword;
        updateData.newPassword = values.newPassword;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
          }
        );

        if (response.ok) {
          const updatedUser = await response.json();
          mutate(updatedUser, false);
          alert("Cập nhật thành công");
          setTimeout(() => {
            router.push("/admin/user");
          }, 1000);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to update account");
        }
      } catch (error) {
        setError("Error updating account: " + error.message);
      }
    },
  });

  useEffect(() => {
    if (user) {
      formik.setValues({
        username: user.username,
        email: user.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  if (errorUser) return <strong>Có lỗi xảy ra: {errorUser.message}</strong>;
  if (isLoadingUser) return <strong>Đang tải dữ liệu ...</strong>;

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3 className="mb-4">Edit Account</h3>
        <div>
          <a href="/users" className="btn btn-outline-secondary rounded-0">
            <i className="far fa-long-arrow-left"></i> Back
          </a>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="row" onSubmit={formik.handleSubmit}>
        <div className="col-md-8 mb-4">
          <div className="card rounded-0 border-0 shadow-sm mb-4">
            <div className="card-body">
              <h6 className="pb-3 border-bottom">Account Info</h6>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username *
                </label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="username"
                  required
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email *
                </label>
                <input
                  type="email"
                  className="form-control rounded-0"
                  id="email"
                  required
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="currentPassword" className="form-label">
                  Current Password
                </label>
                <div className="input-group">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    className="form-control rounded-0"
                    id="currentPassword"
                    name="currentPassword"
                    value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    <i
                      className={`fa-solid ${
                        showCurrentPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <div className="input-group">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="form-control rounded-0"
                    id="newPassword"
                    name="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    <i
                      className={`fa-solid ${
                        showNewPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm New Password
                </label>
                <div className="input-group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control rounded-0"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i
                      className={`fa-solid ${
                        showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <button
            type="submit"
            className="btn btn-primary btn-lg rounded-0 mt-4 w-100"
          >
            Update Account
          </button>
        </div>
      </form>
    </>
  );
}
