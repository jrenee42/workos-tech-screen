import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
// import { DropdownMenu } from "@radix-ui/themes";
import {
    DotsHorizontalIcon
} from "@radix-ui/react-icons";//
import "./styles.css";

const TableMenu = () => {


    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="IconButton" aria-label="Customise options">
                    <DotsHorizontalIcon/>
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className="DropdownMenuContent" >
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

export default TableMenu
