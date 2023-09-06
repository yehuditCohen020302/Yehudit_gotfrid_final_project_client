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
import Alert from 'react-bootstrap/Alert';
import { GiFruitBowl } from 'react-icons/gi';

function mapStateToProps(state) {
  return {
    allUsers: state.usersReducer.allUsers,
    diaryByCurrentUser: state.diaryReducer.diaryByCurrentUser,
    isDiary: state.diaryReducer.isDiary,
  }
}
const mapDispatchToProps = (dispatch) => ({
  getAllUsers: () => dispatch(actions.getAllUsers()),
  deleteUser: (_id) => dispatch(actions.deleteUser(_id)),
  sendMessageToUser: (_id) => dispatch(actions.sendMessageToUser(_id)),
  getDiaryByUser: (id) => dispatch(actions.getDiaryByUser(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(function BasicTable(props) {
  const { getDiaryByUser, getAllUsers, allUsers, deleteUser, sendMessageToUser,
    diaryByCurrentUser, isDiary } = props;
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

  const getDiaryUsers = async (index) => {
    await getDiaryByUser(allUsers?.[index]?._id)
  }

  async function removeUser(_id) {
    await deleteUser(_id).then(async () => {
      await getAllUsers();
    });
  }
  let a;

  const sendMessage = () => {
    sendMessageToUser({ userId: allUsers?.[showIndex]?._id, message: message.current.value })
      .then(() => {
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
            <th>Email</th>
            {/* <th>id</th> */}

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
              <td>{user?.email}</td>
              {/* <td>{user?.password}</td> */}

              <td className="delete-user" onClick={() => removeUser(user?._id)}><MdOutlineDeleteForever /></td>
              <td className="show-user" onClick={() => { setShowIndex(index); setShowDetails(true); getDiaryUsers(index) }}><RiPictureInPictureExitLine /></td>
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
          <p className='p-t'><FaWeight /> BMI</p><span >{(allUsers?.[showIndex]?.weights)/((allUsers?.[showIndex]?.height)*(allUsers?.[showIndex]?.height))}</span>
          
          <div className='all-diary-for-m' >
            {isDiary ? diaryByCurrentUser?.diaryDays?.slice(-3).map((day, i )=>
              i < 3 &&

              <div>
                <div className="title"> {day?.date}</div>
                <div>
                  <div >
                    {day?.meals?.map((item, index) =>
                      <>
                        <div className="lable">{item?.label}</div>
                        {/* <div className="all-params">
                          <p className="p-t1"><p className="b-param"> <b>אנרגיה:</b> </p>  {item?.energy}</p>
                          <p className="p-t1"><p className="b-param"> <b>אשלגן: </b> </p>{item?.ashlegan}</p>
                          <p className="p-t1"><p className="b-param"> <b>נתרן: </b> </p> {item?.natran}</p>
                          <p className="p-t1"> <p className="b-param"><b>סוכר:</b>  </p>  {item?.total_sugars}</p>
                        </div > */}
                      </>
                    )}
                  </div>

                </div>
                <div className="lable">סך הכל :</div>
                <div className="all-params">
                  <p ><p className="b-param"> אנרגיה: </p>
                    {a = day?.meals?.reduce(function (prev, current) {
                      return prev + +current.energy
                    }, 0)}
                  </p>
                    <p ><p className="b-param"> אשלגן: </p>
                    {a = day?.meals?.reduce(function (prev, current) {
                      return prev + +current.ashlegan
                    }, 0)}
                  </p>
                  
                    <p ><p className="b-param"> נתרן: </p>
                    {a = day?.meals?.reduce(function (prev, current) {
                      return prev + +current.natran
                    }, 0)}
                  </p>
                  <p > <p className="b-param">סוכר: </p>
                    {a = day?.meals?.reduce(function (prev, current) {
                      return prev + +current.total_sugars
                    }, 0).toFixed(2)}
                  </p>
                </div>
                <br/><hr/>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <GiFruitBowl className="icons-f" />
                  <GiFruitBowl className="icons-f" />
                  <GiFruitBowl className="icons-f" />
                </div>
              </div>

            ) :
              <Alert key='secondary' variant='secondary'>
                This user hasn't added food yet!
              </Alert>
            }</div>
          <Button className="btn-contact" onClick={() => { setShowContact(true); setShowContactMessage(false) }}>Contact User</Button>
          {showContact && <div>
            <Form.Control ref={message} as="textarea" rows={3} />
            <Button onClick={() => sendMessage()} className="btn-send-1 mt-3">Send</Button>
          </div>}
          {showContactMessage && <div className="message-send">The message has been sent !</div>}
        </Modal.Body>
      </Modal>
    </>
  );
})