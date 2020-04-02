import React from 'react';

const Suspense = () => null;

/**
 * 封装了React.lazy的特性，实现分块加载chunks，减少首屏时间
 * @param {function} loader 形如：() => import('./foo/bar.jsx')
 */
export default ({ children }) => {
  const Target = React.lazy(children);
  return (
    <React.Suspense fallback={<Suspense />}>
      <Target />
    </React.Suspense>
  );
};
