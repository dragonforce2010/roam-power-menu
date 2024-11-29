module.exports = {
  // ... 其他配置
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
      // ... 其他规则
    ]
  }
} 