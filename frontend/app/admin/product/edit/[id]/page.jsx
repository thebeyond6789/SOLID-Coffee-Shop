"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function ProductEdit({ params }) {
  // Hàm fetcher để lấy dữ liệu từ API
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  // Sử dụng SWR để lấy danh sách danh mục sản phẩm
  const {
    data: categoryList,
    error: errorCategory,
    isLoading: isLoadingCategory,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/categories`, fetcher);

  // Sử dụng SWR để lấy thông tin chi tiết của sản phẩm
  const {
    data: product,
    error: errorProduct,
    isLoading: isLoadingProduct,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/products/id/${params.id}`,
    fetcher
  );

  const router = useRouter();

  // Khởi tạo formik để quản lý form
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      categoryId: "",
      price: 0,
      rating: 0,
      image: null,
    },
    // Xử lý khi submit form
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("categoryId", values.categoryId);
      formData.append("price", values.price);
      formData.append("rating", values.rating);
      if (values.image) {
        formData.append("image", values.image);
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/id/${params.id}`,
          {
            method: "PUT",
            body: formData,
          }
        );

        // Nếu cập nhật thành công, chuyển hướng về trang quản lý sản phẩm
        if (response.ok) {
          router.push("/admin/product");
        } else {
          console.error("Failed to update product");
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }
    },
  });

  // Sử dụng useEffect để cập nhật giá trị form khi có dữ liệu sản phẩm
  useEffect(() => {
    if (product) {
      formik.setValues({
        name: product.name,
        description: product.description,
        categoryId: product.categoryId,
        price: product.price,
        rating: product.rating || 0,
        image: null,
      });
    }
  }, [product]);

  // Hiển thị thông báo lỗi nếu có lỗi xảy ra khi lấy dữ liệu
  if (errorCategory || errorProduct) return <strong>Có lỗi xảy ra ...</strong>;
  if (isLoadingCategory || isLoadingProduct)
    return <strong>Đang tải dữ liệu ...</strong>;

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3 className="mb-4">Edit Product</h3>
        <div>
          <a href="#" className="btn btn-outline-secondary rounded-0">
            <i className="far fa-long-arrow-left"></i> Back
          </a>
        </div>
      </div>
      <form
        className="row"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div className="col-md-8 mb-4">
          <div className="card rounded-0 border-0 shadow-sm mb-4">
            <div className="card-body">
              <h6 className="pb-3 border-bottom">Basic Info</h6>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name *
                </label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="name"
                  required
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control rounded-0"
                  id="description"
                  rows="6"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                ></textarea>
              </div>
              <div className="row">
                <div className="col mb-3">
                  <label htmlFor="category" className="form-label">
                    Category *
                  </label>
                  <div className="input-group">
                    <select
                      className="form-select rounded-0"
                      id="categoryId"
                      required
                      name="categoryId"
                      value={formik.values.categoryId}
                      onChange={formik.handleChange}
                    >
                      <option>- Chọn danh mục -</option>
                      {categoryList.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
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
                  <label htmlFor="price" className="form-label">
                    Price *
                  </label>
                  <input
                    type="number"
                    className="form-control rounded-0"
                    id="price"
                    min="0"
                    required
                    name="price"
                    value={formik.values.price}
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
                <label htmlFor="image" className="form-label">
                  Product Image
                </label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="image"
                  name="image"
                  onChange={(event) => {
                    formik.setFieldValue("image", event.currentTarget.files[0]);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="images" className="form-label">
                  More Product Images
                </label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="images"
                  multiple
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg rounded-0 mt-4 w-100"
          >
            Update Product
          </button>
        </div>
      </form>
    </>
  );
}
