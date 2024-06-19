export interface AllUsersReducerProps {
    allUsersReducer : {allUsers : UserProps[]}
}
export interface UserProps {
      _id : string,
      email : string,
      role : string,
      firstName ?: string,
      lastName ?: string,
      contactNo ?: string,
      NID ?: string,
      birthDate ?: string,
      imageUrl : string,
      printName ?: string,
      printAddress ?: string,
      printContact ?: string,
      printLogo ?: string,
}

export interface UsersReducerProps {
    usersReducer : {user : UserProps}
}

export interface OwnerInfoReducerProps {
  ownerInfoReducer : { ownerInfo : OwnerProps}
}

export interface TenantInfoReducerProps {
  tenantInfoReducer : { tenantInfo : TenantProps}
}

export interface MaintainerInfoReducerProps {
  maintainerInfoReducer : { maintainerInfo : MaintainerProps}
}

export interface SummryItemProps {
    id : number,
    subtitle : string,
    title : string,
    icon : any,
    color : string
}

export interface TenantSummryItemProps {
    id : number,
    title : string,
    subtitle : string,
    icon : any
}

// -------------------------------------------------------------

export interface PackageProps {
    _id : string
    label : string,
    maxProperty : number,
    maxUnit : number,
    maxMaintainer : number,
    maxInvoice : number,
    monthlyPrice : number,
    yearlyPrice : number,
    status : boolean,
    trial : boolean
}

export interface PackagesReducersProps {
  packagesReducer :  { packages : PackageProps[]} 
}

export interface OwnerPackageProps {
  _id : string,
  owner : OwnerProps,
  pack : PackageProps,
  gateway : string,
  startDate : string,
  endDate : string,
  status : boolean
}


export interface OwnerPackagesReducersProps {
  ownerPackagesReducer :  { ownerPackages : OwnerPackageProps[]} 
}

export interface AllOwnerPackagesReducersProps {
  allOwnerPackagesReducer :  { allOwnerPackages : OwnerPackageProps[]} 
}

export interface OrderProps {
    _id : string,
    owner : OwnerProps
    pack : PackageProps,
    monthly : boolean,
    status : string,
    orderDate : string,
    dateOfPayment ?: string,
    gateway ?: string,
    transactionId ?: string,
}

export interface OrderReducersProps {
  ordersReducer :  { orders : OrderProps[]} 
}

export interface OwnerOrderReducersProps {
  ownerOrdersReducer :  { ownerOrders : OrderProps[]} 
}

export interface MessageProps {
    _id : string,
    name : string,
    email : string,
    phone : string,
    message : string
    status : boolean,
}

export interface MessagesReducerProps {
  messagesReducer :  { messages : MessageProps[]} 
}

export interface OwnerProps {
    _id : string,
    user : UserProps,
    status : boolean,
    activePackage ?: PackageProps,
    propertyCount : number,
    unitCount : number
}

export interface OwnersReducerProps {
  ownersReducer :  { owners : OwnerProps[]} 
}

export interface PropertyProps {
    _id : string,
    name : string,
    description : string,
    coverImage : string,
    unitCount : number,
    address : string,
    city : string,
    state : string,
    country : string,
    postCode : string
    deposit :number,
    lateFee :number,
    rent : number,
    rentType : string,
    owner : OwnerProps
}

export interface PropertiesReducerProps {
  propertiesReducer :  { properties : PropertyProps[]} 
}

export interface UnitProps {
  _id : string,
  name : string,
  description : string,
  condition : string,
  image : string,
  squareFeet : number,
  bedrooms : number,
  washrooms : number,
  kitchens : number,
  property : PropertyProps,
  owner : OwnerProps
}

export interface UnitsReducerProps {
  unitsReducer :  { units : UnitProps[]} 
}

export interface TenantProps {
  _id : string,
  user : UserProps,
  owner : OwnerProps,
  property : PropertyProps,
  unit : UnitProps,
  name : string,
  age : number,
  occupation : string,
  familyMembers : number,
  address : string,
  city : string,
  state : string,
  country : string,
  postCode : string,
  status : boolean,       
  due : number,
  startDate : string,
  endDate : string,
  personalDoc : string,
  propertyDoc : string
}

