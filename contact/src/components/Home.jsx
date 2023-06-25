import React, { useEffect, useState,useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import AddModal from './AddUserModal';
import EditModal from './EditModal';
import {searchContext} from '../utils/searchContext';

function Home() {

    const [users, setUsers] = useState([])
    const [response,setResponse] =useState(false)
    const [deleteRes,setDeleteRes] = useState(false)
    const{searchText} = useContext(searchContext)
    const [filterUser,setFilterUser] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('http://localhost:4000/api/contacts')
            if (data.status) {
                setUsers(data.data)
                setFilterUser(data.data)
            }
        }
        fetchData()
    }, [response,deleteRes])

    const handleDelete = async (id)=>{
        const {data} = await axios.delete(`http://localhost:4000/api/contacts/${id}`)
        setDeleteRes(data.status)
    }
    console.log(searchText);

    useEffect(()=>{
        if(searchText){
            const filter = users.filter((user)=>{
                return(
                    user.name.includes(searchText)
                )
            })
            setFilterUser(filter)
        }else{
            setFilterUser(users)
        }
    },[searchText])

    return (
        <>
            
            <div><AddModal setResponse={setResponse} /></div>
           
            <div className='px-10 py-4' >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead className='bg-blue-400 font-bold text-2xl'>
                            <TableRow>
                                <TableCell style={{ color: 'white', fontSize: '1.3rem', fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell style={{ color: 'white', fontSize: '1.3rem', fontWeight: 'bold' }} align="right">Email</TableCell>
                                <TableCell style={{ color: 'white', fontSize: '1.3rem', fontWeight: 'bold' }} align="right">Contact</TableCell>
                                <TableCell style={{ color: 'white', fontSize: '1.3rem', fontWeight: 'bold' }} align="right">Edit</TableCell>
                                <TableCell style={{ color: 'white', fontSize: '1.3rem', fontWeight: 'bold' }} align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                filterUser.map((user) => {

                                    return (
                                        <TableRow key={user.id}>
                                            <TableCell component="th" scope="row">{user.name}</TableCell>
                                            <TableCell align="right">{user.email}</TableCell>
                                            <TableCell align="right">{user.contact}</TableCell>
                                            <TableCell align="right">
                                                <EditModal setResponse={setResponse} user ={user}/>
                                            </TableCell>
                                            <TableCell align="right">
                                                <button className='bg-red-700 text-white p-2  px-8  rounded-lg'
                                                onClick={()=>handleDelete(user.id)}
                                                
                                                >
                                                    delete
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

export default Home
