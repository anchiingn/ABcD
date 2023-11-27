import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
// import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { closeModal } = useModal();
  
  // const navigation = useNavigate()  //useNavigate() not work

  // if (sessionUser) return <Navigate to="/" replace={true} />;
  
  // useEffect(() => {
  //   if (sessionUser) {
  //     navigation('/')
  //   };
  // },[sessionUser,navigation])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (sessionUser) {
      return  await dispatch(sessionActions.login({ credential, password }))
      .then(() => {if (sessionUser) return <Navigate to="/" replace={true} />})
      .then(closeModal)
      .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) setErrors(data.errors);
        }
      );
    }
    return setErrors({
      credential: "The provided credentials were invalid",
      password: "Password is required"
    });
  };

  const demo = async (e) => {
    e.preventDefault();
    setErrors({});
    return await dispatch(sessionActions.login({ credential: 'Demo-User', password: 'password' }))
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
          {errors.credential && <p className='signUp_error'>{errors.credential}</p>}
          {errors.password && <p className='signUp_error'>{errors.password}</p>}
          <label>
            Username or Email
          </label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
          />
          <label>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log In</button>
        </form>
        <div onClick={demo} id='demo-link'>Demo User</div>
      </div>
    </>
  );
}

export default LoginFormPage;