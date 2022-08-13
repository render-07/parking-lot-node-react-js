import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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



const SuccessModal = ({open, handleToggle, id, categoryID, vehicleType, startingTime, leavingParkSlot}) => {
  
  const calculateParkingCharge = (startingTime, categoryID) => {
    // payables
    let totalAmount = 0;
    // get time difference from the time parked againts the current time of unparking
    let timeDiff = (new Date().getTime() - startingTime) / 1000;

    // convert to hours
    timeDiff /= (60 * 60);
    // if time difference is in the seconds set difference to 1 hours
    //  payments wont change as long as parking is within 3 hours

    console.log(timeDiff);


    if(timeDiff < 0) {
        timeDiff = 1;
    } else {
        // get the absolute and rounded difference
        // reference for calculation
        timeDiff = Math.abs(Math.round(timeDiff));
    }

    console.log(timeDiff);

    if (timeDiff > 3 && timeDiff < 24) {
        let exceessTime = timeDiff - 3;
        // get total payables per excess time based on the parking size
        if (categoryID === "SP") {
         totalAmount = 20 * exceessTime;
        } else if( categoryID === "MP") {
         totalAmount = 60 * exceessTime;
        } else if( categoryID === "LP") { 
         totalAmount = 100 * exceessTime;
        }
    }

    // check if time diff exceeds the 24 hour limit
    if (timeDiff > 24) {
        let numberOfDays = timeDiff / 24;
        numberOfDays = Math.abs(Math.round(numberOfDays));
        let excessHours = timeDiff - 24 * numberOfDays;
        

        if(categoryID === "SP") {
         totalAmount = (5000 * numberOfDays) + (20 * excessHours);
        } else if( categoryID === "MP") {
         totalAmount = (5000 * numberOfDays) + (60 * excessHours);
        } else if( categoryID === "LP") {
         totalAmount = (5000 * numberOfDays) + (100 * excessHours);
        }

    }
    
    // flat rate of 40
    return totalAmount + 40;
  }

  const price = calculateParkingCharge(id, categoryID);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2" align="center" style={{color:"green"}}>
            Success !
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 4 }} variant="h5" align="center" marginBottom={5}>
            Parking Receipt
          </Typography>
          <Typography paragraph> 
                Parking Ticket ID: <b>{id}</b>
         </Typography>
          <Typography paragraph> 
                Parking Lot Category: <b>{ categoryID === "S" ? "Small" : categoryID === "M" ? "Medium" : "Large" }</b>
         </Typography>
         <Typography paragraph> 
                Vehicle Type: <b>{vehicleType}</b>
         </Typography>
         <Typography paragraph> 
                Time parked: <b>{startingTime}</b>
         </Typography>

         {leavingParkSlot &&  
         <>
          <Typography paragraph> 
              Parking fee: <b>{price}</b>
          </Typography>
          </>  
         }
         

         {!leavingParkSlot && 
              (categoryID === "S" ?  
              <Typography paragraph sx={{ mt: 4 }}> 
                    You must pay an initial amount of  <b>P40</b> that is good for 3 hours. An additional of
                    <b> P20/hour</b> is charged when parked at SP."
              </Typography>
              : 
              categoryID === "M" ? 
              <Typography paragraph sx={{ mt: 4 }}> 
                    You must pay an initial amount of  <b>P40</b> that is good for 3 hours. An additional of
                    <b> P60/hour</b> is charged when parked at MP."
              </Typography> 
              : 
              <Typography paragraph sx={{ mt: 4 }}> 
                    You must pay an initial amount of  <b>P40</b> that is good for 3 hours. An additional of 
                    <b> P100/hour</b> is charged when parked at LP."
              </Typography>)
              
          }
       
         {leavingParkSlot && 
               <Typography id="modal-modal-description" sx={{ mt: 4 }} variant="h5" align="center" marginBottom={5}>
               Thank you for coming !
             </Typography>
          }

         


        </Box>
      </Modal>
    </div>
  );
}

export default SuccessModal;
