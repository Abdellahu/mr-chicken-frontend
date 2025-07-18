import React, { useEffect, useRef, useState } from "react";
import "./Order.css";
import { ArrowDown, ArrowRight, X } from "react-bootstrap-icons";
import { useTheme } from "./../Header/Brightness";
import { useMyContext } from "./DishDataProvider";
import axios from "axios";
import { Link } from "react-router";
import Notification from "./Notification";

function Order() {
  const { theme } = useTheme();
  const { idCollection, setIdCollection } = useMyContext([]);
  const [dishes, setDishes] = useState([]);
  const [visual, setVisual] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleDishIds, setVisibleDishIds] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  let [dish_id, setDishId] = useState("");
  const [dish_time, setDishTime] = useState("");
  const [dish_user_name, setUserName] = useState("");
  const [dish_user_email, setUserEmail] = useState("");
  let [dish_total_price, setTotalPrice] = useState(Number());
  const [dish_message, setMessage] = useState("");

  const [isVisible1, setIsVisible1] = useState(false);
  const orderRef = useRef(null);

  let [newArray, setNewArray] = useState([]);

  console.log(idCollection);
  console.log(newArray);

  const toVisible1 = () => {
    setIsVisible1(!isVisible1);
  };

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/select_dish_normal`
        );
        setDishes(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (orderRef.current) {
      orderRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  useEffect(() => {
    console.log(dishes);

    if (!dishes || !idCollection) {
      setNewArray([]);
      return;
    }
    const now = new Date();
    setDishTime(now);
    const idLength = idCollection.length;
    if (idLength) {
      setVisual(true);
    } else {
      setVisual(false);
    }
    const collectedDishes = idCollection
      .map((collectedIndex) => {
        const foundDish = dishes.find(
          (dish) => collectedIndex === dish.dish_id
        );
        return foundDish || null;
      })
      .filter((dish) => dish !== null);

    setNewArray(collectedDishes);
  }, [dishes, idCollection]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    try {
      const formData = new FormData();
      formData.append("dish_id", dish_id);
      formData.append("dish_time", dish_time);
      formData.append("dish_user_name", dish_user_name);
      formData.append("dish_user_email", dish_user_email);
      formData.append("dish_total_price", dish_total_price);
      formData.append("dish_message", dish_message);

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}`, formData);
      new Promise((resolve) => setTimeout(resolve, 500));
      setMessage("Data submitted successfully!");
      setShowNotification(true);
      setUserName("");
      setUserEmail("");
      setMessage("");
      setNewArray([]);
      setIdCollection([]);
    } catch (err) {
      setError(`Error submitting data: ${err.message}`);
      setMessage("");
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading dishes...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!dishes) {
    return <div>No dishes available.</div>;
  }
  const toggleVisible = (dishId) => {
    setVisibleDishIds((prevVisibleDishIds) => ({
      ...prevVisibleDishIds,
      [dishId]: !prevVisibleDishIds[dishId],
    }));
  };

  const handelDelInCollection = (dishId) => {
    setIdCollection((prevDishIds) => {
      const indexToRemove = prevDishIds.indexOf(dishId);
      if (indexToRemove > -1) {
        return [
          ...prevDishIds.slice(0, indexToRemove),
          ...prevDishIds.slice(indexToRemove + 1),
        ];
      }
      return prevDishIds;
    });
  };
  newArray.map((dish) => {
    dish_id += dish.dish_id.toString() + ",";
    dish_total_price += Number(dish.dish_price);
  });

  return (
    <div
      ref={orderRef}
      className={`OrderHome ${theme === "dark" ? "todimOh" : ""}`}
    >
      <p className="yours">Your Orders</p>
      <div className="OrderHWrap">
        <div className="shownadList shownadLists rowOrder row">
          <div className="col-1">Image</div>
          <div className="dishNameads col">Dish Name</div>
          <div className="dishTypead col">Price</div>
          <div className="dishPricead col">Add Message</div>
          <div className="  col">Cancel</div>
        </div>
        {newArray.map((dish) => {
          const isDishVisible = visibleDishIds[dish.dish_id] || false;
          return (
            <React.Fragment key={dish.dish_id}>
              <div className="listWraper">
                <div className="adList-R">
                  <div className="shownadList inOder row">
                    <div className="col-1 dishImage">
                      <img
                        src={`${process.env.REACT_APP_BACKEND_URL}${dish.dish_image_path}`}
                        className="imageDish"
                      />
                    </div>
                    <div className="dishNamead col">{dish.dish_name}</div>
                    <div className="dishTypead col">ETB {dish.dish_price}</div>
                    <div
                      onClick={() => toggleVisible(dish.dish_id)}
                      className="dishEditPricead col"
                    >
                      Message
                    </div>{" "}
                    <X
                      onClick={() => handelDelInCollection(dish.dish_id)}
                      size={24}
                      className="col"
                    />
                  </div>
                  {isDishVisible && (
                    <div className="replayBtn">
                      <form className="fdForm">
                        <label className="sendMessageLabel">Add Message:</label>
                        <textarea
                          placeholder="Send a message you want about instant dish..."
                          type="text"
                          name="dish_message"
                          value={dish_message}
                          onChange={(e) =>
                            setMessage(
                              e.target.value.charAt(0).toUpperCase() +
                                e.target.value.slice(1)
                            )
                          }
                          required
                        />
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}

        {visual ? (
          <div className="orderAndPay">
            <div className="choosePay">
              <p className="TotalPrice">
                Total Price: ETB {dish_total_price.toLocaleString()}
              </p>
              <div className="pay">
                <p className="payment">Payment:</p>
                <div>
                  <input type="checkbox" />
                  <label>In Cash</label> <br />
                </div>
                <div>
                  <input onClick={toVisible1} type="checkbox" />
                  <label>Via Bank</label>
                </div>
              </div>
            </div>
            <div className="orderDiv">
              <label className="orderLabel">Tell Us Your Name:</label>
              <input
                className="nameClient"
                type="text"
                placeholder="Eg. John Doe..."
                name="dish_user_name"
                value={dish_user_name}
                onChange={(e) =>
                  setUserName(
                    e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1)
                  )
                }
                required
              ></input>
              <br />
              <label className="orderLabel">Email:</label>
              <input
                className="nameClient"
                type="email"
                placeholder="Eg. example@gmail.com..."
                name="dish_user_email"
                value={dish_user_email}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              ></input>
            </div>
            <button onClick={handleSubmit} className="payBtn">
              Send Order <ArrowRight />
            </button>
          </div>
        ) : (
          <div>
            <p className="noOrder">
              Add Orders{" "}
              <Link to="/menu">
                {" "}
                Here <ArrowRight />{" "}
              </Link>
            </p>
          </div>
        )}
        {isVisible1 && (
          <div className="visiblePay">
            <p>Mr. Chicken: 1000121212121212 CBE</p>
            <p>Mr. Chicken: 1000121212121212 Abisiniya Bank</p>
            <p>Mr. Chicken: 1000121212121212 Dashen Bank</p>
            <p>Mr. Chicken: 1000121212121212 Awash Bank</p>
          </div>
        )}
        {showNotification && (
          <Notification
            message="Order sent successfully!"
            onClose={() => setShowNotification(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Order;
