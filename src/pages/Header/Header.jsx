import React, {useContext, useRef} from 'react';
import {Button, Col, Container, Navbar, Row} from "react-bootstrap";
import "./Header.css"
import {AuthUserContext} from "../../App";
import {signOut} from "firebase/auth";
import {auth} from "../../index";
import {NavLink} from "react-router-dom";


const Header = () => {
    const {currentUser} = useContext(AuthUserContext);
    const ref = useRef()
    return (
        <>
                <Container fluid style={{backgroundColor: "#eceff1", padding: "7px 0px"}}>
                    <Row>
                        <Col>
                            <Navbar.Text>
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
                            </Navbar.Text>
                        </Col>
                        <Col>
                            <Navbar.Text>
                                {currentUser?.fullName && currentUser.fullName + ': ' + currentUser.role}
                            </Navbar.Text>
                        </Col>
                        <Col>
                            {currentUser?.fullName && <Button onClick={(e) => {
                                e.preventDefault()
                                localStorage.removeItem('uid')
                                signOut(auth)
                            }
                            } variant='primary'>log out</Button>}
                            {!currentUser?.fullName && <NavLink to={'/registration'}><Button className="mr-1">Registration</Button></NavLink>}
                            {!currentUser?.fullName && <NavLink to={'/login'}><Button>Sign in</Button></NavLink>}
                        </Col>
                    </Row>
                </Container>
        </>
    );
};

export default Header;