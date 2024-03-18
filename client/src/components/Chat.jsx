import socketIO from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Messages from './Messages';

const socket = socketIO.connect('https://websocket-chat-ye9t.onrender.com');

import styles from '../styles/Chat.module.css';

const Chat = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [arrayMessage, setArrayMessage] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [allUsersInRoom, setAllUsersInRoom] = useState(0);

  useEffect(() => {
    const transformLocation = Object.fromEntries(new URLSearchParams(search));
    setLocation(transformLocation);
    //оправляем на server по ключу 'join' данные transformLocation
    socket.emit('join', transformLocation);
  }, [search]);

  //еще один useEffect для получения message от server с данными
  useEffect(() => {
    socket.on('message', (arg) => {
      const { data } = arg;
      setArrayMessage((_prev) => [..._prev, data]);
    });
  }, []);

  useEffect(() => {
    socket.on('roomUsers', (arg) => {
      const { data } = arg;
      setAllUsersInRoom(data.allUsers.length);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputMessage) return;

    socket.emit('sendMessage', { inputMessage, location });
    setInputMessage('');
  };

  const leftRoom = () => {
    socket.emit('leftRoom', location);
    navigate('/');
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}>{location?.room}</div>
        <div className={styles.users}>{allUsersInRoom} users in this room</div>
        <button className={styles.left} onClick={leftRoom}>
          Left the room
        </button>
      </div>

      <div className={styles.messages}>
        <Messages messages={arrayMessage} name={location?.user} />
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input}>
          <input
            type="text"
            name="message"
            placeholder="What do you want to say?"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            autoComplete="off"
            required
          />
        </div>

        <div className={styles.button}>
          <input type="submit" onSubmit={handleSubmit} value="Send a message" />
        </div>
      </form>
    </div>
  );
};

export default Chat;
