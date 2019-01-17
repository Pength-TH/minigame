
module MeltEngine {
    //基础模块
    export module Base {

        /**
         * 工具类
         * @export
         * @class Util
         */
        export class Util {

            static _hashcode(str: string): number {

                let hash = 10000;
                if (str.length > 0) {

                    for (let i = 0; i < str.length; i++) {
                        hash = 31 * hash + str.charCodeAt(i);
                    }
                }
                return hash;
            }

            //获取时间
            static getDate(extra) {

                var dat = new Date;//生成日期
                var year = dat.getFullYear();//取得年
                var month = dat.getMonth() + 1;    //取得月,js从0开始取,所以+1
                var date1 = dat.getDate(); //取得天
                var hour = dat.getHours();//取得小时
                var minutes = dat.getMinutes();//取得分钟
                var second = dat.getSeconds();//取得秒
                var haomiao = dat.getMilliseconds();
                dat = undefined;
                return year + "-" + month + "-" + date1 + " " + hour + ":" + minutes + ":" + second + " " + haomiao + " " + extra;
            }

            /*-----------------------------------------------------------------------------------------
            |   |   |   |   |   |   |   |   |   坐标
            -----------------------------------------------------------------------------------------*/
            //检查坐标是否合法
            AxisCheckValid(typeSource: AxisType, fvAxis: Vector3): boolean {

                return false;
            }

            //坐标转换
            AxisTrans(typeSource: AxisType, fvSource: Vector3, typeTar: AxisType, fvTarget: Vector3): boolean {

                return false;
            }

            //查询Erath 对象
            GetHitObject(screenX: number, screenY: number, uiSelect?: boolean): GameObject {

                return undefined;
            }
        }

        /**
         * 射线 
         * @export
         * @class Ray
         */
        export class Ray {
            public mOrigin: Vector3;
            public mDirection: Vector3;
        };
    }
}

/*---------------------------------------------------------------------------------------
|   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   
---------------------------------------------------------------------------------------*/
/**
* 重写日志
*/
console.log = (function (logFunc) {

    return function (str) {

        logFunc.call(console, MeltEngine.Base.Util.getDate("Info:") + str);
    }

})(console.log);

/**
 * 重写警告
 */
console.warn = (function (logFunc) {

    return function (str) {

        logFunc.call(console, MeltEngine.Base.Util.getDate("Waring:") + str);
    }

})(console.warn);

/**
 * 重写错误
 */
console.error = (function (logFunc) {

    return function (str) {

        logFunc.call(console, MeltEngine.Base.Util.getDate("Error:") + str);
    }

})(console.error);

/*---------------------------------------------------------------------------------------
|   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   
---------------------------------------------------------------------------------------*/
