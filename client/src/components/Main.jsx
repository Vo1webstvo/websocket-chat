import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from '../styles/Main.module.css';

const Main = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const handleSubmit = (e) => {
    if (!name || !room) e.preventDefault();
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Join</h1>

        <form className={styles.form}>
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
            <button onClick={handleSubmit} type="submit" className={styles.button}>
              Sign In
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Main;
