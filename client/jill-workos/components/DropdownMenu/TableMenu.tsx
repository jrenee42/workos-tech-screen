import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import "./styles.css";
import {User} from "@/components/UserTable";

type Props = {
   user: User;
};


const TableMenu: React.FC<Props> = ({ user }) => {
    console.log("preparing menu for: ", user);
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="IconButton" aria-label="Customize options">
                    <DotsHorizontalIcon />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className="DropdownMenuContent">
                    <DropdownMenu.Item className="DropdownMenuItem">
                        Edit User
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="DropdownMenuItem">
                        Delete User
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default TableMenu;
