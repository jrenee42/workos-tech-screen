import { Dispatch, SetStateAction } from "react";



export async function fetchData<T>(url: string, setter: ((items:T[])=> void), errorSetter:Dispatch<SetStateAction<string>>, onDataReturn?:()=> void  ): Promise<T[]> {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const items = data.data as T[];
        setter(items);
        if (onDataReturn) {
             onDataReturn();
        }
        return items;
    } catch (error) {
        console.error("Error fetching data:", error);
        errorSetter('Data not Available.  Please refresh and try again.');
        if (onDataReturn) {
            onDataReturn();
        }
    }
}

export function addParamToUrl(url:string, param:string, value:string) {
    const urlObj = new URL(url);
    urlObj.searchParams.set(param, value);
    return urlObj.toString();
}
