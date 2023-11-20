import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <>

        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />

        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />

      </>
    );
  }

  return (
    <div id='nav'>
      <div id='nav_logo'>
        <NavLink id='logo_name' to="/">ABcD</NavLink>
      </div>
      <div id='nav_button'>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;