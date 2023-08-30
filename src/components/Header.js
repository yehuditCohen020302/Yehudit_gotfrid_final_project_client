
import * as React from 'react';
import '../css/userDiary.css';
import { useEffect } from 'react';
import { actions } from '../Redux/action';
import { connect } from 'react-redux';
import '../css/userMessages.css';
import { BiCalendar, BiTimeFive } from 'react-icons/bi';
import { FcManager, FcBusinesswoman, FcBusinessman } from 'react-icons/fc';
import { AiOutlineLogout, AiOutlineLogin } from 'react-icons/ai';

function mapStateToProps(state) {
  return {
    userDetails: state.usersReducer.userDetails,
  }
}
const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(function Header(props) {
  const { userDetails, setNavigateToPages } = props;
  // const currentUser = JSON.parse(localStorage.getItem('user-details'))
  const [kindOfUser, setKindOfUser] = React.useState(JSON.parse(localStorage.getItem('kind-of-user')));
  
  const logoutUser = () => {
    localStorage.clear()
    setNavigateToPages("home")
    setKindOfUser(JSON.parse(localStorage.getItem('kind-of-user')))
  }

  const loginUser = () => {
    setNavigateToPages('login')
  }


  return (
    <div className=''>
      <div className="header-main">
        <div className="welcome-title">{kindOfUser === 'manager' ? <FcManager style={{ fontSize: '28px' }} /> : kindOfUser === 'simpleUser' ? <FcBusinesswoman style={{ fontSize: '28px' }} /> : <FcBusinessman style={{ fontSize: '28px' }} />}{kindOfUser === 'simpleUser' ? `Welcome ${userDetails?.firstName + ' ' + userDetails?.lastName}` : kindOfUser === 'manager' ? "Welcom Manager" : 'Welcome guest'}</div>
        {kindOfUser === null ?
          <button onClick={() => loginUser()} className="btn-login">
            Login <AiOutlineLogin />
          </button> :
          <button className="btn-logout" onClick={() => logoutUser()}>
            Logout <AiOutlineLogout />
          </button>}
      </div>
    </div>
  );
})
