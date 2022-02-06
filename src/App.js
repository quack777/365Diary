import React from "react";
import "./App.css";
import Nav from "./components/Home/Nav";
import NavMobile from "./components/mobile/Nav/NavMobile";
import HomeMobile from "./components/mobile/Home/HomeMobile";
import Home from "./components/Home/Home";
import Write from "./components/List/Write";
import List from "./components/List/List";
import Trash from "./components/Trash/Trash";
import Login from "./components/Login/Login";
import Logout from "./components/Login/Logout";
import OAuth2RedirectHandler from "./components/Login/OAuth2RedirectHandeler";
import { HashRouter, Route, BrowserRouter } from "react-router-dom";
import Introduce from "./components/Home/Introduce";
import WriteUpdate from "./components/List/WriteUpdate";
import Error from "./components/error/Error";
import { useMediaQuery } from "react-responsive";

function App() {
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  return (
    <div className={isMobile ? "mobile_App" : "App"}>
      <BrowserRouter>
        {isMobile ? <NavMobile isMobile={isMobile} /> : <Nav />}
        {isMobile ? <HomeMobile exact path="/" /> : <Home exact path="/" />}
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
        <Route
          path="/introduce"
          render={() => <Introduce isMobile={isMobile} />}
        />
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
