import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Dashboard from "./routes/Dashboard";
import Profile from "./components/Profile";
import ChangePassword from "./components/ChangePassword";
import Stats from "./components/Stats";
import SearchJobs from "./components/SearchJobs";
import SavedJobs from "./components/SavedJobs";
import AppliedJobs from "./components/AppliedJobs";
import AddJob from "./components/AddJob";
import JobDetails from "./components/JobDetails";
import AllJobs from "./components/AllJobs";
import AllUsers from "./components/AllUsers";
import NotFound from "./components/NotFound";
import EditJobDetails from "./components/EditJobDetails";
import AppliedUser from "./components/AppliedUser";
import UpdateOtherProfileDetails from "./components/UpdateOtherProfileDetails";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute>
                <Stats />
              </ProtectedRoute>
            }
          />
          <Route
            path="searchJobs"
            element={
              <ProtectedRoute>
                <SearchJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="savedJobs"
            element={
              <ProtectedRoute>
                <SavedJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="appliedJobs"
            element={
              <ProtectedRoute>
                <AppliedJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="changePassword"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="updateOtherProfileDetails"
            element={
              <ProtectedRoute>
                <UpdateOtherProfileDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="addJob"
            element={
              <ProtectedRoute admin={true}>
                <AddJob />
                <AddJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="jobdetails/:id"
            element={
              <ProtectedRoute>
                <JobDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="allJobs"
            element={
              <ProtectedRoute admin={true}>
                <AllJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="editJob/:id"
            element={
              <ProtectedRoute admin={true}>
                <EditJobDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="allUsers"
            element={
              <ProtectedRoute admin={true}>
                <AllUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="appliedUser/:id"
            element={
              <ProtectedRoute admin={true}>
                <AppliedUser />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
