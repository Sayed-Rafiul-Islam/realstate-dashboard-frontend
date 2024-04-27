export interface UsersReducerProps {
    usersReducer : {user : {user_name: string, role: string}}
  }

export interface OrderReducersProps {
    ordersReducer :  { orders : OrderProps[]} 
  }

export interface PackagesReducersProps {
    packagesReducer :  { packages : PackageProps[]} 
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

export interface OrderProps {
    _id : string,
    name : string,
    packageName : string,
    amount : number,
    gateway : string,
    date : string,
    status : string
}