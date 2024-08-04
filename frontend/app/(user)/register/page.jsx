"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import { registerUser } from "../../../redux/slices/authSlice";

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const resultAction = await dispatch(registerUser(values));
      if (registerUser.fulfilled.match(resultAction)) {
        router.push("/login");
      } else {
        setError(resultAction.error.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div className="container mt-5">
      <h1>Đăng ký</h1>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Họ và tên
              </label>
              <Field
                type="text"
                name="username"
                className="form-control"
                id="username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="form-control"
                id="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <Field
                type="password"
                name="password"
                className="form-control"
                id="password"
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button
              type="submit"
              className="btn btn-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
