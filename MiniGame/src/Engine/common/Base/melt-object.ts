/**
 * Melt Engine
 */
module MeltEngine {
    //基础模块
    export module Base {

        /**
         * 对象ID
         */
        let objectID: number = -28473647;

        /**
         * 基础类
         * @export
         * @class BaseObject
         * @implements {IObject}
         */
        export class BaseObject {

            private id: number = 0;
            private data: any = undefined;
            private layer: number = 0;
            private active: boolean = true;

            protected tag: string = "";
            protected objectType: ObjectType = ObjectType.OT_DEFAULT;

            public name: string = "";

            /*---------------------------------------------------------------------------------------
            |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   
            ---------------------------------------------------------------------------------------*/
            /**
             * 设置名字
             * @param {string} name 
             * @memberof BaseObject
             */
            public SetName(name: string) {
                this.name = name;
            }

            /**
             * 获取名字
             * @returns {string} 
             * @memberof BaseObject
             */
            public GetName(): string {
                return this.name;
            }

            /**
             * 类对象的唯一标识
             * 
             * @returns {number} ID
             * @memberof BaseObject
             */
            public ID(): number {

                if (this.id == 0)
                    this.id = objectID++;

                return this.id;
            }

            /**
             * 类的类型
             * @returns {ObjectType} 
             * @memberof BaseObject
             */
            public Type(): ObjectType {

                return this.objectType;
            }

            /**
             * 类型对应的字符串
             * @returns {string} 
             * @memberof BaseObject
             */
            public TypeString(): string {

                return ObjectTypeString[this.objectType];
            }

            /**
             * 外部数据设置，只是一个外部数据保存的媒介
             * @param {*} dwData 
             * @memberof BaseObject
             */
            SetData(dwData: any): void {

                this.data = dwData;
            }

            /**
             * 获取SetData保存的数据 
             * @returns {*} 
             * @memberof BaseObject
             */
            GetData(): any {

                return this.data;
            }

            /**
             * 设置layer层级
             * @param {number} layer 
             * @memberof BaseObject
             */
            SetLayer(layer: number): void {

                this.layer = layer;
            }

            /**
             * 获取SetLayer 设置的层级
             * @returns {number} 
             * @memberof BaseObject
             */
            GetLayer(): number {

                return this.layer;
            }

            /**
             * 设置该对象是否激活
             * @param {boolean} bActive 
             * @memberof BaseObject
             */
            SetActive(bActive: boolean): void {

                this.active = bActive;
            }

            /**
             * 获取对象的激活状态
             * @returns {boolean} 
             * @memberof BaseObject
             */
            IsActive(): boolean {
                return this.active;
            }

            /**
             * 设置标签
             * @param {string} _tag 
             * @memberof BaseObject
             */
            SetTag(_tag: string) {
                this.tag = _tag;
            }

            /**
             * 获取标签 
             * @returns {string} 
             * @memberof BaseObject
             */
            GetTag(): string {
                return this.tag;
            }
        }
    }
}