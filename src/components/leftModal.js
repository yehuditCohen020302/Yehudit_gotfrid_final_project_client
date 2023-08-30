import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import UserDetails from './userDetails';
import '../css/leftModal.css';
import logo from '../images/logo-3.png';

function LeftModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isUserSavedM, setIsUserSavedM] = useState(false);

    return (
        <>
            <Button className='btn-add-user' variant="primary" onClick={handleShow}>
                Add New User
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Body>
                    {isUserSavedM ? <div className='success-save'>The User Was Successfully Saved !
                        <img src={logo} alt='' className='logo-img2' />
                    </div> :
                        <UserDetails isManagerPage={true} setIsUserSavedM={setIsUserSavedM} />}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default LeftModal;