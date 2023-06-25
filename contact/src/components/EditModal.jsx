import React,{useState} from "react";
import Modal from 'react-modal';
import axios from 'axios'


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const EditModal = ({setResponse,user})=>{
     
      const [modalIsOpen, setIsOpen] = React.useState(false);
      const [errorMsg,setErrorMsg] = React.useState(false);
     
      function openModal() {
        setIsOpen(true);
      }
    
      function closeModal() {
        setIsOpen(false);
      }

    
      

      const [userData,setUserData] = useState({
        name:user.name,
        email:user.email,
        contact:user.contact
       })


      async  function addUserHandler (e){
        e.preventDefault()
        if(userData.name===""||userData.email===""||userData.contact===''){
          setErrorMsg(true)
          
        }else{
         closeModal()
         const  {data} = await axios.put(`http://localhost:4000/api/contacts/${user.id}`,userData)
         setResponse(data.status)


        }
        
       }

       

    return(
    <div>
     <div className="text-2xl font-extrabold ">
      <button  className='bg-blue-700 text-white p-2  px-8  text-lg text-bold rounded-lg' onClick={openModal}>edit</button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >{}
      <div><h1>Add New User</h1></div>
      <form  onSubmit={addUserHandler}>

          <label className="block mt-2">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-800">
           Name
          </span>
            <input type="text" name="name" className="mt-1 px-3 py-2 sm:w-96  h-14  bg-white border shadow-sm border-slate-300
             placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block 
             rounded-md sm:text-lg focus:ring-1" placeholder="enter your name"
             value={userData.name}
             onChange={(e)=>setUserData({...userData,name: e.target.value})}
             
              />
          </label>
          
          <label className="block mt-2">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-800">
           Email
          </span>
            <input type="email" name="email" className="mt-1 px-3 py-2 sm:w-96 h-14 bg-white border shadow-sm border-slate-300
             placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block 
              rounded-md sm:text-lg focus:ring-1" placeholder="you@example.com" 
              value={userData.email}
            onChange={(e)=>setUserData({...userData,email: e.target.value})}
              />
          </label>
          
          
          <label className="block mt-2">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-800">
           Contact
          </span>
            <input type="text" name="contact" className="mt-1 px-3 py-2  sm:w-96 h-14 bg-white border shadow-sm border-slate-300
             placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block 
              rounded-md sm:text-lg focus:ring-1" placeholder="enter Phone" 
              value={userData.contact}
             onChange={(e)=>setUserData({...userData,contact: e.target.value})}
              />
          </label>

          {
            errorMsg?<span className="text-red-600">allfeild required</span>:""
          }
          
          <div className='flex justify-end mt-2 '>
            <div className='bg-slate-800 text-white p-2 px-3 rounded-lg'>
            <div> <button type='submit' >Submit</button></div>
            </div>
            &nbsp;&nbsp;&nbsp;
            <div  className='text-slate-800 border border-slate-800 p-2  px-3 rounded-lg'>
                 <button  onClick={closeModal} > close</button>
            </div>
                      
          </div>
       </form>
      </Modal>
    </div>
    )
}

export default EditModal