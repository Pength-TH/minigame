module MeltEngine {
    //基础模块
    export module Base {

        /**
         * 场景管理
         * @export
         * @class BaseLevel
         */
        export class Level extends Component {

            /**
             * 主场景
             * @static
             * @type {Level}
             * @memberof Level
             */
            public static main: Level = undefined;

            /**
             * 加载完毕
             * @type {Function}
             * @memberof BaseLevel
             */
            public onLoad: Function = undefined;

            /**
             * 加载中
             * 参数百分比 0 - 100
             * @type {Function}
             * @memberof BaseLevel
             */
            public onLoading: Function = undefined;

            private oldLevelName: string = ""; //创建过的场景
            private loaded: boolean = false;

            public constructor() { super(); this.objectType = ObjectType.OT_LEVEL; }

            public Awake() {
                this._isSingleton = true;
                Level.main = this;
            }

            /**
             * 异步创建场景
             * 重复场景加载,同一场景不会重复加载
             * @param {string} level_path 
             * @memberof BaseLevel
             */
            createScene(level_path: string) {

                //同一张场景重复加载
                if (this.oldLevelName == level_path) {

                    //如果加载完毕直接回掉
                    if (this.loaded == true && this.onLoad != undefined) {
                        this.onLoad();
                    }

                    //没有加载完毕不做处理
                    return;
                }

                this.oldLevelName = level_path;
            }

            /**
             * 添加子节点
             * @param {...any[]} _child 
             * @memberof BaseLevel
             */
            addChild(..._child: any[]) {

            }



        }
    }
}