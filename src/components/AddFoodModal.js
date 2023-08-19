import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { actions } from '../Redux/action';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import '../css/userDiary.css';

function mapStateToProps(state) {
    return {
        allFoods: state.diaryReducer.allFood,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAllFoods: () => dispatch(actions.getAllFoods()),
    addNewFood: (food) => dispatch(actions.addNewFood(food)),
    getDiaryByUser: (id) => dispatch(actions.getDiaryByUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(function AddFoodModal(props) {
    const { getAllFoods, allFoods, showAddFood, setShowAddFood, addNewFood, getDiaryByUser } = props;
    const [foodsToShow, setFoodToShow] = useState();
    const [selectedFood, setSelectedFood] = useState({});
    let foodsToAdd = [];
    const currentUser = JSON.parse(localStorage.getItem('user-details'))

    const getAllFoods1 = async () => {
        await getAllFoods()
    }

    useEffect(() => {
        getAllFoods1()
    }, [])

    useEffect(() => {
        allFoods.map((item) => {
            foodsToAdd.push({
                label: item.shmmitzrach,
                id: item._id,
                total_sugars: item.total_sugars,
                natran: item.sodium,
                ashlegan: item.potassium,
                energy: item.food_energy
            })

        });
        setFoodToShow(foodsToAdd)
        console.log(allFoods);
    }, [allFoods])

    const addNewFoodToDiary = async () => {
        debugger
        await addNewFood(selectedFood).then(async()=>{
             setShowAddFood(false)
        await getDiaryByUser(currentUser?._id)
        })
    }
    
    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal
                show={showAddFood}
                onHide={() => setShowAddFood(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Food</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={foodsToShow}
                        sx={{ width: 300 }}
                        onChange={(event, value) => setSelectedFood(value)}
                        renderInput={(params) => <TextField {...params} label="Food" />}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddFood(false)}>Close</Button>
                    <Button className='btn-save-food' variant="primary" onClick={() => addNewFoodToDiary()}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
})