export interface TenantsReducerProps {
  tenantsReducer :  { tenants : TenantProps[]} 
}

export interface InvoiceProps {
  _id : string,
  propertyName : string,
  unitName : string,
  typeName : string,
  gatewayName ?: string,
  invoiceNo : string,
  prefix : string,
  month : string,
  year : number,
  status : string,
  amount : number,
  dueDate ?: string,
  dateOfPayment : string,
  description ?: string,
  gateway ?: string,
  transactionId ?: string,
  property : PropertyProps,
  unit : UnitProps,
  type : InvoiceTypeProps,
  owner : OwnerProps
}


export interface InvoicesReducerProps {
  invoicesReducer :  { invoices : InvoiceProps[]} 
}

export interface OwnerInvoicesReducerProps {
  ownerInvoicesReducer :  { ownerInvoices : InvoiceProps[]} 
}
export interface TenantInvoicesReducerProps {
  tenantInvoicesReducer :  { tenantInvoices : InvoiceProps[]} 
}

export interface ExpenseProps {
  _id : string,
  name : string,
  propertyName : string,
  unitName : string,
  maintainerName : string,
  typeName : string,
  amount : number,
  description : string,
  date : string,
  request : MaintainanceRequestProps,
  property : PropertyProps,
  unit : UnitProps,
  owner : OwnerProps,
  maintainer : MaintainerProps
}

export interface ExpensesReducerProps {
  expensesReducer :  { expenses : ExpenseProps[]} 
}

export interface OwnerExpensesReducerProps {
  ownerExpensesReducer :  { ownerExpenses : ExpenseProps[]} 
}

export interface DocumentProps {
  _id : string,
  tenantName ?: string,
  maintainerName ?: string,
  typeName : string,
  propertyName : string,
  unitName ?: string,
  docFront : string,
  docBack : string,
  status : string,
  maintainer ?: MaintainerProps,
  tenant ?: TenantProps,
  type : DocumentSettingsProps,
  owner : OwnerProps,
}

export interface DocumentsReducerProps {
  documentsReducer :  { documents : DocumentProps[]} 
}


export interface DocumentSettingsProps {
    _id : string,
    title : string ,
    details :string ,
    status : boolean,
    owner : OwnerProps
}

export interface DocumentSettingsReducerProps {
  documentSettingsReducer :  { documentSettings : DocumentSettingsProps[]} 
}

export interface TenantDocumentsReducerProps {
  tenantDocumentsReducer :  { tenantDocuments : DocumentProps[]} 
}
export interface MaintainerDocumentsReducerProps {
  maintainerDocumentsReducer :  { maintainerDocuments : DocumentProps[]} 
}

export interface RentProps {
  _id : string,
  propertyName : string,
  unitName : string,
  tenantName : string,
  gatewayName : string,
  invoiceNo : string,
  month : string,
  year : number,
  amount : number,
  dateOfPayment : string,
  description ?: string,
  transactionId : string,
  gateway : GatewayProps,
  property : PropertyProps,
  unit : UnitProps,
  tenant : TenantProps,
  owner : OwnerProps
}

export interface RentsReducerProps {
  rentsReducer :  { rents : RentProps[]} 
}

export interface TenantRentsReducerProps {
  tenantRentsReducer :  { tenantRents : RentProps[]} 
}

export interface MaintainerProps {
  _id : string,
  name : string,
  status : string,
  pendingRequest : number,
  age : number,
  address : string,
  city : string,
  country : string,
  state : string,
  postCode : string,
  type : MaintainanceTypeProps,
  user : UserProps,
  owner : OwnerProps,
  property: PropertyProps
}

export interface MaintainersReducerProps {
  maintainersReducer :  { maintainers : MaintainerProps[]} 
}

