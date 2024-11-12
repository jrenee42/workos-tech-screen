'use client';
import UserPhoto from "@/components/UserPhoto";
import { useEffect, useState } from 'react';
import { Table } from "@radix-ui/themes";
import styles from './userStyles.module.css';
import {LoadingSpinner} from "@/components/LoadingSpinner";

export default function UserTable() {
    const [users, setUsers] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3002/users');
                if (response.ok) {
                    const data = await response.json();
                    console.log("got data???", data);
                    setUsers(data.data);
                } else {
                    console.error('Failed to fetch users');
                }
                setLoaded(true);
            } catch (error) {
                console.error('Error:', error);
                setLoaded(true);
                setError(error);
            }
        };

        fetchUsers();
    }, []);

    if (!isLoaded){
        return <LoadingSpinner/>;
    }
    // todo: make User type!
    return (
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
                        <Table.Cell> hi </Table.Cell>
                    <Table.Cell> there</Table.Cell>
                        <Table.Cell> ...</Table.Cell>

                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
        );
}
