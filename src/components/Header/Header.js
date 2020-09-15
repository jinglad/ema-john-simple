import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/manage">Manage Inventory Here</Link>
                <button onClick={() => setLoggedInUser({})} className="btn btn-primary">Sign Out </button>
            </nav>
        </div>
    );
}

export default Header;