export interface MaintainanceRequestProps {
  _id : string,
  propertyName : string,
  unitName : string,
  property : PropertyProps,
  unit : UnitProps,
  date : string,
  requestNo : string,
  type : MaintainanceTypeProps,
  maintainer : MaintainerProps,
  issue : string,
  status : string,
  paymentStatus : string,
  details : string,
  cost : number,
  attachment : string,
  // responsibility : string,
  invoice : string,
  owner : OwnerProps
}

export interface MaintainanceRequestsReducerProps {
  maintainanceReducer :  { maintainanceRequests : MaintainanceRequestProps[]} 
}
export interface OwnerMaintainanceRequestsReducerProps {
  ownerMaintainanceReducer :  { ownerMaintainanceRequests : MaintainanceRequestProps[]} 
}

export interface MaintainerMaintainanceRequestsReducerProps {
  maintainerMaintainanceReducer :  { maintainerMaintainanceRequests : MaintainanceRequestProps[]} 
}

export interface TenantMaintainanceRequestsReducerProps {
  tenantMaintainanceReducer :  { tenantMaintainanceRequests : MaintainanceRequestProps[]} 
}

export interface NotificationsProps {
  _id : string,
  propertyId : string,
  unitId : string,
  issue : string,
  body : string,
  date : string
}

export interface NotificationsReducerProps {
  notificationsReducer :  { notifications : NotificationsProps[]} 
}

export interface EarningsProps {
  _id : string,
  invoiceNo : string,
  propertyId : string,
  unitId : string,
  date : string,
  amount : number,
  tax : number,
}

export interface EarningsReducerProps {
  earningsReducer :  { earnings : EarningsProps[]} 
}

export interface MonthlyRecordProps {
  _id : string,
  month_year : string,
  income : number,
  expense : number,
  net : number
}

export interface MonthlyRecordsReducerProps {
  monthlyRecordsReducer :  { monthlyRecords : MonthlyRecordProps[]} 
}

export interface GatewayProps {
  _id : string,
  title : string,
  slug : string,
  mode : string,
  owner : OwnerProps
}

export interface GatewaysReducerProps {
  gatewaysReducer :  { gateways : GatewayProps[]} 
}
export interface OwnerGatewaysReducerProps {
  ownerGatewaysReducer :  { ownerGateways : GatewayProps[]} 
}
export interface InvoiceTypeProps {
  _id : string,
  title : string,
  tax : number,
  owner : OwnerProps
}

export interface InvoiceTypesReducerProps {
  invoiceTypesReducer :  { invoiceTypes : InvoiceTypeProps[]} 
}
export interface OwnerInvoiceTypesReducerProps {
  ownerInvoiceTypesReducer :  { ownerInvoiceTypes : InvoiceTypeProps[]} 
}
export interface ExpenseTypeProps {
  _id : string,
  title : string,
  owner : OwnerProps
}

export interface ExpenseTypesReducerProps {
  expenseTypesReducer :  { expenseTypes : ExpenseTypeProps[]} 
}

export interface OwnerExpenseTypesReducerProps {
  OwnerExpenseTypesReducer :  { ownerExpenseTypes : ExpenseTypeProps[]} 
}

export interface MaintainanceTypeProps {
  _id : string,
  type : string,
  maintainer : string,
  date : string,
  owner : OwnerProps
}

export interface MaintainanceTypesReducerProps {
  maintainanceTypesReducer :  { maintainanceTypes : MaintainanceTypeProps[]} 
}


// -------------------------------------

export interface OwnerPropertyReducerProps {
  ownerPropertyReducer :  { ownerProperties : PropertyProps[]} 
}

export interface OwnerUnitsReducerProps {
  ownerUnitsReducer :  { ownerUnits : UnitProps[]} 
}

export interface OwnerMaintainanceTypesReducerProps {
  ownerMaintainanceTypesReducer :  { ownerMaintainanceTypes : MaintainanceTypeProps[]} 
}

export interface OwnerMaintainersReducerProps {
  ownerMaintainersReducer :  { ownerMaintainers : MaintainerProps[]} 
}
export interface OwnerTenantsReducerProps {
  ownerTenantsReducer :  { ownerTenants : TenantProps[]} 
}