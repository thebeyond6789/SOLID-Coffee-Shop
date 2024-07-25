"use client";
import { addItem } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";

export default function AddCartButton(props) {
  const dispatch = useDispatch();
  const { product, quantity, size, className } = props;
  return (
    <>
      <button
        className={`btn btn-dark w-100 ${className}`}
        onClick={() => dispatch(addItem({ product, quantity, size }))}
      >
        {props.children}
      </button>
    </>
  );
}
