'use client';

import React, { useState } from 'react';
import {TextField} from "@radix-ui/themes";

import {Role, roleUrl} from './UserTable';
import {AlertDialog, Button, Flex} from "@radix-ui/themes";
import styles from './userStyles.module.css';
import {makeChangeListener} from "@/app/Utils/formUtils";
import {editRoleName} from "@/app/Utils/BackEndConnector";

type Props = {
    role:Role | undefined;
    isOpen: boolean;
    onOpenClose: (x: boolean) => void;
    onSuccess: () => void;
};

export const RoleDialog: React.FC<Props> = ({role, isOpen, onOpenClose, onSuccess}) => {

    const [name, setName] = useState(role?.name ?? '');

    const nameChanger  = makeChangeListener(setName);

    const doEdit = async() => {
        const successful = await editRoleName(role?.id ?? '', name);

        if (successful) {
            onSuccess();
        }
        // if more time: add a toast with an error here if not successful

    };

    return (<AlertDialog.Root  open={isOpen} onOpenChange={onOpenClose}>
        <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title>Edit Role</AlertDialog.Title>
            <AlertDialog.Description size="2">

                <div className={styles.formLine}>
                    <div className={styles.formLabel}> Name:</div>
                    <TextField.Root value={name} onChange={nameChanger}/>
                </div>

            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                        Cancel
                    </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                    <Button variant="outline" color="blue" onClick={doEdit}>
                        Edit
                    </Button>
                </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>);
}