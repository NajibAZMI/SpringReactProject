import { useEffect, useState } from "react"

export default function ContactsList(){
        const [Contacts,setContacts]=useState([])
        useEffect(()=>{
                    fetch("http://localhost:8080/api/contacts")
                     .then(response=>response.json())
                     .then(data=>setContacts(data))
                      .catch(error=>console.error("Erreur :",error))
        },[])

                    return<div className="container mt-4">
                    <h2 className="text-center">Liste des Contacts</h2>
                    <table >
                        <thead >
                            <tr>
                                <th>ID</th>
                                <th>first Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Gender</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Contacts.map(contact => (
                                <tr key={contact.idContact}>
                                    <td>{contact.idContact}</td>
                                    <td>{contact.firstName}</td>
                                    <td>{contact.lastName}</td>
                                    <td>{contact.address}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.phoneNumber}</td>
                                    <td>{contact.gender}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        
}