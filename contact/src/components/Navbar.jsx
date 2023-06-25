import React,{useContext} from 'react'
import {searchContext} from '../utils/searchContext'

function Navbar() {
  const{setSearchtext,searchText} = useContext(searchContext)
  
  return (
    <div className='bg-black text-white flex p-4 justify-between '>
        <div className='ml-20 font-extrabold text-2xl'><h1>user Management</h1></div>
        <div>
            <input type="text"  className='border border-emerald-900 p-2  mr-32 rounded-lg text-black' placeholder='search......'
            onChange={(e)=>setSearchtext(e.target.value)}
            value={searchText}
            
            />

        </div>


    </div>
  )
}

export default Navbar
