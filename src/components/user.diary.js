
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';
import Button from 'react-bootstrap/Button';
import '../css/userDiary.css';
import logo from '../images/logo-3.png';
import AddFoodModal from './AddFoodModal';
import { useEffect } from 'react';
import { actions } from '../Redux/action';
import { connect } from 'react-redux';
import { today } from '../Redux/Middleware/users';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import img0 from '../images/food1.jpg';
import img1 from '../images/food2.jpg';
import img2 from '../images/food3.jpg';
import img3 from '../images/food4.jpg';
import img4 from '../images/food7.webp';
import img5 from '../images/food8.webp';
import img6 from '../images/food9.webp';
import img7 from '../images/food10.webp';
import img8 from '../images/food12.jpg';
import img9 from '../images/food13.jpg';
import img10 from '../images/food14.jpg';
import img11 from '../images/food15.jpg';
import Accordion from 'react-bootstrap/Accordion';

function mapStateToProps(state) {
  return {
    diaryByCurrentUser: state.diaryReducer.diaryByCurrentUser,
  }
}
const mapDispatchToProps = (dispatch) => ({
  getDiaryByUser: (id) => dispatch(actions.getDiaryByUser(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(function DenseTable(props) {
  const { getDiaryByUser, diaryByCurrentUser } = props;
  const currentUser = JSON.parse(localStorage.getItem('user-details'))
  
  const [todayDiary, setTodayDiary] = useState([])
  const [showAddFood, setShowAddFood] = useState(false);
  const [showLastDiary, setShowLastDiary] = useState(false);
  const [sumOfSugar, setSumOfSugar] = useState(0);

  console.log(sumOfSugar)

  useEffect(() => {
    getDiaryByUser1()
  }, [])


  useEffect(() => {
    filterTodayDiary()
  }, [diaryByCurrentUser])

  const filterTodayDiary = () => {
    setTodayDiary(diaryByCurrentUser?.diaryDays?.filter(x => x.date.toString() === today.toString()))
  }

  const getDiaryByUser1 = async () => {
    await getDiaryByUser(currentUser?._id)
  }
  let a;
  const imgArr = [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11];

  const viewDiaryByUser = () => {
    return (
      <>

        <Modal show={showLastDiary} fullscreen onHide={() => setShowLastDiary(false)}>
          <Modal.Header closeButton>
            <Modal.Title> Last Week Diary</Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-body-diary-week'>
            {diaryByCurrentUser?.diaryDays?.map((day, i) =>

              <Card className='card-diary-day' >
                <Card.Img style={{ height: '150px' }} variant="top" src={imgArr[i]} />
                <Card.Body>
                  <Card.Title> {day?.date}</Card.Title>
                  <Card.Text>
                    <Accordion defaultActiveKey="0">
                      {day?.meals?.map((item, index) =>
                        <Accordion.Item eventKey={index}>
                          <Accordion.Header>{item?.label}</Accordion.Header>
                          <Accordion.Body>
                            אנרגיה:   {item?.energy}<br />
                            אשלגן: {item?.ashlegan}<br />
                            נתרן: {item?.natran}<br />
                             סוכר:  {item?.total_sugars}
                          </Accordion.Body>
                        </Accordion.Item>
                      )}
                    </Accordion>

                  </Card.Text>
                  <div className="lable">בסך הכל :</div>
                  <div className="all-params">
                    <p className="p-t1"><p className="b-param"> אנרגיה: </p>
                      {a = day?.meals?.reduce(function (prev, current) {
                        return prev + +current.energy
                      }, 0)}
                    </p>
                    <p className="p-t1"><p className="b-param"> אשלגן: </p>
                      {a = day?.meals?.reduce(function (prev, current) {
                        return prev + +current.ashlegan
                      }, 0).toFixed(2) }
                    </p>

                    <p className="p-t1"><p className="b-param"> נתרן: </p>
                      {a = day?.meals?.reduce(function (prev, current) {
                        return prev + +current.natran
                      }, 0)}
                    </p>
                    <p className="p-t1"> <p className="b-param"> סוכר: </p>
                      {a = day?.meals?.reduce(function (prev, current) {
                        return prev + +current.total_sugars
                      }, 0).toFixed(2)}
                    </p>
                  </div >
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                
                  </div>
              
                </Card.Body>
              </Card>
            )}
          </Modal.Body>
        </Modal>

      </>
    )
  }

  return (
    <div className='divContainerDiary'>
      <div><img src={logo} alt='' className='logo-diary' />
        <h2>Your Diary: </h2>
        {todayDiary?.length > 0 ? <div>
          <Card style={{ width: '30rem' }}>
            <Card.Img style={{ height: '150px' }} variant="top" src={img1} />
            <Card.Body>
              <Card.Title>Today {todayDiary?.[0]?.date}</Card.Title>
              <Card.Text>
                <Accordion defaultActiveKey="0">
                  {todayDiary?.[0]?.meals?.map((item, index) =>
                    <Accordion.Item eventKey={index}>
                      <Accordion.Header>{item?.label}</Accordion.Header>
                      <Accordion.Body>
                        <b>אנרגיה:</b>   {item?.energy}<br />
                        <b>אשלגן: </b> {item?.ashlegan}<br />
                        <b>נתרן: </b> {item?.natran}<br />
                        <b> סוכר:</b> {item?.total_sugars}
                      </Accordion.Body>
                    </Accordion.Item>
                  )}
                </Accordion>

              </Card.Text>
              <div className="lable">בסך הכל :</div>
                  <div className="all-params">
                    <p ><p className="b-param"> אנרגיה: </p>
                    {todayDiary?.[0]?.meals?.reduce(function(prev, current) 
                     { return prev + +current.energy
                      }, 0)}
                    </p>
                    <p ><p className="b-param"> אשלגן: </p>
                    {todayDiary?.[0]?.meals?.reduce(function(prev, current){
                        return prev + +current.ashlegan
                      }, 0).toFixed(2) }
                    </p>

                    <p ><p className="b-param"> נתרן: </p>
                    {todayDiary?.[0]?.meals?.reduce(function(prev, current){
                        return prev + +current.natran
                      }, 0)}
                    </p>
                    <p > <p className="b-param"> סוכר: </p>
                    {todayDiary?.[0]?.meals?.reduce(function(prev, current){
                        return prev + +current.total_sugars
                      }, 0).toFixed(2)}
                    </p>
                  </div>
<br/><br/>
              <div className='option-btn'>
                <Button className='btn-opt' variant="primary" onClick={() => setShowAddFood(true)}>Add More Food</Button>
                <Button className='btn-opt' variant="primary" onClick={() => setShowLastDiary(true)}>Show Last Week Diary</Button>
              </div>
            </Card.Body>
          </Card>

        </div> :
          <div className='not-found-diary'>
            You still haven't eaten anything today, want to add food?
            <Button className='btn-opt' variant="primary" onClick={() => setShowAddFood(true)}>Add More Food</Button></div>}

        {viewDiaryByUser()}


        <AddFoodModal setShowAddFood={setShowAddFood} showAddFood={showAddFood} />
      </div>
    </div>
  );
})
