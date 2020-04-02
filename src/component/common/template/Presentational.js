// 展示组件
import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: { color: 'green' },
});

export default () => {
  const classes = useStyles();
  return <div className={classes.root}>Presentationals</div>;
};
