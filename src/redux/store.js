import { configureStore } from '@reduxjs/toolkit'
import datareducer from '../redux/feature/dataSlice'
export const store = configureStore({
  reducer: {
    data:datareducer,
  },
})