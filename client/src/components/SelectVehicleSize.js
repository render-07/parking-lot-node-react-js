import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
  } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import TwoWheelerRoundedIcon from '@mui/icons-material/TwoWheelerRounded';
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';
import DirectionsBusRoundedIcon from '@mui/icons-material/DirectionsBusRounded';
import AddVehicle from './AddVehicle';

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

const SelectVehicleSize = () => {
    const classes = useStyles();
    const [toggle, setToggle] = useState(false);
    const handleToggle = () => setToggle(!toggle);
    
    const [chooseVehicleSize, setChooseVehicleSize] = useState("");

    return (
      <>
        <Box className={classes.root}>
        <Card>
          <CardContent>
            <Typography variant="h4">Small Vehicle</Typography>
          </CardContent>
          <TwoWheelerRoundedIcon fontSize="large" className='icon'/>
          <CardActions>
            <Button style={{ marginTop: 20, backgroundColor: '#22bb33', color: 'white', marginLeft: 65 }}
                onClick = {() => {setChooseVehicleSize("Small"); setToggle(!toggle)}}>Proceed
            </Button>          
           </CardActions>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h4">Medium Vehicle</Typography>
          </CardContent>
          <DirectionsCarRoundedIcon fontSize="large" className='icon'/>
          <CardActions>
            <Button style={{ marginTop: 20, backgroundColor: '#22bb33', color: 'white', marginLeft: 85 }}
                onClick = {() => {setChooseVehicleSize("Medium"); setToggle(!toggle)}}>Proceed
            </Button> 
        </CardActions>
        </Card> 
        <Card>
          <CardContent>
            <Typography variant="h4">Large Vehicle</Typography>
          </CardContent>
          <DirectionsBusRoundedIcon fontSize="large" className='icon'/>
          <CardActions>
            <Button style={{ marginTop: 20, backgroundColor: '#22bb33', color: 'white', marginLeft: 68 }}
                onClick = {() => {setChooseVehicleSize("Large"); setToggle(!toggle)}}>Proceed
            </Button> 
        </CardActions>
        </Card> 
        </Box>

        {chooseVehicleSize !== "" && <AddVehicle open={toggle} handleToggle={handleToggle} 
          size={chooseVehicleSize}/>}
      </>
    )
}

export default SelectVehicleSize;