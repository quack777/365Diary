import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Write from "./components/Write";
import List from "./components/List";
import Trash from "./components/Trash";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Sign";
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandeler";
import { HashRouter, Route, BrowserRouter } from "react-router-dom";
import Introduce from "./components/Introduce";
import WriteUpdate from "./components/WriteUpdate";
import Error from "./components/error/Error";
import { useMediaQuery } from "react-responsive";

function App() {
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Nav isMobile={isMobile} />
        <Route exact path="/" render={() => <Home isMobile={isMobile} />} />
        <Route
          path="/365"
          exact={true}
          render={() => <Home isMobile={isMobile} />}
        />
        <Route exact path="/write" component={Write} />
        <Route path="/write/:id" component={WriteUpdate} />
        <Route path="/list" component={List} />
        <Route path="/trash" component={Trash} />
        <Route path="/login" component={Login} />
        <Route path="/introduce" component={Introduce} />
        <Route exact path="/logoutRoute" component={Logout} />
        <Route
          path="/365Project/login/oauth_kakao"
          component={OAuth2RedirectHandler}
        ></Route>
        <Route path="/error" component={Error} />
      </BrowserRouter>
    </div>
  );
}

export default App;
