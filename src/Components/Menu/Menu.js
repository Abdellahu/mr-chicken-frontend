import  { useEffect, useRef, useState, createContext } from 'react'
import './Menu.css'
import {  MenuUp } from 'react-bootstrap-icons'
import { Link } from 'react-router'
import All from './All'
import MainDish from './MainDish'
import Fasting from './Fasting'
import Mojito from './Mojito'
import Juice from './Juice'
import Drink from './Drink'
import Extra from './Extra'
import { useTheme } from "./../Header/Brightness";
import axios from 'axios';

export let DishContext = createContext() 
 
function Menu() {
  const { theme } = useTheme()
  const menuRef = useRef(null)
  const [type, setType] = useState("all")
  const [groupedDishes, setDroupedDishes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toAll = () =>{
    setType('all')
  }
  const toMain = () =>{
    setType('main')
  }
  const toFasting = () =>{
    setType('fasting')
  }
  const toMojito = () =>{
    setType('mojito')
  }
  const toJuice = () =>{
    setType('juice')
  }
  const toDrink = () =>{
    setType('drink')
  }
  const toExtra = () =>{
    setType('extra')
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
              console.error('Error fetching data:', err);
            }
          }; 
      
          
          fetchData();
        }, []);
  
  useEffect(() => {
   if(menuRef.current) {
     menuRef.current.scrollIntoView({
       behavior: 'smooth', 
       block: 'start'
     })
   }
  }, [])
  
      if (loading) {
            return <div>Loading dishes...</div>;
          }
        
          if (error) {
            return <div>Error: {error.message}</div>;
          }
           if (!groupedDishes) {
            return <div>No dishes available.</div>;
          }
     const dishArray = Object.entries(groupedDishes)   
  
  return (
    <DishContext.Provider value={dishArray}>
      <div ref={menuRef} className={theme==='dark'? 'menuCom toDim': 'menuCom'} >
        <div className='container'>
  
          <div className='discover'>
            <div className='our-manu'>
              <div className='our-logo'>
              <MenuUp />
              </div>
              <p className='our-text'>Our Menu</p>
            </div>
            <div >
              <p className='bold-discover'>Discover Our Selection</p>
            </div>
            <div>
              <p  className='simple-text'>Exquisite dishes designed to elevate your dining experiance.</p>
            </div>
          </div>

          <div className='searchMenu'>
            <div className='searchMenuWraper row'>
              <div className='searchPart col-md-6 col-xl-4'>
                <input type='search' className='searchBar' placeholder='Search dishes...'/>
              </div>
              <div className='dishesWraper col-md-6 col-xl-7'>
                <Link className={type==='all'&& 'best-one'}   onClick={toAll} >All</Link>
                <Link className={type==='main'&& 'best-one'}   onClick={toMain} >Main Dish</Link>
                <Link className={type==='fasting'&& 'best-one'}  onClick={toFasting} >Fasting</Link>
                <Link className={type==='mojito'&& 'best-one'}   onClick={toMojito} >Mojito</Link>
                <Link className={type==='juice'&& 'best-one'}  onClick={toJuice} >Juice</Link>
                <Link className={type==='drink'&& 'best-one'}   onClick={toDrink} >Drink</Link>
                <Link className={type==='extra'&& 'best-one'}   onClick={toExtra} >Extra</Link>
              </div>
            </div>
          </div>
        <div>
          
            <div>
                {type==='all'?<All />: type==='main'? <MainDish />:type==='fasting'? <Fasting />: type==='mojito'? <Mojito />: type==='juice'?<Juice />: type==='drink'? <Drink />: <Extra />}
            </div>
            
        </div> 
        </div> 
      </div>
    </DishContext.Provider>
  )
}

export default Menu