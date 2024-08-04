import { useSelector } from "react-redux";
import Product from "./product";
import { useRef } from "react";

// export default function ProductList(props) {
//   return (
//     <div className="row row-cols-xl-6 row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-2">
//       {props.data.map((item) => {
//         return (
//           <div key={item._id} className="col">
//             <Product data={item} />
//           </div>
//         );
//       })}
//     </div>
//   );
// }

export default function ProductList(props) {
  let data = props.data;
  let dataDefault = useRef([...props.data]);

  const { min, max } = useSelector((state) => state.filter);
  // data = data.filter((item) => min <= item.s && item.price <= max);
  if (min !== undefined && max !== undefined) {
    data = data.filter((item) => min <= item.price && item.price <= max);
  }

  const sortType = useSelector((state) => state.sort);
  if (sortType == "ASC") {
    data = data.sort((a, b) => a.price - b.price);
  } else if (sortType == "DESC") {
    data = data.sort((a, b) => b.price - a.price);
  } else {
    data = dataDefault.current;
  }
  return (
    <div className="container">
      <div className="row row-cols-5 g-4">
        {data.map((item, index) => (
          <div key={item._id} className={`col ${index >= 5 ? "mt-4" : ""}`}>
            <Product data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
