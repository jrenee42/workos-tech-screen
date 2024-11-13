'use client';
import UserPhoto from "@/components/UserPhoto";
import { SetStateAction, useEffect, useState} from 'react';
import {Table, Spinner, TextField, Button} from "@radix-ui/themes";
import styles from './userStyles.module.css';
import ErrorMessage from "@/components/ErrorText";
import TableMenu from "@/components/DropdownMenu/TableMenu";
import {formatDate} from "@/app/Utils/DateUtils";
import classNames from 'classnames';
import {MagnifyingGlassIcon, PlusIcon} from "@radix-ui/react-icons";
import {makeChangeListener} from "@/app/Utils/formUtils";
import DebouncedTextField from "@/components/basic/DebouncedTextField";
import {addParamToUrl, fetchData} from "@/app/Utils/DataFetcher";


export type User = {
    createdAt: Date;
    first: string;
    id: string;
    last: string;
    photo: string;
    roleId: string;
    updatedAt: Date;
    roleName?: string;
}

export type Role = {
    createdAt: Date;
    description: string;
    id: string;
    isDefault: boolean;
    name: string;
    updatedAt: Date;
}

type StringMap = {
    [key: string]: string;
};

function isStringMapEmpty(map: StringMap): boolean {
    return Object.keys(map).length === 0;
}

const userUrl = 'http://localhost:3002/users';
const roleUrl = 'http://localhost:3002/roles';

export default function UserTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);

    const [isLoaded, setLoaded] = useState(false);
    const [error, setError] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');
    const [roleMap, setRoleMap] = useState<StringMap>({});

    const multiply = (a: number) => (b: number) => a * b;

// Usage
    const multiplyBy2 = multiply(2); // Returns a function that multiplies by 2


    const actuallySetUsers = (newRoles: Role[]) => (usersToSet: User[]) => {
        let mapToUse = roleMap;
        
        // make map of id=> role name for the roles; only if it doesn't already exist
        if (isStringMapEmpty(roleMap)) {
            const newRoleMap: StringMap = {};
            newRoles?.forEach((role: Role) => {
                newRoleMap[role.id] = role.name;
            })
            setRoleMap(newRoleMap);

            mapToUse = newRoleMap;
        }

        usersToSet.forEach((user) => {user.roleName = mapToUse[user.roleId];});
        setUsers(usersToSet);
    };

    const fetchSequentialData = async () => {
        try {
            // Fetch the first set of data (e.g., Users)
            const newRoles = await fetchData<Role>(roleUrl, setRoles, setError);

            const userSetter = actuallySetUsers(newRoles);
            // Fetch the second set of data (e.g., Posts) only after the first fetch is successful
            await  fetchData<User>( userUrl, userSetter, setError, () => {setLoaded(true);});
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Data not available; please refresh and try again");
        }
    };


    useEffect(() => {
        fetchSequentialData();
    }, []);

   const getSearchBar = () => {
       const doUserSearch = (name:string) => {

           let findAll = false;
           if (!name) {
               name = '';
               findAll = true;
           }
           setLoaded(false);
           setSearchTerm(name);
           const searchUrl =  findAll? userUrl :   addParamToUrl(userUrl, 'search', name);
           fetchData<User>(searchUrl,  actuallySetUsers(roles), setError, () => {setLoaded(true);});
       };

       const searchIcon =  <MagnifyingGlassIcon height="16" width="16" />
       return (

               <div className={styles.tableFilterLine}>
                   <DebouncedTextField placeholder={"Search by name…"} className={styles.searchBox}
                                       icon={searchIcon}  onDebouncedChange={doUserSearch}  value={searchTerm}/>
                   <Button>
                       <PlusIcon/>
                       Add User

                   </Button>

               </div>

       )};

    const getTableContents = () => {
        const isLoading = !isLoaded && !error;
        const hasError = isLoaded && error;

        if (isLoading) {
            return (<div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                Loading....
                <Spinner  style={{width:100, height:100}}/>
            </div>);
        }
        if (hasError) {
            return <ErrorMessage message={error}/>;
        }

        console.log('...ok; displaying: ', users, roles);
        const roleClass = classNames(styles.cell, styles.roleColumn);
        const dateClass = classNames(styles.cell, styles.dateColumn);
        const dropdownClass = classNames(styles.cell, styles.dropdownColumn);


        return (
                <div style={{
                border: '1px solid #DDDDE3', padding: '8px',
                display: 'inline-block', borderRadius: '9px'
            }}>

                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell className={styles.columnHeaderCell}>User</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className={styles.columnHeaderCell}>Role</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className={styles.columnHeaderCell}>Joined</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className={styles.columnHeaderCell}>&nbsp;</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {users.map((user, index) => (
                            <Table.Row key={index}>

                                <Table.RowHeaderCell>
                                    <UserPhoto url={user.photo} name={`${user.first} ${user.last}`}/>
                                </Table.RowHeaderCell>

                                <Table.Cell className={roleClass}> {user.roleName} </Table.Cell>
                                <Table.Cell className={dateClass}> {formatDate(user.createdAt)}</Table.Cell>
                                <Table.Cell className={dropdownClass}> <TableMenu user={user}/> </Table.Cell>

                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </div>


        );
    };

    return <div className={styles.tabBox}>
        {getSearchBar()}
        {getTableContents()}
    </div>;

}
