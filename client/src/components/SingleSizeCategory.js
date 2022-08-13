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
import ItemTable from "./tables/ItemTable";

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

const SingleSizeCategory = ({categoryName, items, deleteParkedVehicle, seeParkingSlot}) => {
    const classes = useStyles();

    const [showItems, setShowItems] = useState(false)

    const toggleShowItems = () => {
        setShowItems(!showItems)
    }

    //console.log(items);
    
    return (
        <Box className={classes.root}>
            <Card>
              <CardContent>
                <Typography variant="h4" style={{marginBottom: 20}}>{categoryName}</Typography>
                {showItems && <ItemTable items={items} deleteParkedVehicle={deleteParkedVehicle} 
                seeParkingSlot={seeParkingSlot}/>}
                <CardActions>
                  <Button style={{ marginTop: 20, backgroundColor: '#22bb33', color: 'white' }}
                    onClick = {toggleShowItems}>{showItems ? 'Close' : 'Show items'}
                    </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Box> 
    )
}

// () => {
//     return (
//         
//     );

export default SingleSizeCategory
