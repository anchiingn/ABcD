import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [disableButton, setDisableButton] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      firstName: "Firstname is required",
      lastName: "Lastname is required",
      email: "The provided email is invalid",
      username: "Username must be unique",
      password: "Password is required",
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  const toggleButton = () => {
    if (firstName && lastName && email && username.length >= 4 && password.length >= 6 && confirmPassword) {
      setDisableButton(false)
    }
    else {
      setDisableButton(true)
    }
  }

  return (
    <>
      <div id='login_container'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          {errors.firstName && <p className='error'>{errors.firstName}</p>}
          {errors.lastName && <p className='error'>{errors.lastName}</p>}
          {errors.email && <p className='error'>{errors.email}</p>}
          {errors.username && <p className='error'>{errors.username}</p>}
          {errors.password && <p className='error'>{errors.password}</p>}
          {errors.confirmPassword && (<p className='error'>{errors.confirmPassword}</p>)}
          <label>
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onKeyUp={(e) => toggleButton(e.target.value)}
          />
          <label>
            Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label>
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyUp={(e) => toggleButton(e.target.value)}
          />
          <label>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={(e) => toggleButton(e.target.value)}
          />
          <label>
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" disabled={disableButton}>Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;