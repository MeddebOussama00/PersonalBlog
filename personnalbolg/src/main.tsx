import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import './index.css'

import Error from './pages/Error';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Home from './pages/Home';
import Layout from './components/Layout';
import AllAuthors from './pages/Allauthor';
import ProfilePage from './pages/Profile';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import { store } from './Store'
import { Provider } from 'react-redux'; 
import ProtectedRoute from './components/ProtectedRoute';
import CategoryPost from './pages/CategoryPost';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "logout", element: <Logout /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "home", element: <Home /> },
          { path: "post/category", element: <CategoryPost /> },
          { path: "post/:id", element: <PostDetail /> },
          { path: "author", element: <AllAuthors /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "edit", element: <EditPost /> },
          { path: "create", element: <CreatePost /> },
          { path: "dashboard", element: <Dashboard /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)

