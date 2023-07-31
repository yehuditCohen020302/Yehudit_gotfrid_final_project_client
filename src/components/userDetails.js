import Typography from '@mui/material/Typography';
import '../css/userPage.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BiUserCircle, BiUser } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { GiRotaryPhone, GiBodyHeight } from 'react-icons/gi';
import { FaWeight } from 'react-icons/fa';
import { FiSave } from 'react-icons/fi';
import { MdOutlineEmail } from 'react-icons/md';
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { actions } from '../Redux/action';
import { RiLockPasswordLine } from 'react-icons/ri';
import logo from '../images/logo-3.png';

const mapDispatchToProps = (dispatch) => ({
    createNewUser: (user) => dispatch(actions.createNewUser(user)),
    getAllUsers: () => dispatch(actions.getAllUsers()),
})

export default connect(null, mapDispatchToProps)(function UserDetails(props) {
    const { isManagerPage, createNewUser, getAllUsers } = props;
    const userId = useRef('')
    const firstName = useRef('')
    const lastName = useRef('')
    const phone = useRef('')
    const email = useRef('')
    const height = useRef('')
    const weights = useRef('')
    const password = useRef('')
    const [isUserSaved, setIsUserSaved] = useState(false);
    const userDetails = JSON.parse(localStorage.getItem('user-details'));

    const saveUserDetails = () => {
        const newUser = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            phoneNumber: phone.current.value,
            email: email.current.value,
            height: height.current.value,
            weights: weights.current.value,
            password: password.current.value
        }
        createNewUser(newUser).then((res) => {
            setIsUserSaved(true);
            setTimeout(async () => {
                setIsUserSaved(false);
                await getAllUsers();
            }, 3000);
        });
    }
    return (
        <div className="user-details-main-div">
            {isUserSaved ? <div className='success-save'>The User Was Successfully Saved !
                <img src={logo} alt='' className='logo-img2' />
            </div> :
                <div className="user-details-form">
                    <Typography gutterBottom variant="h5" component="div">
                        User Details:
                    </Typography>

                    {!isManagerPage && <InputGroup className="mb-3">
                        <InputGroup.Text id="id"><BiUserCircle /></InputGroup.Text>
                        <Form.Control
                            placeholder="Id"
                            aria-label="Id"
                            aria-describedby="id"
                            ref={userId}
                            defaultValue={!isManagerPage ? userDetails?._id : ''}
                        />
                    </InputGroup>
                    }
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="firstName"><AiOutlineUser /></InputGroup.Text>
                        <Form.Control
                            placeholder="First Name"
                            aria-label="First Name"
                            aria-describedby="firstName"
                            ref={firstName}
                            defaultValue={!isManagerPage ? userDetails.firstName : ''}
                            required
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="lastName"><BiUser /></InputGroup.Text>
                        <Form.Control
                            placeholder="Last Name"
                            aria-label="Last Name"
                            aria-describedby="lastName"
                            ref={lastName}
                            defaultValue={!isManagerPage ? userDetails.lastName : ''}
                        />

                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="phoneNumber"><GiRotaryPhone /></InputGroup.Text>
                        <Form.Control
                            placeholder="Phone Number"
                            aria-label="Phone Number"
                            aria-describedby="phoneNumber"
                            ref={phone}
                            defaultValue={!isManagerPage ? userDetails.phoneNumber : ''}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="email"><MdOutlineEmail /></InputGroup.Text>
                        <Form.Control
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="email"
                            ref={email}
                            defaultValue={!isManagerPage ? userDetails.email : ''}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="password"><RiLockPasswordLine /></InputGroup.Text>
                        <Form.Control
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="password"
                            ref={password}
                            defaultValue={!isManagerPage ? userDetails.password : ''}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="height"><GiBodyHeight /></InputGroup.Text>
                        <Form.Control
                            placeholder="Height"
                            aria-label="Height"
                            aria-describedby="height"
                            ref={height}
                            defaultValue={!isManagerPage ? userDetails.height : ''}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="weights"><FaWeight /></InputGroup.Text>
                        <Form.Control
                            placeholder="Weights"
                            aria-label="Weights"
                            aria-describedby="weights"
                            ref={weights}
                            defaultValue={!isManagerPage ? userDetails.weights : ''}
                        />
                    </InputGroup>
                    <Button variant="info" className='btn-save-details' onClick={() => saveUserDetails()}>Save <FiSave /></Button>
                </div>}

        </div>
    );
})
