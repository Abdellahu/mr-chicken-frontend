import React, { useState, useContext } from "react";
import { HandThumbsUpFill, CaretLeft, CaretRight } from "react-bootstrap-icons";
import { DishContext } from "./Menu";
import {useMyContext} from'./DishDataProvider'

function Extra() {
  const { setIdCollection } = useMyContext()
  const passerer = useContext(DishContext)
  const passer = passerer[1]
  
  const handelCollection = (userId) => {
     setIdCollection((prevOrder) => {
     return[...prevOrder, userId] 
     })
    }

  return (
    <div className="dishesMenu container row">
      {passer[1].map((dish) => (
        <div key={dish.dish_id} className="for-space col-md-6 col-xl-4 col-xxl-3" >
          <div className="eachDish ">
            <div className="EachDishWraper">
              <div className="visual">
                <img className="visualImage visualImageSpacial" src={`${process.env.REACT_APP_BACKEND_URL}${dish.dish_image_path}`} alt='Dish Image' />
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
                    <button onClick={() => handelCollection(dish.dish_id)} className="orderHere">
                      <div className="orderText">Order</div>
                       
                    </button>
                    <p className="realPrice">ETB {Number(dish.dish_price).toLocaleString()}</p>
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

export default Extra;
