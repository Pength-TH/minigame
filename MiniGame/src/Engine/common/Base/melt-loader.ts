module MeltEngine {
    //基础模块
    export module Base {

        /**
         * 加载管理
         * @export
         * @class BaseLevel
         */
        export class Loader extends Component {

            public static main: Loader = undefined;
            
            constructor() { super(); this.objectType = ObjectType.OT_LOADER; }

            public Awake() {
                Loader.main = this;

            }

            load(url: string, call?: any, method?: Function, arg?: any[]) {

            }

        }
    }
}