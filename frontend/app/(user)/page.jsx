"use client";
import Image from "next/image";
import Slider from "./components/slider";
import Link from "next/link";
import Product from "./components/product";
import ProductList from "./components/productList";
import useSWR from "swr";

export default function Home() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: productList,
    error: errorProduct,
    isLoading: isLoadingProduct,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/products/topRating`, fetcher);
  const {
    data: categoryList,
    error: errorCategory,
    isLoading: isLoadingCategory,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/categories`, fetcher);

  console.log("Product List:", productList); // Kiểm tra dữ liệu product list
  console.log("Category List:", categoryList); // Kiểm tra dữ liệu category list

  if (errorProduct || errorCategory) return <strong>Có lỗi xảy ra ...</strong>;
  if (isLoadingProduct || isLoadingCategory)
    return <strong>Đang tải dữ liệu ...</strong>;
  return (
    <>
      <Slider />
      <div className="d-flex justify-content-center my-3 gap-3">
        {categoryList.map((item) => {
          return (
            <Link
              href="/"
              className="text-center text-decoration-none text-dark fw-bold"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.image}`}
                width={48}
                height={48}
              />
              {item.name}
            </Link>
          );
        })}
      </div>
      <div className="container mt-5">
        <h2 className="text-center">Sản Phẩm Nổi Bật</h2>
        <ProductList data={productList} />
      </div>
    </>
  );
}
