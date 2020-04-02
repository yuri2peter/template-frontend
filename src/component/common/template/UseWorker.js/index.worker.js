// worker的模板
import registerPromiseWorker from 'promise-worker/register';

// worker的主函数，支持同步/async函数
registerPromiseWorker(async (params) => {
  const work = () => {};
  const result = work(params);
  return result;
});
