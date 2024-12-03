import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableCaption,
  TableRow,
} from "@/components/ui/table";

import {getAllUsers} from "@/lib/action/server";
export default async function Page() {
  const users = await getAllUsers();

  return (
    <Table>
      <TableCaption>A list of all users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Date Joined</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users && users.length ? (
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={user.image!} />
                  <AvatarFallback>
                    {user.name?.slice(0, 2).toLocaleUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))
        ) : (
          <h2>No users found</h2>
        )}
      </TableBody>
    </Table>
  );
}
