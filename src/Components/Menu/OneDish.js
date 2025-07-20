import React from "react";
import { HandThumbsUpFill } from "react-bootstrap-icons";
import { useMyContext } from "./DishDataProvider";

function OneDish({ passer }) {
  const { setIdCollection } = useMyContext();
  const handelCollection = (userId) => {
    setIdCollection((prevOrder) => {
      return [...prevOrder, userId];
    });
  };
  const dishCategoryKey = Object.keys(passer)[0]; 
    const dishArray = passer[dishCategoryKey];
  return (
    <div className="dishesMenu container row">
      {dishArray.map((dish) => (
        <div
          key={dish.dish_id}
          className="for-space col-md-6 col-xl-4 col-xxl-3"
        >
          <div className="eachDish ">
            <div className="EachDishWraper">
              <div className="visual">
                <img
                  className="visualImage"
                  src={`${process.env.REACT_APP_BACKEND_URL}${dish.dish_image_path}`}
                  alt="DishImage"
                />
              </div>
              <div className="writen">
                <div className="type">
                  <HandThumbsUpFill size={15} />{" "}
                  <p className="disher">{dish.dish_type}</p>
                </div>
                <div className="name">
                  <p>{dish.dish_name}</p>
                </div>
                <div className="description">
                  <p>{dish.dish_description}</p>
                </div>
                <div className="price">
                  <hr />
                  <div className="priceWrap">
                    <button
                      onClick={() => handelCollection(dish.dish_id)}
                      className="orderHere"
                    >
                      <div className="orderText">Order</div>
                    </button>
                    <p className="realPrice">
                      ETB {Number(dish.dish_price).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OneDish;
