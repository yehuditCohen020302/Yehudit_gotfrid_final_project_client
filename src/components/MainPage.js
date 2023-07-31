import Carousel from 'react-bootstrap/Carousel';
import '../css/mainPage.css';
import food1 from '../images/mishkal.PNG';
import food2 from '../images/food4.jpg';
import food3 from '../images/food3.jpg';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useRef } from 'react';
import { connect } from 'react-redux';
import { actions } from '../Redux/action';
import Alert from 'react-bootstrap/Alert';

const mapDispatchToProps = (dispatch) => ({
    contactToManager: (_id) => dispatch(actions.contactToManager(_id))
})

export default connect(null, mapDispatchToProps)(function MainPage(props) {
    const { contactToManager } = props;
    const arrCarusel = [
        { image: food2, title: 'Weight watchers group', subTitle: '' },
        { image: food1, title: 'Nutritionists group', subTitle: '' },
        { image: food3, title: 'A group of health care providers', subTitle: '' }]
    const name = useRef('');
    const phone = useRef('');
    const email = useRef('');
    const [isSend, setIsSend] = useState(false);
    const [isAlert, setIsAlert] = useState(false);

    const sendMessage = () => {
        if (name.current.value === '' || email.current.value === '' || phone.current.value==='') {
            setIsAlert(true)
        }
        else {
            setIsAlert(false)
            const contact = {
                name: name.current.value,
                email: email.current.value,
                phone: phone.current.value
            }
            contactToManager(contact).then(() => {
                setIsSend(true)
                setTimeout(() => {
                    setIsSend(false)
                }, 3000);
            })
        }
    };

    const aboutUs = () => {
        return (
            <div className='about-us'>
                <h2>About Us</h2>
                Live right and healthy<br />
                It's much more than reaching the weight you dreamed of.<br />

                Live right and healthy<br />

                is to fulfill your potential,<br />

                It's making dreams come true<br />

                and to conduct oneself safely and peacefully in this life.<br />


                <br />
                Fulfilling your full potential<br />

                related to your nutritional and health balance<br />

                and your ability to maintain it over time.<br />

                It is related to your ability to know how to enjoy and enjoy (not only food).<br />

                She says to look the way you would like to look,<br />

                And no less important:<br />

                to love and accept yourself,<br />

                and feel confident to act, think and feel yourself<br />

                Every moment in this life.<br /><br />



                everyone can!<br />

                And if you have a feeling that it's difficult, big, impossible,<br />

                It's time to take support that will restore your faith in yourself!<br />

                I have created programs for you that combine work on all levels related to and related to food:<br />
                From the behavioral layer, which talks about what to eat, how to eat and where to prepare,<br />

                With menus and full of worthwhile recipes for you to have delicious and varied,<br />

                Through mental work on strengthening your faith in yourself, in the method, in the process and in the results,<br />

                And emotional, internal work that teaches you how to manage your emotions instead of turning to eating.
                <br />
                Our groups throughout the country and also digitally.<br />

                Heida, I'm waiting for you</div>
        )
    }

    return (
        <>
            <div >
                <Carousel style={{ height: '500px' }} data-bs-theme="dark">
                    {arrCarusel?.map((item) =>
                        <Carousel.Item>
                            <img
                                style={{ height: '500px' }}
                                className="d-block w-100"
                                src={item.image}
                                alt={item.title}
                            />
                            <Carousel.Caption>
                                <h5 style={{
                                    fontSize: '40px', fontWeight: 'bold', color: "rgb(9 4 0)",
                                    textShadow: "0 0 3px #fffbfb, 0 0 5px #f2f2f4"
                                }}>{item.title}</h5>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )}

                </Carousel>
                {aboutUs()}
            </div>
            <div className='join'>
                want to join?<br />
                Leave a contact and we will get back to you
            </div>

            <div className='contact-us'>
                <Form >
                    <Form.Group md="4" >
                        <Form.Label className='contact-lable'>First and Last Name</Form.Label>
                        <Form.Control
                            ref={name}
                            type="text"
                            placeholder="First and Last Name"
                        />
                        <Form.Control.Feedback></Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group md="4" controlId="validationCustom02">
                        <Form.Label className='contact-lable'>Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Email"
                            ref={email}
                        />
                        <Form.Control.Feedback></Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group md="4" controlId="validationCustom02">
                        <Form.Label className='contact-lable'>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Phone"
                            ref={phone}
                        />
                        <Form.Control.Feedback></Form.Control.Feedback>
                    </Form.Group>
                    <Button className='btn-contact' onClick={() => sendMessage()}>Submit</Button>
                    {isAlert && <Alert style={{
                        height: '30px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        color: '#D32F2F'
                    }}
                        variant='danger'>All fields are required</Alert>}
                </Form>
            </div>
            {isSend && <Alert style={{ margin: 'auto', width: '80%', }} key="success" variant="success">
                The message has been received in the system, the group manager will contact you.
            </Alert>}
        </>
    );
})