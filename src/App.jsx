// src/App.jsx (UPDATED)

import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import BlogPostPage from './pages/BlogPostPage';
import DashboardPage from './pages/DashboardPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import EditProfilePage from './pages/EditProfilePage';
import ProfilePage from './pages/ProfilePage';
import MyProfilePage from './pages/MyProfilePage';
import CategoryPage from './pages/CategoryPage';
import NotFoundPage from './pages/NotFoundPage';
import SearchPage from './pages/SearchPage';
import ForgotPassword from './pages/ForgotPasswordPage';
import ResetPassword from './pages/ResetPassword';

import PublicRoute from './components/PublicRoute'; 
import { CookiesProvider } from 'react-cookie'; 
import DashboardLayout from './layouts/DashboardLayout';

function App() {
  return (
      <Routes>

        {/* Public / Standard Pages with Global Nav & Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/edit-post/:id" element={<EditPostPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Studio / Internal Content Curation Pages using Sidebar */}
        <Route element={<DashboardLayout />}>
          <Route path="/my-profile" element={<MyProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
        </Route>

        {/* Auth / Isolated Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

      </Routes>
  );
}

export default App;
