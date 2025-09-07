// src/App.jsx (UPDATED)

import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import Toaster from "@/components/ui/toast";
// Import all your other pages
import BlogPostPage from './pages/BlogPostPage';
import DashboardPage from './pages/DashboardPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import EditProfilePage from './pages/EditProfilePage';
import ProfilePage from './pages/ProfilePage';
import MyProfilePage from './pages/MyProfilePage';
import ProfileLayout from './layouts/ProfileLayout'; 
import CategoryPage from './pages/CategoryPage';
import NotFoundPage from './pages/NotFoundPage';
import SearchPage from './pages/SearchPage';
import ForgotPassword from './pages/ForgotPasswordPage';
import ResetPassword from './pages/ResetPassword';

// Import the new PublicRoute component
import PublicRoute from './components/PublicRoute'; 
import { CookiesProvider } from 'react-cookie'; // Import the CookiesProvider

function App() {
  return (
    // <CookiesProvider> {/* Wrap your app with CookiesProvider */}
      <Routes>
        {/* Use the PublicRoute component to wrap your landing page
        <Route element={<PublicRoute />}>
        </Route> */}
          <Route path="/" element={<LandingPage />} />

        {/* Routes with the main app Navbar and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/edit-post/:id" element={<EditPostPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Route>

        <Route path="/blog/:slug" element={<BlogPostPage />} />
          
        <Route element={<ProfileLayout />}>
          <Route path="/my-profile" element={<MyProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
        </Route>

        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/my-profile" element={<MyProfilePage />} />
        <Route path="/create-post" element={<CreatePostPage />} />


        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />


        <Route path="*" element={<NotFoundPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>

    // </CookiesProvider>
  );
}

export default App;