import React from 'react';
import styles from './WatchPlayer.module.css';

interface Props {
  embedHTML: string
}

const WatchPlayer = (props:Props) => {
  const { embedHTML } = props;

  return (
    <div
      className={styles.wrapper}
      dangerouslySetInnerHTML={{ __html: embedHTML }}
    />
  );
};

export default WatchPlayer;


