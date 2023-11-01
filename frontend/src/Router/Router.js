import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
const Home = React.lazy(() => import('../Pages/Home'));
const Book = React.lazy(() => import('../Pages/Book'));
const Booking = React.lazy(() => import('../Pages/Booking'));
const TripIdeas = React.lazy(() => import('../Pages/TripIdeas'));
const Search = React.lazy(() => import('../Pages/Search'));
const Profile = React.lazy(() => import('../Pages/Profile'));
const TermsAndConditions = React.lazy(() => import('../Pages/TermsAndConditions'));
const AboutUs = React.lazy(() => import('../Pages/AboutUs'));
const Help = React.lazy(() => import('../Pages/Help'));
const Error = React.lazy(() => import('../Pages/404'));

export default function Router() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Book" element={<Book />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/TripIdeas" element={<TripIdeas />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Help" element={<Help />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  );
}