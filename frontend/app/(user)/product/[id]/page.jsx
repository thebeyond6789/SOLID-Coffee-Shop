"use client";
import { addItem } from "@/redux/slices/cartSlice";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import AddCartButton from "../../components/addCartButton";

export default function ProductDetail({ params }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: product,
    error: errorProduct,
    isLoading: isLoadingProduct,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/products/id/${params.id}`,
    fetcher
  );
  const dispatch = useDispatch();
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState(1);
  if (isLoadingProduct) return <strong>Đang tải dữ liệu ...</strong>;
  if (errorProduct) return <strong>Có lỗi xảy ra ...</strong>;
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${product.image}`}
              className="w-100"
            />
          </div>
          <div className="col-md-8">
            <h1>{product.name}</h1>
            Danh mục :{" "}
            <Link href={`/category/${product.categoryId}`}>
              {product.category.name}
            </Link>
            <div className="text-warning">
              {[...Array(Math.floor(product.rating))].map((i) => {
                return <i class="fa-solid fa-star"></i>;
              })}
              {[...Array(5 - Math.floor(product.rating))].map((i) => {
                return <i class="fa-regular fa-star"></i>;
              })}
              <span className="text-dark">{product.rating}</span>
            </div>
            <div className="display-1">{product.price.toLocaleString()}đ</div>
            <div className="row">
              <div className="col-6">
                Size :
                <select
                  className="form-select mb-3"
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                </select>
              </div>
              <div className="col-6">
                Số lượng
                <input
                  type="number"
                  className="form-control"
                  defaultValue={1}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>
            <button
              className="btn btn-dark btn-lg w-100 mb-3"
              onClick={() => dispatch(addItem({ product, quantity, size }))}
            >
              Thêm vào giỏ hàng
            </button>
            <AddCartButton
              className="btn-lg mb-3"
              product={product}
              quantity={quantity}
              size={size}
            >
              Thêm vào giỏ hàng
            </AddCartButton>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
