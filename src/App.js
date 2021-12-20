import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Write from "./components/Write";
import List from "./components/List";
import Trash from "./components/Trash";
import Login from "./components/Login";
import Signup from "./components/Sign";
import Modify from "./components/Modify";
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandeler";
import { HashRouter, Route, BrowserRouter } from "react-router-dom";
import Introduce from "./components/Introduce";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Route path="/365" exact={true} component={Home} />
        <Route path="/write" exact={true} component={Write} />
        <Route path="/list" component={List} />
        <Route path="/trash" component={Trash} />
        <Route path="/login" component={Login} />
        <Route path="/introduce" component={Introduce} />
        <Route
          path="/365/login/oauth_kakao"
          component={OAuth2RedirectHandler}
        ></Route>
        <Route exact path="/write/:question_num" component={Write} />
      </BrowserRouter>
    </div>
  );
}

export default App;
