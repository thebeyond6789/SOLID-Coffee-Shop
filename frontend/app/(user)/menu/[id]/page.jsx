"use client";
import useSWR from "swr";
import ProductList from "../../components/productList";

export default function MenuDetail({ params }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: productList,
    error: errorProduct,
    isLoading: isLoadingProduct,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/products/byCategory/${params.id}`,
    fetcher
  );
  if (errorProduct) return <strong>Có lỗi xảy ra ...</strong>;
  if (isLoadingProduct) return <strong>Đang tải dữ liệu ...</strong>;

  return (
    <>
      <ProductList data={productList}></ProductList>
    </>
  );
}
