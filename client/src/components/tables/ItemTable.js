import { useMemo, useState } from 'react'
import { useTable } from 'react-table';
import { COLUMNS } from './column'
import CloseIcon from '@mui/icons-material/Close';
import SuccessModal from '../SuccessModal';

export const ItemTable = ({items, deleteParkedVehicle, seeParkingSlot}) => {

    // // Call dispatch
    // const dispatch = useDispatch();

    // // useEffect is equivalent to componentDidMount()
    // useEffect(() => {
    //     dispatch(getItems());
    // }, []);

    // // Get reducer from index.js
    // const item = useSelector((state) => state.item);

    // // Deconstruct
    // // 'items' is the name of array in the state
    // // so the name must be followed in deconstructuring.
    // const { items } = item;

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => items, []);
    const [finishParking, setFinishParking] = useState(false);
    const [id, setId] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [startingTime, setStartingTime] = useState("");
    const [categoryID, setCategoryID] = useState("");

    const handleFinishParking = () => setFinishParking(!finishParking);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow }
    = useTable({ columns, data })

    return (
        <div className="box">
          <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, rowIndex) => {
              prepareRow(row)

              const getId = (rowNum, cellNum) => {
                rows.map((rowItem,rIndex) => {
                  rowItem.cells.map((cellItem,cIndex) => {
                    if (rIndex === rowNum && cIndex === cellNum) {
                      //console.log(cellItem.value);
                      deleteParkedVehicle(cellItem.value);
                      setId(cellItem.value);
                    }
                  })
                });
              }

              const getVehicleType = (rowNum, cellNum) => {
                rows.map((rowItem,rIndex) => {
                  rowItem.cells.map((cellItem,cIndex) => {
                    if (rIndex === rowNum && cIndex === cellNum) {
                      setVehicleType(cellItem.value);
                    }
                  })
                });
              }

              const getStartingTime = (rowNum, cellNum) => {
                rows.map((rowItem,rIndex) => {
                  rowItem.cells.map((cellItem,cIndex) => {
                    if (rIndex === rowNum && cIndex === cellNum) {
                      setStartingTime(cellItem.value);
                    }
                  })
                });
              }

              const getCategoryID = (rowNum, cellNum) => {
                rows.map((rowItem,rIndex) => {
                  rowItem.cells.map((cellItem,cIndex) => {
                    if (rIndex === rowNum && cIndex === cellNum) {
                      setCategoryID(cellItem.value);
                    }
                  })
                });
              }

              return (

                <tr {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => {
                    // console.log(cell.value)
                    // {cellIndex === 0 && console.log(cell.value) }     
                    // console.log("The current row iteration is: " + rowIndex);
                    // console.log("The current iteration is: " + cellIndex);
                    // console.log("The current element is: " + cell.value); 
                    return <td {...cell.getCellProps()}>
                      {cell.value === "deleteVehicle" ? 
                        (seeParkingSlot ? <CloseIcon fontSize="large" className='icon'/> 
                        : <CloseIcon onClick = {() => {getId(rowIndex,0); getVehicleType(rowIndex,1); 
                          getStartingTime(rowIndex,2); 
                          getCategoryID(rowIndex, 3);
                          setFinishParking(!finishParking);
                          }} 
                          style={{cursor: 'pointer', color: '#c42121'}} 
                          fontSize="large" className='icon'/>)
                            : cell.render('Cell')}
                    </td>  
                  }
                )}
              </tr>
              )
            })}
          </tbody>
        </table>

        {finishParking && <SuccessModal open={finishParking} handleToggle={handleFinishParking} 
            id={id} vehicleType={vehicleType} categoryID={categoryID}
            startingTime={startingTime} leavingParkSlot={true}
        />}
      </div>

      

    )

   
}

export default ItemTable
