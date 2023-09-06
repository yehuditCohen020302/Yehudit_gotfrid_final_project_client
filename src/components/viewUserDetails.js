import Typography from '@mui/material/Typography';
import '../css/userPage.css';
import { BiUserCircle, BiUser } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { GiRotaryPhone, GiBodyHeight } from 'react-icons/gi';
import { FaWeight } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

export default function ViewUserDetails() {
    const userDetails = JSON.parse(localStorage.getItem('user-details'));
    const bmi = (userDetails?.weights)/((userDetails?.height)*(userDetails?.height));
    const _energy=(userDetails?.weights)*30;
    return (
        <div className="user-details-main-div">

            <div className="user-details-form">
                <Typography gutterBottom variant="h5" component="div">
                    User Details:
                </Typography>

                <div className='item-detail'>
                    <div className='title-detail'><BiUserCircle /> Id</div>
                    <span className='item-detail-content'>{userDetails?._id}</span>
                </div>
                <div className='item-detail'>
                    <div className='title-detail'><BiUser /> First Name</div>
                    <span className='item-detail-content'>{userDetails?.firstName}</span>
                </div>
                <div className='item-detail'>
                    <div className='title-detail'><AiOutlineUser /> Last Name</div>
                    <span className='item-detail-content'>{userDetails?.lastName}</span>
                </div>
                <div className='item-detail'>
                    <div className='title-detail'><MdOutlineEmail /> Email</div>
                    <span className='item-detail-content'>{userDetails?.email}</span>
                </div>
                <div className='item-detail'>
                    <div className='title-detail'><RiLockPasswordLine /> Password</div>
                    <span className='item-detail-content'>{userDetails?.password}</span>
                </div>
                <div className='item-detail'>
                    <div className='title-detail'><GiRotaryPhone /> Phone Number</div>
                    <span className='item-detail-content'>{userDetails?.phoneNumber}</span>
                </div>
                <div className='item-detail'>
                    <div className='title-detail'><GiBodyHeight /> Height</div>
                    <span className='item-detail-content'>{userDetails?.height}</span>
                </div>
                <div className='item-detail'>
                    <div className='title-detail'><FaWeight /> Weights</div>
                    <span className='item-detail-content'>{userDetails?.weights}</span>
                </div>
                <div className='item-detail'>
                    <div className='title-detail'> BMI</div>
                    <span className='item-detail-content'>{bmi}</span>
                </div>
                <div className='item-detail'>
                    <div className='title-detail'> מספר קלוריות ליום</div>
                    <span className='item-detail-content'>{_energy}</span>
                </div>
            </div>

        </div>
    );
}