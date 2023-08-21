import "../css/App.css";
import React from "react";
import BasicTable from "./managerPage";
import { UserPage } from "./userPage";
import HomePage from "./homePage";
import { Provider } from 'react-redux'
import Store from '../Redux/store'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import MainPage from "./MainPage";
import { useState } from "react";
import UserMessages from "./userMessages";
import ManagerMessagse from "./managerMessagse";
import { FcManager, FcBusinesswoman, FcBusinessman } from 'react-icons/fc';
import { AiOutlineLogout, AiOutlineLogin } from 'react-icons/ai';
import { useEffect } from "react";

export default function App() {
  const [kindOfUser, setKindOfUser] = useState(JSON.parse(localStorage.getItem('kind-of-user')));
  const currentUser = JSON.parse(localStorage.getItem('user-details'));
  const [navigateToPages, setNavigateToPages] = useState('home')

  const logoutUser = () => {
    localStorage.clear()
    setNavigateToPages("home")
    setKindOfUser(JSON.parse(localStorage.getItem('kind-of-user')))
  }

  const loginUser = () => {
    setNavigateToPages('login')
  }

  const viewTabs = () => {
    return (
      <>
        <div>
          <div className="buttons-for-navigat row">
            <div className={navigateToPages === 'home' ? "btn-nabigate-choosed col-2" : "btn-nabigate col-2"}
              onClick={() => setNavigateToPages('home')}>
              Home
            </div>

            {kindOfUser == 'manager' &&
              <div className={navigateToPages === 'manager-page' ? "btn-nabigate-choosed col-2" : "btn-nabigate col-2"}
                onClick={() => setNavigateToPages('manager-page')}>
                Manager Page
              </div>}

            {kindOfUser == 'manager' &&
              <div className={navigateToPages === 'manager-messages' ? "btn-nabigate-choosed col-2" : "btn-nabigate col-2"}
                onClick={() => setNavigateToPages('manager-messages')}>
                Manager Messages
              </div>}

            {kindOfUser == 'simpleUser' &&
              <div className={navigateToPages === 'user' ? "btn-nabigate-choosed col-2" : "btn-nabigate col-2"}
                onClick={() => setNavigateToPages('user')}>
                My Work
              </div>}

            {kindOfUser == 'simpleUser' &&
              <div className={navigateToPages === 'user-messages' ? "btn-nabigate-choosed col-2" : "btn-nabigate col-2"}
                onClick={() => setNavigateToPages('user-messages')}>
                Messages From Manager
              </div>}

            <div className={`btn-nabigate-choosed-1 ${kindOfUser === null ? 'col-10' : 'col-6'}`}></div>

          </div>
          {navigateToPages === "home" && <MainPage />}
          {navigateToPages === "manager-page" && <BasicTable />}
          {navigateToPages === "manager-messages" && <ManagerMessagse />}
          {navigateToPages === "user" && <UserPage />}
          {navigateToPages === "user-messages" && <UserMessages />}
          {navigateToPages === "login" && <HomePage setNavigateToPages={setNavigateToPages} setKindOfUser={setKindOfUser} />}
        </div>
      </>
    )
  }

  return (
    <div>
      <Provider store={Store}>
        <div className="header-main">
          <div className="welcome-title">{kindOfUser === 'manager' ? <FcManager style={{ fontSize: '28px' }} /> : kindOfUser === 'simpleUser' ? <FcBusinesswoman style={{ fontSize: '28px' }} /> : <FcBusinessman style={{ fontSize: '28px' }} />}{kindOfUser === 'simpleUser' ? `Welcome ${currentUser?.firstName + ' ' + currentUser?.lastName}` : kindOfUser === 'manager' ? "Welcom Manager" : 'Welcome guest'}</div>
          {kindOfUser === null ?
            <button onClick={() => loginUser()} className="btn-login">
              Login <AiOutlineLogin />
            </button> :
            <button className="btn-logout" onClick={() => logoutUser()}>
              Logout <AiOutlineLogout />
            </button>}
        </div>
        {viewTabs()}
      </Provider>
    </div>

  );
};