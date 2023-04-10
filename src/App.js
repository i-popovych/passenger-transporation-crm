import React, {createContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import {auth, db} from "./index";
import Header from "./pages/Header/Header";
import {child, get, ref, update} from "firebase/database";
import config from "./project-config.json";
import "./styles/main.css"
import AppRoutes from "./components/AppRoutes";
import {Spinner} from "react-bootstrap";

export const AuthUserContext = createContext(null);

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isInitialize, setIsInitialize] = useState(false)

    window.currentUser = currentUser
    window.auth = auth

    const getUserDataByUid = async (uid) => {
        const snp = await get(child(ref(db), `/users/${uid}`));
        if (snp.exists()) {
            const jsonFields = snp.val();
            if (jsonFields?.email === config.adminEmail) {
                await update(ref(db), {
                    [`/users/${uid}`]: {
                        ...jsonFields,
                        role: config.role.admin
                    }
                })
                jsonFields.role = config.role.admin
            }

            return jsonFields
        }
        return null
    }

    const setUserDataByUid = async (uid) => {
        const jsonFields = await getUserDataByUid(uid)
        if (jsonFields) setCurrentUser({...jsonFields})
    }

    useEffect( () => {
        const fetch = async () => {
            const uid = localStorage.getItem('uid');
            if (uid) {
                try {
                    await setUserDataByUid(uid);
                } catch (e) {
                    console.log(e)
                }
            }
            setIsInitialize(true)
        }
        fetch()
    }, [])

    if (!isInitialize) return <div className="d-flex justify-content-center"><Spinner/></div>

    return (
        <AuthUserContext.Provider value={{currentUser, setCurrentUser, setUserDataByUid, isInitialize, getUserDataByUid}}>
            <BrowserRouter>
                <Header/>
                <AppRoutes/>
            </BrowserRouter>
        </AuthUserContext.Provider>
    );
};

export default App;
