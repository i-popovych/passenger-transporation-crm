import React from 'react';
import {Col, Row} from "react-bootstrap";

const BaseLayoutsHok = (children) => {
    return (
        <Row className="justify-content-md-center mb-2 mt-4">
            <Col sm={6}>
                {children}
            </Col>
        </Row>
    );
};

export default BaseLayoutsHok;