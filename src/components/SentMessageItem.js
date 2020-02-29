import React from 'react'

const SentMessageItem = props => {
  const {status, theme, dateEmail} = props
  let statusMessage = ''
  let statusMessageClass = ''

  if (Number(status) === -1) {
    statusMessage = "Отправлено"
    statusMessageClass = 'greenStatusMessage'
  }
    else if (Number(status) < -1) {
    statusMessage = "Ошибка"
    statusMessageClass = 'redStatusMessage'
  }
      else {
    statusMessage = "В очереди"
    statusMessageClass = 'grayStatusMessage'
  }

  return (
    <tr>
      <td className="text-nowrap">{dateEmail}</td>
      <td><div className="d-inline-grid"><span className="img-name-file">{theme}</span></div></td>
      <td className={`${statusMessageClass} text-nowrap`}>{statusMessage}</td>
    </tr>
  )
}

export default SentMessageItem