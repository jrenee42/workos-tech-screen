'use client';
import UserPhoto from "@/components/UserPhoto";
import { useEffect, useState } from 'react';
import { Table, Spinner } from "@radix-ui/themes";
import styles from './userStyles.module.css';
import ErrorMessage from "@/components/ErrorText";
import TableMenu from "@/components/DropdownMenu/TableMenu";

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

    const isLoading = !isLoaded && !error;
    const hasError = isLoaded && error;

    if (isLoading){
        return (<div style={{display: "flex", flexDirection: "column"}}>
            Loading....
            <Spinner size="3"/>
        </div>);
    }
    if (hasError) {
        return <ErrorMessage message={error}/>;
    }
    // todo: make User type!
    return (
        <div style={{border:'1px solid #DDDDE3',  padding: '8px',
            display: 'inline-block', borderRadius: '9px'}}>
            hi there
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
                    <Table.RowHeaderCell>  <UserPhoto url={user.photo} name={`${user.first} ${user.last}`}/> </Table.RowHeaderCell>
                        <Table.Cell> hi 22 </Table.Cell>
                    <Table.Cell> there</Table.Cell>
                        <Table.Cell> <TableMenu user={user}/> </Table.Cell>

                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
        </div>
        );
}
