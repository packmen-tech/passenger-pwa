import { Navigate, useParams } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import DirectionsMap from "../components/Map/Map"
import { selectRides } from "../features/rides/ridesSlice"

const RideDetails = () => {
  const { id } = useParams()
  const rides = useAppSelector(selectRides)
  const ride = rides.find(one => one.id === Number(id))
  if (!ride) {
    return <Navigate to="/ride-request" />
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <DirectionsMap ride={ride} user={"Passenger"} />
    </div>
  )
}

export default RideDetails
