import RoleTable from "@/components/RoleTable";
import UserTable from "@/components/UserTable";
import { Tabs, Box, Text } from "@radix-ui/themes";

export default function Home() {
  return (
<div>
      <Tabs.Root defaultValue="users">
          <Tabs.List>
              <Tabs.Trigger value="users">Users</Tabs.Trigger>
              <Tabs.Trigger value="roles">Roles</Tabs.Trigger>
          </Tabs.List>

          <Box pt="3">
              <Tabs.Content value="users">
                  <UserTable />
              </Tabs.Content>

              <Tabs.Content value="roles">
                  <RoleTable />
              </Tabs.Content>
          </Box>
      </Tabs.Root>






      </div>
  );
}
