// 该脚本功能：将build目录下的文件拷贝至 config/publish.js 的path配置项目录下

const fs = require('fs-extra');
const path = require('path');
const execShPromise = require('exec-sh').promise;
const { path: targetPaths, autoPush } = require('../config/publish');

async function work(targetPath) {
  const buildPath = path.resolve(__dirname, '../build');

  console.log('build目录: ' + buildPath);
  console.log('目标目录: ' + targetPath);
  const isBuildPathExists = await fs.exists(buildPath);
  if (!isBuildPathExists) {
    console.warn('未检测到build目录，请先运行 npm run build');
    return;
  }
  if (autoPush) {
    console.log('自动push模式开启');
    const targetGitPath = path.resolve(targetPath, '.git');
    const gitExists = await fs.exists(targetGitPath);
    if (!gitExists) {
      console.warn(
        '未检测到git目录，请检查拷贝目录的git配置是否正确。目标目录需要能正常执行commit & push 命令。'
      );
      return;
    }
    // 临时拷贝git文件到build目录
    console.log('正在备份git文件');
    const buildGitPath = path.resolve(buildPath, '.git');
    await fs.remove(buildGitPath);
    await fs.copy(targetGitPath, buildGitPath);
    console.log('正在清空目标目录');
    await fs.emptyDir(targetPath);
    console.log('正在拷贝静态文件');
    await fs.copy(buildPath, targetPath);
    console.log('正在清理git备份文件');
    await fs.remove(buildGitPath);
    console.log('正在执行git命令');
    try {
      const execResults = await execShPromise(
        `cd ${targetPath} && git add . && git commit -m published-time-${new Date().toISOString()} && git push`,
        true
      );
      console.log(execResults.stdout);
      if (execResults.stderr) {
        console.error(execResults.stderr);
      }
      console.log('完成');
    } catch (error) {
      console.error(error.stderr);
      console.log('脚本执行错误(也可能是没有检测到修改)');
    }
  } else {
    console.log('简单模式，正在拷贝');
    await fs.emptyDir(targetPath);
    await fs.copy(buildPath, targetPath);
    console.log('完成');
  }
}

async function main() {
  const targetPathsResolved = Array.isArray(targetPaths)
    ? targetPaths
    : [targetPaths];
  for (const targetPath of targetPathsResolved) {
    await work(targetPath);
  }
}

main().finally(() => process.exit(0));
