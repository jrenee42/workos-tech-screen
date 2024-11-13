import RoleTable from "@/components/RoleTable";
import UserTable from "@/components/UserTable";
import {Tabs, Box} from "@radix-ui/themes";

export default function Home() {
    return (
        <div>
            <Tabs.Root defaultValue="users">
                <Tabs.List>
                    <Tabs.Trigger value="users" style={{fontSize: 18}}>Users</Tabs.Trigger>
                    <Tabs.Trigger value="roles" style={{fontSize: 18}}>Roles</Tabs.Trigger>
                </Tabs.List>

                <Box pt="3">
                    <Tabs.Content value="users">
                        <UserTable/>
                    </Tabs.Content>

                    <Tabs.Content value="roles">
                        <RoleTable/>
                    </Tabs.Content>
                </Box>
            </Tabs.Root>

        </div>
    );
}
