import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import './ProfileButton.css';
import { NavLink } from 'react-router-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");


  return (
    <>
      <button onClick={toggleMenu} id='profile_button'>
        <i class="fa-solid fa-bars"></i>
        <i class="fa-solid fa-user"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className='logIn_signUp'>
              <div id='user'>
                <div className='user_name'>Hello, {user.firstName}</div>
                <div className='user_name'>{user.email}</div>
              </div>
              <div id='manage_spot'>
                <NavLink to={'/spots/current'} className='manage-spot-link'> Manage Spots</NavLink>
              </div>
              {/* <NavLink to={'/reviews/current'}> Manage Reviews</NavLink> */}
              <div> 
                <button id='logout_button' onClick={logout}>Log Out</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <div className='logIn_signUp'>
                <div className='log_sign_hover'>
                  <OpenModalMenuItem
                    itemText="Log In"
                    onItemClick={closeMenu}
                    modalComponent={<LoginFormModal />}
                  />
                </div>
                <div className='log_sign_hover'>
                  <OpenModalMenuItem
                    itemText="Sign Up"
                    onItemClick={closeMenu}
                    modalComponent={<SignupFormModal />}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;