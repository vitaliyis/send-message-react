import React from 'react'

const Field = (props) => {
  const {labelText, placeholder, onChange, theme, error, name} = props
  return (
    <div className="form-group mt-3">
      <label>{labelText}</label>
      <input
        type="text"
        className={`form-control ${error ? "error-border" : ""}`}
        placeholder={placeholder}
        onChange={onChange}
        value={theme}
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

export default Field