import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../APIs/Config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Bookings() {
  const token = useSelector(state => state.Token.token);
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    status: "",
    paymentMethod: "",
    adults: "",
    kids: "",
    infants: "",
    passenger: "",
    flight: "",
    category: "",
  });
  const [editingbookId, setEditingbookId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInstance
      .get("/flights/api/history/", {
        headers: {Authorization: `Token ${token}`}
      })
      .then((res) => {
        setBookings(res.data)
        setErrorMessage(false)
      })
      .catch((err) => {
        console.error("Error fetching data:", err)
        setErrorMessage("Something gone wrong!")
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewBooking((prevBooking) => ({
      ...prevBooking,
      [name]: value,
    }));
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewBooking({
      status: "",
      paymentMethod: "",
      adults: "",
      kids: "",
      infants: "",
      passenger: "",
      flight: "",
      category: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/flights/api/history/", newBooking, {
        headers: {Authorization: `Token ${token}`}
      })
      .then((response) => {
        console.log(response.data);
        fetchData();
        setErrorMessage(false)
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Something gone wrong, Check Your Data Again!")
      });

    handleCloseModal();
  };

  const mapStatus = (status) => {
    const statusMap = {
      A: "Active",
      C: "Cancelled",
    };

    return statusMap[status] || status;
  };

  const mapPaymentMethod = (paymentMethod) => {
    const paymentMethodMap = {
      W: "Wallet",
      C: "Card",
    };

    return paymentMethodMap[paymentMethod] || paymentMethod;
  };

  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => {
        setErrorMessage(false);
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [errorMessage]);

  return (
    <>
    {errorMessage && (
        <div className="error-message alert alert-danger mx-auto" style={{ fontSize: "15px", width:"700px" }}>
          {errorMessage}
        </div>
      )}
      <div className="mb-4 text-end">
        <Button
          style={{
            backgroundColor: "var(--main-color)",
            borderColor: "var(--main-color)",
          }}
          onClick={handleShowModal}
        >
          <FontAwesomeIcon icon={faPlus} /> Add New Booking
        </Button>
      </div>
      {bookings && bookings.length > 0 ? (
        <table className="table table-hover shadow-sm">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Payment Method</th>
              <th>PassengerID</th>
              <th>FlightID</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td
                style={{
                  backgroundColor: booking.status === "A" ? "lightgreen" : "lightcoral",
                  color: "white",
                }}
              >
                {mapStatus(booking.status)}
              </td>
                <td>{mapPaymentMethod(booking.paymentMethod)}</td>
                <td>{booking.passenger}</td>
                <td>{booking.flight}</td>
                <td>
                  {booking.category_name} ({booking.category})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingbookId ? "Edit Booking" : "Add New Booking"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <input
                className="form-select"
                id="status"
                name="status"
                value={newBooking.status}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="paymentMethod" className="form-label">
                Payment Method
              </label>
              <input
                className="form-select"
                id="paymentMethod"
                name="paymentMethod"
                value={newBooking.paymentMethod}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="adults" className="form-label">
                Adults
              </label>
              <input
                type="number"
                className="form-control"
                id="adults"
                name="adults"
                value={newBooking.adults}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="kids" className="form-label">
                Kids
              </label>
              <input
                type="number"
                className="form-control"
                id="kids"
                name="kids"
                value={newBooking.kids}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="infants" className="form-label">
                Infants
              </label>
              <input
                type="number"
                className="form-control"
                id="infants"
                name="infants"
                value={newBooking.infants}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="passenger" className="form-label">
                PassengerID
              </label>
              <input
                type="number"
                className="form-control"
                id="passenger"
                name="passenger"
                value={newBooking.passenger}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="flight" className="form-label">
                FlightID
              </label>
              <input
                type="number"
                className="form-control"
                id="flight"
                name="flight"
                value={newBooking.flight}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                CategoryID
              </label>
              <input
                type="number"
                className="form-control"
                id="category"
                name="category"
                value={newBooking.category}
                onChange={handleInputChange}
              />
            </div>
            <button
              className="btn my-3 text-white"
              type="submit"
              style={{ backgroundColor: "var(--main-color)" }}
            >
            Add Booking
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
