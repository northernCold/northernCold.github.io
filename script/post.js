'use strict';
const inquirer = require('inquirer');
const { exec } = require('child_process');

const questions = [
  {
    type: 'list',
    name: 'operation',
    message: `你可以选择 发布新文章 或者 创建新的草稿`,
    choices: ['创建新草稿', '发布新文章'],
    validate(value) {
      const valid = !!value;
      return valid || "请选择一个操作";
    }
  },
  {
    type: 'input',
    name: 'name',
    message: '请输入创建草稿的名称?',
    validate(value) {
      const valid = !!value;
      return valid || "请输入名称";
    },
    when(answers) {
      return answers.operation === '创建新草稿';
    },
  },
  {
    type: 'input',
    name: 'name',
    message: '请输入发布文章的名称?',
    validate(value) {
      const valid = !!value;
      return valid || "请输入名称";
    },
    when(answers) {
      return answers.operation === '发布新文章';
    },
  },
];

inquirer.prompt(questions).then((answers) => {
  const { operation, name } = answers;
  const hashMap = {
    '创建新草稿': 'new draft',
    '发布新文章': 'publish'
  }

  exec(`hexo ${hashMap[operation]} ${name}`, (err, stdout, stderr) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log(`stdout: ${stdout}`);
  });
});