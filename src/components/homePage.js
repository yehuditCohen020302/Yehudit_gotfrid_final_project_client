import React, { useState } from 'react';
import userIcon from '../images/user-icon.svg';
import '../css/homePage.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { actions } from '../Redux/action';
import { connect } from 'react-redux';
import { PiPasswordLight } from 'react-icons/pi';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import Alert from 'react-bootstrap/Alert';

const mapDispatchToProps = (dispatch) => ({
    login: (user) => dispatch(actions.loginUser(user)),
})

export default connect(null, mapDispatchToProps)(function HomePage(props) {
    const { login, setNavigateToPages, setKindOfUser } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const loginUser = () => {
        const user = {
            email: email,
            password: password
        }
        if (email == 'manager@gmail.com' && password == "manager123") {
            localStorage.setItem('kind-of-user', JSON.stringify('manager'));
            setKindOfUser('manager')
            setNavigateToPages("home")
        }
        else {
            login(user).then((res) => {
                if (res.message === "user not found") {
                    setIsLogin(true);
                    setTimeout(() => {
                        setIsLogin(false)
                    }, 3000);
                }
                else {
                    localStorage.setItem('kind-of-user', JSON.stringify('simpleUser'));
                    setKindOfUser('simpleUser')
                    setNavigateToPages("home")
                }
            })
        }
    }

    return (
        <div className="body">
            <div className="login-form">
                <div className="login-form-text">
                    <div className="sign-in-title">
                        <img src={userIcon} alt="user-icon" className="icon"></img>
                        <h1>Sign In</h1>
                    </div>
                    <br></br>
                    <div>
                        <Form.Label htmlFor="inputPassword5">Email</Form.Label><br />
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="Email">@</InputGroup.Text>
                            <Form.Control
                                placeholder="Email"
                                aria-label="Email"
                                aria-describedby="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </InputGroup>
                        <Form.Label htmlFor="inputPassword5">Password</Form.Label><br />
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="Password"><PiPasswordLight /></InputGroup.Text>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="Password"
                                onChange={(e) => setPassword(e.target.value)}

                            />
                            <span className='eye-pass' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <BsEyeSlash /> : <BsEye />}</span>
                        </InputGroup>
                        <Button style={{ width: '100%' }} variant="info" onClick={() => loginUser()}>Login</Button>
                        {isLogin && <Alert key="warning" variant="warning">
                            We did not find you in the system. Contact the manager.
                        </Alert>}
                    </div>
                    <br />
                </div>
            </div>
            <div className="wellcome-container">
                <div className="wellcome-title">Welcome to the Weight Watchers group</div>
            </div>
        </div>
    )
}
)