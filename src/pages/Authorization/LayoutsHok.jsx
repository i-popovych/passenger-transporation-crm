import React from 'react';
import {Alert, Col, Row} from "react-bootstrap";
import {EMAIL_PASS} from "../../assets/authMethods";

const LayoutsHok = (children) => {
    return (
        <Row className="justify-content-md-center mb-2 mt-4">
            <Col sm={6}>
                {children}
            </Col>
        </Row>
    );
};

export default LayoutsHok;