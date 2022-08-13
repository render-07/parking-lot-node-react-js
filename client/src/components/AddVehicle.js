import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SuccessModal from './SuccessModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddVehicle = ({open, handleToggle, size}) => {

    const [value, setValue] = useState('LP');
    const [submit, setSubmit] = useState(false);
    const handleSubmit = () => setSubmit(!submit);

    const [id, setId] = useState("");
    const [categoryID, setCategoryID] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [startingTime, setStartingTime] = useState("");


    const handleRadioChange = (event) => {
      setValue(event.target.value);
    };

    const formatDate = (string) => {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }

    const parkVehicle = async (event) => {
        event.preventDefault();
        setId(new Date().getTime());
        setCategoryID(value);
        setStartingTime(formatDate(new Date().getTime()) + ' ' 
            + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds());


        const categoryID = value;
        const startingTime = formatDate(new Date().getTime()) + ' ' 
        + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
        const deleteVehicle = "deleteVehicle";


        console.log(vehicleType);
        console.log(value);
        console.log(formatDate(new Date().getTime()));
        console.log(startingTime);


        await createParkVehicle({id, categoryID, vehicleType, startingTime, deleteVehicle});
    }

    const createParkVehicle = async (parkVehicle) => {
        const res = await fetch('http://localhost:5000/parked-vehicles', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(parkVehicle)
        })
        await res.json()
    }
    

    return (
      <>  
        <Modal
        open={open}
        onClose={handleToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
        
            {size === "Small" &&
            <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                You select Small Vehicle
                </Typography>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                You are allowed to park in Small Parking Lot - SP (20/hour), Medium Parking Lot - MP 
                (60/hour), and Large Parking Lot - LP (100/hour).
                </Typography>
                <form onSubmit={parkVehicle}>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                    <RadioGroup row
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={value}
                        onChange={handleRadioChange}                        
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="SP" control={<Radio />} label="SP" />
                        <FormControlLabel value="MP" control={<Radio />} label="MP" />
                        <FormControlLabel value="LP" control={<Radio />} label="LP" />
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <Button type="submit" 
                    style={{ marginTop: 40, backgroundColor: '#22bb33', color: 'white', marginLeft: 100}}
                    onClick = {() => {setVehicleType("Small"); setSubmit(!submit);}} >
                            Proceed
                    </Button>
                </FormControl>
                </form>
            </>
            }

            {size === "Medium" && 
            <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                You select Medium Vehicle
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                You are allowed to park in Medium Parking Lot - MP (60/hour) and
                Large Parking Lot - LP (100/hour).
                </Typography>
                <form onSubmit={parkVehicle}>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                    <RadioGroup row
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={value}
                        onChange={handleRadioChange}                        
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="SP" control={<Radio />} label="SP" disabled/>
                        <FormControlLabel value="MP" control={<Radio />} label="MP" />
                        <FormControlLabel value="LP" control={<Radio />} label="LP" />
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <Button type="submit" 
                    style={{ marginTop: 40, backgroundColor: '#22bb33', color: 'white', marginLeft: 100}}
                    onClick = {() => {setVehicleType("Medium"); setSubmit(!submit);}} >
                            Proceed
                    </Button>
                </FormControl>
                </form>
            </>
            }

            {size === "Large" &&  
            <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                You select Large Vehicle
                </Typography>
                
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                You are allowed to park in Large Parking Lot - LP (100/hour).
                </Typography>
                <form onSubmit={parkVehicle}>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                    <RadioGroup row
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={value}
                        onChange={handleRadioChange}                        
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="SP" control={<Radio />} label="SP" disabled/>
                        <FormControlLabel value="MP" control={<Radio />} label="MP" disabled/>
                        <FormControlLabel value="LP" control={<Radio />} label="LP" />
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <Button type="submit" 
                    style={{ marginTop: 40, backgroundColor: '#22bb33', color: 'white', marginLeft: 100}}
                    onClick = {() => {setVehicleType("Large"); setSubmit(!submit);}} >
                            Proceed
                    </Button>
                </FormControl>
                </form>
            </>}     
        </Box>
        </Modal>
        {submit && <SuccessModal open={submit} handleToggle={handleSubmit} 
            id={id} categoryID={categoryID} vehicleType={vehicleType}
            startingTime={startingTime} leavingParkSlot={false}
        />}
      </>
    )
}

export default AddVehicle;