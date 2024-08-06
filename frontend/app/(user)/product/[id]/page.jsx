"use client";

import { addItem } from "@/redux/slices/cartSlice";
import Link from "next/link";
import { useState, useEffect } from "react";
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
  const [size, setSize] = useState("S");
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (product) {
      calculateTotalPrice(size);
    }
  }, [product, size]);

  const calculateTotalPrice = (selectedSize) => {
    let additionalPrice = 0;
    if (selectedSize === "M") {
      additionalPrice = 10000;
    } else if (selectedSize === "L") {
      additionalPrice = 20000;
    }
    setTotalPrice(product.price + additionalPrice);
  };

  const handleSizeChange = (e) => {
    const selectedSize = e.target.value;
    setSize(selectedSize);
    calculateTotalPrice(selectedSize);
  };

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
              alt={product.name}
            />
          </div>
          <div className="col-md-8">
            <h1>{product.name}</h1>
            Danh mục :{" "}
            <Link href={`/category/${product.categoryId}`}>
              {product.category.name}
            </Link>
            <div className="text-warning">
              {[...Array(Math.floor(product.rating))].map((_, i) => (
                <i key={`full-star-${i}`} className="fa-solid fa-star"></i>
              ))}
              {[...Array(5 - Math.floor(product.rating))].map((_, i) => (
                <i key={`empty-star-${i}`} className="fa-regular fa-star"></i>
              ))}
              <span className="text-dark">{product.rating}</span>
            </div>
            <div className="display-1">{totalPrice.toLocaleString()}đ</div>
            <div className="row">
              <div className="col-6">
                Size :
                <select
                  className="form-select mb-3"
                  onChange={handleSizeChange}
                  value={size}
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
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  min="1"
                />
              </div>
            </div>
            <AddCartButton
              className="btn-lg mb-3"
              product={{ ...product, price: totalPrice }}
              quantity={quantity}
              size={size}
              onClick={() =>
                dispatch(
                  addItem({
                    product: { ...product, price: totalPrice },
                    quantity,
                    size,
                  })
                )
              }
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
