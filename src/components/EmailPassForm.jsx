import React, {useContext, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {Context} from "../index";

const EmailPassForm = ({writeToDB, password}) => {
    const [email, setEmail] = useState('');
    const {auth} = useContext(Context)

    const handleRegistr = async () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                writeToDB(user.uid, {email})
                localStorage.setItem('uid', user.uid)
                console.log(user)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <>
            <Form.Group controlId="email" className="mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="Enter email" value={email}
                              onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e) => {
                e.preventDefault()
                handleRegistr({email})
            }}>
                Submit
            </Button>
        </>
    )
};

export default EmailPassForm;