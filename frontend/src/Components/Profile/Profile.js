import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserFlightHistory } from '../../APIs/UserFlightHistory';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FlightData } from '../../APIs/FlightData';

const Profile = () => {
  const token = useSelector(state => state.Token.token) || {};
  const [flightHistory, setFlightHistory] = useState([])
  const [flightData, setFlightData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const userData = useSelector(state => state.loggedInUserSlice.data);
  const navigate = useNavigate()
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    // If !user navigate to login page 
    if (!userData || Object.keys(userData).length === 0) {
      console.log('Navigating to /Login');
      navigate('/Login');
      return;
    }

    // Fetch user flight history
    UserFlightHistory(userData.id, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setFlightHistory(res.data);

        const flightIds = res.data.map((flight) => flight.flight);

        // Fetch flight data for each flight ID
        Promise.all(
          flightIds.map((flightId) =>
            FlightData(flightId, {
              headers: {
                Authorization: `Token ${token}`,
              },
            }).then((flightDataResponse) => flightDataResponse.data)
          )
        )
          .then((flightDataArray) => {
            console.log('flight data', flightDataArray);
            setFlightData(flightDataArray);
          })
          .catch((err) => {
            console.log(err);
            setFetchError(true);
          });
      })
      .catch((err) => {
        console.log(err);
        setFetchError(true);
      });
  }, [userData, navigate, token]);

  // Return null if user data is not available
  if (!userData || Object.keys(userData).length === 0) {
    return null;
  }

  const handleDashboardButtonClick = () => {
    // Open a new tab or window with the dashboard URL
    window.open('http://localhost:3001/', '_blank');
  };
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <div className="container py-5 text-start">

        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={userData.image || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: '150px' }}
                />
                <h5 className="my-3">{userData.first_name} {userData.last_name}</h5>
                <p className="text-muted mb-4">{userData.address}</p>
                <p className="text-muted mb-4">{userData.birth_date}</p>
                <div className="d-flex justify-content-center mb-2">
                  <button type="button" className="btn btn-primary">Edit</button>
                  <button type="button" className="btn btn-danger ms-1" onClick={() => { navigate(`/deleteAccount`) }}>Delete</button>
                  {
                    userData.is_superuser &&
                    <button type="button" className="btn btn-danger ms-1" onClick={handleDashboardButtonClick}>Dashboard</button>
                  }
                </div>
              </div>
            </div>
            <h5>History </h5>
            <div className="card mb-4 mb-lg-0">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3 p-4" style={{ listStyleType: 'none' }}>
                  {
                    !flightHistory
                      ? <li className="text-center">You Didn't Book Any Flight</li>
                      : flightHistory.map((flight, index) => (
                        <li className="d-flex justify-content-between align-items-center py-2" key={index}>
                          <span>{flightData[index].data.departureTime}</span>
                          <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>click</button>
                          <Modal show={showModal} onHide={() => setShowModal(false)} className='modal-lg modal-dialog-scrollable'>
                            <Modal.Header closeButton style={{ backgroundColor: "#f4f4f4" }}>
                              <Modal.Title>Flight Details</Modal.Title>
                            </Modal.Header>
                            {flightData && flightData[index] && (
                              <Modal.Body style={{ backgroundColor: "#fafafa" }}>
                                <div className='border border-1 rounded-3 p-4 my-3 bg-white'>
                                  <div className='d-flex justify-content-between align-items-center'>
                                    <div>
                                      <p className='fw-bold m-0 p-0'>{flightData[index].data.departureTime}</p>
                                    </div>
                                    <hr className="w-25" />
                                    <div>
                                      <p className='fw-bold m-0 p-0'>{flightData[index].data.arrivalTime}</p>
                                    </div>
                                  </div>
                                  <div className='d-flex justify-content-between align-items-center'>
                                    <div>
                                      <p className='m-0 p-0'>{flightData[index].data.from}</p>
                                    </div>
                                    <div>
                                      <p className='m-0 p-0'>{flightData[index].data.to}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <br />
                                    <p>Class: {flight.category_name}</p>
                                    <p>Trip Distance: {flightData[index].data.distance} Km</p>
                                    <p>Flight Status: {flightData[index].data.status === 'A' ? 'Active' : 'Cancelled'}</p>
                                  </div>
                                </div>
                              </Modal.Body>
                            )}
                            <Modal.Footer style={{ backgroundColor: "#f4f4f4" }}>
                              <Button className='border-0' style={{ backgroundColor: "var(--main-color)" }} onClick={() => setShowModal(false)}>
                                Close
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </li>
                      ))
                  }
                </ul>
              </div>
            </div>
          </div>


          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-4">
                    <p className="mb-0">First Name</p>
                  </div>
                  <div className="col-sm-8">
                    <p className="text-muted mb-0">{userData.first_name}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-4">
                    <p className="mb-0">Last Name</p>
                  </div>
                  <div className="col-sm-8">
                    <p className="text-muted mb-0">{userData.last_name}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-4">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-8">
                    <p className="text-muted mb-0">{userData.email}</p>
                  </div>
                </div>
                <hr />
                {/* // */}
                <div className="row">
                  <div className="col-sm-4">
                    <p className="mb-0">Username</p>
                  </div>
                  <div className="col-sm-8">
                    <p className="text-muted mb-0">{userData.username}</p>
                  </div>
                </div>
                <hr />
                {/* // */}
                <div className="row">
                  <div className="col-sm-4">
                    <p className="mb-0">passport expire date</p>
                  </div>
                  <div className="col-sm-8">
                    <p className="text-muted mb-0">{userData.passport_expire_date}</p>
                  </div>
                </div>
                <hr />
                {/* // */}
                <div className="row">
                  <div className="col-sm-4">
                    <p className="mb-0">passport number</p>
                  </div>
                  <div className="col-sm-8">
                    <p className="text-muted mb-0">{userData.passport_number}</p>
                  </div>
                </div>
                <hr />
                {/* // */}
                <div className="row">
                  <div className="col-sm-4">
                    <p className="mb-0">phone</p>
                  </div>
                  <div className="col-sm-8">
                    <p className="text-muted mb-0">{userData.phone}</p>
                  </div>
                </div>
                <hr />
                {/* // */}
                <div className="row">
                  <div className="col-sm-4">
                    <p className="mb-0">gender</p>
                  </div>
                  <div className="col-sm-8">
                    <p className="text-muted mb-0">{userData.gender}</p>
                  </div>
                </div>
                <hr />
                {/* // */}
                <div className="row">
                  <div className="col-sm-4">
                    <p className="mb-0">birth_date</p>
                  </div>
                  <div className="col-sm-8">
                    <p className="text-muted mb-0">{userData.birth_date}</p>
                  </div>
                </div>
                {/* // */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;