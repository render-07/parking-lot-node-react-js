import {
    Box,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
  } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from 'react';
import SelectVehicleSize from "./SelectVehicleSize";
import NoCrashRoundedIcon from '@mui/icons-material/NoCrashRounded';
import LocalParkingRoundedIcon from '@mui/icons-material/LocalParkingRounded';
import ParkingSlots from "./ParkingSlots";
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(3),
      },
    },
  })
);

const SelectAction = ({enter, setEnter, fromGate, parkingSizeCategory, parkedVehicles, deleteParkedVehicle}) => {
    const classes = useStyles();

    const [choice, setChoice] = useState("");

    return (
      <>
      {choice === "" && 
        <div>  
          <h1>You entered at Gate {fromGate}</h1>
          <Box className={classes.root}>
            <Card>
              <CardContent>
                <Typography variant="h4">Enter parking complex</Typography>
              </CardContent>
              <LocalParkingRoundedIcon fontSize="large" className='icon'/>
              <CardActions>
              <Button style={{ marginTop: 20, backgroundColor: '#22bb33', color: 'white', marginLeft: 130 }}
                  onClick = {() => {setChoice("Enter")}}>Proceed</Button>
              </CardActions>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h4">Unparked</Typography>
              </CardContent>
              <NoCrashRoundedIcon fontSize="large" className='icon'/>
              <CardActions>
              <Button style={{ marginTop: 20, backgroundColor: '#22bb33', color: 'white', marginLeft: 38 }}
                onClick = {() => {setChoice("Leave")}}>Proceed</Button>
              </CardActions>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h4">See parking slot</Typography>
              </CardContent>
              <AppsRoundedIcon fontSize="large" className='icon'/>
              <CardActions>
              <Button style={{ marginTop: 20, backgroundColor: '#22bb33', color: 'white', marginLeft: 85 }}
                onClick = {() => {setChoice("See Parking Lot")}}>Proceed</Button>
              </CardActions>
            </Card>
          </Box> 

          <Button 
            variant='contained' 
            style={{ marginTop: 20}}
            onClick={() => { setEnter(!enter)}}
          >
          Go Back
        </Button>
        </div> 
      }    

      {choice === "Enter" && 
        <div>
          <h1>You entered at Gate {fromGate}</h1>
          <SelectVehicleSize/>
          <Button 
            variant='contained' 
            style={{ marginTop: 20 }}
            onClick={() => { setChoice("")}}
            >
            Go Back
        </Button>
        </div>
      }

      {choice === "Leave" && 
         <div>
          <ParkingSlots 
            parkingSizeCategory = {parkingSizeCategory}
            parkedVehicles = {parkedVehicles}
            deleteParkedVehicle = {deleteParkedVehicle}
            seeParkingSlot = {false}
          />
          <Button 
            variant='contained' 
            style={{ marginTop: 20 }}
            onClick={() => { setChoice("")}}
            >
            Go Back
          </Button>
        </div>
      }

      {choice === "See Parking Lot" && 
         <div>
          <ParkingSlots 
           parkingSizeCategory = {parkingSizeCategory}
           parkedVehicles = {parkedVehicles}
           deleteParkedVehicle = {deleteParkedVehicle}
           seeParkingSlot = {true}
          />
          <Button 
            variant='contained' 
            style={{ marginTop: 20 }}
            onClick={() => { setChoice("")}}
            >
            Go Back
          </Button>
       </div>
      }
     </>
    )
}

export default SelectAction;