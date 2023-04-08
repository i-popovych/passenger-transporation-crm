import React, {useState} from 'react';
import {Button, Card, Col, Container, Form, FormSelect, Row} from "react-bootstrap";
import {ref, update} from "firebase/database";
import {deleteUser} from "firebase/auth"
import {db, auth} from "../index";

const UserItem = ({uid, ...userData}) => {
    const {
        username, age, role
    } = userData
    const [isChange, setIsChange] = useState(false)
    const [changedRole, setChangedRole] = useState(null)

    const handleUpdate = async (e) => {
        e.preventDefault()
        console.log(uid)
        try {
            await update(ref(db), {
                [`/users/${uid}`]: {
                    ...userData,
                    role: changedRole
                }
            })
            setIsChange(false)
        } catch (e) {
            setChangedRole(null)
        }
    }

    const handleRemoveUser = (e) => {
        e.preventDefault();
        deleteUser(auth.currentUser)
        update(ref(db), {
            [`/users/${uid}`]: null
        })

    }

    const handleChangeRole = (e) => {
        e.preventDefault()
        setChangedRole(e.target.value)
    }

    return (
        <Container className="d-flex justify-content-center">
            <Card style={{width: '30rem', margin: "10px"}}>
                <Card.Body>
                    <Row>
                        <Col>

                            <Card.Title>{username}</Card.Title>
                            <Card.Text>
                                age: {age}
                            </Card.Text>
                            {isChange
                                ? <Form.Select aria-label="Default select example" value={changedRole || role}
                                               onChange={handleChangeRole}>
                                    <option value="Driver">Driver</option>
                                    <option value="Passenger">Passenger</option>
                                </Form.Select>
                                : <Card.Text>
                                    role: {role}
                                </Card.Text>
                            }

                        </Col>
                    </Row>
                    <Row style={{marginTop: "10px"}}
                    >
                        <Col>
                            <Button variant="primary"
                                    style={{ marginRight: "10px" }}
                                    onClick={() => setIsChange(prev => !prev)}>
                                {isChange ? "Cancel" : "Change user"}</Button>
                            {!isChange && <Button variant="primary"
                                     style={{marginRight: "10px"}}
                                     onClick={handleRemoveUser}>Delete user from database</Button>}
                            {isChange && <Button variant="primary" onClick={handleUpdate}>Apply changing</Button>}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UserItem;