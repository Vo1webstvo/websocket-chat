import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import socketIO from 'socket.io-client';


import styles from '../styles/Main.module.css';

const socket = socketIO.connect('http://localhost:5000');

const Main = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Подписываемся на событие 'errJoin' при монтировании компонента
  useEffect(() => {
    socket.on('errJoin', (arg) => {
      const {data} = arg;
      setErrorMessage(data.message);
    });

    // Отписываемся от события при размонтировании компонента
    return () => {
      socket.off('errJoin');
    };
  }, []);



  const handleSubmit = (e) => {
    // Проверка наличия ошибки и предотвращение отправки формы
    if (errorMessage) {
      e.preventDefault();
      alert(errorMessage); // Оповещение пользователя об ошибке
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Join</h1>

        <form className={styles.form} >
          <div className={styles.group}>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Username"
              className={styles.input}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <div className={styles.group}>
            <input
              type="text"
              name="room"
              placeholder="Room"
              value={room}
              className={styles.input}
              onChange={(e) => setRoom(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <Link className={styles.group} to={`/chat?user=${name}&room=${room}`}>
            <button type="submit" className={styles.button} onClick={handleSubmit}>
              Sign In
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Main;
