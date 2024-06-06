import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '@/redux/auth/authSlice'
import ownerInfoReducer from '@/redux/info/ownerInfoSlice'
import tenantInfoReducer from '@/redux/info/tenantInfoSlice'
import maintainerInfoReducer from '@/redux/info/maintainerInfoSlice'
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
import tenantDocumentsReducer from '@/redux/documents/tenantDocumentsSlice'
import formsReducer from '@/redux/forms/formsSlice'
import rentsReducer from '@/redux/rents/rentsSlice'
import maintainersReducer from '@/redux/maintainers/maintainersSlice'
import maintainanceReducer from '@/redux/maintainanceRequests/maintainanceRequestsSlice'
import earningsReducer from '@/redux/report/earningsSlice'
import notificationsReducer from '@/redux/report/notificationsSlice'
import monthlyRecordsReducer from '@/redux/report/monthlyRecordsSlice'
import gatewaysReducer from '@/redux/settings/gatewaySlice'
import invoiceTypesReducer from '@/redux/settings/invoiceTypesSlice'
import expenseTypesReducer from '@/redux/settings/expenseTypesSlice'
import maintainanceTypesReducer from '@/redux/settings/maintainanceTypesSlice'


export const store = configureStore({
  reducer: {
    usersReducer,
    ownerInfoReducer,
    tenantInfoReducer,
    maintainerInfoReducer,
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
    tenantDocumentsReducer,
    formsReducer,
    rentsReducer,
    maintainersReducer,
    maintainanceReducer,
    earningsReducer,
    notificationsReducer,
    monthlyRecordsReducer,
    gatewaysReducer,
    invoiceTypesReducer,
    expenseTypesReducer,
    maintainanceTypesReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch