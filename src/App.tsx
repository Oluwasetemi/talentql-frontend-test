import * as React from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { ProvideAuth } from './context/authContext';
import { useAuth } from './hooks/useAuth';
import Dashboard from './pages/Home';
import { Login } from './pages/Login';

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

const router: () => any = (): any => {
	return (
		<ProvideAuth>
			<Router>
				<Switch>
					<Route exact path="/login">
						<Login />
					</Route>
					<PrivateRoute exact path="/">
						<Dashboard />
					</PrivateRoute>
					<Redirect from="*" to="login" />
				</Switch>
			</Router>
		</ProvideAuth>
	);
};

export interface IColors {
	color: string;
	checked: boolean;
	isFixed: boolean;
	name: string;
}

export interface Filter {
	red: boolean;
	blue: boolean;
	green: boolean;
	'light-blue': boolean;
	gray: boolean;
}

export const AppWrapper = styled.div`
	width: 85%;
	margin: auto;
`;

function App(): React.ReactElement<any> {
	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			{router()}
		</>
	);
}

export default App;
