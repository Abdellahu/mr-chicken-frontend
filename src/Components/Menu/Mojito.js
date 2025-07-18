import { useContext } from 'react'
import { DishContext } from "./Menu";
import OneDish from './OneDish';

function Mojito() {
  const passerer = useContext(DishContext)
  const passer = passerer[5]
 
  return (
    <OneDish passer={passer} />
  )
}

export default Mojito