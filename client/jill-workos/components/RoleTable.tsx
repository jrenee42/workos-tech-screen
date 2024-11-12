'use client';

import { useEffect, useState } from 'react';
import styles from './userStyles.module.css';

export default function RoleTable() {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch('http://localhost:3002/roles');
                if (response.ok) {
                    const data = await response.json();
                    console.log("got data???", data);
                    setRoles(data.data);
                } else {
                    console.error('Failed to fetch roles');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchRoles();
    }, []);

    return (
        <div className={styles.tabBox}>
            <h1>Roles</h1>
            <ul>
                {roles.map((role, index) => (
                    <li key={index}>{role.name}</li>
                ))}
            </ul>
        </div>
    );
}
