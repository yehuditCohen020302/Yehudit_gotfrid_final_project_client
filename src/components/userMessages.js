
import * as React from 'react';
import '../css/userDiary.css';
import { useEffect } from 'react';
import { actions } from '../Redux/action';
import { connect } from 'react-redux';
import '../css/userMessages.css';
import { BiCalendar, BiTimeFive } from 'react-icons/bi';

function mapStateToProps(state) {
  return {
    messagesByCurrentUser: state.usersReducer.messagesByCurrentUser,
  }
}
const mapDispatchToProps = (dispatch) => ({
  getMessagesByUser: (id) => dispatch(actions.getMessagesByUser(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(function UserMessages(props) {
  const { getMessagesByUser, messagesByCurrentUser } = props;
  const currentUser = JSON.parse(localStorage.getItem('user-details'))

  useEffect(() => {
    getMessagesByCurrentUser()
  }, [])

  const getMessagesByCurrentUser = () => {
    getMessagesByUser(currentUser?._id)
  }

  return (
    <div className=''>
      {messagesByCurrentUser?.messages?.map((item) =>
        <>

          <div className='div-time'>
            <div className='time-item'>
              <BiCalendar />
              <div>{`${new Date((item?.date)).getDate()}/${new Date((item?.date)).getMonth() + 1}/${new Date((item?.date)).getFullYear()}`}</div>
            </div>
            <div className='time-item'>
              <BiTimeFive />
              <div>{`${new Date((item?.date)).getHours()}:${new Date((item?.date)).getMinutes()}`}</div>
            </div>
          </div>
          <div className='message-content'>{item?.content}</div>
        </>
      )}

    </div>
  );
})
