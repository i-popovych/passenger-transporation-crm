import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {AuthUserContext} from "../App";
import {getDatabase, push, ref} from "firebase/database"

const CreateTrip = () => {
    const [formData, setFormData] = useState({availableNumber: '', depCity: '', arrivalsCity: ''})
    const {currentUser} = useContext(AuthUserContext)

    const handleUpdate = (formData) => {
        const db = getDatabase();
        if (currentUser) {
            const tripRef = ref(db, `trips/${currentUser.uid}`);
            push(tripRef, {
                ...formData
            });
        }
    }

    return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col sm={6}>
                        <Form>
                            <Form.Group controlId="availableNumber">
                                <Form.Label>Number of available seats</Form.Label>
                                <Form.Control type="text" placeholder="Enter available number" value={formData.availableNumber}
                                              onChange={(e) => setFormData({...formData, availableNumber: e.target.value})}
                                />
                            </Form.Group>

                            <Form.Group controlId="depCity">
                                <Form.Label>City of departure</Form.Label>
                                <Form.Control type="text" placeholder="Enter where you are coming from" value={formData.depCity}
                                              onChange={(e) => setFormData({...formData, depCity: e.target.value})}/>
                            </Form.Group>

                            <Form.Group controlId="arrivalsCity">
                                <Form.Label>City of arrivals</Form.Label>
                                <Form.Control type="text" placeholder="Enter where you are traveling to" value={formData.arrivalsCity}
                                              onChange={(e) => setFormData({...formData, arrivalsCity: e.target.value})}/>
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={(e) => {
                                e.preventDefault()
                                handleUpdate(formData)
                            }}>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
    );
};

export default CreateTrip;