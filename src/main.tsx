import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// create global styles
import { createGlobalStyle } from 'styled-components';
import App from './App';
import store from './store/';

const GlobalStyle = createGlobalStyle`
  body {
    border-top:2px solid black;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #fff;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  .App {
    max-width: 1100px;
    margin: 0 auto;

  }

  .App-body {
    background-color: #f5f6fb;
    padding-top: 10px;
    min-height: 100vh;
  }
  .App-body .blue-text{
    color: #81a8f9;
  }

  .App-logo {
    height: 40vmin;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    .App-logo {
      animation: App-logo-spin infinite 20s linear;
    }
  }

  .App-header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .App-link {
    color: #61dafb;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  button {
    font-size: calc(10px + 2vmin);
  }

  .circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .current {
    border: 1px solid #b3cbfb;
    background-color: #81a8f9
  }
`;

ReactDOM.render(
	<React.StrictMode>
		<React.Fragment>
			<GlobalStyle />
			<Provider store={store}>
				<App />
			</Provider>
		</React.Fragment>
	</React.StrictMode>,
	document.getElementById('root'),
);
