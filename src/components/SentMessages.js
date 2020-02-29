import React from 'react'
import SentMessageItem from "./SentMessageItem";
import Preloader from "./Preloader";

const SentMessages = props => {
  const {arrData, isLoading} = props

  const date = new Date()
  const dateEmail = date.toLocaleDateString("ru-RU", {day: 'numeric', month: 'long'})
  console.log('date: ', date.toLocaleDateString("ru-RU", {day: 'numeric', month: 'long'}))
  return (
    <div className="p-4 mt-4">
      <h3>Отправленные сообщения</h3>
      {arrData.length
        ? <table className="table table-borderless">
          <thead>
          <tr>
            <th scope="col">Дата</th>
            <th scope="col">Тема</th>
            <th scope="col">Статус</th>
          </tr>
          </thead>
          <tbody>
          {!isLoading ? arrData.map((item, index) => {
            return <SentMessageItem
              key={index}
              dateEmail={dateEmail}
              status={item.status}
              theme={item.theme}
            />
          }) : <tr><td className="text-center" colSpan="3"><Preloader/></td></tr>}
          </tbody>
        </table>
        : <div>Сообщения еще не отправлялись</div>
      }

    </div>
  )
}

export default SentMessages