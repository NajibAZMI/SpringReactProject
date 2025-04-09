import { useState, useRef, useEffect } from "react";

export default function Form() {
  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputMessageRef = useRef();
  const inputAcceptRef = useRef();
  const inputCountryRef = useRef();

  const [isFormSent,setIsFormSent]=useState()
  const [errors,setErrors]=useState([])
  const displayErrors=()=>{
    return errors.map((error, index) => (
      <li key={index}>{error.field} : {error.Message}</li>
    ));
  
  }

  const ResetForm=()=>{
    inputNameRef.current.value='';
     inputEmailRef.current.value='';
     inputMessageRef.current.value='';
    inputCountryRef.current.value='';
     inputAcceptRef.current.checked=false;

  }
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
   


  const validateForm = () => {
    setErrors([])
    const NameValue = inputNameRef.current.value;
    const EmailValue = inputEmailRef.current.value;
    const MessageValue = inputMessageRef.current.value;
    const CountryValue = inputCountryRef.current.value;
    const AcceptValue = inputAcceptRef.current.checked;
    let IsFormValid=true
    if(NameValue.trim()===''){
         setErrors(prevState=> [...prevState,{field:['Name'],Message:['field required']}]) 
        
    }
    
    if(EmailValue.trim()===''){
      setErrors(prevState=> [...prevState,{field:['Email'],Message:['field required']}]) 
    }else if(!isValidEmail(EmailValue)){
      setErrors(prevState=> [...prevState,{field:['Email'],Message:['Email Invalid']}]) 
  
    }



    if(MessageValue.trim()===''){
      setErrors(prevState=> [...prevState,{field:['Message'],Message:['field required']}]) 
    }
   if(errors.length>0){
    IsFormValid=false
    
   }
   return IsFormValid
  };
 
  const handleSubmit = (e) => {

    e.preventDefault();
    setIsFormSent(false)
     if(validateForm()){
         setIsFormSent(true)
         ResetForm()
     }
     
  };
  return (
    <div className="container my-5">
      
       {isFormSent ? 
              <div class="alert alert-success" role="alert">
              <strong>Success</strong> Form Sent Successfully !!
            </div>
             :
            ''
      }

      <form onSubmit={handleSubmit}>
        {errors.length>0 ?
          <div class="alert alert-danger" role="alert">
          <strong>Errors</strong>
          <ul>
            {displayErrors()}
          </ul>
        </div>
         :
        ''
      }
      

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
            type="text"
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
