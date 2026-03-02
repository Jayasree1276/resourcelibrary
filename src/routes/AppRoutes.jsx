import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import ProtectedRoute from "./ProtectedRoute";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// User
import Home from "../pages/user/Home";
import Search from "../pages/user/Search";
import ResourceDetails from "../pages/user/ResourceDetails";
import Profile from "../pages/user/Profile";
import Feedback from "../pages/user/Feedback";

// Admin
import AdminDashboard from "../pages/admin/AdminDashboard";
import UploadResource from "../pages/admin/UploadResource";
import ManageUsers from "../pages/admin/ManageUsers";
import FeedbackList from "../pages/admin/FeedbackList";

const Layout = () => {
  const location = useLocation();

  // Hide Navbar only on auth pages
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* AUTH ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER ROUTES */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRole="user">
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute allowedRole="user">
              <Search />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resource/:id"
          element={
            <ProtectedRoute allowedRole="user">
              <ResourceDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRole="user">
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/feedback"
          element={
            <ProtectedRoute allowedRole="user">
              <Feedback />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/upload"
          element={
            <ProtectedRoute allowedRole="admin">
              <UploadResource />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRole="admin">
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/feedback"
          element={
            <ProtectedRoute allowedRole="admin">
              <FeedbackList />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
};

const AppRoutes = () => {
  return <Layout />;
};

export default AppRoutes;