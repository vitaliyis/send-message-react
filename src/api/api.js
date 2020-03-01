import Sendsay from "sendsay-api";

const sendsay = new Sendsay({
  apiKey:
    "19Gz7YxTwI7e1U1VVL51i-K0FxeIfoEupo0UMlnTkWsvVpdiAlLeWhdLEcKrmuZbF7B8e3-0_9g"
});

export const apiSend = messagePostData => {
  const requestData = {
    ...messagePostData,
    action: "issue.send.test",
    sendwhen: "now"
  };
  return sendsay.request(requestData).catch(err => {
    console.log("error => ", err);
    return err;
  });
};

export const apiGet = trackId => {
  return sendsay
    .request({
      action: "track.get",
      id: trackId
    })
    .then(res => {
      console.log("apiGet res.obj: ", res.obj);
      return {
        status: res.obj.status,
        track: trackId
      };
    })
    .catch(err => {
      console.log("error => ", err);
      return err;
    });
};
