import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Driver from "./pages/Driver"
import RideDetails from "./pages/RideDetails"
import RideRequest from "./pages/RideRequest"

const router = createBrowserRouter([
  {
    path: "/ride-request",
    element: <RideRequest />,
  },
  {
    path: "/ride-details/:id",
    element: <RideDetails />,
  },
  {
    path: "/driver",
    element: <Driver />,
  },
  {
    path: "*",
    element: <Navigate to="/ride-request" />,
  },
])

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
