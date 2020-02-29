import React, {useState} from 'react';
import './App.css';
import Form from "./components/Form";
import SentMessages from "./components/SentMessages";
import {apiGet} from "./api/api";

function App() {
  const [arrData, setArrData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const setStatusEmail = async({status, theme, track}) => {
    const arr = arrData.concat()

    arr.unshift({
      status,
      theme,
      track
    })
    // arr.map(async item => {
    //   const {status} = await apiGet(item.track)
    //   item.status = status
    //   return item
    //
    // })

    // setIsLoading(true)

    const promisesTrackes = arr.map(item => {
      // track.get запускаем только для тех писем, которые находятся в очереди, status > -1
      if (item.track > -1) {
        return apiGet(item.track)
      }
    });
    const statuses = await Promise.all(promisesTrackes);
    console.log('statuses ', statuses)
    const updateArr = arr.map((item, index) => {
      item.status = statuses[index].status;
      return item;
    });
    setIsLoading(false)
    setArrData(updateArr)
  }

  const setPreload = value => {
    setIsLoading(value)
  }


  return (
    <div className="all-document-wrapper">
      <div className="container p-5">
        <div className="p-4 form-wrapper">
          <h1 className="mb-4">Отправлялка сообщений</h1>
          <Form
            setStatusEmail={setStatusEmail}
            setPreload={setPreload}
          />
        </div>


        <SentMessages
          arrData={arrData}
          isLoading={isLoading}
        />
      </div>
    </div>

  );
}

export default App;
