/**
 * @file rem2px插件
 * @author donghualei
 */


const postcss = require('postcss');

/**
 * 获取单位
 *
 * @params {string} value 要获取的值
 *
 * @return {string} 获取的单位
 */
function getUnit(value) {
    let len = value.length;
    let index = 0;
    for (let i = len - 1; i >= 0; i--) {
        if (!(value[i] > '0' && value[i] <= '9')) {
            index = i;
        }
        else {
            break;
        }
    }
    return value.slice(index);
}


module.exports = postcss.plugin('cssprocessor', function (opts) {
    opts = opts || {};

    if (!Array.isArray(opts)) {
        opts = [opts];
    }

    return function (root, result) {
        root.walkRules(function (rule) {
            rule.walkDecls(function (decl) {

                let values = decl.value.split(/\s{1,}/);

                values = values.map(value => {
                    // 获取value的单位
                    let unit = getUnit(value);

                    let someOpt = opts.find(opt => {
                        return opt.originUnits === unit;
                    });


                    if (!someOpt) {
                        return value;
                    }

                    value = parseFloat((someOpt.multiple * parseFloat(value) / someOpt.divisor).toFixed(someOpt.decimalPlaces || 2));

                    return value + someOpt.targetUnits;
                });
                decl.value = values.join(' ');
            });
        });
    };
});

