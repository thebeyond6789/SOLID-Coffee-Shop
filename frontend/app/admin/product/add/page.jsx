"use client";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import useSWR from "swr";

export default function ProductAdd() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: categorytList,
    error: errorCategory,
    isLoading: isLoadingCategory,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/categories`, fetcher);

  const [formValue, setFormValue] = useState();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      categoryId: "",
      price: 0,
      image: null,
    },
    onSubmit: (value) => {
      setFormValue(value);
      const formData = new FormData();
      formData.append("name", value.name);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: "POST",
        body: formData,
      });
    },
  });

  if (errorCategory) return <strong>Có lỗi xảy ra ...</strong>;
  if (isLoadingCategory) return <strong>Đang tải dữ liệu ...</strong>;

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3 className="mb-4">Add Product</h3>
        <div>
          <a href="#" className="btn btn-outline-secondary rounded-0">
            <i className="far fa-long-arrow-left"></i> Back
          </a>
        </div>
      </div>
      <form
        className="row"
        action=""
        method="POST"
        enctype="multipart/form-data"
        onSubmit={formik.handleSubmit}
      >
        <div className="col-md-8 mb-4">
          <div className="card rounded-0 border-0 shadow-sm mb-4">
            <div className="card-body">
              <h6 className="pb-3 border-bottom">Basic Info</h6>
              <div className="mb-3">
                <label for="name" className="form-label">
                  Name *
                </label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="name"
                  required
                  name="name"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="mb-3">
                <label for="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control rounded-0"
                  id="description"
                  rows="6"
                  name="description"
                  onChange={formik.handleChange}
                ></textarea>
              </div>
              <div className="row">
                <div className="col mb-3">
                  <label for="category" className="form-label">
                    Category *
                  </label>
                  <div className="input-group">
                    <select
                      className="form-select rounded-0"
                      id="categoryId"
                      required
                      name="categoryId"
                      onChange={formik.handleChange}
                    >
                      {categorytList.map((item) => {
                        return (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                    <button
                      type="button"
                      className="btn btn-outline-primary rounded-0"
                    >
                      <i className="fal fa-boxes"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card rounded-0 border-0 shadow-sm">
            <div className="card-body">
              <h6 className="pb-3 border-bottom">Price</h6>
              <div className="row">
                <div className="col mb-3">
                  <label for="price" className="form-label">
                    Price *
                  </label>
                  <input
                    type="number"
                    className="form-control rounded-0"
                    id="price"
                    min="0"
                    required
                    name="price"
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card rounded-0 border-0 shadow-sm">
            <div className="card-body">
              <h6 className="pb-3 border-bottom">Image</h6>
              <div className="mb-3">
                <label for="image" className="form-label">
                  Product Image *
                </label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="image"
                  name="image"
                  onChange={formik.handleChange}
                />
                <div className="bg-secondary-subtle mb-3 p-2 text-center">
                  <img src="assets/img/products/iphone.webp" className="w-50" />
                </div>
              </div>
              <div className="mb-3">
                <label for="images" className="form-label">
                  More Product Image
                </label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="images"
                  multiple
                />
                <div className="bg-secondary-subtle mb-3 p-2 text-center d-flex">
                  <img src="assets/img/products/iphone.webp" className="w-25" />
                  <img src="assets/img/products/iphone.webp" className="w-25" />
                  <img src="assets/img/products/iphone.webp" className="w-25" />
                  <img src="assets/img/products/iphone.webp" className="w-25" />
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg rounded-0 mt-4 w-100"
          >
            Create Product
          </button>
        </div>
      </form>
    </>
  );
}
