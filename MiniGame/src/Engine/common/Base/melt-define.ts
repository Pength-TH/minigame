module MeltEngine {
    //基础模块
    export module Base {

        /*---------------------------------------------------------------------------------------
        |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   
        ---------------------------------------------------------------------------------------*/
        /**
         * 对象类型
         * 每添加一个组件类(继承Component), 需要在此添加相应的类型
         * @export
         * @enum {number}
         */
        export enum ObjectType {
            OT_DEFAULT = 0,             //空
            OT_TRANSFORM = OT_DEFAULT,  //位移
            OT_CAMERA,                  //摄像机
            OT_LEVEL,                   //场景
            OT_MESH,                    //模型
            OT_SKINMESH,                //骨骼模型
            OT_LOADER,                  //加载对象

            OT_END,                     //结束
        };

        /**
         * 对象类型的字符串
         * 每个类型对应的字符串,不可以重复,顺序必须和ObjectType一样
         * 用于对象缓存,日志报错等
         * 
         * 如果对象是继承基类的,需要修改对应的字符串
         */
        export let ObjectTypeString = [
            "ot_transform",
            "ot_camera",
            "ot_level",
            "ot_mesh",
            "ot_skinmesh",
            "ot_loader",

            "ot_end"
        ];

        /**
         * 对象名
         * 每个类型对应的类名
         * 用于根据对象类型,创建对象
         * 如果对象是继承基类的,需要修改对应的类名
         */
        export let RegisterClass = [];

        /*---------------------------------------------------------------------------------------
        |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   
        ---------------------------------------------------------------------------------------*/
        /**
         * 坐标类型
         * @export
         * @enum {number}
         */
        export enum AxisType {
            EXT_DEFAULT = 0,
            EXT_GAME,
            EXT_ENGINE,
            EXT_SCREEN,
            EXT_END,
        };

        /**
         * 角色部件 
         * @export
         * @enum {number}
         */
        export enum CharacterPart {
            CP_DEFAULT = 0,     //默认对象 不可切换任何部件
            CP_LEFT_WEAPON,     //左手武器
            CP_RIGHT_WEAPON,    //右手武器

            CP_HAIR,
            CP_BODY,
            CP_FACE,

            CP_END
        };

    }
}