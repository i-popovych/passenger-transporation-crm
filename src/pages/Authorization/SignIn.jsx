import React, {useState} from 'react';
import EmailPassSignIn from "../../components/AuthForm/EmailPassSignIn";
import {Alert, Col, Container, Row, Spinner} from "react-bootstrap";
import {EMAIL_PASS, FB, GOOGLE_EMAIL, NUMBER} from "../../utils/authMethods";
import GoogleEmailSignInForm from "../../components/AuthForm/GoogleEmailSignIn";
import {NavLink} from "react-router-dom";
import AuthByNumber from "../../components/AuthForm/AuthByNumber";


const SignIn = () => {
    const [authMethod, setAuthMethod] = useState(EMAIL_PASS);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null)


    return (
        <Container>
            <Row className="justify-content-md-center mb-2 mt-4">
                <Col sm={6}>
                    <h1 className="h2 d-flex align-items-center justify-content-center">Sign in</h1>
                </Col>
            </Row>
            {authMethod === EMAIL_PASS && <EmailPassSignIn setMessage={setMessage} setIsLoading={setIsLoading}/>}
            {authMethod === GOOGLE_EMAIL && <GoogleEmailSignInForm setMessage={setMessage} setIsLoading={setIsLoading}/>}
            {
                authMethod === NUMBER &&
                (   <Row className="justify-content-md-center mb-2 mt-4"><Col sm={6}>
                    <AuthByNumber setMessage={setMessage} setIsLoading={setIsLoading} isReg={false}/>
                    </Col></Row>
                )
            }
            {
                isLoading &&
                <Row className="justify-content-md-center mt-4">
                    <Col sm={6}>
                        <Spinner/>
                    </Col>
                </Row>
            }
            {
                message &&
                <Row className="justify-content-md-center mt-4">
                    <Col sm={6}>
                        <Alert>{message}</Alert>
                    </Col>
                </Row>
            }
            <Row className="justify-content-md-center mb-2 mt-2">
                <Col sm={6}>
                    <Alert.Link onClick={() => setAuthMethod(EMAIL_PASS)}>Authorization with email and password</Alert.Link>
                </Col>
            </Row>
            <Row className="justify-content-md-center mb-2">
                <Col sm={6}>
                    <Alert.Link onClick={() => setAuthMethod(GOOGLE_EMAIL)}>Authorization with Google account</Alert.Link>
                </Col>
            </Row>
            <Row className="justify-content-md-center mb-2">
                <Col sm={6}>
                    <Alert.Link onClick={() => setAuthMethod(NUMBER)}>Authorization with number</Alert.Link>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col sm={6}>
                    <Alert.Link onClick={() => setAuthMethod(FB)}>Authorization by number</Alert.Link>
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