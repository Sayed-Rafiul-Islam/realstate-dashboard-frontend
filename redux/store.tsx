import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '@/redux/auth/authSlice'
import allUsersReducer from '@/redux/users/usersSlice'
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
import gatewaysReducer from '@/redux/data/owner/settings/gatewaySlice'
import invoiceTypesReducer from '@/redux/data/owner/settings/invoiceTypesSlice'
import expenseTypesReducer from '@/redux/data/owner/settings/expenseTypesSlice'
import maintainanceTypesReducer from '@/redux/settings/maintainanceTypesSlice'



import ownerPropertyReducer from '@/redux/data/owner/propertiesSlice'
import ownerUnitsReducer from '@/redux/data/owner/unitsSlice'
import ownerMaintainanceTypesReducer from '@/redux/data/owner/settings/maintainanceTypesSlice'
import OwnerExpenseTypesReducer from '@/redux/data/owner/settings/expenseTypesSlice'
import ownerGatewaysReducer from '@/redux/data/owner/settings/gatewaySlice'
import ownerInvoiceTypesReducer from '@/redux/data/owner/settings/invoiceTypesSlice'
import ownerMaintainersReducer from '@/redux/data/owner/maintainersSlice'
import ownerTenantsReducer from '@/redux/data/owner/tenantsSlice'
import ownerMaintainanceReducer from '@/redux/data/owner/maintainanceRequestsSlice'



import maintainerMaintainanceReducer from '@/redux/data/maintainer/maintainanceRequestsSlice'


import tenantMaintainanceReducer from '@/redux/data/tenant/maintainanceRequestsSlice'



export const store = configureStore({
  reducer: {
    allUsersReducer,
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
    maintainanceTypesReducer,


    ownerPropertyReducer,
    ownerUnitsReducer,
    ownerMaintainanceTypesReducer,
    OwnerExpenseTypesReducer,
    ownerGatewaysReducer,
    ownerInvoiceTypesReducer,
    ownerMaintainersReducer,
    ownerTenantsReducer,
    ownerMaintainanceReducer,

    maintainerMaintainanceReducer,


    tenantMaintainanceReducer

  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch