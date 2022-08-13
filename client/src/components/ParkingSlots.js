import * as React from 'react';
import { useEffect, useState } from 'react'
import SingleSizeCategory from './SingleSizeCategory'

const ParkingSlots = ({parkingSizeCategory, parkedVehicles, deleteParkedVehicle, seeParkingSlot}) => {
    return (
        parkingSizeCategory.map((ctgry) => (                
            <SingleSizeCategory key={ctgry._id} categoryName = {ctgry.label}
            items={parkedVehicles.filter(item => item.categoryID == ctgry._id) }
                deleteParkedVehicle={deleteParkedVehicle} seeParkingSlot={seeParkingSlot}
            />
        ))
    )
   
}

export default ParkingSlots;