'use client';

import { useEffect, useState } from 'react';
import {  Button, Table } from "@radix-ui/themes";

export default function UserTable() {
    const [users, setUsers] = useState([]);

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
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Joined</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>&nbsp</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {users.map((user, index) => (
                    <Table.Row key={index}>
                    <Table.RowHeaderCell>    {user.first} {user.last} </Table.RowHeaderCell>
                        <Table.Cell> hi </Table.Cell>
                    <Table.Cell> there</Table.Cell>
                        <Table.Cell> ...</Table.Cell>

                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
        );
}
