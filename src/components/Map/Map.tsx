import { useEffect, useState } from "react"
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps"
import "@vis.gl/react-google-maps/examples.css"
import type { RideRequestDetails } from "../../features/rides/ridesSlice"

import config from '../../config';

console.log(config)

const DirectionsMap = ({
  ride,
  user,
  requests,
}: {
  ride: RideRequestDetails
  user: "Driver" | "Passenger"
  requests?: RideRequestDetails[]
}) => {
  return (
    <APIProvider apiKey={config.gmapsApiKey}>
      <Map
        center={{
          lat: ride.pickUp?.lat || 51.1657,
          lng: ride.dropOff?.lat || 10.4515,
        }}
        zoom={9}
        fullscreenControl={false}
      >
        {user === "Driver" ? (
          <DirectionsDriver ride={ride} requests={requests} />
        ) : (
          <DirectionsPassenger ride={ride} />
        )}
      </Map>
    </APIProvider>
  )
}

function DirectionsPassenger({ ride }: { ride: RideRequestDetails }) {
  const map = useMap()
  const routesLibrary = useMapsLibrary("routes")
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>()
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>()
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([])
  const [routeIndex, setRouteIndex] = useState(0)
  const selected = routes[routeIndex]
  const leg = selected?.legs[0]
  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return
    setDirectionsService(new routesLibrary.DirectionsService())
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))
  }, [routesLibrary, map])

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return

    directionsService
      .route({
        origin: ride.pickUp!.description,
        destination: ride.dropOff!.description,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then(response => {
        directionsRenderer.setDirections(response)
        setRoutes(response.routes)
      })

    return () => directionsRenderer.setMap(null)
  }, [directionsService, directionsRenderer])

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return
    directionsRenderer.setRouteIndex(routeIndex)
  }, [routeIndex, directionsRenderer])

  useEffect(() => {
    // Start the interval
    const intervalId = setInterval(() => {
      // Check if we reached the end of the array
      if (routeIndex === routes.length - 1) {
        // Stop the interval when the end is reached
        clearInterval(intervalId)
      } else {
        setRouteIndex(prevIndex => prevIndex + 1)
      }
    }, 10000) // 60000 milliseconds = 1 minute

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId)
  }, [routeIndex, routes])

  if (!leg) return null

  return (
    <div className="directions">
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>
    </div>
  )
}

function DirectionsDriver({
  ride,
  requests,
}: {
  ride: RideRequestDetails
  requests?: RideRequestDetails[]
}) {
  const map = useMap()
  const routesLibrary = useMapsLibrary("routes")
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>()
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>()
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([])
  const [routeIndex] = useState(0)
  const selected = routes[routeIndex]
  const leg = selected?.legs[0]

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return
    setDirectionsService(new routesLibrary.DirectionsService())
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))
  }, [routesLibrary, map])

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return
    const waypoints = requests
      ?.filter(one => one.status === "Accepted")
      .map(one => ({ location: one.pickUp?.description }))
    directionsService
      .route({
        origin: ride.pickUp!.description,
        destination: ride.dropOff!.description,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
        waypoints: waypoints,
      })
      .then(response => {
        directionsRenderer.setDirections(response)
        setRoutes(response.routes)
      })
  }, [directionsService, directionsRenderer, JSON.stringify(requests)])

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return
    directionsRenderer.setRouteIndex(routeIndex)
  }, [routeIndex, directionsRenderer])

  if (!leg) return null

  return (
    <div className="directions">
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>
    </div>
  )
}

export default DirectionsMap
