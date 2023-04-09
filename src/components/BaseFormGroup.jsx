import React from 'react';
import {Form} from "react-bootstrap";

const BaseFormGroup = ({regData, setRegData}) => {
    console.log(regData)
    return (
        <>
            <Form.Group controlId="fullName" className="mb-3">
                <Form.Label>Full name</Form.Label>
                <Form.Control type="text" placeholder="Enter full name" value={regData.fullName}
                              onChange={(e) => setRegData({...regData, fullName: e.target.value})}
                />
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