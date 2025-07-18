import React, { useEffect, useState } from "react";
import axios from "axios";

function ExistingDishes() {
  const [groupedDishes, setDroupedDishes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleDishIds, setVisibleDishIds] = useState({});
  const [price_edit, setPriceEdit] = useState('');
  const [id_edit, setIdEdit] = useState('');
  const [id_delete, setIdDelete] = useState('');

  const handleEdit =  async(e) => {
    e.preventDefault();

       await axios.put(`${process.env.REACT_APP_BACKEND_URL}/update_price`, {
        "price_edit": price_edit,
        "id_edit": Number(id_edit),
      }); 
      setPriceEdit('');
      setIdEdit(null);     
  }

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/select_dish`);
        console.log("API Response data", response.data);
        setDroupedDishes(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleDeleteDish = async (e) => {
    e.preventDefault();

    if (window.confirm('Are you sure you want to delete this dish?')) {
        
          await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/remove_dish`, {  
            data: { id_delete: parseInt(id_delete) } 
        });
      }  
  };

  const toggleVisible = (dishId) => {
    setIdEdit(dishId);
    setIdDelete(dishId);
    setVisibleDishIds((prevVisibleDishIds) => ({
      ...prevVisibleDishIds,
      [dishId]: !prevVisibleDishIds[dishId],
    }));

  };

  if (loading) {
    return <div>Loading dishes...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!groupedDishes) {
    return <div>No dishes available.</div>;
  }

  return (
    <div className="adList">
      <div className="shownadList shownadLists row">
        <div className="dishNameads col">Dish Name</div>
        <div className="dishTypead col">Type</div>
        <div className="dishPricead col">Price</div>
        <div className="col">Edit Price</div>
      </div>
      <div>
        {Object.entries(groupedDishes).map(([dishType, dishes]) => (
          <div key={dishType} className="OneType">
            <p className="typeDish"> {dishType}</p>
            <div className="listWraper">
              <div className="adList-R">
                {dishes.map((dish) => {
                  const isDishVisible = visibleDishIds[dish.dish_id] || false;
                  return (
                    <React.Fragment key={dish.dish_id}>
                      <div className="shownadList row">
                        <div className="col-1 dishImage">
                          <img
                            src={`${process.env.REACT_APP_BACKEND_URL}${dish.dish_image_path}`}
                            alt="dish image"
                            className="imageDish"
                          />
                        </div>
                        <div className="dishNamead col">{dish.dish_name}</div>
                        <div className="dishTypead col">{dish.dish_type}</div>
                        <div className="dishPricead col">
                          ETB {Number(dish.dish_price).toLocaleString()}
                        </div>
                        <div
                          onClick={() => toggleVisible(dish.dish_id)}
                          className="dishEditPricead col-3"
                        >
                          Edit
                        </div>
                      </div>
                      {isDishVisible && (
                        <div className="editPricead">
                          <form >
                            <label className="priceEditLabel">
                              Update Price:{" "}
                            </label>
                            <input
                              type='text'
                              className="editPricead-text"
                              placeholder="Eg. 1080"
                              name="price_edit"
                              value={price_edit}
                              onChange={(e) => setPriceEdit(e.target.value)}
                              required 
                            />
                            <button 
                             onClick={handleEdit}
                             className="editPricead-Btn"
                            >
                              Edit Price
                            </button>
                            <button
                              onClick={handleDeleteDish}
                              className="editPricead-Btn"
                            >
                              Delete Dish
                            </button>
                          </form>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExistingDishes;
