import  { useContext } from "react";
import { DishContext } from "./Menu";
import OneDish from "./OneDish";

function Fasting() {
  const passerer = useContext(DishContext)
  const passer = passerer[2]
   
  return (
    <OneDish passer={passer} />
  )
}

export default Fasting