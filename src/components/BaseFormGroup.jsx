import React from 'react';
import {Form} from "react-bootstrap";

const BaseFormGroup = ({regData, setRegData}) => {
    console.log(regData)
    return (
        <>
            <Form.Group controlId="username" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={regData.username}
                              onChange={(e) => setRegData({...regData, username: e.target.value})}
                />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={regData.password}
                              onChange={(e) => setRegData({...regData, password: e.target.value})}/>
            </Form.Group>
            <Form.Group controlId="age" className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control type="age" placeholder="Enter your age" value={regData.age}
                              onChange={(e) => setRegData({...regData, age: e.target.value})}/>
            </Form.Group>

            <Form.Select aria-label="Default select example" value={regData.role}
                         className="mb-3"
                         onChange={(e) => setRegData({...regData, role: e.target.value})}>
                <option>Choose your role</option>
                <option value="Driver">Driver</option>
                <option value="Passenger">Passenger</option>
            </Form.Select>
        </>
    );
};

export default BaseFormGroup;