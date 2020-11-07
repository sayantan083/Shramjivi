import React from 'react';
import MenuNavbar from './components/MenuNavbar'
import Login from './components/login'
import Dashboard from './components/dashboard'
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
const App = () => {
  const [section, setSection] = React.useState("home");
  return (
    <div className="App">
      {/* <SearchWorker /> */}
      {
        section === "login" ? <Login setSection={setSection} /> : (
          <div>

            <Router>
              <MenuNavbar setSection={setSection} />
              <Route path="/" exact component={Dashboard} />
              <Route path="/dashboard" component={Dashboard} />
           

            </Router>
          </div>
        )
      }



    </div>
  );
}

export default App;