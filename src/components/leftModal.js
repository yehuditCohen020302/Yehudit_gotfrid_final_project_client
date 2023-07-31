import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import UserDetails from './userDetails';
import '../css/leftModal.css';

function LeftModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className='btn-add-user' variant="primary" onClick={handleShow}>
                Add New User
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Body>
                    <UserDetails isManagerPage ={true}/>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default LeftModal;