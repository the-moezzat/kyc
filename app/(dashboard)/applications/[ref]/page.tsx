import React from 'react';
import {Button} from "@/components/ui/button";
import {AlertCircle, CheckCircle2, UserCheck, UserX, XCircle} from "lucide-react";
import {faker} from "@faker-js/faker";
import CustomerCard from "./_components/customer-card";
import Info from "./_components/info";
import Image from "next/image";
import HeadCustomer from "@/app/(dashboard)/applications/[ref]/_components/head-customer";

function createRandomUser() {
    const sex = faker.person.sexType();
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
    const nationality = faker.location.country();

    return {
        _id: faker.string.uuid(),
        avatar: faker.image.avatar(),
        dob: faker.date.birthdate(),
        nationality,
        city: faker.location.city(),
        passwordNumber: "A " + faker.number.int({min: 1111111, max: 9999999}),
        passwordType: "P",
        passwordAuthority: nationality,
        issueData: faker.date.past(),
        expiryDate: faker.date.future(),
        age: faker.number.int({min: 18, max: 99}),
        email,
        firstName,
        lastName,
        sex,
    };
}

function Page({params}: {params: {ref: string}}) {
    return (
        <>
            <HeadCustomer customerRef={params.ref} status={faker.helpers.arrayElement(["pending", "approved", "rejected"])}/>

            <div className={'mt-8 flex flex-col gap-6'}>

                <CustomerCard title={"Profile"} className={'grid-cols-[6fr,3fr]'}>
                    <div className={'grid grid-cols-3 gap-4 gap-y-10'}>
                        <Info title={'First Name'}> Tahhar </Info>
                        <Info title={'Middle Name'}> - </Info>
                        <Info title={'Last Name'}> Arcandra </Info>
                        <Info title={'Sex'}> Male </Info>
                        <Info title={'Email '}> Tarcandra@gm... </Info>
                        <Info title={'Phone Number'}> +6240005144566 </Info>
                        <Info title={'Nationality'}> Indonesian </Info>
                        <Info title={'Date of Birth'}> April 13, 1978 </Info>
                        <Info title={'Place of Birth'}> Jakarta </Info>
                        <Info title={'Passport Number'}> A 0542323 </Info>
                        <Info title={'Passport Type'}> P </Info>
                        <Info title={'Passport Authority'}> Indonesia </Info>
                        <Info title={'Issuing Date'}> June 23, 2020 </Info>
                        <Info title={'Expiry Date'}> June 23, 2027 </Info>
                        <Info title={'Age'}> 35 </Info>
                    </div>

                    <div className={'flex flex-col gap-4'}>
                        <Image src={"/passport.png"} alt={"passport"} width={368} height={240} className={"w-11/12"}/>
                        <div className={'flex gap-4 items-center'}>
                            <Image src={"/selfie.png"} alt={"selfie"} width={61} height={82}/>
                            <Image src={"/address.png"} alt={"address"}  width={61} height={82}/>
                        </div>

                        <div className={'grid grid-cols-2 mt-auto'}>
                            <Info title={'Face Match'}> <span className={"text-green-500"}> Success </span> </Info>

                            <Info title={'Score'}> <span className={"text-green-500"}> 0.8 </span> </Info>
                        </div>
                    </div>
                </CustomerCard>

                <CustomerCard title={"Risk Checks"} className={'grid-cols-3 '}>
                    <Info title={'Passport Verification'}>
                        <div className={'flex gap-2 items-center'}>
                            <CheckCircle2 className={'text-green-500'}/>
                            <span> Low Rik </span>
                        </div>
                    </Info>
                    <Info title={'Account Balance'}>
                        <div className={'flex gap-2 items-center'}>
                            <AlertCircle className={'text-yellow-500'}/>
                            <span> Medium Risk </span>
                        </div>
                    </Info>
                    <Info title={'Average Salary'}>
                        <div className={'flex gap-2 items-center'}>
                            <CheckCircle2 className={'text-green-500'}/>
                            <span> Low Risk </span>
                        </div>
                    </Info>
                    <Info title={'Employment Status'}>
                        <div className={'flex gap-2 items-center'}>
                            <CheckCircle2 className={'text-green-500'}/>
                            <span>  Active</span>
                        </div>
                    </Info>
                    <Info title={'Email Verification'}>
                        <div className={'flex gap-2 items-center'}>
                            <XCircle className={'text-red-500'}/>
                            <span> Not Verified </span>
                        </div>
                    </Info>
                    <Info title={'Address Verification'}>
                        <div className={'flex gap-2 items-center'}>
                            <CheckCircle2 className={'text-green-500'}/>
                            <span> Verified </span>
                        </div>
                    </Info>
                    <Info title={'Live Detectness'}>
                        <div className={'flex gap-2 items-center'}>
                            <CheckCircle2 className={'text-green-500'}/>
                            <span> Verified </span>
                        </div>
                    </Info>
                    <Info title={'Traveled Before'}>
                        <div className={'flex gap-2 items-center'}>
                            <CheckCircle2 className={'text-green-500'}/>
                            <span> Yes </span>
                        </div>
                    </Info>

                </CustomerCard>

                <CustomerCard title={"Employment Information"} className={'grid-cols-3 '}>
                    <Info title={'Employment Status'}>Active</Info>
                    <Info title={'Months of Employment'}>23</Info>
                    <Info title={'Company Name'}>Telkom Indonesia</Info>
                </CustomerCard>

                <CustomerCard title={"Financial Standing"} className={'grid-cols-3 '}>
                    <Info title={'Salary'}>$ 2,500</Info>
                    <Info title={' Last Salary Payment'}>Dec 28, 2023</Info>
                    <Info title={'Account Balance'}>$ 7,500</Info>
                    <Info title={'Debit/Credit Card'}>Validated</Info>
                    <Info title={'Insurance Card'}>Validated</Info>
                </CustomerCard>

                <CustomerCard title={"Address & Utility Bill"} className={'grid-cols-3 '}>
                    <Info title={'Address'}> 13 Sindhu, Selatan </Info>
                    <Info title={'City'}> Jakarta </Info>
                    <Info title={'Utility Bill'}> $ 30 </Info>
                </CustomerCard>

                <CustomerCard title={"User Behavior"} className={'grid-cols-3 '}>
                    <Info title={'Passport Issue Date'}> Device  </Info>
                    <Info title={'Did they travel before?'}> Device  </Info>
                    <Info title={'Device '}> Iphone 11 </Info>
                </CustomerCard>
            </div>
        </>
    );
}

export default Page;