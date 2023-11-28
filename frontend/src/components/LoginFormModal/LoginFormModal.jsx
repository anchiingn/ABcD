import { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  // const [validation, setValidation] = useState({});
  // const [submit, setSubmit] = useState(false);
  const [disableButton, setDisableButton] = useState(true)

  const { closeModal } = useModal();
  
  const navigation = useNavigate() 

//   useEffect(() => {
//     const error = {};
//     if (submit) {
//       if (!credential) {
//         error.credential = "invalid";
//     }
//     }

//     setValidation(error)

// }, [credential, submit])

  
  
  useEffect(() => {
    if (sessionUser) {
      navigation('/')
    }
  },[sessionUser,navigation])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setSubmit(true)

    setErrors({});
    if (!sessionUser) {
      return  await dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
          const data = await res.json();
          console.log(data)
          if (data?.message === "Invalid credentials") setErrors({
            credential: 'The provided credentials were invalid',
           
          });
        }
      );
    }
    return setErrors({
      credential: 'The provided credentials were invalid',
     
    })
  };

  const toggleButton = () => {
    if (credential.length >= 4 && password.length >= 6) {
      setDisableButton(false)
    }
    else {
      setDisableButton(true)
    }
  }

  const demo = async (e) => {
    e.preventDefault();
    setErrors({});
    return await dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
    .then(closeModal)
    .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      }
    )
  };

  return (
    <>
      <div id='login_container'>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          {errors.credential && <p id='logIn_error'>{errors.credential}</p>}
          {errors.password && <p id='logIn_error'>{errors.password}</p>}
          <label>
            Username or Email
          </label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
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
          <button type="submit" disabled={disableButton} >Log In</button>
        </form>
        <div onClick={demo} id='demo-link'>Demo User</div>
      </div>
    </>
  );
}

export default LoginFormPage;