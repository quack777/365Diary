import './App.css';
import Nav from './components/Nav';
import Home from './routes/Home';
import Write from './routes/Write';
import List from './routes/List';
import Trash from './routes/Trash';
import Login from './routes/Login';
import Signup from './routes/Sign';
import Modify from './routes/Modify';
import OAuth2RedirectHandler from './routes/OAuth2RedirectHandeler';
import { HashRouter, Route, BrowserRouter } from "react-router-dom";
import Introduce from './routes/Introduce';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Route path="/365" exact={true} component={Home}/>
        <Route path="/write" component={Write}/>
        <Route path="/list" component={List}/>
        <Route path="/trash" component={Trash}/>
        <Route path="/login" component={Login}/>
        <Route path="/introduce" component={Introduce} />
        <Route path="/365/login/oauth_kakao" component={OAuth2RedirectHandler}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
