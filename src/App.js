import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Destination from "./components/Destination/Destination";
import SignUpFrom from "./components/SignUpFrom/SignUpFrom";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
import { createContext } from "react";
import { useState } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext({});

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <PrivateRoute path="/destination/:name">
            <Destination />
          </PrivateRoute>
          <Route path="/signup">
            <SignUpFrom />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="*">
            <h1>404 - Not Found!</h1>
          </Route>
        </Switch>
        <Footer />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
