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