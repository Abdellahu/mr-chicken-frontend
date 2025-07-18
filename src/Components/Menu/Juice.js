import  { useContext } from "react";
import { DishContext } from "./Menu";
import OneDish from "./OneDish";

function Juice() {
  const passerer = useContext(DishContext)
  const passer = passerer[3]
   
  return (
    <OneDish passer={passer} />
  )
}

export default Juice