import React from 'react'

const FieldTextarea = (props) => {
  const {labelText, onChange, message, name, error} = props
  return (
    <div className="form-group mt-3">
      <label>{labelText}</label>
      <textarea
        className={`form-control ${error ? "error-border" : ""}`}
        rows="3"
        onChange={onChange}
        value={message}
        name={name}
      />
      {error ? (
        <div className="invalid-feedback">
          {error}
        </div>
      ): null}
    </div>
  )
}

export default FieldTextarea