import React, {useContext} from 'react';
import {Button, Form} from "react-bootstrap";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {Context} from "../index";
import {AuthUserContext} from "../App";

const provider = new GoogleAuthProvider();


const GoogleEmailSignOutForm = ({writeToDB, setMessage, setIsLoading}) => {
    const {auth} = useContext(Context);
    const {setCurrentUser} = useContext(AuthUserContext)

    const handleRegistr = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            writeToDB(result.user.uid, {email: result.user.email})
            const credential = GoogleAuthProvider.credentialFromResult(result);
            setCurrentUser(result.user)
        } catch (e) {
            setMessage("some error :(")
            console.log(e)
        }
    }

    return (
        <>
            <Button variant="primary" type="submit" onClick={(e) => {
                e.preventDefault()
                handleRegistr()
            }}>
                Submit
            </Button>
        </>
    )
};

export default GoogleEmailSignOutForm;