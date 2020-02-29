import React from 'react'



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
      file: '',
      errors: {
        theme: '',
        message: ''
      }
    }
  }


  onChange = event => {
    const name = event.target.name
    const value = event.target.value
    this.setState(state => ({
      [name]: value,
      errors: {...state.errors, [name]: false}
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

    if (!this.state.theme.length) {
      errors.theme = 'Заполните тему письма'
    }

    if (!this.state.message.length) {
      errors.message = 'Сообщение не должно быть пустым'
    }

    return errors
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

    return(
      <form>
        <label>От кого</label>
        <div className="input-group">
          <input
            type="text"
            className={`form-control mb-2 mb-md-0 ${this.state.errors.usernameFrom ? "error-border" : ""}`}
            placeholder="Имя"
            value={this.state.usernameFrom}
            onChange={this.onChange}
            name="usernameFrom"
          />
          {this.state.errors.usernameFrom && window.innerWidth < 768 ? (
            <div className="invalid-feedback invalid-feedback-md mb-3">
              {this.state.errors.usernameFrom}
            </div>
          ): null}
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={this.state.emailFrom}
            onChange={this.onChange}
            name="emailFrom"
          />
          {this.state.errors.emailFrom && window.innerWidth < 768 ? (
            <div className="invalid-feedback invalid-feedback-md">
              {this.state.errors.emailFrom}
            </div>
          ): null}
        </div>
        {this.state.errors.usernameFrom || this.state.errors.emailFrom ? (
          <div className="invalid-feedback-wrapper-md">
            <div className="invalid-feedback">{this.state.errors.usernameFrom}</div>
            <div className="invalid-feedback">{this.state.errors.emailFrom}</div>
          </div>
        ) : null
        }


        <label className="mt-3">Кому</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control mb-2 mb-md-0"
            placeholder="Имя"
            value={this.state.usernameTo}
            onChange={this.onChange}
            name="usernameTo"
          />
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={this.state.emailTo}
            onChange={this.onChange}
            name="emailTo"
          />
        </div>

        <div className="form-group mt-3">
          <label>Тема письма</label>
          <input
            type="text"
            className="form-control"
            placeholder="Моя тема письма"
            onChange={this.onChange}
            value={this.state.theme}
            name="theme"
          />
          {this.state.errors.theme ? (
            <div className="invalid-feedback">
              {this.state.errors.theme}
            </div>
          ): null}
        </div>

        <div className="form-group mt-3">
          <label>Сообщение</label>
          <textarea
            className="form-control"
            rows="3"
            onChange={this.onChange}
            value={this.state.message}
            name="message"
          />
          {this.state.errors.message ? (
            <div className="invalid-feedback">
              {this.state.errors.message}
            </div>
          ): null}
        </div>
        <div className="form-group">
          <input
            type="file"
            className="form-control-file"
            // value={this.state.file}
            onChange={this.onChange}
            name="file"
          />
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