export default async function Footer() {
  return (
    <div  className='flex items-end gap-2 bg-card   h-20 p-3 rounded-md'>
      &copy; Urban deals shop {new Date().getFullYear()} -All rights Reserved
    </div>
  )
}
