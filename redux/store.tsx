import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '@/redux/auth/authSlice'
import allUsersReducer from '@/redux/users/usersSlice'
import ownerInfoReducer from '@/redux/info/ownerInfoSlice'
import tenantInfoReducer from '@/redux/info/tenantInfoSlice'
import maintainerInfoReducer from '@/redux/info/maintainerInfoSlice'
import ordersReducer from '@/redux/orders/ordersSlice'
import packagesReducer from '@/redux/packages/packagesSlice'
import allOwnerPackagesReducer from '@/redux/ownerPackages/ownerPackagesSlice'
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
import rentsReducer from '@/redux/data/owner/rentsSlice'
import maintainersReducer from '@/redux/maintainers/maintainersSlice'
import maintainanceReducer from '@/redux/maintainanceRequests/maintainanceRequestsSlice'
import earningsReducer from '@/redux/report/earningsSlice'
import notificationsReducer from '@/redux/report/notificationsSlice'
import monthlyRecordsReducer from '@/redux/report/monthlyRecordsSlice'
import gatewaysReducer from '@/redux/data/owner/settings/gatewaySlice'
import invoiceTypesReducer from '@/redux/data/owner/settings/invoiceTypesSlice'
import expenseTypesReducer from '@/redux/data/owner/settings/expenseTypesSlice'
import maintainanceTypesReducer from '@/redux/settings/maintainanceTypesSlice'
import adminMessagesReducer from '@/redux/data/admin/messagesSlice'
import redReducer from '@/redux/message-red'




import ownerPropertyReducer from '@/redux/data/owner/propertiesSlice'
import ownerUnitsReducer from '@/redux/data/owner/unitsSlice'
import ownerMaintainanceTypesReducer from '@/redux/data/owner/settings/maintainanceTypesSlice'
import OwnerExpenseTypesReducer from '@/redux/data/owner/settings/expenseTypesSlice'
import ownerGatewaysReducer from '@/redux/data/owner/settings/gatewaySlice'
import ownerInvoiceTypesReducer from '@/redux/data/owner/settings/invoiceTypesSlice'
import documentSettingsReducer from '@/redux/data/owner/settings/documentSettingsSlice'
import ownerMaintainersReducer from '@/redux/data/owner/maintainersSlice'
import ownerTenantsReducer from '@/redux/data/owner/tenantsSlice'
import ownerMaintainanceReducer from '@/redux/data/owner/maintainanceRequestsSlice'
import ownerInvoicesReducer from '@/redux/data/owner/invoicesSlice'
import ownerExpensesReducer from '@/redux/data/owner/expensesSlice'
import ownerOrdersReducer from '@/redux/data/owner/ordersSlice'
import ownerPackagesReducer from '@/redux/data/owner/ownerPackagesSlice'
import ownerMessagesReducer from '@/redux/data/owner/messagesSlice'



import maintainerMaintainanceReducer from '@/redux/data/maintainer/maintainanceRequestsSlice'
import maintainerDocumentsReducer from '@/redux/documents/maintainerDocumentsSlice'
import maintainerMessagesReducer from '@/redux/data/maintainer/messagesSlice'


import tenantMaintainanceReducer from '@/redux/data/tenant/maintainanceRequestsSlice'
import tenantInvoicesReducer from '@/redux/data/tenant/invoicesSlice'
import tenantRentsReducer from '@/redux/data/tenant/rentsSlice'
import tenantMessagesReducer from '@/redux/data/tenant/messagesSlice'



export const store = configureStore({
  reducer: {
    redReducer,
    allUsersReducer,
    usersReducer,
    ownerInfoReducer,
    tenantInfoReducer,
    maintainerInfoReducer,
    ordersReducer,
    packagesReducer,
    allOwnerPackagesReducer,
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
    adminMessagesReducer,



    ownerPropertyReducer,
    ownerUnitsReducer,
    ownerMaintainanceTypesReducer,
    OwnerExpenseTypesReducer,
    ownerGatewaysReducer,
    ownerInvoiceTypesReducer,
    documentSettingsReducer,
    ownerMaintainersReducer,
    ownerTenantsReducer,
    ownerMaintainanceReducer,
    ownerInvoicesReducer,
    ownerExpensesReducer,
    ownerOrdersReducer,
    ownerPackagesReducer,
    ownerMessagesReducer,

    maintainerMaintainanceReducer,
    maintainerDocumentsReducer,
    maintainerMessagesReducer,

    tenantMaintainanceReducer,
    tenantInvoicesReducer,
    tenantRentsReducer,
    tenantMessagesReducer

  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch