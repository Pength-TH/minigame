module MeltEngine {
    //基础模块
    export module Base {

        export enum CacheType {
            CT_CLASS = 0,
            CT_JSON = 1
        }

        class CachePoolParam {

            public createCount: number = 0;         //创建的数量
            public poolCount: number = 0;           //缓存池中的数量
            public maxPoolCount: number = 50;       //最大缓存池数量
            public usingCount: number = 0;          //已经使用缓存池中的对象数量
            public signName: string;                //缓存标记
            public time: number;                    //缓存的时间，如果被使用,则自动更新时间
            public type: CacheType = CacheType.CT_CLASS;//缓存的类型

            constructor() { }

            reset() {
                this.createCount = 0;         //创建的数量
                this.poolCount = 0;           //缓存池中的数量
                this.maxPoolCount = 50;       //最大缓存池数量
                this.usingCount = 0;          //已经使用缓存池中的对象数量
                this.time = 0;                //缓存的时间，如果被使用,则自动更新时间 
            }
        }

        export class CachePool {
            public static readonly Instance = new CachePool();

            private mCachePool: { [key: string]: CachePoolParam } = {};

            public constructor() { }

            /**
             * 注册缓存池,可以控制每个对象缓存池的大小
             * @param singName 
             * @param maxPoolCount 默认是50个
             */
            public registCachePool(singName: string, maxPoolCount?: number): CachePoolParam {

                if (singName == undefined || singName == "")
                    return;

                let cachePool = this.mCachePool[singName];
                if (cachePool == undefined) {
                    cachePool = new CachePoolParam();
                    this.mCachePool[singName] = cachePool;
                }

                cachePool.signName = singName;

                if (maxPoolCount != undefined)
                    cachePool.maxPoolCount = maxPoolCount;

                return cachePool;
            }

            /**
             * 创建对象
             * 
             * @param {string} sign 标记
             * @param {*} cls 类型
             * @param {*} [object] 对象，必须实现clone接口
             * @returns {*} 
             * @memberof CachePool
             */
            public createObject(sign: string, cls: any, type?: CacheType, object?: any): any {

                if (sign == undefined || sign == "" || cls == undefined)
                    return undefined;

                let cachePool = this.mCachePool[sign];
                if (cachePool == undefined)
                    cachePool = this.registCachePool(sign);

                //cachePool.time = Laya.timer.currTimer;
                if (type != undefined)
                    cachePool.type = type;

                let _newObj = undefined;
                if (cachePool.poolCount <= 0) {

                    if (object == undefined) {
                        _newObj = new cls();
                    }
                    else
                        _newObj = object.clone();
                    ++cachePool.createCount;
                }
                else {
                    _newObj = Pool.getItem(sign);
                    --cachePool.poolCount;
                }
                if (_newObj != undefined)
                    ++cachePool.usingCount;
                return _newObj;
            }

            /**
             * 删除对象,添加进缓存池
             * 
             * @param {string} sign 
             * @param {*} object 
             * @memberof ObjectManager
             */
            public destroyObject(sign: string, object: any) {

                if (sign == undefined || sign == "") {
                    object = undefined;
                    return;
                }

                let cachePool = this.mCachePool[sign];
                if (cachePool == undefined) {
                    object = undefined;
                    return;
                }

                if (cachePool.poolCount >= cachePool.maxPoolCount) {
                    console.error(sign + " cache pool size > " + cachePool.maxPoolCount + ".");
                    object = undefined;
                    return;
                }

                Pool.recover(sign, object);
                ++cachePool.poolCount;
                --cachePool.usingCount;

                if (cachePool.usingCount < 0)
                    console.error(sign + " bug.");
                return true;
            }

            /**
             * 清除不用的缓存对象
             */
            public clearUnUseObject() {

                for (let k in this.mCachePool) {
                    let cachePool = this.mCachePool[k];
                    // let _time = Laya.timer.currTimer - cachePool.time;
                    // if (_time > 3 * 60 * 1000 &&
                    //     cachePool.usingCount == 0) {//没有使用缓存池里的对象


                    //     Pool.clearBySign(k);
                    //     cachePool.reset();
                    // }
                }
            }
        }

        class Pool {

            static getPoolBySign(sign) {
                return Pool._poolDic[sign] || (Pool._poolDic[sign] = []);
            }

            static clearBySign(sign) {
                if (Pool._poolDic[sign]) Pool._poolDic[sign].length = 0;
            }

            static recover(sign, item) {
                Pool.getPoolBySign(sign).push(item);
            }

            static getItemByClass(sign, cls) {
                var pool = Pool.getPoolBySign(sign);
                var rst = pool.length ? pool.pop() : new cls();
                return rst;
            }

            static getItemByCreateFun(sign, createFun, caller) {
                var pool = Pool.getPoolBySign(sign);
                var rst = pool.length ? pool.pop() : createFun.call(caller);
                return rst;
            }

            static getItem(sign) {
                var pool = Pool.getPoolBySign(sign);
                var rst = pool.length ? pool.pop() : null;
                return rst;
            }

            private static _poolDic = {};
        }

    }
}