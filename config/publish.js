const path = require('path');

function getRandomPath() {
  const rootName = path.parse(path.resolve(__dirname, '../')).name;
  return path.resolve(__dirname, '../../', rootName + '-build-' + Date.now());
}

module.exports = {
  // 发布文件的拷贝目录(默认产生一个随机目录，请手动指定，如path.resolve(__dirname, '../../your-build-repository')，支持数组形式来对多个目录进行处理
  path: ['' || getRandomPath()],
  autoPush: false, // 是否自动push git仓库。若为true，则path需要为一个git仓库目录，程序将会自动拷贝文件后commit, push
};
