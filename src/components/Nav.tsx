import * as React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import logout from '../logout.svg';

export const NavBar = styled.header`
	background: #fff;
	width: 1200px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: clamp(500px, 40vw, 600px);
	justify-items: start;
	align-content: center;

	height: 60px;
	span {
		display: flex;
	}
	.logo {
		text-transform: uppercase;
	}
	span img {
		/* margin-bottom: 10px; */
		height: 20px;
		align-content: center;
		margin-left: 10px;
	}
	.logout {
		color: red;
	}
`;

export function Nav() {
  let history = useHistory();
  let auth = useAuth();
  let { from } = { from: { pathname: '/' } };

  return (
    <NavBar>
      <span className="logo">Shapes</span>
      {auth!.user ? (
        <span
          onClick={() => {
            auth!.signout(() => history.push('/'));
          }}
          className="logout"
        >
          logout <img src={logout} alt="logout" />
        </span>
      ) : (
        <span
          onClick={() => {
            auth!.signin(() => history.replace(from));
          }}
          className="logout"
        >
          login
        </span>
      )}
    </NavBar>
  );
}