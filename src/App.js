import React, { useState, useEffect} from "react";
import './App.css';
import axios from "axios";
import Modal from "react-modal";
Modal.setAppElement("#root");


function App() {
 
  const [isOpen, setIsOpen] = useState(false);
  // const [modalData, setModalData] = useState([]);
  const [name, setName] = useState("");
  const [surname,setSurname]= useState("");
  const [gender,setGender]= useState("");
  const [city,setCity]= useState("");
  const [date_of_birth,setDateOfBirth]= useState("");
  const [number_phone,setNumberPhone]= useState("");
  const [gmail,setGmail]= useState("");
  
 
  function toggleModal() {
    
    setIsOpen(!isOpen);
  }
  function openEditForm(customer){
    // setModalData(customer);
    setName(customer.name);
    setSurname(customer.surname);
    setGender(customer.gender);
    setCity(customer.city);
    setDateOfBirth(customer.date_of_birth);
    setNumberPhone(customer.number_phone);
    setGmail(customer.gmail);
    
    setIsOpen(!isOpen);

  }
  

  function editCustomerData(){
   
  //  axios.put(`http://localhost:59840/api/Customers/${id}`).then(res=>{
  //    setName('');
  //    setSurname('');
  //    setGender('');
  //    setCity('');
  //    setDateOfBirth('');
  //    setNumberPhone('');
  //    setGmail('');
  //  })
   debugger;
   setIsOpen(!isOpen);

  }
  // const nameChangeHandler = (e) => {
  //   // setName(e.target.value);
  //   setSurname(e.target.value);
  //   setGender(e.target.value);
  //   setCity(e.target.value);
  //   setDateOfBirth(e.target.value);
  //   setNumberPhone(e.target.value);
  //   setGmail(e.target.value);
  //   };


  const Delete=(id,e)=> {
    e.preventDefault();
    axios.delete(`http://localhost:59840/api/Customers/${id}`)
     .then(res=>{console.log("Deleted!!",res);
      fetchCustomers()}
       ).catch(
       err =>console.log(err)
      );
        
  }
  const Filter=(e,value)=> {
    value=e.target.value;
    debugger;
    axios.get(`http://localhost:59840/api/Customers/GetByGender/${value}`).then((customer) =>
     {setCustomers(customer.data);});

  }
  


  // const Add = ()=>{
  //   const url="http://localhost:59840/api/Customers";
  //   axios.post(url,data)
  //    .then(res) => {
  //      console.log(res);
  //    }
  // }
 const [customers, setCustomers] = useState([]);

 const fetchCustomers = async () => {
    axios.get("http://localhost:59840/api/Customers").then((customer) => {
     setCustomers(customer.data);
     console.log("Customer List");
     console.log(customer.data);
    });

   debugger;
  };
 
 useEffect(() => {
   fetchCustomers();
  }, []);
  

  

 return (
   <div className="App">
     <div>
       <select onChange={(e)=>{Filter(e,e.target.value)}}>
         <option value="h">Hepsi</option>
         <option value="e">Erkek</option>
         <option value ="k">Kız</option>
       </select>
     </div>
     <h1>Customer List</h1>
    
     <table className="table  table-bordered table-hover " >
       <thead >
         <tr >
         <th >İsim</th>
         <th >Soyisim</th>
         <th >Cinsiyet</th>
         <th >Şehir</th>
         <th >Doğum Tarihi</th>
         <th >Telefon Numarasi</th>
         <th >E-mail</th>
         <th >Düzenleme</th>
         </tr>
        </thead>
       <tbody>
         {customers.map((customer) => (
           <tr key={customer.id}>
             <td>{customer.name}</td>
             <td>{customer.surname}</td>
             <td>{customer.gender}</td>
             <td>{customer.city}</td>
             <td>{customer.date_of_birth}</td>
             <td>{customer.number_phone}</td>
             <td>{customer.gmail}</td>
             <td><button className= "btn btn-primary btn-sm " onClick={e=>openEditForm(customer)}>Edit</button>
             <button className="btn btn-primary btn-sm" onClick={(e)=>Delete(customer.id,e)} >Delete</button> </td>
            </tr>
          ))}
       </tbody>
     </table>
     
     
     <div > 
       <Modal 
         isOpen={isOpen}
         onRequestClose={toggleModal}
         contentLabel="My dialog"
         >      
         <div  className="modal-footer span-12">
         <label >İsim</label>
         <input
           type="text"
           name="name"
           value={name}
           onChange={e=>setName(e.target.value)}
           
           /><br />
         <label>Soyisim</label>
         <input
          type="text"
          name="SurName"
          value={surname}
          onChange={e=>setSurname(e.target.value)}
          /><br />
         <label>Cinsiyet</label>
         <input
          type="text"
          name="Gender"
          value={gender}
          onChange={e=>setGender(e.target.value)}
          /><br />
         <label>Şehir</label>
         <input 
         type="text"
         name="City"
         value={city}
          onChange={e=>setCity(e.target.value)}/><br />
         <label>Doğum Tarihi</label>
         <input type="text"
         name="Date_of_birth"
         value={date_of_birth}
          onChange={e=>setDateOfBirth(e.target.value)}/><br />
         <label>Telefon Numarası</label>
         <input 
         type="text"
         name="number_phone"
         value={number_phone}
          onChange={e=>setNumberPhone(e.target.value)}/><br />
         <label>Email</label>
         <input type="text"
         name="gmail"
         value={gmail}
          onChange={e=>setGmail(e.target.value)}/><br />
         <button className= "btn btn-primary" onClick={toggleModal}>Kapat</button>
         <button className= "btn btn-primary" onClick={editCustomerData}>Kaydet</button>
         </div> 
         
        </Modal>
      </div>
    </div>
    
  );

}
export default App;
