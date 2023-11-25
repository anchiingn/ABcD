import { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
    .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      }
    );
  };

  const demo = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential: 'Demo-User', password: 'password' }))
    .catch(async (res) => {
      const data = await res.json();
      if (data?.errors) setErrors(data.errors);
    });
  };

  return (
    <>
      <div id='login_container'>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username or Email
          </label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <label>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.credential && <p>{errors.credential}</p>}
          <button type="submit">Log In</button>
        </form>
        <div onClick={demo} id='demo-link'>Demo User</div>
      </div>
    </>
  );
}

export default LoginFormPage;