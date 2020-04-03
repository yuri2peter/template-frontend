// worker的模板
import registerPromiseWorker from 'promise-worker/register';

// Fibonacci数列（用于模拟计算负担）
export function fibonacci(n) {
  if (n <= 2) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 一个worker计算fibonacci的例子
registerPromiseWorker(async (n) => {
  return fibonacci(n);
});
