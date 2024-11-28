export default function OrdersTable() {
  return (
    <div>
      <table className=" table">
        <thead>
          <tr>
            <th>User</th>
            <th>Products</th>
            <th>Total price</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Shema</td>
            <td>real madird t-shirt</td>
            <td>1000Rwf</td>
            <td>2024/29/2024</td>
            <td>
              <button className="btn danger">In progress</button>
            </td>
          </tr>
          <tr>
            <td>Shema</td>
            <td>real madird t-shirt</td>
            <td>1000Rwf</td>
            <td>2024/29/2024</td>
            <td>
              <button className=" btn btn-primary">Done</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
