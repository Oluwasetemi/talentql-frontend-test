import * as React from 'react';
import {
  BrowserRouter as Router, Redirect, Route,
  Switch
} from 'react-router-dom';
import styled from 'styled-components';
import Home from './components/Home';
import { Login } from './components/Login';
import { ProvideAuth } from './context/authContext';
import { useAuth } from './hooks/useAuth';

export const fakeAuth = {
  username: 'admin',
  password: 'password',
  isAuthenticated: false,

  signin(cb: () => void) {
    if (fakeAuth.username == 'admin' && fakeAuth.password == 'password') {
      fakeAuth.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    }
  },
  signout(cb: () => void) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function PrivateRoute({ children, ...rest }: any) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth!.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

const router: React.ReactNode = (): React.ReactElement => (
  <ProvideAuth>
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </Router>
  </ProvideAuth>
);

export interface IColors {
  color: string,
  checked: boolean,
  isFixed: boolean,
  name: string
}




export interface Filter {
  'red': boolean,
  'blue': boolean,
  'green': boolean,
  'light-blue': boolean,
  'gray': boolean,
}

export const AppWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

function App() {
  return router();
}

export default App;