import { useState,useRef, useEffect } from "react";

export default function Form() {
  const inputNameRef=useRef()
  const inputEmailRef=useRef()
  const inputMessageRef=useRef()
  const inputAcceptRef=useRef()
  const inputCountryRef=useRef()
  const validateForm=()=>{
    const NameValue=inputNameRef.current.value
    const EmailValue=inputEmailRef.current.value
    const MessageValue=inputMessageRef.current.value
    const CountryValue=inputCountryRef.current.value
    const AcceptValue=inputAcceptRef.current.checked
    console.log("Nom :",NameValue,"Email :",EmailValue,"Message :",MessageValue,"Country :",CountryValue,"Accept Condition ?",AcceptValue)
  }

  const handleSubmit=()=>{
          validateForm()
  }
  return (
    <div className="container my-5">
    <h2>Contact Form</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" className="form-control" ref={inputNameRef} />
      </div>
  
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" className="form-control" ref={inputEmailRef} />
      </div>
  
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" className="form-control" ref={inputMessageRef}></textarea>
      </div>
  
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <select id="country" className="form-control" ref={inputCountryRef} >
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
  
      <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
    </form>
  </div>
  
  );
}
