import React, {useContext} from 'react';
import {Button, Form} from "react-bootstrap";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {Context} from "../index";
import {AuthUserContext} from "../App";

const provider = new GoogleAuthProvider();


const GoogleEmailSignOutForm = () => {
    const {auth} = useContext(Context);
    const {setUserDataByUid} = useContext(AuthUserContext)

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            const credential = GoogleAuthProvider.credentialFromResult(result);
            setUserDataByUid(result.user.uid)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Button variant="primary" type="submit" onClick={(e) => {
                e.preventDefault()
                handleLogin()
            }}>
                Submit
            </Button>
        </>
    )
};

export default GoogleEmailSignOutForm;