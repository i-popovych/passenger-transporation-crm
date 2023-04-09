import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {AuthUserContext} from "../App";

const TripSubItem = ({item, driverName}) => {
    if (!driverName) return (
        <Container className="d-flex justify-content-center mb-5">
                <Spinner/>
        </Container>
    )
    return (
        <Container className="d-flex justify-content-center">
            <Card style={{width: '40rem', margin: "10px"}}>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title>The trip route</Card.Title>
                            <Card.Text>
                                {item.depCity} - {item.arrivalsCity}
                            </Card.Text>
                        </Col>
                        <Col>
                            <Card.Text>
                                Number of available seats - {item.availableNumber}
                            </Card.Text>
                            <Card.Text>
                                Driver's name - {driverName}
                            </Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

const TripItem = ({uidKey, data}) => {
    const {getUserDataByUid} = useContext(AuthUserContext)
    const trips = Object.values(data);
    const [driverName, setDriverName] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUserDataByUid(uidKey);
            setDriverName(data.fullName)
        }
        fetchUser()
    }, [])

    return (
        <div>
            {
                trips.map((item) => <TripSubItem item={item} driverName={driverName}/>)
            }
        </div>
    );
};

export default TripItem;