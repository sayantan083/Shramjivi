import React, { useEffect } from 'react';
import MenuNavbar from './components/MenuNavbar';
import Login from './components/login';
import Dashboard from './components/dashboard';
import PostJob from './components/postJob';
import SearchWorker from "./components/searchWorker";
import './App.css';
import UserContext from "./UserContext";
import { BrowserRouter as Router, Route } from "react-router-dom"
const App = () => {
  const [user, setUser] = React.useState();
  const [section, setSection] = React.useState("login");
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser && JSON.parse(loggedInUser)) {
      const myUser = JSON.parse(loggedInUser);
      console.log(myUser);
      setUser(myUser);
    }

  }, []);


  const Logout = () => {
    localStorage.clear();
    setUser(null);
  }
  return (
    <div className="App">
      <UserContext.Provider value={user}>
        {
          !user ?
            <Login setSection={setSection} setUser={setUser} />
            :
            (
              <div>

                <Router>
                  <MenuNavbar setSection={setSection} setUser={setUser} />
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/postjob" component={PostJob} />
                  <Route path="/searchWorker" component={SearchWorker} />
                </Router>
              </div>
            )
        }
      </UserContext.Provider>




    </div>
  );
}

export default App;