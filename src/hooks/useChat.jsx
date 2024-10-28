import { createContext, useContext, useEffect, useState } from "react";

//const backendUrl = "http://localhost:3003";

const backendUrl = import.meta.env.VITE_APP_BACK;


const ChatContext = createContext();


export const ChatProvider = ({ children }) => {

  const chat = async (message) => {
    setLoading(true);


    const data = await fetch(`${backendUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    const resp = (await data.json()).messages;
    setMessages((messages) => [...messages, ...resp]);
    setLoading(false);
  };



  // const chat = async (message) => {
  //   setLoading(true);

  //   const base64Audio = await fetch('/audios/audio.txt').then((res) => res.text());
  //   const lips  = await fetch('/audios/message_0.json').then((res)=>res.json());
  //   // Si el mensaje está vacío, crea un mensaje predeterminado
  //   let responseMessages;
  //   if (!message || message.trim() === "") {
  //     responseMessages = [
  //       {
  //         animation: "Talking_1", // Por ejemplo, una animación de saludo
  //         facialExpression: "smile",
  //         lipsync: lips,
  //         audio: base64Audio, // Aquí podrías agregar un audio predeterminado en base64 si lo tienes
  //       },
  //     ];
  //   } else {
  //     // Si hay un mensaje, realiza la llamada al backend
  //     const data = await fetch(`${backendUrl}/chat`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ message }),
  //     });
  //     responseMessages = (await data.json()).messages;
  //   }

  //   // Actualiza los mensajes con la respuesta
  //   setMessages((messages) => [...messages, ...responseMessages]);
  //   setLoading(false);
  // };


  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);
  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
  };

  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0]);
    } else {
      setMessage(null);
    }
  }, [messages]);

  return (
    <ChatContext.Provider
      value={{
        chat,
        message,
        onMessagePlayed,
        loading,
        cameraZoomed,
        setCameraZoomed,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};




// import { createContext, useContext, useEffect, useState } from "react";

// const backendUrl = "http://localhost:3000";




// const ChatContext = createContext();



// export const ChatProvider = ({ children }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [cameraZoomed, setCameraZoomed] = useState(true);

//   const chat = async (message) => {
//     setLoading(true);
//     const base64Audio = await fetch('/audios/audio.txt').then((res) => res.text());
//     const lips = await fetch('/audios/message_0.json').then((res) => res.json());

//     let responseMessages;
//     if (!message || message.trim() === "") {
//       responseMessages = [
//         {
//           animation: "Talking_1",
//           facialExpression: "smile",
//           lipsync: lips,
//           audio: base64Audio,
//         },
//       ];
//     } else {
//       const data = await fetch(`${backendUrl}/chat`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message }),
//       });
//       responseMessages = (await data.json()).messages;
//     }

//     setMessages((prevMessages) => [...prevMessages, ...responseMessages]);
//     setLoading(false);
//   };

//   const onMessagePlayed = () => {
//     setMessages((prevMessages) => {
//       const remainingMessages = prevMessages.slice(1);

//       // Si no hay más mensajes y el último mensaje era el predeterminado, repítelo

//       // if (remainingMessages.length === 0 && (!message || message.trim() === "")) {
//       //   chat(""); // Repetir el mensaje predeterminado
//       // }
     
//       if (remainingMessages.length === 0 && (!message || message.trim() === "")) {
//         setTimeout(() => {
//           chat(""); // Repetir el mensaje predeterminado después de un tiempo
//         }, 2000); // El tiempo de espera es de 2000 milisegundos (2 segundos)
//       }
      


//       return remainingMessages;
//     });
//   };

//   useEffect(() => {
//     if (messages.length > 0) {
//       setMessage(messages[0]);
//     } else {
//       setMessage(null);
//     }
//   }, [messages]);

//   return (
//     <ChatContext.Provider
//       value={{
//         chat,
//         message,
//         onMessagePlayed,
//         loading,
//         cameraZoomed,
//         setCameraZoomed,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };


// export const useChat = () => {
//   const context = useContext(ChatContext);
//   if (!context) {
//     throw new Error("useChat must be used within a ChatProvider");
//   }
//   return context;
// };
