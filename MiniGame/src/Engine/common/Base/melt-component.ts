/**
 * Melt Engine
 */
module MeltEngine {
    //基础模块
    export module Base {

        /**
         * 组件基础类
         * @export
         * @class Component
         * @extends {BaseObject}
         */
        export class Component extends BaseObject {

            private destroyed: boolean = false;              //销毁
            private enable: boolean = false;                 //启用
            private started: boolean = false;                //是否已执行start函数。

            /**
             * 是否是单列
             * @protected
             * @memberof Component
             */
            protected _isSingleton: boolean = false;

            /**
             * 移动节点
             * @type {Transform}
             * @memberof Component
             */
            public transform: Transform = undefined;
            /**
             * 所属对象.
             * @type {GameObject}
             * @memberof Component
             */
            public gameObject: GameObject = undefined;

            public constructor() { super(); }

            /**
             * 对比标签
             * @param {string} tag 
             * @returns {boolean} 
             * @memberof Component
             */
            public compareTag(tag: string): boolean {
                return this.tag == tag;
            }
            /**
             * 是否激活并启用
             * @returns {boolean} 
             * @memberof Component
             */
            public isActiveAndEnable(): boolean {
                if (this.gameObject != undefined)
                    return this.gameObject.IsActive() && this.enable;

                return this.enable;
            }

            /**
             * 获取是否已销毁。
             * @returns {boolean} 
             * @memberof Component
             */
            public isDestroyed(): boolean {
                return this.destroyed;
            }

            /**
             * 获取是否为单实例组件
             * @returns 
             * @memberof Component
             */
            public isSingleton() {
                return this._isSingleton;
            }

            /*---------------------------------------------------------------------------------------
            |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   
            -----------------------------------------------------------------------------------------
            以下方法为组件调用方法,顺序依次调用
            -----------------------------------------------------------------------------------------
            |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   
            ---------------------------------------------------------------------------------------*/
            /**
             * 唤醒
             * 创建后就立刻调用
             * 在脚本实例的整个生命周期中，Awake函数仅执行一次
             * @memberof Component
             */
            public Awake() {
                if (this.transform == undefined)
                    return;

                for (let i = 0; i < this.transform.childCount; i++) {
                    this.transform.GetChild(i).Awake();
                }
            }

            /**
             * 只要设置了 游戏激活就会调用该函数
             * @memberof Component
             */
            public OnEnable() {
                if (this.transform == undefined)
                    return;

                for (let i = 0; i < this.transform.childCount; i++) {
                    this.transform.GetChild(i).OnEnable();
                }
            }
            /**
             * Awake之后调用,也只执行一次 
             * @memberof Component
             */
            public Start() {
                if (this.transform == undefined)
                    return;

                for (let i = 0; i < this.transform.childCount; i++) {
                    this.transform.GetChild(i).Start();
                }
            }
            /**
             * update前调用
             * @memberof Component
             */
            public FixedUpdate() {
                if (this.transform == undefined)
                    return;

                for (let i = 0; i < this.transform.childCount; i++) {
                    this.transform.GetChild(i).FixedUpdate();
                }
            }
            /**
             * 刷新
             * @memberof Component
             */
            public Update(fElapsedTime: number) {
                if (this.transform == undefined)
                    return;

                for (let i = 0; i < this.transform.childCount; i++) {
                    this.transform.GetChild(i).Update(fElapsedTime);
                }
            }
            /**
             * update之后调用
             * @memberof Component
             */
            public LateUpdate() {
                if (this.transform == undefined)
                    return;

                for (let i = 0; i < this.transform.childCount; i++) {
                    this.transform.GetChild(i).LateUpdate();
                }
            }
            /**
             * 组件关闭时调用
             * @memberof Component
             */
            public OnDisable() {
                if (this.transform == undefined)
                    return;

                for (let i = 0; i < this.transform.childCount; i++) {
                    this.transform.GetChild(i).OnDisable();
                }
            }
            /**
             * 组件删除时调用
             * @memberof Component
             */
            public OnDestory() {
                if (this.transform == undefined)
                    return;

                for (let i = 0; i < this.transform.childCount; i++) {
                    this.transform.GetChild(i).OnDestory();
                }
                this.gameObject = undefined;
                this.transform = undefined;
                this.destroyed = true;
            }

            /*---------------------------------------------------------------------------------------
            |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   
            -----------------------------------------------------------------------------------------
            以下方法均为快捷方式,方便快速调用。
            -----------------------------------------------------------------------------------------
            |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   
            ---------------------------------------------------------------------------------------*/
            /**
             * 动画组件
             * 快捷方式,
             * @returns {Component} 
             * @memberof Component
             */
            public animation(): Component {
                if (this.gameObject == undefined)
                    return undefined;
                //todo
            }

            /**
             * 声音组件
             * 快捷方式
             * @returns {Component} 
             * @memberof Component
             */
            public audio(): Component {
                if (this.gameObject == undefined)
                    return undefined;
                //todo
            }

            /**
            * 摄像机组件
            * 快捷方式
            * @returns {Component} 
            * @memberof Component
            */
            public camera(): Component {
                if (this.gameObject == undefined)
                    return undefined;
                //todo
            }

            /**
            * 行走面组件
            * 快捷方式
            * @returns {Component} 
            * @memberof Component
            */
            public collider(): Component {
                if (this.gameObject == undefined)
                    return undefined;
                //todo
            }

            /**
            * 灯光组件
            * 快捷方式
            * @returns {Component} 
            * @memberof Component
            */
            public light(): Component {
                if (this.gameObject == undefined)
                    return undefined;
                //todo
            }

            /**
            * 特效组件
            * 快捷方式
            * @returns {Component} 
            * @memberof Component
            */
            public particleSystem(): Component {
                if (this.gameObject == undefined)
                    return undefined;
                //todo
            }

            /**
            * 物理组件
            * 快捷方式
            * @returns {Component} 
            * @memberof Component
            */
            public rigidbody(): Component {
                if (this.gameObject == undefined)
                    return undefined;
                //todo
            }
        }
    }
}