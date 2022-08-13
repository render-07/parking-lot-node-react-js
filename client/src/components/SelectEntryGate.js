import React, { useState, useEffect } from 'react';
import TollRoundedIcon from '@mui/icons-material/TollRounded';

import {
    Box,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
  } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import SelectAction from './SelectAction';
import {defaultParkingSizeCategory} from './constants/SizeCategory'

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

const SelectEntryGate = () => {
    const classes = useStyles();

    const [enter, setEnter] = useState(false);
    const [gate, setGate] = useState("");
    const [parkingSizeCategory, setParkingSizeCategory] = useState([]);
    const [parkedVehicles, setParkedVehicles] = useState([]);

    const readParkedVehicles = async () => {
      const res = await fetch('http://localhost:5000/parked-vehicles');
      const data = await res.json(); 
      return data;
    }

    const deleteParkedVehicle = async (id) => {
      //console.log(parkedVehicles);
      setParkedVehicles(parkedVehicles.filter((vehicle) => vehicle.id !== id))
      //console.log(parkedVehicles);
      //console.log(id);

      await fetch(`http://localhost:5000/parked-vehicles/${id}`, {method: 'DELETE'})
    }

    const storeFetchParkedVehicles = async () => {
      const dataFromServer = await readParkedVehicles();
      setParkedVehicles(dataFromServer);
    }

    useEffect(() => {
      setParkingSizeCategory(defaultParkingSizeCategory);
      storeFetchParkedVehicles(); 
  }, []);

    return (
      <>  
          { !enter ? 
          <div>
            <h1>Welcome to Object-Oriented Mall</h1>
            <h6>Powered by XYZ Corp. - Parking Allocation System</h6>
            <Box className={classes.root}>
              <Card style={{ paddingLeft: 50, paddingRight: 50}}>
                <CardContent>
                  <Typography variant="h4" >Gate A</Typography>
                  </CardContent>
                  <TollRoundedIcon fontSize="large" className='icon'/>
                <CardActions>
                  <Button style={{ marginTop: 20, backgroundColor: '#22bb33', color: 'white', marginLeft: 15 }}
                    onClick = {() => {setEnter(true); setGate("A");}}>Proceed</Button>
                </CardActions>
              </Card>
              <Card style={{ paddingLeft: 50, paddingRight: 50}}>
                <CardContent>
                  <Typography variant="h4">Gate B</Typography>
                </CardContent>
                <TollRoundedIcon fontSize="large" className='icon'/>
                <CardActions>
                <Button style={{ marginTop: 20, backgroundColor: '#22bb33', color: 'white', marginLeft: 15 }}
                  onClick = {() => {setEnter(true); setGate("B");}} >Proceed</Button>
                </CardActions>
              </Card> 
              <Card style={{ paddingLeft: 50, paddingRight: 50}}>
                <CardContent>
                  <Typography variant="h4">Gate C</Typography>
                </CardContent>
                <TollRoundedIcon fontSize="large" className='icon'/>
                <CardActions>
                <Button style={{ marginTop: 20, backgroundColor: '#22bb33', color: 'white', marginLeft: 15 }}
                  onClick = {() => {setEnter(true); setGate("C");}}>Proceed</Button>
                </CardActions>
              </Card> 
            </Box>
          </div>
            : 
          <SelectAction
            enter = {enter}
            setEnter = {setEnter}
            fromGate = {gate}
            parkingSizeCategory = {parkingSizeCategory}
            parkedVehicles = {parkedVehicles}
            deleteParkedVehicle = {deleteParkedVehicle}
          />
        }
      </>
    )
}

export default SelectEntryGate;