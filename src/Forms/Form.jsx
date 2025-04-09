import { useState, useRef, useEffect } from "react";

export default function Form() {
  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputMessageRef = useRef();
  const inputAcceptRef = useRef();
  const inputCountryRef = useRef();

  const [isFormSent,setIsFormSent]=useState()
  
  const ResetForm=()=>{
    inputNameRef.current.value='';
     inputEmailRef.current.value='';
     inputMessageRef.current.value='';
    inputCountryRef.current.value='';
     inputAcceptRef.current.checked=false;
  }

  const validateForm = () => {
    const NameValue = inputNameRef.current.value;
    const EmailValue = inputEmailRef.current.value;
    const MessageValue = inputMessageRef.current.value;
    const CountryValue = inputCountryRef.current.value;
    const AcceptValue = inputAcceptRef.current.checked;
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const NameValue = inputNameRef.current.value;
    const EmailValue = inputEmailRef.current.value;
    const MessageValue = inputMessageRef.current.value;
    const CountryValue = inputCountryRef.current.value;
    const AcceptValue = inputAcceptRef.current.checked;
    console.log(
      "Nom :",
      NameValue,
      "Email :",
      EmailValue,
      "Message :",
      MessageValue,
      "Country :",
      CountryValue,
      "Accept Condition ?",
      AcceptValue
    );
    setIsFormSent(true)
    ResetForm()
  };
  return (
    <div className="container my-5">
      {isFormSent ?
           <div class="alert alert-success" role="alert">
           <strong>Success</strong> Message Sent Successfully !!
         </div>
         :
         ''
    }
      

      <form onSubmit={handleSubmit}>
        <h2>Contact Form</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            ref={inputNameRef}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            ref={inputEmailRef}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            className="form-control"
            ref={inputMessageRef}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <select id="country" className="form-control" ref={inputCountryRef}>
            <option value="morocco">Morocco</option>
            <option value="algeria">Algeria</option>
            <option value="tunisia">Tunisia</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <input
            type="checkbox"
            id="accept"
            className="form-check-input"
            ref={inputAcceptRef}
          />
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
