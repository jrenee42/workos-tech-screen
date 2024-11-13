import { Dispatch, SetStateAction } from "react";
import { roleUrl, userUrl} from "@/components/UserTable";

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

// copied from the api test
function getFetchOptions(method: string, body?: unknown) {
    return body
        ? {
            method,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(body),
        }
        : { method }
}

export async function deleteUser(userId?:string) {
    if (!userId) {
        return;
    }
    await fetch(userUrl + '/' + userId, getFetchOptions('DELETE'))

    const response = await fetch(userUrl + '/' + userId)

    return (response.status === 404);
}


export async function editRoleName(roleId: string, newName: string) {
    if (!roleId || roleId === '') {
        return false;
    }

const url = `${roleUrl}/${roleId}`;

    const response = await fetch(
        url,
        getFetchOptions('PATCH', { name: newName })
    )

    return (response.status === 200);
}
