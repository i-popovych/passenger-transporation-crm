import React, {useState} from 'react';
import {Alert, Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {getDatabase, push, ref} from "firebase/database"
import {auth} from "../index"

const CreateTrip = () => {
    const [formData, setFormData] = useState({availableNumber: '', depCity: '', arrivalsCity: ''})
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState(null)

    const handleUpdate = async (formData) => {
        setIsLoading(true)
        const db = getDatabase();
        if (auth.currentUser) {
            try {
                const tripRef = await ref(db, `trips/${auth.currentUser.uid}`);
                await push(tripRef, {
                    ...formData
                });
                setMessage("you have successfully added a trip")
            } catch {
                setMessage("some error :(")
            } finally {
                setIsLoading(false)
            }
        }
    }

    return (
        <Container>
            <Row className="justify-content-md-center mt-3">
                <Col sm={6}>
                    <Form className="p-2">
                        <Form.Group controlId="availableNumber" className="mb-2">
                            <Form.Label>Number of available seats</Form.Label>
                            <Form.Control type="text" placeholder="Enter available number"
                                          value={formData.availableNumber}
                                          onChange={(e) => setFormData({...formData, availableNumber: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group controlId="depCity" className="mb-2">
                            <Form.Label>City of departure</Form.Label>
                            <Form.Control type="text" placeholder="Enter where you are coming from"
                                          value={formData.depCity}
                                          onChange={(e) => setFormData({...formData, depCity: e.target.value})}/>
                        </Form.Group>

                        <Form.Group controlId="arrivalsCity" className="mb-2">
                            <Form.Label>City of arrivals</Form.Label>
                            <Form.Control type="text" placeholder="Enter where you are traveling to"
                                          value={formData.arrivalsCity}
                                          onChange={(e) => setFormData({...formData, arrivalsCity: e.target.value})}/>
                        </Form.Group>
                        {
                            isLoading ?
                                <Button variant="primary" disabled>
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    Loading...
                                </Button>
                                :
                                <Button className="mt-2" variant="primary" type="submit" onClick={(e) => {
                                    e.preventDefault()
                                    handleUpdate(formData)
                                }}>
                                    Submit
                                </Button>
                        }
                    </Form>
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-3">
                <Col sm={6}>
                    {message && <Alert>{message}</Alert>}
                </Col>
            </Row>
        </Container>
    );
};

export default CreateTrip;