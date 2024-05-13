export interface UsersReducerProps {
    usersReducer : {user : {user_name: string, role: string}}
  }

export interface OrderReducersProps {
    ordersReducer :  { orders : OrderProps[]} 
  }

export interface PackagesReducersProps {
    packagesReducer :  { packages : PackageProps[]} 
  }
export interface OwnerPackagesReducersProps {
    ownerPackagesReducer :  { ownerPackages : OwnerPackageProps[]} 
  }
export interface MessagesReducerProps {
    messagesReducer :  { messages : MessageProps[]} 
  }
export interface OwnersReducerProps {
    ownersReducer :  { owners : OwnerProps[]} 
  }

export interface PropertiesReducerProps {
    propertiesReducer :  { properties : PropertyProps[]} 
  }

export interface UnitsReducerProps {
    unitsReducer :  { units : UnitProps[]} 
  }

export interface TenantsReducerProps {
    tenantsReducer :  { tenants : TenantProps[]} 
  }

export interface InvoicesReducerProps {
    invoicesReducer :  { invoices : InvoiceProps[]} 
  }

export interface ExpensesReducerProps {
    expensesReducer :  { expenses : ExpenseProps[]} 
  }

export interface DocumentsReducerProps {
    documentsReducer :  { documents : DocumentProps[]} 
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

export interface MessageProps {
    _id : string,
    name : string,
    email : string,
    phone : string,
    message : string
    status : boolean,
}

export interface OwnerProps {
    _id : string,
    name : string,
    email : string,
    contactNo : string,
    status : boolean,
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

export interface UnitProps {
  _id : string,
  propertyId : string,
  name : string,
  description : string,
  condition : string,
  tenant : string,
  image : string,
  squareFeet : number,
  bedrooms : number,
  washrooms : number,
  kitchen : number,
  rent :number,
}

export interface TenantProps {
  _id : string,
  propertyId : string,
  unitId : string,
  name : string,
  image : string,
  email : string,
  phone : string,
  occupation : string,
  startDate : string,
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
  status : boolean
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
  dateOfPayment ?: string,
  gateway ?: string,
  transactionId ?: string,
  payment ?: number
}

export interface ExpenseProps {
  _id : string,
  name : string,
  propertyId : string,
  unitId : string,
  type : string,
  amount : number,
  description : string
}

export interface DocumentProps {
  _id : string,
  type : string,
  tenantId : string,
  docFront : string,
  docBack : string,
  status : string
}
