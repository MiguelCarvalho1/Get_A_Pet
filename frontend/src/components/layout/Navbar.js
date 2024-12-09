import { Link } from 'react-router-dom'


import styles from './Navbar.module.css'

import Logo from '../../assets/img/logo.png'

/* contexts */
import { Context } from '../../context/UserContext'
import { useContext } from 'react';

/* hooks */

function Navbar() {
  const { authenticated, logout } = useContext(Context);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Get A Pet" />
        <h2>Get A Pet</h2>
      </div>
      <ul>
        <li>
          <Link to="/">Adopt</Link>
          </li>
          {authenticated ? (
          <>
            <li>
              <Link to="/pet/myadoptions">My Adoptions</Link>
            </li>
            <li>
              <Link to="/pet/mypets">My Pets</Link>
            </li>
            <li>
              <Link to="/user/profile">Profile</Link>
            </li>
            <li onClick={logout}>Logout</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
           
    
  
      </ul>
    </nav>
  )
}

export default Navbar