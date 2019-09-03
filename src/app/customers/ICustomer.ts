interface ICustomer
{
    firstName: string,
    lastName: string,
    email: string
}

export class Customer implements ICustomer {
    constructor(public firstName: string = '',
                public lastName: string ='',
                public email: string =''){}
}