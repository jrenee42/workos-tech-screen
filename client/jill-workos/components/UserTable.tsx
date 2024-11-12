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


export type User = {
    createdAt: Date;
    first: string;
    id: string;
    last : string;
    photo: string;
    roleId : string;
    updatedAt: Date;
}

export default function UserTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoaded, setLoaded] = useState(false);
    const [error, setError] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3002/users');
                if (response.ok) {
                    const data = await response.json();
                    console.log("got data???", data);
                    setUsers(data.data as User[]);
                } else {
                    console.error('Failed to fetch users');
                    setError('Data not Available.  Please refresh and try again.');
                }
                setLoaded(true);
            } catch (error) {
                console.error('Error:', error);
                setLoaded(true);
                // @ts-ignore
                setError(error?.message || "There was an error on the server loading the data; please try again and contact your administrator if this continues");
            }
        };

        fetchUsers();
    }, []);

    const searchTermChanger = makeChangeListener(setSearchTerm);

    const getContents = () => {
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

        const roleClass = classNames(styles.cell, styles.roleColumn);
        const dateClass = classNames(styles.cell, styles.dateColumn);
        const dropdownClass = classNames(styles.cell, styles.dropdownColumn);

        return (
            <div>
                <div className={styles.tableFilterLine}>
                <TextField.Root placeholder="Search by name…" className={styles.searchBox}
                                value={searchTerm} onChange={searchTermChanger} >
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>
                <Button>
                    <PlusIcon/>
                    Add User

                </Button>
                    {searchTerm}
                </div>

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
            </div>

        );
    };

    return <div className={styles.tabBox}>{getContents()}</div>;

}
