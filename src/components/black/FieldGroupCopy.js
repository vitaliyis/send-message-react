import React, {Fragment} from 'react'

const FieldGroup = (props) => {
  const {labelText, username, email, name, emailName, onChange, usernameError, emailError} = props
  return (
    <Fragment>
      <label>{labelText}</label>
      <div className="input-group">
        <input
          type="text"
          className={`form-control mb-2 mb-md-0 ${usernameError ? "error-border" : ""}`}
          placeholder="Имя"
          value={username}
          onChange={onChange}
          name={name}
        />
        {usernameError && window.innerWidth < 768 ? (
          <div className="invalid-feedback invalid-feedback-md mb-3">
            {usernameError}
          </div>
        ): null}
        <input
          type="text"
          className={`form-control ${emailError ? "error-border" : ""}`}
          placeholder="Email"
          value={email}
          onChange={onChange}
          name={emailName}
        />
        {emailError && window.innerWidth < 768 ? (
          <div className="invalid-feedback invalid-feedback-md">
            {emailError}
          </div>
        ): null}
      </div>
      {usernameError || emailError ? (
        <div className="invalid-feedback-wrapper-md">
          <div className="invalid-feedback">{usernameError}</div>
          <div className="invalid-feedback">{emailError}</div>
        </div>
      ) : null
      }
    </Fragment>
  )
}

export default FieldGroup