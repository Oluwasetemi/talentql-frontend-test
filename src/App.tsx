import { cloneDeep } from 'lodash';
import * as React from 'react';
import {
  BrowserRouter as Router, Redirect, Route,
  Switch, useHistory, useLocation
} from 'react-router-dom';
import { Circle, Ellipse, Rectangle, Triangle } from 'react-shapes';
import styled from 'styled-components';
import data from './filter.json';
import logout from './logout.svg';

const fakeAuth = {
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

interface AppContextInterface {
  user: string | null;
  signin: (cb: () => void) => void;
  signout: (cb: () => void) => void;
}

const authContext = React.createContext<AppContextInterface | null>(null);

function ProvideAuth({ children }: { children: React.ReactChildren }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  return React.useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = React.useState<string | null>(null);

  const signin = (cb: () => void) => {
    return fakeAuth.signin(() => {
      setUser('user');
      cb();
    });
  };

  const signout = (cb: () => void) => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout
  };
}

function AuthButton() {
  let history = useHistory();
  let auth = useAuth();

  return auth!.user ? (
    <p>
      Welcome!{' '}
      <button
        onClick={() => {
          auth!.signout(() => history.push('/'));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

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

interface IColors {
  color: string,
  checked: boolean,
  isFixed: boolean,
  name: string
}

const NavBar = styled.header`
  background: #fff;
  width: 1200px;
  margin:0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(500px, 40vw, 600px);
  justify-items: start;
  align-content: center;

  height: 60px;
  span {
    display: flex
  }
  .logo {
    text-transform: uppercase;
  }
  span img {
    /* margin-bottom: 10px; */
    height: 20px;
    align-content: center;
    margin-left: 10px
  }
  .logout {
    color: red
  }
`;

function Nav() {
  let history = useHistory();
  let auth = useAuth();
  let { from } = location.state || { from: { pathname: '/' } };

  return (
    <NavBar>
      <span className="logo">Shapes</span>
      {auth!.user ? (<span onClick={() => {
        auth!.signout(() => history.push('/'));
      }} className="logout">logout <img src={logout} alt="logout" /></span>) : (<span onClick={() => {
        auth!.signin(() => history.replace(from));
      }} className="logout">login</span>)}
    </NavBar>
  );
}


const ShapesContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const SingleShapeButton = styled.button`
  /* width: 80px; */
  /* height: 30px; */
  padding:5px 10px;
  border-radius: 15px;
  border: 1px solid black;
  flex-direction: column;
  justify-items: center;
  :hover {
    border: 1px solid #b3cbfb;
    background-color: #ffffff;
  }
  &.current {
    border: 1px solid #b3cbfb;
    background-color: #ffffff;

  }
`;

function Shapes({ shapes, setShape }: { shapes: Array<string>, setShape: (s: string) => void }) {
  // const [isActive, setActive] = React.useState(false);

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    // console.log('shaped clicked', event.currentTarget.innerText);
    const shapedClicked = event.currentTarget.innerText;
    // loop thru all the parent and remove current
    /* tslint:disable */
    const allButtons: Element[] = [...event.currentTarget.parentElement!.children];
    // console.log(allButtons);
    allButtons.forEach(button => button?.classList.remove('current'));
    event.currentTarget.classList.toggle('current');
    setShape(shapedClicked);
  };

  return (
    <ShapesContainer className="shapes">
      {shapes.map((shape, index) => (<SingleShapeButton onClick={handleOnClick} key={index}>{shape}</SingleShapeButton>))}
    </ShapesContainer>
  );
}

const ColorContainer = styled.div`
  height: 50px;
  display: flex;
  gap: 10px;
`;
const ColorItem = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${prop => prop.color};
  input[type="checkbox"] {
    width: 100%;
    /* height: 100%; */
    margin: 0 auto;
    /* display: none */
  }
`;

interface Filter {
  'red': boolean,
  'blue': boolean,
  'green': boolean,
  'light-blue': boolean,
  'gray': boolean,
}


function Colors({ colors, setId }: { colors: Array<IColors>, setColor: () => void, setId: (n: number) => void }) {
  const filters: Filter = colors.reduce((acc, color) => ({ ...acc, [color.name]: color.checked }), {});
  const [checkBoxState, setCheckBoxState] = React.useState<Filter>(filters);
  // console.log(checkBoxState);
  // const cloneColors = JSON.parse(JSON.stringify(colors));

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.checked);
    const name = event.target.name;
    const checked = event.target.checked;
    console.log({ name, checked });
    // console.log(colors);
    setCheckBoxState({
      ...filters,
      [name]: checked,
    });

    const clone = colors;

    let changedColor: IColors | undefined = clone?.find(color => color.name == name);
    let index: number = clone.indexOf(changedColor);
    changedColor!.checked = checked;
    console.log(changedColor);
    // delete clone[index];
    console.log(clone);
    setId(index);

  };
  return (
    <ColorContainer>
      {
        colors.map((color, index) => (
          <ColorItem key={index} color={color.color}>
            <input type="checkbox" name={color.name} id={color.name} checked={checkBoxState[color.name]} onChange={handleOnChange} />
          </ColorItem>))
      }
    </ColorContainer>
  );
}


function SquareShape({ color }: { color: string }) {
  return (
    <Rectangle width={100} height={100} fill={{ color: color }} />
  );
}

function RectangleShape({ color }: { color: string }) {
  return (
    <Rectangle width={100} height={70} fill={{ color: color }} />
  );
}

function CircleShape({ color }: { color: string }) {
  return (
    <Circle r={50} fill={{ color: color }} />
  );
}

function TriangleShape({ color }: { color: string }) {
  return (
    <Triangle width={80} height={100} fill={{ color: color }} />
  );
}

function OvalShape({ color }: { color: string }) {
  return (
    <Ellipse rx={50} ry={70} fill={{ color: color }} />
  );
}


const BoxContainer = styled.div`
  width:200px;
  height: 200px;
  border: 1px solid black;
  display: grid;
  place-content: center
`;

const BoxWrapper = styled.div`
  padding-left: 5px;
  display: flex;
  gap: 10px
`;

function Box({ shape, colors, shapeClicked, id, setColor }: { shape: (s: string) => React.ReactElement, colors: Array<IColors>, shapeClicked: string | null, id: number, setColor: (n: [IColors]) => void }) {
  // removed item
  const remove = (i: any, data: any) => {
    if (i !== null) {
      const arr = data.filter((item: any) => item.name !== colors[i].name);
      console.log(arr);
      setColor(arr);

    }
  };
  React.useEffect(() => {
    remove(id, cloneDeep(colors));
  }, [id]);


  return (
    <>
      <h2>All {shapeClicked?.toLowerCase()} items. {colors.length}</h2>
      <BoxWrapper>
        {colors.map(
          (color, index) => {
            return (
              <BoxContainer key={index}>
                {shape(color.color)}
              </BoxContainer>
            );
          }
        )}
      </BoxWrapper>
    </>

  );
}

const AppWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

function Home() {
  const [shapeClicked, setShape] = React.useState<string | null>(null);
  const [colors, setColors] = React.useState<Array<IColors>>(data.colors);

  const [shapes, setShapes] = React.useState<Array<string>>(data.shapes);
  const [id, setId] = React.useState<number | null>(null);
  // console.log(colors);
  // console.log(shapes);

  let shape: React.ElementType<any> = (color: string) => <OvalShape color={color} />;
  if (shapeClicked === 'Oval') shape = (color: string) => <OvalShape color={color} />;
  if (shapeClicked === 'Round') shape = (color: string) => <CircleShape color={color} />;
  if (shapeClicked === 'Triangle') shape = (color: string) => <TriangleShape color={color} />;
  if (shapeClicked === 'Square') shape = (color: string) => <SquareShape color={color} />;
  if (shapeClicked === 'Rectangle') shape = (color: string) => <RectangleShape color={color} />;

  return (
    <>
      <Nav />
      <div className="App-body">

        <AppWrapper>
          <AuthButton />
          <h3>Filters</h3>
          <h5>Shapes</h5>
          <Shapes shapes={shapes} setShape={setShape} />
          <h5>Colors</h5>
          <Colors colors={cloneDeep(colors)} setColor={setColors} setId={setId} />
          <Box shape={shape} colors={colors} shapeClicked={shapeClicked} id={id} setColor={setColors} />
        </AppWrapper>
      </div>

    </>
  );
}


function Login() {
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


function App() {
  return router();
}

export default App;
