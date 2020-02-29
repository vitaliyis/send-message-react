import React, {Fragment} from 'react'

const FieldGroup = (props) => {
  const {
    label,
    inputFirst,
    inputSecond
  } = props
  return (
    <Fragment>
      <label>{label}</label>
      <div className="input-group">
        <input
          type="text"
          className={`form-control mb-2 mb-md-0 ${inputFirst.error ? "error-border" : ""}`}
          placeholder="Имя"
          value={inputFirst.value}
          onChange={inputFirst.onChange}
          name={inputFirst.name}
        />
        {inputFirst.error && window.innerWidth < 768 ? (
          <div className="invalid-feedback invalid-feedback-md mb-3">
            {inputFirst.error}
          </div>
        ): null}
        <input
          type="text"
          className={`form-control ${inputSecond.error ? "error-border" : ""}`}
          placeholder="Email"
          value={inputSecond.value}
          onChange={inputSecond.onChange}
          name={inputSecond.name}
        />
        {inputSecond.error && window.innerWidth < 768 ? (
          <div className="invalid-feedback invalid-feedback-md">
            {inputSecond.error}
          </div>
        ): null}
      </div>
      {inputFirst.error || inputSecond.error ? (
        <div className="invalid-feedback-wrapper-md">
          <div className="invalid-feedback">{inputFirst.error}</div>
          <div className="invalid-feedback">{inputSecond.error}</div>
        </div>
      ) : null
      }
    </Fragment>
  )
}

export default FieldGroup