import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
// const Home = React.lazy(() => import('../Pages/Home'));
const Users = React.lazy(() => import('../Pages/Users'));
const Flights = React.lazy(() => import('../Pages/Flights'));
const Bookings = React.lazy(() => import('../Pages/Bookings'));
const Countries = React.lazy(() => import('../Pages/Countries'));
const Cities = React.lazy(() => import('../Pages/Cities'));
const TrendingPlaces = React.lazy(() => import('../Pages/TrendingPlaces'));
const Complaints = React.lazy(() => import('../Pages/Complaints'));
const Airports = React.lazy(() => import('../Pages/Airports'));
const Aircrafts = React.lazy(() => import('../Pages/Aircrafts'));
const Classes = React.lazy(() => import('../Pages/Classes'));
const Login = React.lazy(() => import('../Pages/Login'));
const AircraftForm = React.lazy(() => import('../forms/aircraftForm'));
const ClassForm = React.lazy(() => import('../forms/classesForm'));
const FlightForm = React.lazy(() => import('../forms/flightForm'));
const FlightPostponeForm = React.lazy(() => import('../forms/flightPostponeForm'));
const Error = React.lazy(() => import('../Pages/404'));
const ImagesTrendPlaces = React.lazy(() => import('../Pages/ImagesTrendPlaces'));
const ImagesCountry = React.lazy(() => import('../Pages/ImagesCountry'));
const PostponeForm = React.lazy(() => import('../forms/flightPostponeForm'));
const ImagesCity = React.lazy(() => import('../Pages/ImagesCity'));

export default function Router() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Bookings />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/Flights" element={<Flights />} />
        <Route path="/Countries" element={<Countries />} />
        <Route path="/Cities" element={<Cities />} />
        <Route path="/TrendingPlaces" element={<TrendingPlaces />} />
        <Route path="/Complaints" element={<Complaints />} />
        <Route path="/Airports" element={<Airports />} />
        <Route path="/Aircrafts" element={<Aircrafts />} />
        <Route path="/Classes" element={<Classes />} />
        <Route path="/ImagesTrendPlaces" element={<ImagesTrendPlaces />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/AircraftForm" element={<AircraftForm />} />
        <Route path="/ClassForm" element={<ClassForm />} />
        <Route path="/ImagesCity" element={<ImagesCity />} />
        <Route path="/ImagesCountry" element={<ImagesCountry />} />
        <Route path="/PostponeForm" element={<PostponeForm />} />
        <Route path="/flightForm" element={<FlightForm />} />
        <Route path="/FlightForm" element={<FlightForm />} />
        <Route path="/FlightPostponeForm" element={<FlightPostponeForm />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  );
}