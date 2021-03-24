import './App.css';
import { useEffect, useState} from 'react'
import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar'
import Chathome from './Components/Chatbody/Chathome'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Chat from "./Components/Chatbody/Chat";
import Signup from '../src/Components/authAccount/Login'
import {useStateValue} from "./StateProvider"
import { actionType } from './reducer'


function App() {

 const [show, setShow] = useState(false)
  const [state, dispatch] = useStateValue()
   {/* check if user is logged in */}
    const isLoggedInUser =  () => {
        const User = localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : null;
            if (User) {
                dispatch({
                    type: actionType.SET_USER,
                    user: User
                })
            } else {
                dispatch({
                    type: `${actionType.SET_USER}_FAILURE`,
                    error: {error: "login again "}
                })
        }
    }

  useEffect(() => {
      
        isLoggedInUser()
    }, [])
  return (
    <div className="app">
      <Router>
        {
          !state.authenticated ? (
        <Signup />
          ): (
              <>
               <Header />
        <div className="app__body">
          <Sidebar />
          <Switch>
            <Route path='/' exact component={Chathome} />
            <Route path="/room/:roomId" component={Chat} />
            <Route path="/user/:userId" component={Signup} /> 
          </Switch>
                </div>
                <div className="app__mobileView">
                   <Switch>
                    <Route path='/' exact component={Sidebar} />
                    <Route path="/room/:roomId" component={Chat} />
                    <Route path="/user/:userId" component={Signup} /> 
                   </Switch>`
                </div>
              </>
          )
        }
      </Router>
    </div>
  );
}

export default App;
