import React, {Fragment} from 'react'
import AttachFile from "./AttachFile";

const FieldFile = props => {

  const {files, removeFileInArray, onChange, maxSizeFiles} = props

  return (
    <Fragment>
      <div className="row">
        {files.map((item, index) => {
          return (
            <AttachFile
              key={index}
              nameFile={item.name}
              size={item.size}
              index={index}
              removeFileInArray={removeFileInArray}
            />
          )
        })}
      </div>

      <div className="form-group">
        <input
          type="file"
          className="form-control-file"
          onChange={onChange}
          name="files"
          id="uploadFile"
          multiple
        />

        <label htmlFor="uploadFile" className={`upload-file ${maxSizeFiles > 1 ? "error-size-file" : ""}`}>
          <i className="fas fa-paperclip mr-2"></i>
          Прикрепить файл
        </label>
        {maxSizeFiles > 1
          ? <span className="ml-3 error-size-file">"Общий размер файлов не должен превышать 20 мегабайт"</span>
          : null
        }

      </div>
    </Fragment>
  )
}

export default FieldFile