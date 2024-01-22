import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import type { RideRequestDetails } from "../../features/rides/ridesSlice"

function generateDummyTimes() {
  // Get the current date and time
  const now = new Date()

  // Generate a random number of hours between 1 and 10 for the time difference
  const timeDifferenceHours = Math.floor(Math.random() * 10) + 1

  // Set the pick-up time to be the current time plus the time difference
  const pickUpTime = new Date(
    now.getTime() + timeDifferenceHours * 60 * 60 * 1000,
  )

  // Generate a random number of hours between 1 and 10 for the drop-off time difference
  const dropOffTimeDifference = Math.floor(Math.random() * 10) + 1

  // Set the drop-off time to be the pick-up time plus the drop-off time difference
  const dropOffTime = new Date(
    pickUpTime.getTime() + dropOffTimeDifference * 60 * 60 * 1000,
  )

  // Format the times in 24h format without seconds
  const formattedPickUpTime = pickUpTime.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  })
  const formattedDropOffTime = dropOffTime.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  })

  return {
    pickUpTime: formattedPickUpTime,
    dropOffTime: formattedDropOffTime,
  }
}

const RideCard = ({
  ride,
  user,
  onChange,
}: {
  ride: RideRequestDetails
  user: "Passenger" | "Driver"
  onChange?: (status: "Accepted" | "Rejected") => void
}) => {
  const time = generateDummyTimes()
  const navigate = useNavigate()
  return (
    <Card
      sx={{ minWidth: 275, borderRadius: "15px" }}
      onClick={() => {
        if (user === "Passenger") navigate(`/ride-details/${ride.id}`)
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Ride Information
        </Typography>
        <Typography variant="body2">Status: {ride.status}</Typography>
        <Typography variant="body2">
          Pick-up: {ride.pickUp?.description}
        </Typography>
        <Typography variant="body2">
          Drop-off: {ride.dropOff?.description}
        </Typography>
        <Typography variant="body2">Pick-up Time: {time.pickUpTime}</Typography>
        <Typography variant="body2">
          Estimated Drop-off Time: {time.dropOffTime}
        </Typography>
        <Typography variant="body2">Passengers: {ride.passengers}</Typography>
        <Typography variant="body2">Additional Info: {ride.info}</Typography>
      </CardContent>
      {user === "Driver" && ride.status === "Pending" && onChange && (
        <CardActions>
          <Button
            size="small"
            color="error"
            onClick={() => onChange("Rejected")}
          >
            Reject
          </Button>
          <Button size="small" onClick={() => onChange("Accepted")}>
            Accept
          </Button>
        </CardActions>
      )}
    </Card>
  )
}

export default RideCard
