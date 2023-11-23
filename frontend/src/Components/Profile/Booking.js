import React, { useEffect, useState } from 'react';
import './Style.css'
import { UnbookFlight, GetFlightBook } from '../../APIs/UnbookFlight';
import { useNavigate } from 'react-router-dom';
import { UserFlightHistory } from '../../APIs/UserFlightHistory';
import { FlightData } from '../../APIs/FlightData';
import Flight from './../Search/Flight'
import DetailsModal from "./DetailsModal";
import ConfirmModal from "./ConfirmModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons'

export default function BookingHistory({ userData, token }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDeleteFlightModal, setShowDeleteFlightModal] = useState(false)
  const [flightHistory, setFlightHistory] = useState([])
  const [flightData, setFlightData] = useState([])
  const navigate = useNavigate()
  const [fetchError, setFetchError] = useState(false);
  const [unbook, setUnbook] = useState('')
  const [loadingFlightData, setLoadingFlightData] = useState(true);

  const handleShowModal = (flight, book) => {
    setSelectedFlight(flight);
    setSelectedBook(book);
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setSelectedFlight(null);
    setShowModal(false);
  }

  const handleShowConfirmModal = () => {
    setShowDeleteFlightModal(true);
  }

  const handleCloseConfirmModal = () => {
    setSelectedFlight(null);
    setShowDeleteFlightModal(false);
  }

  useEffect(() => {
    setLoadingFlightData(true); 

    UserFlightHistory(userData?.id, { Authorization: `Token ${token}` })
      .then((res) => {
        setFlightHistory(res?.data);

        const flightIds = res?.data.map((flight) => flight.flight);

        Promise.all(
          flightIds.map((flightId) =>
            FlightData(flightId, {
              Authorization: `Token ${token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            })
              .then((flightDataResponse) => flightDataResponse.data)
          )
        )
          .then((flightDataArray) => {
            setFlightData(flightDataArray);
            setLoadingFlightData(false); 
          })
          .catch((err) => {
            console.log(err);
            setFetchError(true);
            setLoadingFlightData(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setFetchError(true);
        setLoadingFlightData(false); 
      });
  }, [navigate, unbook]);
  const handleUnbookFlightButtonClick = (bookId) => {

    GetFlightBook(bookId, { Authorization: `Token ${token}` })
      .then((result) => {
        const flightData = result.data.data;
        flightData.status = 'C';
        console.log(flightData)
        UnbookFlight(bookId, flightData, { Authorization: `Token ${token}` })
          .then((res) => {
            console.log('Flight Unbooked')
            setShowDeleteFlightModal(false);
            setUnbook(`Book ${bookId} is Cancelled`)
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="card mb-4 mb-lg-0 border-0 shadow-sm">
      <div className="card-body p-0">
        <ul className="list-group list-group-flush rounded-3 p-4" style={{ listStyleType: 'none' }}>
          {
            flightHistory.length == 0
              ?
              <li className="text-center">You Didn't Book Any Flight</li>
              :
              flightHistory.map((flight, index) => (
                <li className='my-3'>
                  {loadingFlightData ? (
                    <p>Loading Flight Data...</p>
                  ) : (
                    <>
                      <div className='flight-book row px-4 align-items-center'>
                        <div className='col-2 text-start'>
                          {flight.status == 'A' 
                          ?
                          <p><FontAwesomeIcon icon={faCircle} className='text-success mx-3 fs-5'/> Active</p>
                          :
                          <p><FontAwesomeIcon icon={faCircle} className='text-danger mx-3 fs-5'/> Cancel</p>
                          }
                        </div>
                        <div className='col-7'>
                          <Flight flight={flightData[index]?.data} />
                        </div>
                        <div className='col-3 text-end'>
                          <button
                            type="button"
                            className="btn rounded-5 text-white px-3 py-2"
                            style={{ backgroundColor: "var(--main-color)" }}
                            onClick={() => handleShowModal([flightData[index]?.data], flight)}
                          >
                            Show More Details
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </li>
              ))}
        </ul>
      </div>
      {selectedFlight && (
        <DetailsModal
          show={showModal}
          handleClose={handleCloseModal}
          handleConfirm={() => { setShowModal(false); handleShowConfirmModal() }}
          title="Flight Details"
          flights={selectedFlight}
          booking={selectedBook}
        />
      )}

      {showDeleteFlightModal && (
        <ConfirmModal
          show={handleShowModal}
          handleClose={handleCloseConfirmModal}
          handleCancelling={() => { handleUnbookFlightButtonClick(selectedBook.id) }}
          title="Confirm Details"
        />
      )}
    </div>
  )
}