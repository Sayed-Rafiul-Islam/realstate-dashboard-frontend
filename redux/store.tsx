import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '@/redux/auth/authSlice'
import ordersReducer from '@/redux/orders/ordersSlice'
import packagesReducer from '@/redux/packages/packagesSlice'
import ownerPackagesReducer from '@/redux/ownerPackages/ownerPackagesSlice'
import messagesReducer from '@/redux/messages/messagesSlice'
import ownersReducer from '@/redux/owners/ownersSlice'
import propertiesReducer from '@/redux/properties/propertiesSlice'
import unitsReducer from '@/redux/units/unitsSlice'
import tenantsReducer from '@/redux/tenants/tenantsSlice'
import invoicesReducer from '@/redux/invoices/invoicesSlice'
import expensesReducer from '@/redux/expenses/expensesSlice'
import documentsReducer from '@/redux/documents/documentsSlice'
import formsReducer from '@/redux/forms/formsSlice'
import rentsReducer from '@/redux/rents/rentsSlice'
import maintainersReducer from '@/redux/maintainers/maintainersSlice'


export const store = configureStore({
  reducer: {
    usersReducer,
    ordersReducer,
    packagesReducer,
    ownerPackagesReducer,
    messagesReducer,
    ownersReducer,
    propertiesReducer,
    unitsReducer,
    tenantsReducer,
    invoicesReducer,
    expensesReducer,
    documentsReducer,
    formsReducer,
    rentsReducer,
    maintainersReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch