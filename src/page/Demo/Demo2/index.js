import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import PromiseWorker from 'promise-worker';
import MyWorker from './index.worker';

const useStyles = createUseStyles({
  '@keyframes slideRight': {
    '0%': { color: 'blue' },
    '50%': { color: 'red' },
    '100%': { color: 'blue' },
  },
  worker: {
    animationName: '$slideRight',
    animationDuration: '1.5s',
    animationIterationCount: 'infinite',
  },
});

// Fibonacci数列（用于模拟计算负担）
function fibonacci(n) {
  if (n <= 2) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

export default () => {
  const [rel, setRel] = useState(null);
  useEffect(() => {
    const promiseWorker = new PromiseWorker(new MyWorker());
    promiseWorker.postMessage(42).then(setRel);
  }, []);
  const classes = useStyles();
  return (
    <>
      <div className={classes.worker}>
        {rel ? 'fibonacci(42) = ' + rel : '正在计算fibonacci(42)...'}
      </div>
      <button onClick={() => fibonacci(42)}>
        不使用worker计算会引起UI线程卡死
      </button>
    </>
  );
};
