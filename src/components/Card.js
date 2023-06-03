import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";
function Card(props) {
  let options = props.options;
  let priceOptions = Object.keys(options);
  let dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  let finalPrice = qty * parseInt(options[size]);
  const handleCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.Items._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "Update",
          id: props.Items._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "Add",
          id: props.Items._id,
          image: props.Items.img,
          name: props.Items.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        return;
      }
      return;
    }

    await dispatch({
      type: "Add",
      id: props.Items._id,
      image: props.Items.img,
      name: props.Items.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
    // console.log(data);
  };
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}>
          <img
            src={props.Items.img}
            style={{ height: "150px", objectFit: "fill" }}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{props.Items.name}</h5>
            {/* <p className="card-text">{props.Items.description}</p> */}
            <div className="container w-100 ">
              <select
                className="h-100 m-2 bg-success rounded"
                onChange={(e) => setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select
                className="h-100 m-2 bg-success rounded"
                onChange={(e) => setSize(e.target.value)}
                ref={priceRef}>
                {priceOptions.map((option) => {
                  return (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  );
                })}
              </select>
              <div className="d-inline fs-5 h-100">₹{finalPrice}/-</div>
            </div>

            <div>
              <hr />
              <button
                className="btn btn-success justify-content-center ms-2 "
                onClick={handleCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
