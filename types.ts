export interface UserProps {
      _id : string,
      email : string,
      role : string,
      firstName ?: string,
      lastName ?: string,
      contactNo ?: string,
      NID ?: string,
      birthDate ?: string,
      imageUrl ?: string,
      printName ?: string,
      printAddress ?: string,
      printContact ?: string,
      printLogo ?: string,
}

export interface TenantInfoReducerProps {
  tenantInfoReducer : { tenantInfo : TenantProps}
}
export interface UsersReducerProps {
    usersReducer : {user : UserProps}
  }

export interface SummryItemProps {
    id : number,
    subtitle : string,
    title : string,
    icon : any
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
    monthlyPrice : number,
    yearlyPrice : number,
    maxProperty : number,
    maxUnit : number,
    status : boolean,
    trial : boolean
}

export interface PackagesReducersProps {
  packagesReducer :  { packages : PackageProps[]} 
}

export interface OwnerPackageProps {
  _id : string,
  name : string,
  email : string,
  packageName : string,
  gateway : string,
  startDate : string,
  endDate : string,
  paymentStatus : string,
  status : boolean
}


export interface OwnerPackagesReducersProps {
  ownerPackagesReducer :  { ownerPackages : OwnerPackageProps[]} 
}

export interface OrderProps {
    _id : string,
    name : string,
    packageName : string,
    amount : number,
    gateway : string,
    date : string,
    status : string,
    transactionId : string
}

export interface OrderReducersProps {
  ordersReducer :  { orders : OrderProps[]} 
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
    name : string,
    email : string,
    contactNo : string,
    status : boolean,
}

export interface OwnersReducerProps {
  ownersReducer :  { owners : OwnerProps[]} 
}

export interface PropertyProps {
    _id : string,
    name : string,
    description : string,
    location : string,
    coverImage : string,
    unitCount : number,
    rooms :number,
    available :number,
    tenants :number,
    deposit :number,
    lateFee :number,
    rent : number,
    rentType : string,
    city : string,
    state : string,
    country : string,
    postCode : string
}

export interface PropertiesReducerProps {
  propertiesReducer :  { properties : PropertyProps[]} 
}

export interface UnitProps {
  _id : string,
  propertyId : string,
  name : string,
  description : string,
  condition : string,
  tenantId : string,
  image : string,
  squareFeet : number,
  bedrooms : number,
  washrooms : number,
  kitchen : number,
}

export interface UnitsReducerProps {
  unitsReducer :  { units : UnitProps[]} 
}

export interface TenantProps {
  _id : string,
  userId : string,
  ownerId : string,
  propertyId : string,
  unitId : string,
  name : string,
  image : string,
  email : string,
  phone : string,
  occupation : string,
  startDate : string,
  endDate : string,
  dueDate : string,
  address : string,
  city : string,
  state : string,
  country : string,
  postalCode : string,
  NID : number,
  due : number,
  age : number,
  familyMember : number,
  status : boolean,       
  personalDoc : string,
  propertyDoc : string

}

export interface TenantsReducerProps {
  tenantsReducer :  { tenants : TenantProps[]} 
}

export interface InvoiceProps {
  _id : string,
  invoiceNo : string,
  prefix : string,
  propertyId : string,
  unitId : string,
  month : string,
  dueDate : string,
  type : string,
  description : string,
  status : string,
  amount : number,
  dateOfPayment : string,
  gateway ?: string,
  transactionId ?: string,
  payment ?: number
}


export interface InvoicesReducerProps {
  invoicesReducer :  { invoices : InvoiceProps[]} 
}

export interface ExpenseProps {
  _id : string,
  name : string,
  propertyId : string,
  unitId : string,
  type : string,
  amount : number,
  description : string,
  date : string,
  status : boolean
}

export interface ExpensesReducerProps {
  expensesReducer :  { expenses : ExpenseProps[]} 
}

export interface DocumentProps {
  _id : string,
  type : string,
  tenantId : string,
  docFront : string,
  docBack : string,
  status : string
}

export interface DocumentsReducerProps {
  documentsReducer :  { documents : DocumentProps[]} 
}

export interface RentProps {
  _id : string,
  dueDate : string,
  invoiceNo : string,
  propertyId : string,
  unitId : string,
  month : string,
  amount : number,
  status : string,
  description : string,
  dateOfPayment : string,
  gateway : string,
  transactionId : string,
  payment : number
}

export interface RentsReducerProps {
  rentsReducer :  { rents : RentProps[]} 
}

export interface MaintainerProps {
  _id : string,
  image : any,
  name : string,
  phone : string,
  email : string,
  type : string,
  pendingRequest : number,
  status : string,
  propertyId : string,
  unitId : string,
  address : string,
  city : string,
  state : string,
  country : string,
  postalCode : string,
  age : number,
  NID : number,
}

export interface MaintainersReducerProps {
  maintainersReducer :  { maintainers : MaintainerProps[]} 
}

export interface MaintainanceRequestProps {
  _id : string,
  date : string,
  requestNo : string,
  type : string,
  propertyId : string,
  unitId : string,
  maintainerId : string,
  issue : string,
  status : string,
  details : string,
  cost : number,
  attachment : string
}

export interface MaintainanceRequestsReducerProps {
  maintainanceReducer :  { maintainanceRequests : MaintainanceRequestProps[]} 
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
  mode : string
}

export interface GatewaysReducerProps {
  gatewaysReducer :  { gateways : GatewayProps[]} 
}
export interface InvoiceTypeProps {
  _id : string,
  title : string,
  tax : number
}

export interface InvoiceTypesReducerProps {
  invoiceTypesReducer :  { invoiceTypes : InvoiceTypeProps[]} 
}
export interface ExpenseTypeProps {
  _id : string,
  title : string,
}

export interface ExpenseTypesReducerProps {
  expenseTypesReducer :  { expenseTypes : ExpenseTypeProps[]} 
}

export interface MaintainanceTypeProps {
  _id : string,
  type : string,
  maintainer : string,
  date : string
}

export interface MaintainanceTypesReducerProps {
  maintainanceTypesReducer :  { maintainanceTypes : MaintainanceTypeProps[]} 
}