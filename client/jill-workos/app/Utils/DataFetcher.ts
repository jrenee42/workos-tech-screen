import { Dispatch, SetStateAction } from "react";

export async function fetchData<T>(url: string, setter: Dispatch<SetStateAction<T[]>>, errorSetter:Dispatch<SetStateAction<string>>, onDataReturn?:()=> void  ): Promise<void> {
    try {
        const response = await fetch(url);
        const data = await response.json();
        setter(data.data as T[]);
        if (onDataReturn) {
             onDataReturn();
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        errorSetter('Data not Available.  Please refresh and try again.');
        if (onDataReturn) {
            onDataReturn();
        }
    }
}

export function addParamToUrl(url, param, value) {
    const urlObj = new URL(url);
    urlObj.searchParams.set(param, value);
    return urlObj.toString();
}
