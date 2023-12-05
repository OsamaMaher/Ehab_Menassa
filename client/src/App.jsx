import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Write from "./pages/Write";
import Profile from "./pages/Profile";
import Course from "./pages/Course";
import Chapter from "./pages/Chapter";
import WriteChapter from "./pages/WriteChapter";
import Confirm from "./pages/Confirm";
import Success from "./pages/Success";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/secondarythird",
        element: <Home year="الثالث الثانوي" />,
      },
      {
        path: "/secondarysecond",
        element: <Home year="الثاني الثانوي" />,
      },
      {
        path: "/secondaryfirst",
        element: <Home year="الأول الثانوي" />,
      },
      {
        path: "/chapter/chapter/:id",
        element: <Chapter />,
      },
      {
        path: "/course/:chapterid/:id",
        element: <Course />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/success",
        element: <Success />,
      },
    ],
  },
  {
    path: "/write",
    element: <Write />,
  },
  {
    path: "/write/:chapterId/:id/:cardindex",
    element: <Write />,
  },
  {
    path: "/writechapter",
    element: <WriteChapter />,
  },
  {
    path: "/writechapter/:id",
    element: <WriteChapter />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/confirm/:token",
    element: <Confirm />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
