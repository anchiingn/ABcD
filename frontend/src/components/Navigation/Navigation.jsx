import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div id='nav'>
      <div id='logo'>
        <NavLink id='logo_name' exact to="/"><i id='logo_icon' className="fa-brands fa-airbnb"></i> ABnC</NavLink>
      </div>
      {isLoaded && (
        <div id='user_button'>
          {sessionUser && ( //if there is user then create new spot
            <h3 id='create_new_spot'>
              <NavLink to={'/spots/new'}  style={{textDecoration: 'none', color: 'orangered'}}>Create a New Spot</NavLink>
            </h3>
          )}
        <div>
          <ProfileButton user={sessionUser} />
        </div>
        </div>
      )}
    </div>
  );
}

export default Navigation;