import { useState } from "react";
import "./Dishes.css";
import { Link } from "react-router";
import { useTheme } from "./../Header/Brightness";
import axios from "axios";
import ExistingDishes from "./ExistingDishes";

function Dishes() {
  const { theme } = useTheme();

  const [dish_name, setDishName] = useState("");
  const [dish_type, setDishType] = useState("");
  const [dish_description, setDishDescription] = useState("");
  const [dish_price, setDishPrice] = useState("");
  const [dish_image, setDishImage] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [isNew, setIsNew] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("dish_name", dish_name);
      formData.append("dish_type", dish_type);
      formData.append("dish_description", dish_description);
      formData.append("dish_price", dish_price);
      if (dish_image) {
        formData.append("dish_image", dish_image);
      }

      await axios.post("http://localhost:3011/add-new-dish", formData);

      setMessage("Data submitted successfully!");
      setError("");
      setDishName("");
      setDishType("");
      setDishDescription("");
      setDishPrice("");
      setDishImage(null);
    } catch (err) {
      setError(`Error submitting data: ${err.message}`);
      setMessage("");
      console.error(err);
    }
  };

  const toNew = () => {
    setIsNew(true);
  };
  const toOld = () => {
    setIsNew(false);
  };
  return (
    <div className={`dishes ${theme == "dark" ? "toDimDish" : ""}`}>
      <div className="adDishes-wrapper">
        <p className="todayAvailable">Today Available Dishes</p>
        <div className="dishAdBtns">
          <Link onClick={toOld} className="adListBtn">
            Existing Dishes
          </Link>
          <Link onClick={toNew} className="adNewListBtn">
            Add New Dish
          </Link>
        </div>
        {isNew ? (
          <div className="addNew">
            {message && <div style={{ color: "green" }}>{message}</div>}
            {error && <div style={{ color: "red" }}>{error}</div>}
            <form className="addNewWraper">
              <label>Dish Name</label>
              <br />
              <input
                type="text"
                name="dish_name"
                value={dish_name}
                onChange={(e) => setDishName(e.target.value)}
                required
                placeholder="Eg. Chicken Briyani..."
              />
              <br />
              <label htmlFor="dropDownType">Dish Type</label>
              <br />
              <select
                id="dropDownType"
                name="dish_type"
                value={dish_type}
                onChange={(e) => setDishType(e.target.value)}
              >
                <option value="">SELECT DISH TYPE</option>
                <option value="MAIN DISH">MAIN DISH</option>
                <option value="FASTING">FASTING</option>
                <option value="MOJITO">MOJITO</option>
                <option value="JUICE">JUICE</option>
                <option value="DRINK">DRINK</option>
                <option value="EXTRA">EXTRA</option>
              </select>{" "}
              <br />
              <label>Dish Description</label>
              <br />
              <textarea
                type="text"
                placeholder="Add description"
                name="dish_description"
                value={dish_description}
                onChange={(e) => setDishDescription(e.target.value)}
                required
              />
              <br />
              <label>Dish Price</label>
              <br />
              <input
                type="text"
                placeholder="Eg. 1050"
                name="dish_price"
                value={dish_price}
                onChange={(e) => setDishPrice(e.target.value)}
                required
              />
              <br />
              <label>Dish Picture</label>
              <br />
              <input
                type="file"
                accept="image/*"
                name="dish_image"
                className="form-control"
                onChange={(e) => setDishImage(e.target.files[0])}
                required
              />
              <br />
              <button onClick={handleSubmit} type="submit" className="newBtn">
                Add Dish
              </button>
            </form>
          </div>
        ) : (
          <ExistingDishes />
        )}
      </div>
    </div>
  );
}

export default Dishes;
