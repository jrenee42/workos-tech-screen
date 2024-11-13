import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import "./styles.css";
import {Role} from "@/components/UserTable";

type Props = {
   role: Role;
   onEditPress: (role: Role) => void;
};


const RoleTableMenu: React.FC<Props> = ({ role, onEditPress }) => {
     return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <DotsHorizontalIcon   style={{width: 20, height: 20}} />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className="DropdownMenuContent">
                    <DropdownMenu.Item className="DropdownMenuItem" onSelect={()=> {onEditPress(role)}}>
                        Edit Role
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="DropdownMenuItem">
                        Delete Role
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default RoleTableMenu;
