'use client';

import { useEffect, useState } from 'react';
import {  Button } from "@radix-ui/themes";

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
        <div>
            <h1>Users</h1>
            <Button> hello there </Button>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user.first} {user.last}</li>
                ))}
            </ul>
        </div>
    );
}
