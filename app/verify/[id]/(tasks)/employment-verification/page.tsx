'use client';
import React from 'react';
import StartVerification from "@/app/verify/[id]/(tasks)/_components/start-verification";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Carousel, type CarouselApi, CarouselContent, CarouselItem,} from "@/components/ui/carousel"
import Credentials from "@/app/verify/[id]/(tasks)/_components/credentials";
import SuccessfullyMessage from "@/app/verify/[id]/(tasks)/_components/successfully-message";
import axios from "axios";

function Page({params}: { params: { id: string } }) {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)


    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            console.log("current")
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    return (
        <div className={"max-w-screen-sm"}>
            <Carousel orientation={'vertical'} setApi={setApi} opts={{watchDrag: false}}
                      className={'h-[calc(100dvh-64px)] w-full'}>
                <CarouselContent className={'h-[calc(100dvh-64px)] '}>
                    <CarouselItem className={'h-full'}>
                        <div className={'flex flex-col h-full py-4'}>
                            <StartVerification
                                title={'Verify Your Employment'}
                                icon={<Image src={'/office.png'} alt={'bank icon'} width={62} height={62}/>}
                            />

                            <div className={'mt-auto flex flex-col gap-2 text-center px-4'}>
                                <div className={'flex gap-2 w-full'}>
                                    <Button variant={'link'} size={'lg'} className={'mt-auto shrink-1'} asChild>
                                        <Link href={`/verify/${params.id}/tasks`}>
                                            Back
                                        </Link>
                                    </Button>
                                    <Button size={'lg'} className={'w-full grow-1'}
                                            onClick={() => api?.scrollNext(true)}>Verify instantly</Button>
                                </div>
                                <p className={"text-xs text-gray-400"}>By continuing, you agree to the terms &
                                    privacy policy</p>
                            </div>
                        </div>
                    </CarouselItem>

                    <CarouselItem className={'shrink-1 grow-0'}>
                        <Credentials onSuccessfulSubmit={() => {
                            api?.scrollNext(true)

                            // TODO copy for Asan KYC (src/app/[slug])

                        }}/>
                    </CarouselItem>

                    <CarouselItem>
                        <div className={'h-full flex flex-col px-4'}>
                            <SuccessfullyMessage message={'Your employer account is successfully connected'}/>
                            <Button size={'lg'} className={'mt-auto'} asChild>
                                <Link href={`/verify/${params.id}/tasks`}>
                                    Back To Verification Center

                                </Link>
                            </Button>
                        </div>
                    </CarouselItem>

                </CarouselContent>
            </Carousel>
        </div>
    );

    // async function verifyIndonesia (values, { setErrors }) {
    //     try {
    //         // await bpjs.validate(values, { abortEarly: false });
    //         // updateKycData(values);
    //
    //         //
    //         let ID = storedItemId
    //         const response = await axios.get('/api/getAuthToken');
    //         localStorage.setItem('responseData', JSON.stringify(response.data.data.access_token));
    //         const publicAccessToken = response.data.data.access_token;
    //
    //         localStorage.setItem('publicAccessToken', publicAccessToken.toString());
    //         if (publicAccessToken) {
    //             console.log(publicAccessToken);
    //
    //             const secondResponse = await axios.post('/api/getRedirectRefId', {
    //                 accessToken: publicAccessToken,
    //                 userId: "",
    //             });
    //
    //             const redirectRefId = secondResponse.data.data.redirectRefId;
    //             console.log(redirectRefId)
    //             const clientid = secondResponse.data.data.clientId;
    //             localStorage.setItem('redirectRefId', redirectRefId.toString());
    //             localStorage.setItem('clientid', clientid.toString());
    //             console.log(secondResponse)
    //
    //             // const instlist_response = await axios.post('/api/instlist', {
    //             //   publicAccessToken
    //             // });
    //             // console.log(instlist_response.data);
    //
    //             let clientId = clientid
    //             let redirectRef = redirectRefId
    //
    //             if (redirectRef && clientId && publicAccessToken) {
    //
    //
    //                 const response = await axios.post('/api/submitForm', {
    //                     institutionId: ID,
    //                     username: values.email,
    //                     password: values.phone_number,
    //                     redirectRefId: redirectRef,
    //                     clientid: clientId,
    //                     publicAccessToken: publicAccessToken
    //                 });
    //
    //                 let userAccessToken;
    //                 if (response){
    //                     console.log(response.data)
    //                     userAccessToken = response.data.data.accessToken;
    //                 }
    //                 if (userAccessToken && ID === "14") {
    //
    //                     localStorage.setItem('userAccessToken', userAccessToken);
    //
    //
    //                     const incomeResponse = await axios.post('/api/income1', {
    //                         userAccessToken
    //                     });
    //
    //                     const latestSalary = incomeResponse.data.data[0].latestSalary;
    //                     const companyName = incomeResponse.data.data[0].companyName;
    //                     const latestPaymentDate = incomeResponse.data.data[0].latestPaymentDate;
    //                     const workingMonth = incomeResponse.data.data[0].workingMonth;
    //                     const status = incomeResponse.data.data[0].status;
    //
    //
    //                     const incomeResponse2 = await axios.post('/api/income2', {
    //                         userAccessToken
    //                     });
    //
    //                     let totalBalance = incomeResponse2.data.data ? incomeResponse2.data.data.totalBalance : 'No money';
    //
    //                     if (totalBalance && latestSalary && latestPaymentDate && workingMonth && status && companyName) {
    //                         // Get stored values from local storage
    //                         let storedValues = localStorage.getItem('formValues');
    //
    //                         // Parse stored values back into an object
    //                         storedValues = storedValues ? JSON.parse(storedValues) : {};
    //
    //                         // Add new values
    //                         storedValues.latestSalary = latestSalary;
    //                         storedValues.companyName = companyName;
    //                         storedValues.latestPaymentDate = latestPaymentDate;
    //                         storedValues.workingMonth = workingMonth;
    //                         storedValues.status = status;
    //
    //                         // Save updated values back to local storage
    //                         localStorage.setItem('formValues', JSON.stringify(storedValues));
    //                         // await axios.post('/api/sheet', { values: valuesToWrite });
    //                     }
    //
    //
    //
    //                 }
    //
    //                 else if (userAccessToken && ID !== "14"){
    //                     const account = await axios.post('/api/accountList', {
    //                         userAccessToken
    //                     });
    //                     console.log(account.data.data[0].balances.current)
    //                 }
    //
    //                 else {
    //                     console.log('userAccessToken is undefined');
    //                 }
    //             }
    //
    //
    //
    //
    //         } else {
    //             console.log('publicAccessToken is undefined');
    //         }
    //
    //
    //         if (ID === "14") {
    //             localStorage.setItem('formSubmitted', 'true');
    //
    //             router.push("task");
    //         }
    //         else {
    //             localStorage.setItem('formSubmitted2', 'true');
    //             router.push("task");
    //         }
    //         // ;
    //         // router.push("task");
    //     } catch (validationErrors) {
    //         const errors = {};
    //         // validationErrors.inner.forEach((error) => {
    //         // 	const fieldName = error.path;
    //         // 	errors[fieldName] = error.message;
    //         // });
    //         setErrors(errors);
    //         console.log(formik.errors);
    //     }
    // }
}

export default Page;