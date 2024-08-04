"use client";
import Link from "next/link";
import { useState } from "react";
import AddCartButton from "./addCartButton";

// export default function Product(props) {
//   const product = props.data;
//   return (
//     <>
//       <div className="card">
//         <img
//           src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${product.image}`}
//           className="card-img-top"
//           alt="..."
//         />
//         <div className="card-body">
//           <Link
//             href={`/product/${product._id}`}
//             className="text-dark text-decoration-none"
//           >
//             <h5 className="card-title">{product.name}</h5>
//           </Link>
//           <p className="card-text">
//             {product.rating > 0 && (
//               <small className="text-warning fw-bold me-1">
//                 {product.rating} <i className="fa-solid fa-star"></i>
//               </small>
//             )}
//             {product.price.toLocaleString()}đ
//           </p>

//           <AddCartButton product={product} quantity={1} size="S">
//             Đặt mua
//           </AddCartButton>
//           {/* <MyButton /> */}
//         </div>
//       </div>
//     </>
//   );
// function MyButton() {
//   const [count, setCount] = useState(0);

//   function handleClick() {
//     setCount(count + 1);
//   }

//   return (
//     <button className="btn btn-warning w-100" onClick={handleClick}>
//       Clicked {count} times
//     </button>
//   );
// }
// }

export default function Product(props) {
  const product = props.data;
  return (
    <div className="card h-100 d-flex flex-column">
      <div
        className="card-img-wrapper"
        style={{
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${product.image}`}
          className="card-img-top"
          alt={product.name}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <Link
          href={`/product/${product._id}`}
          className="text-dark text-decoration-none"
        >
          <h5
            className="card-title"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              height: "3rem",
            }}
          >
            {product.name}
          </h5>
        </Link>
        <div className="mt-auto">
          <p className="card-text">
            {product.rating > 0 && (
              <small className="text-warning fw-bold me-1">
                {product.rating} <i className="fa-solid fa-star"></i>
              </small>
            )}
            {product.price.toLocaleString()}đ
          </p>
          <AddCartButton product={product} quantity={1} size="S">
            Đặt mua
          </AddCartButton>
        </div>
      </div>
    </div>
  );
}
