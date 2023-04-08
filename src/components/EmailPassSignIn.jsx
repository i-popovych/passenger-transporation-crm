import React, {useContext, useState} from 'react';
import {Context, db} from "../index";
import {AuthUserContext} from "../App";
import {signInWithEmailAndPassword} from "firebase/auth";
import {Button, Col, Form, Row} from "react-bootstrap";
import { getDatabase, ref, child, get } from "firebase/database";
import config from "../project-config.json"

const EmailPassSignIn = () => {
    const {auth, firestore} = useContext(Context)
    const {setCurrentUser} = useContext(AuthUserContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const {user} = await signInWithEmailAndPassword(auth, email, password);
            try {
                const snp = await get(child(ref(db), `/users/${user.uid}`));
                if (snp.exists()) {
                    localStorage.setItem('uid', user.uid)
                    const jsonFields = snp.val();
                    console.log(config.adminEmail)
                    if (user.email === config.adminEmail) jsonFields.role = config.role.admin
                    setCurrentUser({...jsonFields});
                }
            } catch (e) {
                console.log(e)
            }
        } catch (e) {
            console.log(e);
        }
    }


    return (
            <Row className="justify-content-md-center">
                <Col sm={6}>
                    <Form>
                        <Form.Group controlId="username" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" value={password}
                                          onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                    </Form>
                    <Button variant="primary" onClick={handleLogin}>Sign in</Button>
                </Col>
            </Row>
    )
};

export default EmailPassSignIn;