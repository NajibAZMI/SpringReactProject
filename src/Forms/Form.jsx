import { useState, useRef } from "react";

export default function Form() {
  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputMessageRef = useRef();
  const inputAcceptRef = useRef();
  const inputCountryRef = useRef();

  const [isFormSent, setIsFormSent] = useState(false);
  const [errors, setErrors] = useState([]);

  const displayErrors = () => {
    return errors.map((error, index) => (
      <li key={index}>
        {error.field} : {error.Message}
      </li>
    ));
  };
  const displayError = (fieldName) => {
    const error = errors.find((error) => error.field === fieldName);
    return error ? (
      <div style={{ color: "red", fontSize: "0.9em" }}>{error.Message}</div>
    ) : null;
  };
  
  const ResetForm = () => {
    inputNameRef.current.value = "";
    inputEmailRef.current.value = "";
    inputMessageRef.current.value = "";
    inputCountryRef.current.value = "";
    inputAcceptRef.current.checked = false;
  };

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const validateForm = () => {
    const NameValue = inputNameRef.current.value;
    const EmailValue = inputEmailRef.current.value;
    const MessageValue = inputMessageRef.current.value;
    const AcceptAll=inputAcceptRef.current.checked;
    let newErrors = [];

    if (NameValue.trim() === "") {
      newErrors.push({ field: "name", Message: "Field required" });
      document.getElementById('name').style.border = '1px solid red';
    }

    if (EmailValue.trim() === "") {
      newErrors.push({ field: "email", Message: "Field required" });
      document.getElementById('email').style.border = '1px solid red';
    } else if (!isValidEmail(EmailValue)) {
      newErrors.push({ field: "email", Message: "Email invalid" });
      document.getElementById('email').style.border = '1px solid red';
    }

    if (MessageValue.trim() === "") {
      newErrors.push({ field: "message", Message: "Field required" });
      document.getElementById('message').style.border = '1px solid red';
    }

    if (!AcceptAll) {
      newErrors.push({ field: "accept", Message: "Field required" });
      document.getElementById('accept').style.border = '1px solid red';
    }

    setErrors(newErrors);

    return newErrors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormSent(false);

    const isValid = validateForm();

    if (isValid) {
      setIsFormSent(true);
      ResetForm();
    }
  };

  return (
    <div className="container my-5">
      {isFormSent && (
        <div className="alert alert-success" role="alert">
          <strong>Success</strong> Form Sent Successfully !!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <div className="alert alert-danger" role="alert">
            <strong>Errors</strong>
            <ul>{displayErrors()}</ul>
          </div>
        )}

        <h2>Contact Form</h2>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            ref={inputNameRef}
          />
          {displayError('name')}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            className="form-control"
            ref={inputEmailRef}
          />
          {displayError('email')}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            className="form-control"
            ref={inputMessageRef}
          ></textarea>
          {displayError('message')}
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
          {displayError('accept')}
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
