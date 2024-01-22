import { createAppSlice } from "../../app/createAppSlice"
import type { PlaceType } from "../../components/Location/GoogleMaps"

export interface RideRequestDetails {
  id?: number
  pickUp?: PlaceType
  dropOff?: PlaceType
  passengers?: number
  info?: string
  status: "Pending" | "Accepted" | "Rejected"
}

export interface RidesSliceState {
  rides: RideRequestDetails[]
}

const initialState: RidesSliceState = {
  rides: [],
}

export const ridesSlice = createAppSlice({
  name: "rides",
  initialState,
  reducers: create => ({
    addRide: create.reducer((state, action: any) => {
      state.rides = [...state.rides, action.payload]
    }),
  }),

  selectors: {
    selectRides: rides => rides.rides,
  },
})

export const { addRide } = ridesSlice.actions

export const { selectRides } = ridesSlice.selectors
