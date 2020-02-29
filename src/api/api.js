import React from 'react'
import Sendsay from "sendsay-api";

const sendsay = new Sendsay({apiKey: '19Gz7YxTwI7e1U1VVL51i-K0FxeIfoEupo0UMlnTkWsvVpdiAlLeWhdLEcKrmuZbF7B8e3-0_9g'})

export const apiSend = (obj) => {
  const objTotal = Object.assign(obj, {
    "action": "issue.send.test",
    "sendwhen": "now"
  })
console.log('Объект запроса: ', objTotal)
  return sendsay.request(objTotal)
            .then(function(res) {
              // console.log('res => ', res);
              // console.log('res["track.id"] => ', res["track.id"]);
              return apiGet(res["track.id"])
                .then(({status, track}) => {
                  // setPreload(false)
                  return {status, track, theme: obj.letter.subject}
                })
            })
            .catch(err => console.log('error => ', err))
}

export const apiGet = (trackId) => {
  return sendsay.request(
    {
      action: 'track.get',
      id: trackId
    }).then(function(res) {
    console.log('apiGet res.obj: ', res.obj);
    return {
      status: res.obj.status,
      track: trackId
    }
  })

}