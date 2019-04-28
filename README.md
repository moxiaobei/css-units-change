# css-units-change
css-units-change是一个将css中的单位互相转换的工具，这个插件支持同时将css中的多个单位转为同一个或者不同个单位。

正常写你的css
```
.wrapper {
    margin: 1px 2rem;
}
```

css-units-change插件将根据你的配置对你的css的单位进行转换，例如你的rem要转为px，按照2倍的关系；

```
.wrapper {
    margin: 1px 4px;
}
```

## 使用
```
npm install css-units-change --save-dev
```
### webpack相关配置
```
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"]
            }
        ]
    }
}
```
然后创建```postcss.config.js```
```
module.exports = {
  plugins: [
    require('css-untis-change')(options)
  ]
}
```

### options参数
将一个单位转为另外一个单位
```
{
    originUnits: 'rem',  // 待转换的单位
    targetUnits: 'px'，  // 转换后的单位
    decimalPlaces: 2,    // 保留小数点，默认2位
    multiple: 1,         // 倍数
    divisor: 2           // 除数
}
```

也支持将多个单位转为多个单位，即options改为数组的形式
```
[{
    ...
}, {
    ...
}]
```


> 目前小程序的单位均是rpx，但是可能H5转换的单位是px或者rem，该插件可支持单位互转； 

  



