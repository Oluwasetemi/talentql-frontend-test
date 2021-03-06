import * as React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import logout from '../logout.svg';

export const NavBar = styled.header`
	background: #fff;
	width: 90%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 45px;
	span {
		display: flex;

		&.logout {
			cursor: pointer;
			color: red;
		}
	}

	img {
		/* margin-bottom: 10px; */
		height: 20px;
		align-content: center;
		margin-left: 10px;
	}

	.logo {
		text-transform: uppercase;
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
					data-testid="logout"
				>
					logout <img src={logout} alt="logout" />
				</span>
			) : (
				<span
					onClick={() => {
						auth!.signin(() => history.replace(from));
					}}
					className="logout"
					data-testid="signin"
					role="button"
				>
					login
				</span>
			)}
		</NavBar>
	);
}
