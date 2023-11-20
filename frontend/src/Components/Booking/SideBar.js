import React, { useEffect, useState } from 'react';
import { FlightData } from '../../APIs/FlightData';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function SideBar({ insurance, Total_Fare }) {
  const navigate = useNavigate()
  const { flights } = useParams();
  const flightIds = flights.split(',');
  const [error , setError] = useState(false)

  const [flightDataList, setFlightDataList] = useState([]);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPromises = flightIds.map(async (flightID) => {
          try {
            const res = await FlightData(flightID);
            return res.data.data;
          } catch (err) {
            console.log(err);
            setFetchError(true);
            return null;
          }
        });

        const flightDataArray = await Promise.all(dataPromises);
        setFlightDataList(flightDataArray.filter((data) => data !== null));
      } catch (error) {
        console.log(error);
        setFetchError(true);
      }
    };

    fetchData();
  }, []);

  if (fetchError) {
    setError(true);
  }

  const Total_TAX = flightDataList.reduce((acc, flightData) => acc + (flightData?.baseCost * 0.1 || 0), 0);
  const totalBaseCost = flightDataList.reduce((acc, flightData) => acc + (flightData?.baseCost || 0), 0);
  const Total_Faree = totalBaseCost + Total_TAX + insurance || 0;
  Total_Fare(Total_Faree);

  return (
    <div className='col'>
      {/* Error Window */}
      <Modal show={error} onHide={()=>{navigate('/')}} className='modal-lg modal-dialog-scrollable'>
            <Modal.Header closeButton style={{ backgroundColor: "#f4f4f4" }}>
              <Modal.Title>Opss</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#fafafa" }}>
              <div className='border border-1 rounded-3 p-4 my-3 bg-white' >
                <p className='fw-bold'>Something Went Wrong, Please Try Again</p>
              </div>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: "#f4f4f4" }}>
              <Button className='border-0' style={{ backgroundColor: "var(--main-color)"}} onClick={()=>navigate('/')}>
                Back To Home
              </Button>
            </Modal.Footer>
          </Modal>
      <div className='Container SideBar'>
        <p className='py-0 my-0'>My Trip</p>
        {flightDataList.map((flightData, index) => (
          <div key={index} className='py-3 text-black'>
            <div className='d-flex align-items-center text-start'>
              <span className='pe-1 data'>{flightData?.from}</span>
              <hr style={{ display: 'inline-block', width: '10%' }} />
              <span className='ps-1 data'>{flightData?.to}</span>
            </div>
            <div className='data d-flex justify-content-between'>
            <div className=' Note'>Cost: {flightData?.baseCost}</div>
              <div className=' Note'>{flightData?.departureTime}</div>
              
            </div>
          </div>

        ))}
      </div>
      <br />
      {/* Total fare summary */}
      <div className='Container SideBar '>
        <p className=''>Price BreakDown</p>

        <div className='d-flex align-items-center justify-content-between data'>
          <p>Total Flight base Cost</p>
          <p>{totalBaseCost} Egp</p>
        </div>

        <div className='d-flex align-items-center justify-content-between data '>
          <p>Insurance And Extra Services</p>
          <p>{insurance} Egp</p>
        </div>
        <div className='d-flex align-items-center justify-content-between data mb-0 pb-0'>
          <p>Total TAX</p>
          <p>{Total_TAX} Egp</p>
        </div>
        <hr className='mt-0 pt-0' />
        <div className='d-flex align-items-center justify-content-between data'>
          <p>Total Fare</p>
          <p>{Total_Faree} Egp</p>
        </div>
      </div>
    </div>
  );
}
