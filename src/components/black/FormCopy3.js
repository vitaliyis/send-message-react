import React from 'react'
import FieldGroup from "../Fields/FieldGroup";
import Field from "../Fields/Field";
import FieldTextarea from "../Fields/FieldTextarea";
import AttachFile from "../Fields/AttachFile";

const MAX_ALL_FILES_SIZE = 20971520

class Form  extends React.Component {
  constructor(){
    super()

    this.state = {
      values: {
        usernameFrom: '',
        emailFrom: '',
        usernameTo: '',
        emailTo: '',
        theme: '',
        message: '',
        files: [],
      },
      errors: {
        theme: '',
        message: ''
      }
    }
  }

  onChange = event => {
    const name = event.target.name
    let value = event.target.value
    let newFile = null

    if (name === 'files') {
      const newFiles = [...this.state.values.files]
      newFile = event.target.files[0]
      console.log('newFile : ', newFile)
      newFiles.push(newFile)
      value = newFiles
    }
    this.setState(state => ({
      values: {...state.values, [name]: value},
      errors: {...state.errors, [name]: false},
    }))
  }

  getErrors = () => {
    const errors = {}

    if(!this.state.values.usernameFrom.length) {
      errors.usernameFrom = 'Required'
    }

    if (!this.state.values.emailFrom) {
      errors.emailFrom = "Email неможет быть пустым"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.values.emailFrom)){
      errors.emailFrom = "Invalid email address";
    }

    if(!this.state.values.usernameTo.length) {
      errors.usernameTo = 'Required'
    }

    if (!this.state.values.emailTo) {
      errors.emailTo = "Email неможет быть пустым"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.values.emailTo)){
      errors.emailTo = "Invalid email address";
    }

    if (!this.state.values.theme.length) {
      errors.theme = 'Заполните тему письма'
    }

    if (!this.state.values.message.length) {
      errors.message = 'Сообщение не должно быть пустым'
    }

    return errors
  }


  removeFileInArray = indexFile => {
    this.setState({
      values: {
        ...this.state.values,
        files: this.state.values.files.filter((item, index) => index !== indexFile)
      }
    })
  }

  onSubmit = event => {
    event.preventDefault()
    const errors = this.getErrors();

    if(Object.keys(errors).length > 0) {
      // error
      this.setState({
        errors
      })
    } else {
      this.setState({
        errors: {}
      })
      console.log('submit => ', this.state)
    }
  }

  callForceUpdate = () => {
    console.log(window.innerWidth);
    this.forceUpdate();
  }

  componentDidMount(){
    window.addEventListener("resize", this.callForceUpdate);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.callForceUpdate);
  }

  render(){
    const sizeFiles = this.state.values.files.reduce((acc, file) => acc + file.size, 0)
    const maxSizeFiles = sizeFiles/MAX_ALL_FILES_SIZE

    return(
      <form encType="multipart/form-data" method="post">
        <FieldGroup
          label="От кого"
          inputFirst={{
            name: "usernameFrom",
            value: this.state.values.usernameFrom,
            onChange: this.onChange,
            error: this.state.errors.usernameFrom
          }}
          inputSecond={{
            name: "emailFrom",
            value: this.state.values.emailFrom,
            onChange: this.onChange,
            error: this.state.errors.emailFrom
          }}
        />

        <div className="mt-3"></div>
        <FieldGroup
          label="Кому"
          inputFirst={{
            name: "usernameTo",
            value: this.state.values.usernameTo,
            onChange: this.onChange,
            error: this.state.errors.usernameTo
          }}
          inputSecond={{
            name: "emailTo",
            value: this.state.values.emailTo,
            onChange: this.onChange,
            error: this.state.errors.emailTo
          }}
        />

        <Field
          labelText="Тема письма"
          placeholder="Моя тема письма"
          onChange={this.onChange}
          theme={this.state.values.theme}
          name="theme"
          error={this.state.errors.theme}
        />

        <FieldTextarea
          labelText="Сообщение"
          onChange={this.onChange}
          message={this.state.values.message}
          name="message"
          error={this.state.errors.message}
        />

        <div className="row">
          {this.state.values.files.map((item, index) => {
            return (
              <AttachFile
                key={index}
                nameFile={item.name}
                size={item.size}
                index={index}
                removeFileInArray={this.removeFileInArray}
              />
            )
          })}
        </div>

        <div className="form-group">
          <input
            type="file"
            className="form-control-file"
            // value={this.state.file}
            onChange={this.onChange}
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
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.onSubmit}
        >Отправить</button>
      </form>
    )
  }

}

export default Form