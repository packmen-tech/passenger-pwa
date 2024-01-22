import { Button, Grid, TextField, Typography } from "@mui/material"
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus"
import GoogleMaps from "../components/Location/GoogleMaps"
import { useState } from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import type { RideRequestDetails } from "../features/rides/ridesSlice"
import { addRide } from "../features/rides/ridesSlice"
import { selectRides } from "../features/rides/ridesSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import RideCard from "../components/RideCard/RideCard"
import { toast } from "react-toastify"

const RideRequest = () => {
  const rides = useAppSelector(selectRides)
  const [ride, setRide] = useState<RideRequestDetails>({
    passengers: 1,
    info: "",
    status: "Accepted",
  })
  const dispatch = useAppDispatch()
  const handleRequest = () => {
    if (ride.dropOff && ride.pickUp && ride.passengers) {
      // if (
      //   !ride.dropOff.city.includes("Munich") ||
      //   !ride.pickUp.city.includes("Munich")
      // ) {
      //   toast.error("Pick up / drop off locations should be in Munich")
      // } else {
        dispatch(addRide({ ...ride, id: rides.length + 1 } as any))
        setRide({ passengers: 1, info: "", status: "Accepted" })
        toast.success("Request accepted.")
      // }
    } else {
      toast.error("Please fill all required fields")
    }
  }

  return (
    <>
      <AppBar>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#F5F5F5",
          }}
        >
          <DirectionsBusIcon
            fontSize="large"
            style={{ margin: "10px" }}
            color="inherit"
          />
          <Typography variant="subtitle1" textAlign="center" color="secondary">
            Packmen
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Grid container rowSpacing={3} padding="5% 5%" columnSpacing={2}>
        <Grid item lg={4} md={6} xs={12}>
          <GoogleMaps
            label="Pick-up location"
            setPlace={placeType => setRide({ ...ride, pickUp: placeType })}
            place={ride.pickUp || null}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <GoogleMaps
            label="Drop-off location"
            setPlace={placeType => setRide({ ...ride, dropOff: placeType })}
            place={ride.dropOff || null}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <TextField
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            id="outlined-number"
            variant="outlined"
            label="Number of passengers"
            focused
            fullWidth
            color="primary"
            type="number"
            value={ride.passengers}
            required
            onChange={e =>
              setRide({ ...ride, passengers: Number(e.target.value) })
            }
            InputProps={{
              inputProps: { min: 1 },
            }}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <TextField
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            variant="outlined"
            label="Additional Information"
            focused
            fullWidth
            color="primary"
            value={ride.info}
            onChange={e => setRide({ ...ride, info: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              style={{
                width: "225px",
                height: "56px",
                textTransform: "capitalize",
                borderRadius: "15px",
              }}
              color="primary"
              onClick={handleRequest}
            >
              <Typography variant="body1" color="secondary">
                Request Ride
              </Typography>
            </Button>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">Current Rides</Typography>
        </Grid>
        {rides.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body1">No rides found</Typography>
          </Grid>
        )}
        {rides.map((ride, index) => (
          <Grid key={index} item lg={4} md={6} xs={12}>
            <RideCard ride={ride} user="Passenger" />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
export default RideRequest
