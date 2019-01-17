
module MeltEngine {

    //基础模块
    export module Base {
        /**
         * 发动机
         * @export
         * @class Application
         * @extends {BaseObject}
         */
        export class Application extends BaseObject implements IApplication {

            protected mInitFlag: boolean = false;

            protected width: number;
            protected height: number;

            private levelGameObject: GameObject = undefined;//场景对象
            private cameraGameObject: GameObject = undefined;//摄像机
            private loaderGameObject: GameObject = undefined;//加载

            constructor() {
                super();
            }

            Register() {
                /** 注册类 */
                Base.RegisterClass[Base.ObjectType.OT_TRANSFORM] = Transform;
                Base.RegisterClass[Base.ObjectType.OT_CAMERA] = Camera;
                Base.RegisterClass[Base.ObjectType.OT_LEVEL] = Level;
                Base.RegisterClass[Base.ObjectType.OT_LOADER] = Loader;

                /** 结束 */
            }

            Init() {

                if (this.mInitFlag == true)
                    return;

                //初始化场景
                this.levelGameObject = GameObject.CreateObject(ObjectType.OT_LEVEL);

                //初始化摄像机
                this.cameraGameObject = GameObject.CreateObject(ObjectType.OT_CAMERA);

                //初始化加载
                this.loaderGameObject = GameObject.CreateObject(ObjectType.OT_LOADER);

                this.mInitFlag = true;
            }

            UnInit() {
                if (this.mInitFlag == false)
                    return;

                if (this.levelGameObject != undefined) {
                    GameObject.DestoryImmediate(this.levelGameObject);
                    this.levelGameObject = undefined;
                }

                if (this.cameraGameObject != undefined) {
                    GameObject.DestoryImmediate(this.cameraGameObject);
                    this.cameraGameObject = undefined;
                }

                if (this.loaderGameObject != undefined) {
                    GameObject.DestoryImmediate(this.loaderGameObject);
                    this.loaderGameObject = undefined;
                }

                this.mInitFlag = false;
            }

            Resize(width?: number, height?: number) {
                this.width = (width == undefined ? window.innerWidth : width);
                this.height = (height == undefined ? window.innerHeight : height);

                if (Camera.main != undefined)
                    Camera.main.Resize(this.width / this.height);
            }

            /**
             * 更新引擎
             * @param {number} fElapsedTime 
             * @memberof BaseApplication
             */
            Update(fElapsedTime: number): void {

                if (this.levelGameObject)
                    this.levelGameObject.Update(fElapsedTime);

                if (this.cameraGameObject)
                    this.cameraGameObject.Update(fElapsedTime);

                this.Render();
            }

            /**
             * 渲染
             * @memberof BaseApplication
             */
            Render(): void {

            }
        }
    }
}