import { useContext } from 'react'
import { DishContext } from "./Menu";
import OneDish from './OneDish';

function Drink() {
  const passerer = useContext(DishContext)
  const passer = passerer[0]
 
  return (
    <OneDish passer={passer} />
  )
}

export default Drink