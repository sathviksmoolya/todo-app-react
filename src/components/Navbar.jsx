import React from 'react'

function Navbar() {
  return (
    <nav className='flex bg-violet-700 text-white justify-between py-2'>
        <div className="logo">
            <span className="font-bold text-xl mx-9">ez-Task</span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>YourTask</li>
        </ul>
    </nav>
  )
}

export default Navbar
