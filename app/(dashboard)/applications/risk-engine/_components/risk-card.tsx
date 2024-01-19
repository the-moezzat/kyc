import React from 'react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import "flag-icons/css/flag-icons.min.css";
import RiskEvaluation from "@/app/(dashboard)/applications/risk-engine/_components/risk-evaluation";
import Condition from "@/app/(dashboard)/applications/risk-engine/_components/condition";
import { Switch } from "@/components/ui/switch"
import countries from 'i18n-iso-countries';
import {Separator} from "@/components/ui/separator";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

interface Props {
    country: string
}

function RiskCard({country}: Props) {

    const countryName = country.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    const countryCode = countries.getAlpha2Code(countryName, "en");

    console.log("United States of America => " + countries.getAlpha2Code(country, "en"));
    // turn country to lowecase and then make the first letter uppercase

    return (
        <Card>
            <CardHeader className={'border-b py-3'}>
                <CardTitle className={'text-xl text-gray-800 font-semibold flex items-center gap-2'}>
                    <span className={`fi fi-${countryCode?.toLowerCase()} rounded-sm overflow-hidden`}></span>
                    <span>
                    {countryName}
                    </span>
                </CardTitle>
            </CardHeader>

            <CardContent className={"py-6 flex flex-col gap-5"}>
                <RiskEvaluation title={"Account Balance:"}>
                    <div className={'flex gap-8 items-center'}>
                        <span className={"text-lg font-semibold"}>If</span>
                        <div className={'flex flex-col gap-4'}>
                            <Condition where={'>='} evaluation={"Low Risk"} value={'$1000'}/>
                            <Condition where={'> , <'} evaluation={"Medium Risk"} value={'$1000'}/>
                            <Condition where={'<'} evaluation={"High Risk"} value={'$1000'}/>
                        </div>
                    </div>
                </RiskEvaluation>

                <Separator orientation={'horizontal'} />

                <RiskEvaluation title={"Salary"}>
                    <div className={'flex gap-8 items-center'}>
                        <span className={"text-lg font-semibold"}>If</span>
                        <div className={'flex flex-col gap-4'}>
                            <Condition where={'>='} evaluation={"Low Risk"} value={'$1000'}/>
                            <Condition where={'> , <'} evaluation={"Medium Risk"} value={'$1000'}/>
                            <Condition where={'<'} evaluation={"High Risk"} value={'$1000'}/>
                        </div>
                    </div>
                </RiskEvaluation>

                <Separator orientation={'horizontal'}   />

                <RiskEvaluation title={"Employed"}>
                    <div className={'flex gap-4 items-center'}>
                        <span className={"text-lg font-medium"}>No</span>
                        <Switch />
                        <span className={"text-lg font-medium"}>Yes</span>
                    </div>
                </RiskEvaluation>
            </CardContent>
        </Card>

    );
}

export default RiskCard;