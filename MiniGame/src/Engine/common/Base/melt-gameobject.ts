module MeltEngine {
    //基础模块
    export module Base {

        export class GameObject extends LocalObject {

            /*-----------------------------------------------------------------------------------------
            |   |   |   |   |   |   |   |   |   静态方法
            -----------------------------------------------------------------------------------------*/
            private static mGameObjects: Array<GameObject> = new Array<GameObject>();

            /**
             * 创建对象
             * 有缓存管理
             * @static
             * @param {ObjectType} type 
             * @returns {GameObject} 
             * @memberof GameObject
             */
            public static CreateObject(type?: ObjectType): GameObject {
                if(type == undefined)
                    type = ObjectType.OT_DEFAULT;

                let gameObj: GameObject = CachePool.Instance.createObject(ObjectTypeString[type], GameObject, CacheType.CT_CLASS) as GameObject;
                if (gameObj == undefined) {
                    console.error("创建对象 " + ObjectTypeString[type] + "失败.");
                    return undefined;
                }

                gameObj.transform = gameObj.GetComponentByType(ObjectType.OT_TRANSFORM) as Transform;
                if (gameObj.transform == undefined)
                    gameObj.transform = gameObj.AddComponent<Transform>(Transform);

                gameObj.AddComponentByType(type);

                gameObj.Init();

                this.mGameObjects.push(gameObj);

                return gameObj;
            }

            /**
             * 立即删除对象
             * @static
             * @param {GameObject} pNode 
             * @returns {void} 
             * @memberof GameObject
             */
            public static DestoryImmediate(pNode: GameObject): void {
                if (pNode == undefined)
                    return;

                let go = pNode as GameObject;

                let k = this.mGameObjects.indexOf(go);
                this.mGameObjects.splice(k, 1);

                go.UnInit();
                CachePool.Instance.destroyObject(pNode.TypeString(), go);
                pNode = undefined;
            }

            /**
             * 延迟删除对象
             * @param {GameObject} baseObject 
             * @param {number} [fTime] 
             * @memberof BaseObject
             */
            public static Destory(baseObject: GameObject, fTime?: number) {
                if (fTime <= 0)
                    GameObject.DestoryImmediate(baseObject);
                else {

                    //todo
                }
            }

            /**
             * 根据名字获取第一个对象
             * @static
             * @param {string} name 
             * @returns {GameObject} 
             * @memberof GameObject
             */
            public static FindGameObject(name: string): GameObject {

                for (let i = 0; i < this.mGameObjects.length; i++) {

                    if (this.mGameObjects[i].name == name)
                        return this.mGameObjects[i];
                }
                return undefined;
            }

            /**
             * 根据标签获取第一个对象
             * @static
             * @param {string} name 
             * @returns {GameObject} 
             * @memberof GameObject
             */
            public static FindGameObjectWithTag(tag: string): GameObject {

                for (let i = 0; i < this.mGameObjects.length; i++) {

                    if (this.mGameObjects[i].GetTag() == tag)
                        return this.mGameObjects[i];
                }
                return undefined;
            }

            /**
             * 根据标签获取对象数组
             * @static
             * @param {string} name 
             * @returns {GameObject[]} 
             * @memberof GameObject
             */
            public static FindGameObjectsWithTag(tag: string): GameObject[] {

                let gameObjects: GameObject[] = [];
                for (let i = 0; i < this.mGameObjects.length; i++) {

                    if (this.mGameObjects[i].GetTag() == tag)
                        gameObjects.push(this.mGameObjects[i]);
                }
                return gameObjects;
            }

            /*---------------------------------------------------------------------------------------
            |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   
            -----------------------------------------------------------------------------------------
            /**
             * 位移组件
             * @type {Transform}
             * @memberof GameObject
             */
            public transform: Transform = undefined;

            public constructor() { super(); }

            Init() {

            }

            UnInit() {

            }

            /*---------------------------------------------------------------------------------------
            |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   
            -----------------------------------------------------------------------------------------
            以下方法均为快捷方式,方便快速调用。可能会有功能紊乱的情况,写功能的时候还麻烦手动整理好,方便以后维护
            -----------------------------------------------------------------------------------------
            |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   
            ---------------------------------------------------------------------------------------*/


            // private mRayQuery: boolean = false;
            // private mRayQueryLevel: RayQueryLevel = RayQueryLevel.RQL_BEGIN;

            // /*-----------------------------------------------------------------------------------------
            // |   |   |   |   |   |   |   |   |   加载资源
            // -----------------------------------------------------------------------------------------*/
            // //加载资源
            // Load(url: string): void {
            // }
            // //异步加载是否完成
            // OnLoadAsyncEnd(): boolean {
            //     return false;
            // }

            // /*-----------------------------------------------------------------------------------------
            // |   |   |   |   |   |   |   |   |   鼠标选中
            // -----------------------------------------------------------------------------------------*/
            // //设置是否可以被查询到
            // SetRayQuery(bQuery: boolean): void {
            //     this.mRayQuery = bQuery;
            // }
            // //获取是否可以被查询到
            // GetRayQuery(): boolean {
            //     return this.mRayQuery;
            // }
            // //设置查询等级
            // SetRayQueryLevel(nLevel: RayQueryLevel): void {
            //     this.mRayQueryLevel = nLevel;
            // }
            // //获取查询等级
            // GetRayQueryLevel(): RayQueryLevel {
            //     return this.mRayQueryLevel;
            // }

            // /*-----------------------------------------------------------------------------------------
            // |   |   |   |   |   |   |   |   |   绑定对象
            // -----------------------------------------------------------------------------------------*/
            // //绑定对象
            // AttachObject(pObject: IObject, szBindName: string, bRot?: boolean): void {

            // }
            // //解除绑定，但是不会删除对象，需要自己手动删除
            // DetachObject(pObject: IObject): void {

            // }

            // //获取绑定点位置
            // GetLocator(szName: string, fvPosition: Vector3): void {

            // }
            // //取得"头顶点"在屏幕上的位置,如果返回false，表示在屏幕之外,或者没有该点
            // GetLocatorScreenPoint(locator: string, pvObjPos: Vector3, fObligeHeight?: number): boolean {
            //     return false;
            // }

        }
    }
}