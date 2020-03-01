import React from "react";
import FieldGroup from "./Fields/FieldGroup";
import Field from "./Fields/Field";
import FieldTextarea from "./Fields/FieldTextarea";
import FieldFile from "./Fields/FieldFile";
// import SentMessages from "./SentMessages";
// import Sendsay from 'sendsay-api'
import { MAX_ALL_FILES_SIZE, MAX_FILE_SIZE } from "../const/constants";
import { apiGet, apiSend } from "../api/api";
import Sendsay from "sendsay-api";

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      values: {
        usernameFrom: "",
        emailFrom: "",
        usernameTo: "",
        emailTo: "",
        theme: "",
        message: "",
        files: []
      },
      errors: {
        theme: "",
        message: "",
        sizeFiles: false
      },
      submitting: false
    };
  }

  updateSubmitting = value => {
    this.setState({
      submitting: value
    });
  };

  onChange = event => {
    const name = event.target.name;
    let value = event.target.value;

    this.setState(state => ({
      values: { ...state.values, [name]: value },
      errors: { ...state.errors, [name]: false }
    }));
  };

  onChangeFile = event => {
    const name = event.target.name;

    const newFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = event => {
      newFile.content = event.target.result;
      const newFiles = [...this.state.values.files, newFile];
      this.setState(state => ({
        values: { ...state.values, [name]: newFiles },
        errors: { ...state.errors, [name]: false }
      }));
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  getErrors = () => {
    const errors = {};

    if (!this.state.values.usernameFrom.length) {
      errors.usernameFrom = "Required";
    }

    if (!this.state.values.emailFrom) {
      errors.emailFrom = "Email неможет быть пустым";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
        this.state.values.emailFrom
      )
    ) {
      errors.emailFrom = "Invalid email address";
    }

    if (!this.state.values.usernameTo.length) {
      errors.usernameTo = "Required";
    }

    if (!this.state.values.emailTo) {
      errors.emailTo = "Email неможет быть пустым";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
        this.state.values.emailTo
      )
    ) {
      errors.emailTo = "Invalid email address";
    }

    if (!this.state.values.theme.length) {
      errors.theme = "Заполните тему письма";
    }

    if (!this.state.values.message.length) {
      errors.message = "Сообщение не должно быть пустым";
    }

    // вычисляем общий размер файлов
    const sizeFiles = this.state.values.files.reduce(
      (acc, file) => acc + file.size,
      0
    );
    const maxSizeFiles = sizeFiles / MAX_ALL_FILES_SIZE;
    if (maxSizeFiles > 1) {
      errors.sizeFiles = true;
    }

    // вычисляем размер каждого файла
    this.state.values.files.forEach(item => {
      const isMaxSizeFile = item.size / MAX_FILE_SIZE > 1;
      if (isMaxSizeFile) {
        errors.sizeFiles = true;
      }
    });

    return errors;
  };

  removeFileInArray = indexFile => {
    this.setState({
      values: {
        ...this.state.values,
        files: this.state.values.files.filter(
          (item, index) => index !== indexFile
        )
      }
    });
  };

  onSubmit = event => {
    event.preventDefault();

    //------------- FOR TESTING START -------------------------------------
    // const sendsay = new Sendsay({apiKey: '19Gz7YxTwI7e1U1VVL51i-K0FxeIfoEupo0UMlnTkWsvVpdiAlLeWhdLEcKrmuZbF7B8e3-0_9g'})
    // console.log('sendsay: ', sendsay)
    // sendsay.request(
    //   {
    //     action: 'track.get',
    //     id: "56"
    //   }).then(function(res) {
    //   console.log('apiGet res.obj: ', res.obj);
    //   return res.obj.status
    // })
    // return false

    // this.props.setStatusEmail({status: "0", theme: 'lalafdf  sdfsd sdfla', track: 56})
    // return false

    //------------- FOR TESTING END -------------------------------------

    const errors = this.getErrors();

    if (Object.keys(errors).length > 0) {
      // error
      this.setState({
        errors
      });
    } else {
      // сброс формы и ошибок
      this.setState({
        errors: {},
        values: {
          usernameFrom: "",
          emailFrom: "",
          usernameTo: "",
          emailTo: "",
          theme: "",
          message: "",
          files: []
        }
      });
      console.log("submit => ", this.state);
      this.sendEmail();
    }
  };

  callForceUpdate = () => {
    console.log(window.innerWidth);
    this.forceUpdate();
  };

  componentDidMount() {
    window.addEventListener("resize", this.callForceUpdate);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.callForceUpdate);
  }

  getMessagePostData = () => {
    const {
      theme,
      usernameFrom,
      emailFrom,
      usernameTo,
      message,
      emailTo,
      files
    } = this.state.values;
    const messagePostData = {
      letter: {
        subject: theme,
        "from.name": usernameFrom,
        "from.email": emailFrom,
        "to.name": usernameTo,
        message: { text: message },
        attaches: [
          {
            name: files[0].name,
            content: files[0].content,
            encoding: "base64"
          }
        ]
      },
      mca: [emailTo]
    };

    return messagePostData;
  };

  sendEmail = async () => {
    try {
      this.updateSubmitting(true);

      const messagePostData = this.getMessagePostData();

      const response = await apiSend(messagePostData);
      const messageResponse = await apiGet(response["track.id"]);

      const { getStatusEmail } = this.props;
      await getStatusEmail({
        ...messageResponse,
        theme: messagePostData.messagePostData
      });

      this.updateSubmitting(false);
    } catch (error) {}
  };

  render() {
    const sizeFiles = this.state.values.files.reduce(
      (acc, file) => acc + file.size,
      0
    );
    const maxSizeFiles = sizeFiles / MAX_ALL_FILES_SIZE;

    return (
      <form>
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

        <FieldFile
          files={this.state.values.files}
          removeFileInArray={this.removeFileInArray}
          onChange={this.onChangeFile}
          maxSizeFiles={maxSizeFiles}
        />

        <button
          type="submit"
          className={
            this.state.submitting
              ? "btn btn-secondary disabled"
              : "btn btn-primary"
          }
          onClick={this.onSubmit}
        >
          Отправить
        </button>
      </form>
    );
  }
}

export default Form;
