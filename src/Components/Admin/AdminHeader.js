import './AdminHeader.css'
import logoImage from "./../Images/logo.webp";
import { Link } from 'react-router';
import {BrightnessHigh} from 'react-bootstrap-icons'
import { useTheme } from "./../Header/Brightness";

function AdminHeader() {
       const { theme, toggleTheme } = useTheme()
  
  return (
    <div className={`adminHeader visible ${theme==='dark'? 'toDimAdminHead': ''}`}>
      <div className='adminHeader-wraper'>
          <Link to="/menu" className="logo-wraper adLogoPart">
            <div className="logo-image">
              <img src={logoImage} alt="MrChicken-logo"/>
            </div>
            <div className="logo-text">
              <p className="mr-chick-text">Mr. Chicken</p>
            </div>
          </Link>
          <div className='adMrText'>Admin Page</div>
        <div className='adItem-wraper'>
          <Link to='/admin/dishes' className='adDishes'>🍽️ Dishes</Link>
          <Link to='/admin/orders' className='adOrders'>🔥 Orders</Link>
          <Link to='/admin/feedback' className='adFeedbacks'>💕 Feedbacks</Link>
        </div>
      </div>
      <div className='adHeadFoot' >
            <div className="footer-toogle-wrapper">
              <div className="toggle-footer-copyright grey">
                © 2025 Mr. Chicken
              </div>
              <div className="light-mode lightAtLast adBright">
                  <BrightnessHigh onClick={toggleTheme} />  
              </div>
            </div>
     </div>
    </div>
  )
}

export default AdminHeader