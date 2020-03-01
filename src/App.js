import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import SentMessages from "./components/SentMessages";
import { apiGet } from "./api/api";
import { MESSAGE_STATUS_SUCCESS } from "./const/constants";

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getStatusEmail = async ({ status, theme, track }) => {
    try {
      setIsLoading(true);
      const updateMessages = [
        {
          status,
          theme,
          track
        },
        ...messages
      ];

      const messagesInQueue = updateMessages.filter(
        message => message.track > MESSAGE_STATUS_SUCCESS
      );

      const promisesTrackes = messagesInQueue.map(item => apiGet(item.track));

      const statuses = await Promise.all(promisesTrackes);

      const updateMessagesWithStatus = updateMessages.map((item, index) => ({
        ...item,
        status: statuses[index].status
      }));

      setIsLoading(false);
      setMessages(updateMessagesWithStatus);
    } catch (error) {}
  };

  return (
    <div className="all-document-wrapper">
      <div className="container p-5">
        <div className="p-4 form-wrapper">
          <h1 className="mb-4">Отправлялка сообщений</h1>
          <Form getStatusEmail={getStatusEmail} />
        </div>

        <SentMessages arrData={messages} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;
