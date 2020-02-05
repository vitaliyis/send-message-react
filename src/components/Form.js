import React from 'react'
import FieldGroup from "./FieldGroup";
import Field from "./Field";
import FieldTextarea from "./FieldTextarea";
import AttachFile from "./AttachFile";

class Form  extends React.Component {
  constructor(){
    super()

    this.state = {
      usernameFrom: '',
      emailFrom: '',
      usernameTo: '',
      emailTo: '',
      theme: '',
      message: '',
      file: [],
      sizeFiles: 0,
      errors: {
        theme: '',
        message: ''
      }
    }
  }

  onChange = event => {
    debugger
    const name = event.target.name
    let value = event.target.value
    let size = 0

    if (name === 'file') {
      let arr = this.state.file
      size = event.target.files[0].size
      arr.push({path: value, size })
      value = arr
    }
    this.setState(state => ({
      [name]: value,
      errors: {...state.errors, [name]: false},
      sizeFiles: size ? state.sizeFiles + size : state.sizeFiles
    }))
  }

  getErrors = () => {
    const errors = {}

    if(!this.state.usernameFrom.length) {
      errors.usernameFrom = 'Required'
    }

    if (!this.state.emailFrom) {
      errors.emailFrom = "Email неможет быть пустым"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.emailFrom)){
      errors.emailFrom = "Invalid email address";
    }

    if(!this.state.usernameTo.length) {
      errors.usernameTo = 'Required'
    }

    if (!this.state.emailTo) {
      errors.emailTo = "Email неможет быть пустым"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.emailTo)){
      errors.emailTo = "Invalid email address";
    }

    if (!this.state.theme.length) {
      errors.theme = 'Заполните тему письма'
    }

    if (!this.state.message.length) {
      errors.message = 'Сообщение не должно быть пустым'
    }

    return errors
  }

  getShortNameFile = ({path}) => {
    let num = path.lastIndexOf("\\")

    return path.slice(num+1)
  }

  removeFileInArray = (idx) => {
    let arr = this.state.file
    let size = 0
    let res = arr.filter((item, index) => {
      if (index === idx) {size = item.size}
      return index !== idx
    })

    this.setState({
      file: res,
      sizeFiles: this.state.sizeFiles - size
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

  render(){

    let maxSizeFiles = this.state.sizeFiles/20971520

    return(
      <form encType="multipart/form-data" method="post">
        <FieldGroup
          labelText="От кого"
          name="usernameFrom"
          username={this.state.usernameFrom}
          email={this.state.emailFrom}
          emailName="emailFrom"
          onChange={this.onChange}
          usernameError={this.state.errors.usernameFrom}
          emailError={this.state.errors.emailFrom}
        />

        <div className="mt-3"></div>
        <FieldGroup
          labelText="Кому"
          name="usernameTo"
          username={this.state.usernameTo}
          email={this.state.emailTo}
          emailName="emailTo"
          onChange={this.onChange}
          usernameError={this.state.errors.usernameTo}
          emailError={this.state.errors.emailTo}
        />

        <Field
          labelText="Тема письма"
          placeholder="Моя тема письма"
          onChange={this.onChange}
          theme={this.state.theme}
          name="theme"
          error={this.state.errors.theme}
        />

        <FieldTextarea
          labelText="Сообщение"
          onChange={this.onChange}
          message={this.state.message}
          name="message"
          error={this.state.errors.message}
        />

        <div>
          <div className="row">
            {this.state.file.map((item, index) => {
              const nameFile = this.getShortNameFile(item)
              const {size} = item
              let isMaxSizeFile = false
              if (size/5242880 > 1) {isMaxSizeFile = true}

              return (
                <AttachFile
                  name={nameFile}
                  size={size}
                  isMaxSizeFile={isMaxSizeFile}
                  index={index}
                  removeFileInArray={this.removeFileInArray}
                />
              )
            })}
          </div>
        </div>


        <div className="form-group">
          <input
            type="file"
            className="form-control-file"
            // value={this.state.file}
            onChange={this.onChange}
            name="file"
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