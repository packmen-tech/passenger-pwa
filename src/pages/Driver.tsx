import { AppBar, Toolbar, Typography, Grid } from "@mui/material"
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus"
import type { RideRequestDetails } from "../features/rides/ridesSlice"
import { useState } from "react"
import DirectionsMap from "../components/Map/Map"
import RideCard from "../components/RideCard/RideCard"

const Driver = () => {
  const [ride] = useState<RideRequestDetails>({
    passengers: 1,
    info: "",
    status: "Accepted",
    dropOff: {
      description: "Garching bei München, Germany",
      place_id: "ChIJ_Qs1mGlkmUcRkH3fpbdrHwQ",
      lat: 48.4010822,
      lng: 9.987607599999999,
      city: ["Munich"],
    },
    pickUp: {
      description: "Unterhaching, Germany",
      place_id: "ChIJ2V-Mo_l1nkcRfZixfUq4DAE",
      lat: 48.1351253,
      lng: 11.5819806,
      city: ["Munich"],
    },
  })
  const [requests, setRequests] = useState<RideRequestDetails[]>([
    {
      passengers: 1,
      info: "Pregnant",
      status: "Pending",
      pickUp: {
        description: "Laim, Munich, Germanz",
        place_id: "ChIJwcNpobo8nEcRkJ6L161IHgQ",
        lat: 48.0464144,
        lng: 10.8718015,
        city: ["Munich"],
      },
      dropOff: {
        description: "Garching bei München, Germany",
        place_id: "ChIJ_Qs1mGlkmUcRkH3fpbdrHwQ",
        lat: 48.4010822,
        lng: 9.987607599999999,
        city: ["Munich"],
      },
    },
    {
      passengers: 3,
      info: "Wheel Chair",
      status: "Pending",
      pickUp: {
        description: "Oberschleißheim, Germany",
        place_id: "ChIJP_ogz1fym0cR2CeWXchIgM8",
        lat: 47.9837999,
        lng: 10.1801883,
        city: ["Munich"],
      },
      dropOff: {
        description: "Garching bei München, Germany",
        place_id: "ChIJ_Qs1mGlkmUcRkH3fpbdrHwQ",
        lat: 48.4010822,
        lng: 9.987607599999999,
        city: ["Munich"],
      },
    },
  ])

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
      <div
        style={{
          height: "60vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DirectionsMap ride={ride} user={"Driver"} requests={requests} />
      </div>
      <Grid container rowSpacing={3} padding="5% 5%" columnSpacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle2">Current Requests</Typography>
        </Grid>
        {requests.map((ride, index) => (
          <Grid key={index} item lg={4} md={6} xs={12}>
            <RideCard
              ride={ride}
              user="Driver"
              onChange={status => {
                const request = { ...requests[index], status }
                const requestsNew = [...requests]
                requestsNew[index] = request
                setRequests(requestsNew)
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Driver
