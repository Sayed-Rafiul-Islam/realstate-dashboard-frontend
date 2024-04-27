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