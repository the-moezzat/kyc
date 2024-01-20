import React from 'react';
import "flag-icons/css/flag-icons.min.css";
import countries from 'i18n-iso-countries';
import {Check} from "lucide-react";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

interface Props {
    name: string;
    selected?: boolean;
    onClick?: () => void;
}
function Country({name, selected, onClick}: Props) {
    const countryName = name.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    const countryCode = countries.getAlpha2Code(countryName, "en");
    return (
        <div className={`flex items-center gap-2 text-lg border rounded-lg p-4 ${selected ? "bg-gray-200" : ""}`} onClick={() => onClick?.()}>

                <span className={`fi fi-${countryCode?.toLowerCase()} rounded-sm overflow-hidden shrink-0`}></span>
                <span className={'text-gray-700'}>
                    {countryName}
                </span>
        </div>
    );
}

export default Country;