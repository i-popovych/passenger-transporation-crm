import React, {useContext, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {Context} from "../../index";

const EmailPassSignUp = ({writeToDB, password, setIsLoading, setMessage, regData, setRegData}) => {
    const [email, setEmail] = useState('');
    const {auth} = useContext(Context)

    const handleRegistr = async () => {
        setIsLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            writeToDB(user.uid, {email})
            localStorage.setItem('uid', user.uid)
            console.log(user)
        } catch (e) {
            setIsLoading(false)
            setMessage("some error :(")
            console.log(e)
        }
        
    }

    return (
        <>
            <Form.Group controlId="email" className="mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="Enter email" value={email}
                              onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={regData.password}
                              onChange={(e) => setRegData({...regData, password: e.target.value})}/>
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

export default EmailPassSignUp;