import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  let userData = useSelector(state => state.loggedInUserSlice.data);
  const navigate = useNavigate()
  // If !user navigate to login page 
  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      console.log('Navigating to /Login');
      navigate('/Login');
    }
  }, [userData, navigate]);

  // Return null if user data is not available
  if (!userData || Object.keys(userData).length === 0) {
    return null;
  }

  console.log(userData.is_superuser)
  const handleDashboardButtonClick = () => {
    // Open a new tab or window with the dashboard URL
    window.open('http://localhost:3001/', '_blank');
  };
  // const userData = {
  //   'username': 'JohnDoe',
  //   'email': 'john.doe@example.com',
  //   'first_name': 'John',
  //   'last_name': 'Doe',
  //   'passport_number': 'ABC123',
  //   'passport_expire_date': '01/01/2025',
  //   'phone': '123-456-7890',
  //   'image': 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp',
  //   'is_email_verified': true,
  //   'activation_link_created_at': '01/01/2022',
  //   'birth_date': '01/01/1990',
  //   'address': '123 Main St, Cityville',
  //   'gender': 'Male',
  //   'post_code': '12345',
  //   'is_superuser': false,
  //   'history': {
  //     'f': 'from EGYPT to USA',
  //     's': 'form Dubai to Egypt',
  //     't': 'from USA to EGYPT',
  //   } ,
  //   'created_at': '01/01/2021',
  //   'updated_at': '01/02/2022',
  // };
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
                  <button type="button" className="btn btn-danger ms-1">Delete</button>
                  {
                    userData.is_superuser == true
                    ?
                    <button type="button" className="btn btn-danger ms-1" onClick={handleDashboardButtonClick}>Dashboard</button>
                    :
                    ''
                  }
                  
                </div>
              </div>
            </div>
            <h5>History </h5>
            <div className="card mb-4 mb-lg-0">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3" style={{ listStyleType: 'none' }}>
                  {/* <li>{userData.history.f}</li>
                <li>{userData.history.s}</li>
                <li>{userData.history.t}</li> */}
                  <li>You Dont Have any history</li>
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