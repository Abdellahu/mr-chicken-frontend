import React, { useEffect, useState } from "react";
import "./Order.css";
import { Check } from "react-bootstrap-icons";
import { useTheme } from "./../Header/Brightness";
import axios from "axios";
import TimeAgo from "../Home/TimeAgo";

function Orders() {
  const { theme } = useTheme();
  const [orders, setOrders] = useState([]);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/select_order`);
      console.log("API Response data", response.data);
      setOrders(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/select_dish_normal`
      );
      console.log("API Response data", response.data);
      setDishes(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className={`orders ${theme === "dark" ? "toDimOrder" : ""}`}>
      <div className="orders-wraper">
        <p className="recentOrder">Recent Orders</p>
        <div className="order">
          <div className="shownadList shownadLists row">
            <div className="col-1">Image</div>
            <div className="dishNameads col">Dish Name</div>
            <div className="dishTypead col">Time</div>
            <div className="dishPricead col">User name</div>
            <div className="  col">Check</div>
          </div>
          {orders.map((order) => {
            const stringArray = order.dish_id.split(",");
            let numberArray = stringArray.map((str) => {
              const num = Number(str);
              if (Number.isNaN(num)) {
                return null;
              }
              return num;
            });

            const newOrdersh = numberArray
              .map((collectedIndex) => {
                const foundOrder = dishes.find(
                  (dish) => collectedIndex === dish.dish_id
                );

                if (foundOrder) {
                  return {
                    ...foundOrder,
                    dish_user: order.dish_user_name,
                    dish_time: order.dish_time,
                  };
                }
                return null;
              })
              .filter((dish) => dish !== null);

            return (
              <React.Fragment key={order.order_id}>
                <div className="numOfOrd">
                  <p>{newOrdersh.length} Orders!</p>
                  <div className="topper">
                    <p>{order.dish_user_name}</p>
                    <p>
                      Total Price:{" "}
                      {Number(order.dish_total_price).toLocaleString()}
                    </p>
                  </div>
                  {newOrdersh.map((newOrder) => (
                    <div key={newOrder.dish_id} className="listWraper ">
                      <div className="adList-R liforord">
                        <div className="shownadList row">
                          <img
                            src={`${process.env.REACT_APP_BACKEND_URL}${newOrder.dish_image_path}`}
                            className="dishImage imageDish col-1"
                          />
                          <div className="dishNamead col-4">
                            {newOrder.dish_name}
                          </div>
                          <div className="dishTypead col">
                            {" "}
                            <TimeAgo pastTime={newOrder.dish_time} />
                          </div>
                          <div className="dishPricead col">
                            {order.dish_user_name}
                          </div>
                          <Check size={44} className="check col-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <p className="UserMsg">{order.dish_message}</p>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Orders;
