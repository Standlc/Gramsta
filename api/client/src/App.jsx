import Home from "./pages/Home/Home";
import TopBar from "./topbar/TopBar";
import './app.css';
import SettingModifyProfil from "./pages/settings/SettingModifyProfil";
import SettingChangePassword from "./pages/settings/SettingChangePassword";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useContext } from "react";
import { Context } from "./context/Context";
import Logout from './pages/settings/Logout'
import SettingDelete from './pages/settings/SettingDelete'
import Profile from "./pages/profile/Profile";
import SinglePost from "./pages/profile/SinglePost";
import Conversations from "./pages/Conversations/Conversations";


function App() {
    const { user } = useContext(Context);
    return (
        <Router>

            <Switch>
                <Route path='/' exact>
                    {user ? <>
                        <TopBar />
                        <Home />
                    </>
                        : <Login />}
                </Route>

                <Route path='/profile/:username' exact>
                    {user ?
                        <>
                            <TopBar />
                            <Profile />
                        </>
                        : <Login />}
                </Route>
                <Route path='/profile/:username/:postId'>
                    {user ?
                        <>
                            <TopBar />
                            <Profile />
                            <SinglePost />
                        </>
                        : <Login />}
                </Route>

                <Route path='/login'>
                    {user ? <>
                        <TopBar />
                        <Home />
                    </>
                        : <Login />}
                </Route>

                <Route path='/register'>
                    {user ? <>
                        <TopBar />
                        <Home />
                    </>
                        : <Register />}
                </Route>

                <Route path='/settings/profile'>
                    {user ? <>
                        <TopBar />
                        <SettingModifyProfil />
                    </>
                        : <Register />}
                </Route>

                <Route path='/settings/password'><>
                    <TopBar />
                    <SettingChangePassword />
                </>
                </Route>
                <Route path='/settings/logout'>
                    <>
                        <TopBar />
                        <Logout />
                    </>
                </Route>
                <Route path='/settings/delete'>
                    <>
                        <TopBar />
                        <SettingDelete />
                    </>
                </Route>

                <Route path='/direct' exact>
                    {user ? <>
                        <TopBar />
                        <Conversations />
                    </>
                        : <Login />}
                </Route>
                <Route path='/direct/:conversationId'  >
                    {user ? <>
                        <TopBar />
                        <Conversations />
                    </>
                        : <Login />}
                </Route>


            </Switch>

        </Router>
    );
}

export default App;

// {user ? <Home/> :<Login />}