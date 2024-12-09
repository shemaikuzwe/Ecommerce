import React from 'react'

export default function page() {
  return (
    <div  className='flex items-end gap-2 bg-secondary h-20 p-3 rounded-md'>
      &copy; Urban deals shop {new Date().getFullYear()} -All rights Reserved
    </div>
  )
}
