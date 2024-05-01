import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '@/redux/auth/authSlice'
import ordersReducer from '@/redux/orders/ordersSlice'
import packagesReducer from '@/redux/packages/packagesSlice'
import ownerPackagesReducer from '@/redux/ownerPackages/ownerPackagesSlice'
import messagesReducer from '@/redux/messages/messagesSlice'
import ownersReducer from '@/redux/owners/ownersSlice'


export const store = configureStore({
  reducer: {
    usersReducer,
    ordersReducer,
    packagesReducer,
    ownerPackagesReducer,
    messagesReducer,
    ownersReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch