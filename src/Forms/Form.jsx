import { useState,useRef, useEffect } from "react";

export default function Form() {
  const inputNameRef=useRef()
  const inputAgeRef=useRef()
  const inputAcceptRef=useRef()
  const [formValues,setFormValues]=useState({})

  useEffect(()=>{
    inputAcceptRef.current.value='on'
    inputAgeRef.current.value=18
    inputNameRef.current.value='NAJIB'
  },[])

  const handleChange=(e)=>{
    console.log(e.currentTarget.id)
    const id=e.currentTarget.id
    const value=e.currentTarget.value
    setFormValues(preveState=>{
      console.log(preveState)
      return {...preveState,...{[id]:value}}
    })
  }
  const handleSubmit=()=>{
    const values={
    Accept :inputAcceptRef.current.value,
    Age :inputAgeRef.current.value,
    Name :inputNameRef.current.value
    }
    console.log(values)
  }
 
  return (
    <div className="container my-5">
    <h2>Contact Form</h2>
    <form>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" className="form-control" ref={inputNameRef} />
      </div>
  
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" className="form-control"  />
      </div>
  
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" className="form-control" ></textarea>
      </div>
  
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <select id="country" className="form-control" >
          <option value="morocco">Morocco</option>
          <option value="algeria">Algeria</option>
          <option value="tunisia">Tunisia</option>
          <option value="other">Other</option>
        </select>
      </div>
  
      <div className="form-group">
        <input type="checkbox" id="accept" className="form-check-input" ref={inputAcceptRef} />
        <label htmlFor="accept">Accept our rules</label>
      </div>
  
      <div className="form-check">
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </form>
  </div>
  
  );
}
