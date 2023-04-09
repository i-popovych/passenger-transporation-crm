import React, {useContext} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {Context} from "../index";
import {AuthUserContext} from "../App";
import {set} from "firebase/database";

const provider = new GoogleAuthProvider();


const GoogleEmailSignOutForm = ({setMessage, setIsLoading}) => {
    const {auth} = useContext(Context);
    const {setUserDataByUid} = useContext(AuthUserContext)

    const handleLogin = async () => {
        setIsLoading(true)
        try {
            const result = await signInWithPopup(auth, provider)
            const credential = GoogleAuthProvider.credentialFromResult(result);
            setUserDataByUid(result.user.uid)
        } catch (e) {
            console.log(e)
            setMessage("some error :(")
        }
        setIsLoading(false)
    }

    return (
        <Row className="justify-content-md-center mb-2 mt-4">
            <Col sm={6}>
                <Button variant="primary" type="submit" onClick={(e) => {
                    e.preventDefault()
                    handleLogin()
                }}>
                    Submit
                </Button>
            </Col>
        </Row>
    )
};

export default GoogleEmailSignOutForm;