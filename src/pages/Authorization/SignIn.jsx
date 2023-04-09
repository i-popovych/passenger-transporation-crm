import React, {useState} from 'react';
import EmailPassSignIn from "../../components/EmailPassSignIn";
import {Alert, Col, Container, Row} from "react-bootstrap";
import {EMAIL_PASS, GOOGLE_EMAIL} from "../../utils/authMethods";
import BaseLayoutsHok from "./BaseLayoutsHok";
import GoogleEmailSignInForm from "../../components/GoogleEmailSignInForm";
import {NavLink} from "react-router-dom";


const SignIn = () => {
    const [authMethod, setAuthMethod] = useState(EMAIL_PASS);


    return (
        <Container>
            {BaseLayoutsHok(<h1 className="h2 d-flex align-items-center justify-content-center">Sign in</h1>)}
            {authMethod === EMAIL_PASS && <EmailPassSignIn/>}
            {authMethod === GOOGLE_EMAIL && BaseLayoutsHok(<GoogleEmailSignInForm/> )}
            <Row className="justify-content-md-center mb-2 mt-4">
                <Col sm={6}>
                    <Alert.Link onClick={() => setAuthMethod(EMAIL_PASS)}>Email and password authorization</Alert.Link>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col sm={6}>
                    <Alert.Link onClick={() => setAuthMethod(GOOGLE_EMAIL)}>Google account authorization</Alert.Link>
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-4">
                <Col sm={6}>
                    <NavLink to={'/registration'}>Don't have an account? Registration</NavLink>
                </Col>
            </Row>
        </Container>
    );
};

export default SignIn;