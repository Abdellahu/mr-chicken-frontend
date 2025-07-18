import React, { useState, useContext } from 'react'
import {  HandThumbsUpFill, CaretLeft, CaretRight} from 'react-bootstrap-icons'
import { DishContext } from "./../Menu";
import {useMyContext} from'./../DishDataProvider'

function Page3() {
  const { setIdCollection } = useMyContext()
  const passerer = useContext(DishContext)
  const passer = passerer[3]
  const passer2 = passerer[0]
  const passer3 = passerer[1]
  const passer4 = passer[1] 
  const indexes = [2, 3, 4, 5]
    
  const mappedValues = indexes.map(index => {
        const item = passer4[index]
        return item;
      }); 
  
  const handelCollection = (userId) => {
     setIdCollection((prevOrder) => {
     return[...prevOrder, userId] 
     })
    }
  return (
    <div className="dishesMenu container row">
          {mappedValues.map((dish) => ( 
            <div key={dish.dish_id} className="for-space col-md-6 col-xl-4 col-xxl-3" >
              <div className="eachDish ">
                <div className="EachDishWraper">
                  <div className="visual">
                    <img className="visualImage" src={`http://localhost:3011${dish.dish_image_path}`} alt='Dish Image' />
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
                        <p className="realPrice">ETB {dish.dish_price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           ))}
          {passer2[1].map((dish) => (
            <div key={dish.dish_id} className="for-space col-md-6 col-xl-4 col-xxl-3" >
              <div className="eachDish ">
                <div className="EachDishWraper">
                  <div className="visual">
                    <img className="visualImage" src={`http://localhost:3011${dish.dish_image_path}`} alt='Dish Image' />
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
                        <p className="realPrice">ETB {dish.dish_price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {passer3[1].map((dish) => (
            <div key={dish.dish_id} className="for-space col-md-6 col-xl-4 col-xxl-3" >
              <div className="eachDish ">
                <div className="EachDishWraper">
                  <div className="visual">
                    <img className="visualImage visualImageSpacial" src={`http://localhost:3011${dish.dish_image_path}`} alt='Dish Image' />
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
                        <p className="realPrice">ETB {dish.dish_price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
        </div>
  )
}

export default Page3