import React, {useState} from 'react';
import {getDatabase, ref, set} from "firebase/database";
import {Alert, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import BaseFormGroup from "../../components/AuthForm/BaseFormGroup";
import EmailPassSignOut from "../../components/AuthForm/EmailPassSignOut";
import GoogleEmailSignOut from "../../components/AuthForm/GoogleEmailSignOut";
import {EMAIL_PASS, GOOGLE_EMAIL, NUMBER} from "../../utils/authMethods";
import {NavLink} from "react-router-dom";
import AuthByNumber from "../../components/AuthForm/AuthByNumber";


const SignOut = () => {
    const [regData, setRegData] = useState({password: '', fullName: '', age: '', role: ''})
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [regMethod, setRegMethod] = useState(EMAIL_PASS)
    console.log(regData)

    const setToDB = async (uid, regData) => {
        const db = getDatabase();
        await set(ref(db, 'users/' + uid), {
            ...regData
        });
        setMessage("You have successfully registered")
        setIsLoading(false)
    }


    const writeToDB = async (uid, ...rest) => {
        const t = Object.assign({}, ...rest);
        await setToDB(uid,
            {fullName: regData.fullName, age: regData.age, role: regData.role, ...t})

    }

    return (
        <>
            <h1 className="h2 d-flex align-items-center justify-content-center">Sign out</h1>
            <Container>
                <Row className="justify-content-md-center">
                    <Col sm={6}>
                        <Form>
                            <BaseFormGroup setRegData={setRegData} regData={regData}/>
                            <br/>
                            {regMethod === EMAIL_PASS &&
                                <EmailPassSignOut
                                    setRegData={setRegData} regData={regData}
                                    setIsLoading={setIsLoading} setMessage={setMessage}
                                    writeToDB={writeToDB} password={regData.password}/>}
                            {regMethod === GOOGLE_EMAIL && <GoogleEmailSignOut
                                setIsLoading={setIsLoading} setMessage={setMessage}
                                writeToDB={writeToDB}/>}
                            {regMethod === NUMBER && <AuthByNumber setIsLoading={setIsLoading} setMessage={setMessage}
                                                                   isReg={true} writeToDB={writeToDB}/>}
                        </Form>
                    </Col>
                </Row>
                {isLoading && <Row className="justify-content-md-center mt-3"><Col sm={6}><Spinner/></Col></Row>}
                {
                    message && <Row className="justify-content-md-center mt-3">
                        <Col sm={6}>
                            <Alert>
                                {message}
                            </Alert>
                        </Col>
                    </Row>
                }
                <Row className="justify-content-md-center mb-2 mt-2">
                    <Col sm={6}>
                        <Alert.Link onClick={() => setRegMethod(EMAIL_PASS)}>Email and password registration</Alert.Link>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm={6}>
                        <Alert.Link onClick={() => setRegMethod(GOOGLE_EMAIL)}>Google account registration</Alert.Link>
                    </Col>
                </Row>
                <Row className="justify-content-md-center mt-2">
                    <Col sm={6}>
                        <Alert.Link onClick={() => setRegMethod(NUMBER)}>Registration by number</Alert.Link>
                    </Col>
                </Row>
                <Row className="justify-content-md-center mt-4">
                    <Col sm={6}>
                        <NavLink to={'/login'}>Already have an account? Authorization</NavLink>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SignOut;