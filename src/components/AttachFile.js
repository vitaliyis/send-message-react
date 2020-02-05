import React from 'react'

const AttachFile = props => {
  const {name, size, index, removeFileInArray, isMaxSizeFile} = props

  return (

    <div className="col-md-6 col-12 mb-3" key={name}>
      <div className={`d-flex justify-content-between align-items-baseline attach-file ${isMaxSizeFile ? "error-border" : ""}`}>
        <div className="d-inline img-name-file">
          <i className="fas fa-paperclip mr-2 ml-2"></i>
          <span>{name}</span>

        </div>

        <div className="d-flex align-items-baseline">
          <div className="size-file"> {Math.round(size/1024)} Kb</div>
          <button
            type="button"
            className="btn btn-link btn-delete"
            onClick={() => removeFileInArray(index)}
          >
            <i className="far fa-trash-alt mr-2"></i>
            Удалить
          </button>
        </div>

      </div>
      {isMaxSizeFile
        ? <div className="ml-3 error-size-file">"Файл не должен превышать 5 мегабайт"</div>
        : null
      }
    </div>

  )
}

export default AttachFile
