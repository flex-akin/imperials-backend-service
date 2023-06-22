export interface Options {
    subject : string,
}

export interface EnquiryData {
    firstName : string
    lastName : string
    phoneNumber : string
    email : string
    propertyName : string
    enquiry : string
}

export interface MortgageApplication {
    title : string
    fullName : string
    phoneNumber : string
    email : string
    propertyName : string
    equity : string
    age? : string
    address? : string
    occupation? : string
    salaryEarned? : string
    industry? : string

}
