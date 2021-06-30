import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AppWrapper } from '../App';
import { useAuth } from '../hooks/useAuth';
import { AuthButton } from './AuthButton';
import { Nav } from './Nav';

export function Login(): JSX.Element {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state as any || { from: { pathname: '/' } };
  let login = () => {
    auth!.signin(() => {
      history.replace(from);
    });
  };
  return (
    <>
      <Nav />
      <div className="App-body">
        <AppWrapper>
          <AuthButton />
          <h3>Login</h3>
          <p>You must log in to view the page at {from.pathname}</p>
          <button onClick={login}>Log in</button>
        </AppWrapper>
      </div>
    </>
  );
}