'use client';
import UserPhoto from "@/components/UserPhoto";
import { useEffect, useState } from 'react';
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
    last : string;
    photo: string;
    roleId : string;
    updatedAt: Date;
}
const userUrl = 'http://localhost:3002/users';

export default function UserTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoaded, setLoaded] = useState(false);
    const [error, setError] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData<User>('http://localhost:3002/users', setUsers, setError, () => {setLoaded(true);});
    }, []);

   const getSearchBar = () => {
       const doUserSearch = (name:string) => {
           console.log('would do user search here....', name);
           let findAll = false;
           if (!name) {
               name = '';
               findAll = true;
           }
           setLoaded(false);
           setSearchTerm(name);
           const searchUrl =  findAll? userUrl :   addParamToUrl(userUrl, 'search', name);
           fetchData<User>(searchUrl,  setUsers, setError, () => {setLoaded(true);});
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
            return (<div style={{display: "flex", flexDirection: "column"}}>
                Loading....
                <Spinner size="3"/>
            </div>);
        }
        if (hasError) {
            return <ErrorMessage message={error}/>;
        }

        console.log('...ok; displaying: ', users);
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

                                <Table.Cell className={roleClass}> hi 22 </Table.Cell>
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
