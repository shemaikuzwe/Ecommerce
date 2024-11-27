
import { getAllUsers } from "@/lib/action";
import Image from "next/image";
export default async function Page() {
  const users = await getAllUsers();
   console.log(users);
   

  return (
    <div className=" p-4">
      <h3 className=" text-xl font-medium">All customers</h3>
      <table className=" table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Names</th>
            <th>Email</th>
            
          </tr>
        </thead>
        <tbody>
          {users && users.length ? (
            users.map((user) => (
              <tr key={user.id}>
                <td><Image src={user.image!} alt={user.name!} width={50} height={50}/></td>
                <td></td>
                <td>{user.name}</td>
                <td>{user.email}</td>
            
              </tr>
            ))
          ) : (
            <h2>No users found</h2>
          )}
        </tbody>
      </table>
    </div>
  );
}
