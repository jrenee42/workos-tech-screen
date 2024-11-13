'use client';

import {useEffect, useState} from 'react';
import {Table, Spinner, Button, AlertDialog, Flex} from "@radix-ui/themes";
import {MagnifyingGlassIcon, PlusIcon} from "@radix-ui/react-icons";
import classNames from 'classnames';

import UserPhoto from "@/components/UserPhoto";
import ErrorMessage from "@/components/ErrorText";
import TableMenu from "@/components/DropdownMenu/TableMenu";
import {formatDate} from "@/app/Utils/DateUtils";

import DebouncedTextField from "@/components/basic/DebouncedTextField";
import {addParamToUrl, deleteUser, fetchData} from "@/app/Utils/BackEndConnector";

import styles from './userStyles.module.css';

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

export const userUrl = 'http://localhost:3002/users';
export const roleUrl = 'http://localhost:3002/roles';

export default function UserTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);

    const [isLoaded, setLoaded] = useState(false);
    const [error, setError] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');
    const [roleMap, setRoleMap] = useState<StringMap>({});
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User>();

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

        usersToSet?.forEach((user) => {
            user.roleName = mapToUse[user.roleId];
        });
        setUsers(usersToSet);
    };

    const fetchSequentialData = async () => {
        try {
            // Fetch the first set of data (e.g., Users)
            const newRoles = await fetchData<Role>(roleUrl, setRoles, setError);

            const userSetter = actuallySetUsers(newRoles);
            // Fetch the second set of data (e.g., Posts) only after the first fetch is successful
            await fetchData<User>(userUrl, userSetter, setError, () => {
                setLoaded(true);
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Data not available; please refresh and try again");
        }
    };


    useEffect(() => {
        fetchSequentialData();
    }, []);

    const handleOpenChange = (isOpen: boolean) => {
        setShowDeleteDialog(isOpen);
    };

    // shows the dialog
    const onDeletePress = (user: User) => {
        setSelectedUser(user);
        setShowDeleteDialog(true);
    };

    // actually do the deletion here
    const deleteSelectedUser = async () => {

        // send deletion request with an await; if successful show success toast
        const successful = await deleteUser(selectedUser?.id);
        // and then reload the users (with the same search term we currently have!

        // if unsuccessful ;show the error toast

        // so...no toasts in radix yet :(
        // will do that tomorrow/later
        // just reload now; if successful
        // if more time, would add toast/snack bar message feedback here

        if (successful) {
            // reload
            doUserSearch(searchTerm);

        }

    }

    const dialog2 = <AlertDialog.Root open={showDeleteDialog} onOpenChange={handleOpenChange}>
        <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title>Delete User</AlertDialog.Title>
            <AlertDialog.Description size="2">
                Are you sure? The user
                <span style={{fontWeight: 800}}> {selectedUser?.first} {selectedUser?.last} </span>
                will be permanently deleted.
            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                        Cancel
                    </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                    <Button variant="outline" color="red" onClick={deleteSelectedUser}>
                        Delete user
                    </Button>
                </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>;

    const doUserSearch = (name: string) => {

        let trimmedName = name ? name.trim() : '';

        let findAll = false;
        if (!trimmedName) {
            trimmedName = '';
            findAll = true;
        }
        setLoaded(false);
        setSearchTerm(trimmedName);
        const searchUrl = findAll ? userUrl : addParamToUrl(userUrl, 'search', trimmedName);
        fetchData<User>(searchUrl, actuallySetUsers(roles), setError, () => {
            setLoaded(true);
        });
    };

    const getSearchBar = () => {
        const searchIcon = <MagnifyingGlassIcon height="16" width="16"/>
        return (

            <div className={styles.tableFilterLine}>
                <DebouncedTextField placeholder={"Search by name…"} className={styles.searchBox}
                                    icon={searchIcon} onDebouncedChange={doUserSearch} value={searchTerm}/>
                <Button>
                    <PlusIcon/>
                    Add User
                </Button>
            </div>
        )
    };

    const getTableContents = () => {
        const isLoading = !isLoaded && !error;
        const hasError = isLoaded && error;

        if (isLoading) {
            return (<div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                Loading....
                <Spinner style={{width: 100, height: 100}}/>
            </div>);
        }
        if (hasError) {
            return <ErrorMessage message={error}/>;
        }

        const roleClass = classNames(styles.cell, styles.roleColumn);
        const dateClass = classNames(styles.cell, styles.dateColumn);
        const dropdownClass = classNames(styles.cell, styles.dropdownColumn);

        const searchFoundNoUsers = () => (!users || users.length === 0) && searchTerm;

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
                        {users?.map((user, index) => (
                            <Table.Row key={index}>

                                <Table.RowHeaderCell>
                                    <UserPhoto url={user.photo} name={`${user.first} ${user.last}`}/>
                                </Table.RowHeaderCell>

                                <Table.Cell className={roleClass}> {user.roleName} </Table.Cell>
                                <Table.Cell className={dateClass}> {formatDate(user.createdAt)}</Table.Cell>
                                <Table.Cell className={dropdownClass}> <TableMenu user={user}
                                                                                  onDeletePress={onDeletePress}/>
                                </Table.Cell>

                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
                {searchFoundNoUsers() && <ErrorMessage message={`Search for ${searchTerm} found no results`}/>}
            </div>


        );
    };

    return <div className={styles.tabBox}>
        {getSearchBar()}
        {getTableContents()}
        {showDeleteDialog && selectedUser && dialog2}
    </div>;
}
