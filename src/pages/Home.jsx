import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

const Home = () => {
    return (
        <Container className="d-flex justify-content-center mt-5">
            <Row>
                <Col className="align-self-center text-center">
                    <h1 className="home_h">Hi, select the desired page in the left menu</h1>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;