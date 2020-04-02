import React from 'react';

const Suspense = () => null;

/**
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
