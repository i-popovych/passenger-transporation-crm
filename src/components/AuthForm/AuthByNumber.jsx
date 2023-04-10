import React, {useContext, useState} from 'react';
import {RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import {auth} from "../../index"
import {Button, Form} from "react-bootstrap";
import {AuthUserContext} from "../../App";


const AuthByNumber = ({writeToDB, setIsLoading, setMessage, isReg}) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [expandForm, setExpandForm] = useState(false);
    const [otp, setOtp] = useState('')
    const {setUserDataByUid} = useContext(AuthUserContext)

    const generateRe = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
            }
        }, auth);
    }

    const requestOTP = (e) => {
        e.preventDefault()
        if (phoneNumber.length >= 12) {
            setExpandForm(true)
            generateRe()
            let appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                .then(conf => {
                    window.confirmationResult = conf
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }

    const verifyOTP = (e) => {
        let otp = e.target.value
        setOtp(otp)

        if (otp.length === 6) {
            setIsLoading(true)
            window.confirmationResult.confirm(otp).then((result) => {
                debugger
                const user = result.user;
                console.log(user)
                if (isReg) writeToDB(user.uid)
                else setUserDataByUid(user.uid)
                setMessage(`You have successfully ${isReg ? 'registered' : 'authorized'}`)
            }).catch(() => {
                setMessage("Some error :(")
            }).finally(() => {
                setIsLoading(false)
            });
        }
    }

    return (
        <>
            <Form>
                <div className="mb-3">
                    <label htmlFor="phoneNumberInput" className="form-label">Phone number</label>
                    <input
                        value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                        type="tel" className="form-control" id="phoneNumberInput" aria-describedby="emailHelp"/>
                </div>
                {
                    expandForm && (
                        <div className="mb-3">
                            <label htmlFor="otpInput" className="form-label">OTP</label>
                            <input type="number" className="form-control" id="otpInput" value={otp}
                                   onChange={verifyOTP}/>
                            <div id="otpHelp" className="form-text">Please enter the one time pin sent to your phone
                            </div>
                        </div>
                    )
                }
                {
                    !expandForm && (
                        <Button type="submit" className="bth bth-primary" onClick={requestOTP}>Request OTP</Button>
                    )
                }
            </Form>
            <div id="sign-in-button"></div>
        </>
    )

};

export default AuthByNumber;