import { useEffect } from "react";
import * as React from "react";
import LeftModal from "./leftModal";
import { connect } from "react-redux";
import { actions } from "../Redux/action";
import Table from 'react-bootstrap/Table';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { RiPictureInPictureExitLine } from 'react-icons/ri';
import '../css/managerPage.css';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useRef } from "react";
import { BiUserCircle, BiUser } from 'react-icons/bi';
import { GiRotaryPhone, GiBodyHeight } from 'react-icons/gi';
import { FaWeight } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

function mapStateToProps(state) {
  return {
    allUsers: state.usersReducer.allUsers
  }
}
const mapDispatchToProps = (dispatch) => ({
  getAllUsers: () => dispatch(actions.getAllUsers()),
  deleteUser: (_id) => dispatch(actions.deleteUser(_id)),
  sendMessageToUser: (_id) => dispatch(actions.sendMessageToUser(_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(function BasicTable(props) {
  const { getAllUsers, allUsers, deleteUser, sendMessageToUser } = props;
  const [showIndex, setShowIndex] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showContactMessage, setShowContactMessage] = useState(false);
  const message = useRef('');

  useEffect(() => {
    const getUsers = async () => {
      await getAllUsers();
    }
    getUsers()
  }, []);

  async function removeUser(_id) {
    await deleteUser(_id).then(async () => {
      await getAllUsers();
    });
  }

  const sendMessage=()=>{
    sendMessageToUser({ userId: allUsers?.[showIndex]?._id, message: message.current.value })
    .then(()=>{
      setShowContactMessage(true)
      setShowContact(false)
    })
  }
  return (
    <>
      <h2>Users :</h2>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>

            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user, index) =>
            <tr>
              <td>{index + 1}</td>
              <td>{user?.firstName}</td>
              <td>{user?.lastName}</td>
              <td>{user?.phoneNumber}</td>

              <td className="delete-user" onClick={() => removeUser(user?._id)}><MdOutlineDeleteForever /></td>
              <td className="show-user" onClick={() => { setShowIndex(index); setShowDetails(true) }}><RiPictureInPictureExitLine /></td>
            </tr>
          )}
        </tbody>
      </Table>
      <LeftModal />

      <Modal
        show={showDetails}
        onHide={() => setShowDetails(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Contact: </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: '#f9f9f9' }}>
          <p className="p-t"> <BiUserCircle /> First Name: </p>  {allUsers?.[showIndex]?.firstName}<br /><br />
          <p className="p-t"><BiUser /> Last Name: </p>{allUsers?.[showIndex]?.lastName}<br /><br />
          <p className="p-t"><MdOutlineEmail /> Email:  </p>{allUsers?.[showIndex]?.email}<br /><br />
          <p className="p-t"><GiRotaryPhone /> Phone Number:</p>  {allUsers?.[showIndex]?.phoneNumber}<br /><br />
          <p className="p-t"><GiBodyHeight /> Height: </p>{allUsers?.[showIndex]?.height}<br /><br />
          <p className="p-t"><FaWeight /> Weights:</p> {allUsers?.[showIndex]?.weights}<br /><br />
          <Button className="btn-contact" onClick={() => {setShowContact(true); setShowContactMessage(false)}}>Contact User</Button>
          {showContact && <div>
            <Form.Control ref={message} as="textarea" rows={3} />
            <Button  onClick={() => sendMessage()} className="btn-send-1 mt-3">Send</Button>
          </div>}
         {showContactMessage&& <div className="message-send">The message has been sent !</div>}
        </Modal.Body>
      </Modal >
    </>
  );
})