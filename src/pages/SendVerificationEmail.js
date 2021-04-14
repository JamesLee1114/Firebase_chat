import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";

const EmailConfirm = () => {
    
    const [message, setMessage] = useState('');

    useEffect(async () => {
        auth().currentUser.sendEmailVerification().then(function() {
            // Email sent.
            setMessage("Verification Email was sent!")
        }).catch(function(error) {
            // An error happened.
            setMessage(error)
        });
    }, []);

    return (
        <div>{message}</div>
    )
}

export default EmailConfirm;