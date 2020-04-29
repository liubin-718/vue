module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es6: true
    },
    globals: {
        'ENV_CONFIG': true,
        '$': true
    },
    plugins: [
        'html',
        'vue'
    ],
    extends: ['plugin: vue/recommended', 'eslint:recommended'],
    rules: {
        'no-unused-vars': [ // 不能有声明后未被使用的变量或参数
            1,
            {
                vars: 'all',
                args: 'none'
            }
        ],
        eqeqeq: [1, 'always', {null: 'ignore'}],
        'spaced-comment': 0, // 注释要不要有空格什么的
        'no-dupe-keys': 1, // 创建对象字面量时不允许键重复
        'no-mixed-spaces-tabs': 1, // 不允许混用tab和空格
        // 缩进方式 2个space
        indent: [1, 2,
            {
                SwitchCase: 1  // 强制switch语句中case缩进
            }
        ],
        'no-use-before-define': 1, //变量声明前不允许使用
        'camelcase': [1, {'properties': 'always'}], // 强制驼峰命名
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}