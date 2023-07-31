import { useEffect } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { actions } from "../Redux/action";
import '../css/managerPage.css';
import '../css/managerMessages.css';
import { IoMdContact } from 'react-icons/io';
import { AiTwotoneDelete } from 'react-icons/ai';

function mapStateToProps(state) {
  return {
    allContactManager: state.usersReducer.allContactManager
  }
}
const mapDispatchToProps = (dispatch) => ({
  getMessagesManager: () => dispatch(actions.getMessagesManager()),
  removeUserContact: (id) => dispatch(actions.removeUserContact(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(function ManagerMessagse(props) {
  const { getMessagesManager, allContactManager, removeUserContact } = props;

  useEffect(() => {
    const getMessages = async () => {
      await getMessagesManager();
    }
    getMessages()
  }, []);

  async function removeUserContact1(_id) {
    await removeUserContact(_id).then(async () => {
      await getMessagesManager();
    });
  }

  return (
    <div className="main-div-messages">
      {allContactManager?.map((item) =>
        <div className="contact-manager">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px' }}>
            <IoMdContact />
            <AiTwotoneDelete className="remove-icon" onClick={() => removeUserContact1(item?._id)} />
          </div>
          <div>Date: {new Date((item?.date)).getDate()}/{new Date((item?.date)).getMonth() + 1}/{new Date((item?.date)).getFullYear()}</div>
          <div>Name: {item?.name}</div>
          <div>Email: {item?.email}</div>
          <div>Phone: {item?.phone}</div>
        </div>
      )}
    </div>
  );
})