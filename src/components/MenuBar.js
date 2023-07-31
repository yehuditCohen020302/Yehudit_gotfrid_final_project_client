import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import logo from '../images/logo-3.png';
import '../css/menuBar.css';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const NavTabs = () => {
    const [value, setValue] = React.useState(0);
    const history = useHistory();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const logoutUser = () => {
        localStorage.setItem('user-details', JSON.stringify(null));
        history('/')
    }

    return (
        <Box sx={{ width: '100%', backgroundColor: "aliceblue", display: "flex" }}>
            <img src={logo} alt='' className='logo-img' />

            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example">

                <Tab
                    label="Manager Page"
                    to="/managerPage"
                    component={Link}
                />
                <Tab
                    label="User Page"
                    to="/userPage"
                    component={Link}
                />
              
            </Tabs>
            {console.log(JSON.parse(localStorage.getItem('user-details'))!=null)}
            {JSON.parse(localStorage.getItem('user-details')) !=null && <div onClick={() => logoutUser()} style={{ color: '#038948', cursor: 'pointer', fontWeight: 'bold' }}>Logout <FiLogOut /></div>}
        </Box>
    );
}
export default NavTabs;
