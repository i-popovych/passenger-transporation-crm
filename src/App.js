import React, {createContext, useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {auth, db} from "./index";
import {Container} from "react-bootstrap";
import SignOut from "./pages/Authorization/SignOut";
import SignIn from "./pages/Authorization/SignIn";
import Dashboard from "./pages/Dashbord";
import CreateTrip from "./pages/CreateTrip";
import {signOut} from "firebase/auth";
import Trips from "./pages/Trips";
import Header from "./pages/Header/Header";
import {child, get, ref} from "firebase/database";
import config from "./project-config.json";

export const AuthUserContext = createContext(null);

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);

    window.currentUser = currentUser
    window.auth = auth

    const setUserDataByUid = async (uid) => {
        debugger
        const snp = await get(child(ref(db), `/users/${uid}`));
        if (snp.exists()) {
            const jsonFields = snp.val();
            if (jsonFields?.email === config.adminEmail) jsonFields.role = config.role.admin
            setCurrentUser({...jsonFields});
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    useEffect(async () => {
        const uid = localStorage.getItem('uid');
        if (uid) {
            try {
                await setUserDataByUid(uid)
            } catch (e) {
                console.log(e)
            }
        }
    }, [])


    return (
        <AuthUserContext.Provider value={{currentUser, setCurrentUser, setUserDataByUid}}>
            <BrowserRouter>
                <Header/>

                <Routes>
                    <Route path={'/registration'} element={<SignOut/>}/>
                    <Route path={'/login'} element={<SignIn/>}/>
                    <Route path={'/dashboard'} element={<Dashboard/>}/>
                    <Route path={'/create-trip'} element={<CreateTrip/>}/>
                    <Route path={'/trips'} element={<Trips/>}/>
                </Routes>
            </BrowserRouter>
        </AuthUserContext.Provider>
    );
};

export default App;
