/**
 * Melt Engine
 */
module MeltEngine {
    //基础模块
    export module Base {

        /**
         * 组件相关操作
         * @export
         * @class LocalObject
         * @extends {BaseObject}
         */
        export class LocalObject extends BaseObject {
            //所有组件
            private components: Array<any> = new Array<any>();

            public constructor() { super(); }

            protected DestoryAllComponent() {

                let item = this.components.pop();
                while (item != undefined) {
                    CachePool.Instance.destroyObject(item.TypeString(), item);
                    item = this.components.pop();
                }
            }

            /**
             * 更新所有组件
             * @memberof LocalObject
             */
            Update(fElapsedTime: number) {

                for (let i = 0, len = this.components.length; i < len; i++) {
                    this.components[i].FixedUpdate(fElapsedTime);
                }

                for (let i = 0, len = this.components.length; i < len; i++) {
                    this.components[i].Update(fElapsedTime);
                }

                for (let i = 0, len = this.components.length; i < len; i++) {
                    this.components[i].LateUpdate(fElapsedTime);
                }
            }

            /**
             * 添加组件
             * @template T 
             * @returns {T} 
             * @memberof LocalObject
             */
            AddComponent<T extends Component>(clas: { new (): T; }): T {

                let obj: T = this.GetComponent<T>(clas);
                if (obj != undefined && obj.isSingleton() == true) {
                    console.warn(obj.TypeString + " is single component.")
                    return undefined;
                }

                //组件缓存
                let ct = RegisterClass.indexOf(clas as any) as ObjectType;
                let coObj = CachePool.Instance.createObject(ObjectTypeString[ct], clas, CacheType.CT_CLASS) as T;
                if (coObj != undefined) {
                    coObj.Awake();
                    coObj.Start();
                    this.components.push(coObj);
                }

                return coObj;
            }

            /**
             * 根据类型添加组件
             * @param {ObjectType} ct 
             * @returns {Component} 
             * @memberof LocalObject
             */
            AddComponentByType(ct: ObjectType): Component {

                let clas: any = RegisterClass[ct];
                if (clas == undefined) {

                    console.error(" add type [" + ObjectTypeString[ct] + "] class info to localObject")
                    return undefined;
                }

                let obj: Component = this.GetComponentByType(ct);
                if (obj != undefined && obj.isSingleton() == true) {
                    console.warn(obj.TypeString + " is single component.")
                    return undefined;
                }

                //组件缓存
                let coObj = CachePool.Instance.createObject(ObjectTypeString[ct], clas, CacheType.CT_CLASS);
                if (coObj != undefined) {
                    coObj.Awake();
                    coObj.Start();
                    this.components.push(coObj);
                }
                return coObj;
            }

            /**
             * 移除组件
             * @param {Component} obj 
             * @returns 
             * @memberof LocalObject
             */
            RemoveComponent(obj: Component) {

                if (obj == undefined)
                    return;
                
                obj.OnDestory();

                let index = this.components.indexOf(obj);
                if (index != -1) {
                    this.components.splice(index, 1);
                    CachePool.Instance.destroyObject(obj.TypeString(), obj);
                }
                else {
                    console.error("Delete the obj is not Component " + obj + ". type " + obj.TypeString());
                }
            }

            /**
             * 获取该类型的第一个组件
             * @template T 
             * @returns {T} 
             * @memberof LocalObject
             */
            GetComponent<T extends Component>(clas: { new (): T; }): T {

                for (let i = 0, len = this.components.length; i < len; i++) {
                    let obj = this.components[i];
                    let ct = obj.Type();
                    let _clas: any = RegisterClass[ct];
                    if (_clas == clas)
                        return obj;
                }

                return undefined;
            }

            /**
             * 根据类型获取该类型的第一个组件
             * @param {ObjectType} ct 
             * @returns {Component} 
             * @memberof LocalObject
             */
            GetComponentByType(ct: ObjectType): Component {

                for (let i = 0, len = this.components.length; i < len; i++) {
                    let obj = this.components[i];
                    let _ct = obj.Type();
                    if (_ct == ct)
                        return obj;
                }
                return undefined;
            }

            /**
             * 获取该类型的所有组件
             * @template T 
             * @returns {T[]} 
             * @memberof LocalObject
             */
            GetComponents<T extends Component>(clas: { new (): T; }): T[] {
                let t: T[] = [];
                for (let i = 0, len = this.components.length; i < len; i++) {
                    let obj = this.components[i];
                    let ct = obj.Type();
                    let _clas: any = RegisterClass[ct];
                    if (_clas == clas)
                        t.push(obj);
                }
                return t;
            }

            /**
             * 根据类型获取该类型的所有组件
             * @param {ObjectType} ct 
             * @returns {Component[]} 
             * @memberof LocalObject
             */
            GetComponentsByType(ct: ObjectType): Component[] {
                let t: Component[] = [];
                for (let i = 0, len = this.components.length; i < len; i++) {
                    let obj = this.components[i];
                    let _ct = obj.Type();
                    if (_ct == ct)
                        t.push(obj);
                }
                return t;
            }

            /**
             * 获取包含子节点的该类型第一个组件
             * @template T 
             * @returns {T} 
             * @memberof LocalObject
             */
            GetComponentInChildren<T extends Component>(clas: { new (): T; }): T {
                //todo
                return undefined;
            }

            /**
             * 获取包含子节点的该类型第一个组件
             * @template T 
             * @returns {T} 
             * @memberof LocalObject
             */
            GetComponentInChildrenByType(ct: ObjectType): Component {
                //todo
                return undefined;
            }

            /**
             * 获取包含子节点的该类型所有组件
             * @template T 
             * @returns {T} 
             * @memberof LocalObject
             */
            GetComponentsInChildren<T extends Component>(clas: { new (): T; }): T[] {
                //todo
                return undefined;
            }

            /**
             * 获取包含子节点的该类型所有组件
             * @template T 
             * @returns {T} 
             * @memberof LocalObject
             */
            GetComponentsInChildrenByType(ct: ObjectType): Component[] {
                //todo
                return undefined;
            }

            /**
             * 获取父节点的该类型第一个组件
             * @template T 
             * @returns {T} 
             * @memberof LocalObject
             */
            GetComponentInParent<T extends Component>(clas: { new (): T; }): T {
                //todo
                return undefined;
            }

            /**
             * 获取父节点的该类型第一个组件
             * @template T 
             * @returns {T} 
             * @memberof LocalObject
             */
            GetComponentInParentByType(ct: ObjectType): Component {
                //todo
                return undefined;
            }

            /**
             * 获取父节点的该类型所有组件
             * @template T 
             * @returns {T} 
             * @memberof LocalObject
             */
            GetComponentsInParent<T extends Component>(): T[] {
                //todo
                return undefined;
            }

            /**
             * 获取父节点的该类型所有组件
             * @template T 
             * @returns {T} 
             * @memberof LocalObject
             */
            GetComponentsInParentByType(ct: ObjectType): Component[] {
                //todo
                return undefined;
            }
        }
    }
}