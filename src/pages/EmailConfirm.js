import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { Link, useHistory } from "react-router-dom";

const EmailConfirm = (props) => {

    const [message, setMessage] = useState('');
    const history = useHistory();

    useEffect(async () => {
        var actionCode = getParameterByName('oobCode');
        var continueUrl = getParameterByName('continueUrl');
        var lang = getParameterByName('lang') || 'en';
        handleVerifyEmail(auth, actionCode, continueUrl, lang);
    }, []);

    const handleVerifyEmail = (auth, actionCode, continueUrl, lang) => {
        // Localize the UI to the selected language as determined by the lang
        // parameter.
        // Try to apply the email verification code.
        auth().applyActionCode(actionCode).then((resp) => {
            // Email address has been verified.
            setMessage("Email verified! Go to login!")
            // TODO: Display a confirmation message to the user.
            // You could also provide the user with a link back to the app.

            // TODO: If a continue URL is available, display a button which on
            // click redirects the user back to the app via continueUrl with
            // additional state determined from that URL's parameters.
        }).catch((error) => {
            // Code is invalid or expired. Ask the user to verify their email address
            // again.
        });
    }

    const getParameterByName = (paramName) => {
        return new URLSearchParams(props.location.search).get(paramName);
    }

    return (
        <div>{message} <button type="button" onClick={() => { props.emailVerifiy(true); history.push('/chat') }}>Go to chatroom!</button></div>
    )
}

export default EmailConfirm;