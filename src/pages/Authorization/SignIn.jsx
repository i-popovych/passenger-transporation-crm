import React, {useState} from 'react';
import EmailPassSignIn from "../../components/EmailPassSignIn";
import {Alert, Col, Container, Row} from "react-bootstrap";
import {EMAIL_PASS, GOOGLE_EMAIL} from "../../assets/authMethods";
import LayoutsHok from "./LayoutsHok";
import GoogleEmailSignInForm from "../../components/GoogleEmailSignInForm";


const SignIn = () => {
    const [authMethod, setAuthMethod] = useState(EMAIL_PASS);


    return (
        <Container>
            {LayoutsHok(<h1 className="h2 d-flex align-items-center justify-content-center">Sign in</h1>)}
            {authMethod === EMAIL_PASS && <EmailPassSignIn/>}
            {authMethod === GOOGLE_EMAIL && LayoutsHok(<GoogleEmailSignInForm/> )}
            <Row className="justify-content-md-center mb-2 mt-4">
                <Col sm={6}>
                    <Alert.Link onClick={() => setAuthMethod(EMAIL_PASS)}>Email and password registration</Alert.Link>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col sm={6}>
                    <Alert.Link onClick={() => setAuthMethod(GOOGLE_EMAIL)}>Google account registration</Alert.Link>
                </Col>
            </Row>
        </Container>
    );
};

export default SignIn;