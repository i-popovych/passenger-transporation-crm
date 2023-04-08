import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {getDatabase, ref, set} from "firebase/database";
import {Alert, Col, Container, Form, Row} from "react-bootstrap";
import BaseFormGroup from "../../components/BaseFormGroup";
import EmailPassForm from "../../components/EmailPassForm";
import GoogleEmailSignOutForm from "../../components/GoogleEmailSignOutForm";
import {EMAIL_PASS, GOOGLE_EMAIL} from "../../assets/authMethods";


const SignOut = () => {
    const {auth, firestore} = useContext(Context)

    const [regData, setRegData] = useState({password: '', username: '', age: '', role: ''})
    const [regMethod, setRegMethod] = useState(EMAIL_PASS)
    console.log(regData)

    const setToDB = (uid, regData) => {
        const db = getDatabase();
        set(ref(db, 'users/' + uid), {
            ...regData
        });
    }


    const writeToDB = (uid, ...rest) => {
        const t = Object.assign({}, ...rest);
        setToDB(uid,
            {username: regData.username, age: regData.age, role: regData.role, ...t})
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
                                <EmailPassForm writeToDB={writeToDB} password={regData.password}/>}
                            {regMethod === GOOGLE_EMAIL && <GoogleEmailSignOutForm writeToDB={writeToDB}/>}
                        </Form>
                    </Col>
                </Row>
                <Row className="justify-content-md-center mb-2 mt-4">
                    <Col sm={6}>
                        <Alert.Link onClick={() => setRegMethod(EMAIL_PASS)}>email and password registration</Alert.Link>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm={6}>
                        <Alert.Link onClick={() => setRegMethod(GOOGLE_EMAIL)}>google account registration</Alert.Link>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SignOut;