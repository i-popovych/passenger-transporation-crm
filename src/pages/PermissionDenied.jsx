import React from 'react';
import {Alert, Col, Container, Row} from "react-bootstrap";

const PermissionDenied = ({role}) => {
    return (
        <Container>
            <Row className="d-flex justify-content-center">
                <Col sm={6}>
                    <Alert className="text-center mt-5" variant="danger">
                        {!role ? "Unauthorized users don't have access to this page"
                            : `You don't have permission to access this page. You're role is ${role}`}
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
};

export default PermissionDenied;