import React, { Suspense } from "react";
import { Route, Routes , Redirect} from "react-router-dom";
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
const Login = React.lazy(() => import('../Pages/Login'));
const Register = React.lazy(() => import('../Pages/Register'));
const Nottificate = React.lazy(() => import('../Pages/Notifications'));
const Error = React.lazy(() => import('../Pages/404'));
const ForgetPassword = React.lazy(() => import('../../src/Pages/ForgetPassword/ForgetPassword'));
const ResetPassword = React.lazy(() => import('../../src/Pages/ForgetPassword/ResetPassword'));
const ActivateAccountPage = React.lazy(() => import('../../src/Pages/ActivateAccountPage'));
const DelateAccountPage = React.lazy(() => import('../../src/Pages/DelateAccountPage'));
const EditProfile = React.lazy(() => import('../Pages/EditProfilePage'));



export default function Router() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Book" element={<Book />} />
        <Route path="/Booking/:flights" element={<Booking />} />
        <Route path="/TripIdeas/:id" element={<TripIdeas />} />
        <Route path="/SearchResult/:searchType" element={<Search />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Help" element={<Help />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Notifications" element={<Nottificate />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/CheckActivationCode" element={<ActivateAccountPage />} />
        <Route path="/deleteAccount" element={<DelateAccountPage />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  );
}