import React, { useState } from "react";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import SimpleReactValidator from 'simple-react-validator';

const LoginForm = (props) => {

    const validator = new SimpleReactValidator({ autoForceUpdate: this });

    //getter,setter for state
    const [state, setState] = useState({});

    //input onchange handler
    const handleChange = fieldName => event => {
        setState({ ...state, [fieldName]: event.target.value });
    }

    const handleSubmit = () => {
        console.log("Click on login")
        if (validator.allValid()) {
            console.log("Validated")
            props.onLogin({ email: state.email, password: state.password });
        } else {
            validator.showMessages();
        }
    }

    const emailAdornment = (
        <InputAdornment position="start">
            <PersonIcon />
        </InputAdornment>
    )

    const passwordAdornment = (
        <InputAdornment position="start">
            <LockIcon />
        </InputAdornment>
    )
    return (
        <Card className="login-form">
            <Typography className="title" color="textSecondary" gutterBottom>
                Login
            </Typography>
            <div className="email">
                <InputLabel htmlFor="email">Username</InputLabel>
                <Input
                    id="email"
                    value={state.email}
                    onChange={handleChange('email')}
                    onBlur={validator.showMessageFor("email")}
                    startAdornment={emailAdornment}
                />
            </div>
            {validator.message('email', state.email, 'required|email', { className: "validate-email" })}
            <div className="password">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                    id="password"
                    value={state.password}
                    onChange={handleChange('password')}
                    onBlur={validator.showMessageFor("password")}
                    type="password"
                    startAdornment={passwordAdornment}
                />
            </div>
            {validator.message('password', state.password, 'required', { className: "validate-password" })}
            <div className="wrapper-login-button" onClick={handleSubmit}>
                <div className="login-bg-button"></div>
                <Button variant="contained" color="primary" className="login-button">
                    Login
                </Button>
            </div>

        </Card>
    )
}

export default LoginForm;