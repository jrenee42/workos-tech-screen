'use client';

import React, { useEffect, useState } from 'react';
import {Role, roleUrl} from './UserTable';

import styles from './userStyles.module.css';
import {fetchData} from "@/app/Utils/DataFetcher";
import {Spinner, Table} from "@radix-ui/themes";
import ErrorMessage from "@/components/ErrorText";
import classNames from "classnames";
import {formatDate} from "@/app/Utils/DateUtils";
import {CheckIcon, DotsHorizontalIcon} from "@radix-ui/react-icons";

export default function RoleTable() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [error, setError] = useState<string>('');
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        fetchData<Role>(roleUrl, setRoles, setError, () => {setLoaded(true);});
    }, []);


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

        const roleClass = classNames(styles.cell, styles.roleNameColumn);
        const dateClass = classNames(styles.cell, styles.roleDateColumn);
         const dropdownClass = classNames(styles.cell, styles.dropdownColumn);

         const defaultYesText = <div className={styles.yesText}> Yes</div>;
         const defaultNoText = <div className={styles.noText}> No </div>;

        return (
            <div style={{
                border: '1px solid #DDDDE3', padding: '8px',
                display: 'inline-block', borderRadius: '9px'
            }}>

                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell className={styles.columnHeaderCell}>Role</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className={styles.columnHeaderCell}>Description</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className={styles.columnHeaderCell}>Joined</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className={styles.columnHeaderCell}>Default?</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className={styles.columnHeaderCell}>&nbsp;</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {roles?.map((role, index) => (
                            <Table.Row key={index}>

                                <Table.RowHeaderCell className={roleClass}>
                                    {role.name}
                                </Table.RowHeaderCell>

                                <Table.Cell > {role.description} </Table.Cell>
                                <Table.Cell className={dateClass}> {formatDate(role.createdAt)}</Table.Cell>
                                <Table.Cell className={styles.cell}> {role.isDefault && defaultYesText} {!role.isDefault && defaultNoText}</Table.Cell>
                                <Table.Cell className={dropdownClass}>         <DotsHorizontalIcon   style={{width: 20, height: 20}} /> </Table.Cell>

                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </div>


        );
    };

    return (
        <div className={styles.tabBox}>
            {getTableContents()}
        </div>
    );
}
