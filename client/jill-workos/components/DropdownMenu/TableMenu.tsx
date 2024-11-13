import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {User} from "@/components/UserTable";

import "./styles.css";

type Props = {
   user: User;
   onDeletePress: (user:User) => void;
};


const TableMenu: React.FC<Props> = ({ user, onDeletePress }) => {
     return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <DotsHorizontalIcon   style={{width: 20, height: 20}} />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className="DropdownMenuContent">
                    <DropdownMenu.Item className="DropdownMenuItem">
                        Edit User
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="DropdownMenuItem"
                                       onSelect={()=> {onDeletePress(user)}}>
                        Delete User
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default TableMenu;
