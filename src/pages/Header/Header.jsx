import React, {useContext, useRef} from 'react';
import {Button, Col, Container, Navbar, Row} from "react-bootstrap";
import "./Header.css"
import {AuthUserContext} from "../../App";
import {signOut} from "firebase/auth";
import {auth} from "../../index";
import {NavLink} from "react-router-dom";


const Header = () => {
    const {currentUser, isInitialize, setCurrentUser} = useContext(AuthUserContext);
    const ref = useRef()

    const handleRemove = async (e) => {
        e.preventDefault()
        localStorage.removeItem('uid')
        try {
            await signOut(auth)
            setCurrentUser(null)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Container fluid style={{backgroundColor: "#eceff1", padding: "7px 0px"}}>
            <Row>
                <Col sm={4}>
                    <div>
                        <div className="hamburger-menu">
                            <input id="menu__toggle" type="checkbox" ref={ref}/>
                            <label className="menu__btn" htmlFor="menu__toggle">
                                <span></span>
                            </label>

                            <ul className="menu__box" onClick={() => ref.current.click()}>
                                <li><NavLink className="menu__item" to="/trips">See available trips</NavLink></li>
                                <li><NavLink className="menu__item" to="/create-trip">Create trips</NavLink></li>
                                <li><NavLink className="menu__item" to="/dashboard">User management</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col className="text-right mt-2">
                        {
                            isInitialize
                                ? currentUser?.fullName ? currentUser.fullName + ': ' + currentUser.role : "You're not authorized"
                                : "Loading..."
                        }
                </Col>
                <Col className="text-center">
                    {currentUser?.fullName && <Button onClick={handleRemove}
                                                      variant='primary'>log out</Button>}
                    {!currentUser?.fullName &&
                        <NavLink to={'/registration'}><Button className="mr-2">Registration</Button></NavLink>}
                    {!currentUser?.fullName && <NavLink to={'/login'}><Button>Sign in</Button></NavLink>}
                </Col>
            </Row>
        </Container>
    );
};

export default Header;