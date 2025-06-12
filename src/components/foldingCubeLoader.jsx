import React from 'react';
import styles from './FoldingCubeLoader.module.css';

const FoldingCubeLoader = () => {
  return (
    <div className={styles.folding}>
      <div className={`${styles.skCube1} ${styles.skCube}`}></div>
      <div className={`${styles.skCube2} ${styles.skCube}`}></div>
      <div className={`${styles.skCube4} ${styles.skCube}`}></div>
      <div className={`${styles.skCube3} ${styles.skCube}`}></div>
      <div className={styles.square}></div>
    </div>
  );
};

export default FoldingCubeLoader;