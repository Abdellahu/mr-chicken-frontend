import { useContext } from 'react'
import { DishContext } from "./Menu";
import OneDish from './OneDish';

function MainDish() {
  const passerer = useContext(DishContext)
  const passer = passerer[4]
 
  return (
    <OneDish passer={passer} />
  )
}

export default MainDish