module MeltEngine {

    /*-----------------------------------------------------------------------------------------
    |   |   |   |   |   |   |   |   |  数学库
    -----------------------------------------------------------------------------------------*/
    export interface IVector2 {
        x: number;
        y: number;
    }
    export interface IVector3 {
        x: number;
        y: number;
        z: number;
    }
    export interface IVector4 {
        x: number;
        y: number;
        z: number;
        w: number;
    }

    /*-----------------------------------------------------------------------------------------
     |   |   |   |   |   |   |   |   |   基础类
    -----------------------------------------------------------------------------------------*/
    export interface IObject {

        /*-----------------------------------------------------------------------------------------
        |   |   |   |   |   |   |   |   |   基础属性,所有对象继承
        -----------------------------------------------------------------------------------------*/
        //哈希值,类对象的唯一标识
        ID(): number;

        //外部数据设置，只是一个外部数据保存的媒介
        SetData(dwData: any): void;
        //获取外部保存的数据 对应 SetData
        GetData(): any;

        //设置layer层级
        SetLayer(layer: number): void;
        GetLayer(): number;

        //设置该对象是否激活
        SetActive(bActive: boolean): void;
        //获取对象的激活状态
        IsActive(): boolean;
    }

    /*-----------------------------------------------------------------------------------------
     |   |   |   |   |   |   |   |   |   引擎管理
    -----------------------------------------------------------------------------------------*/
    export interface IApplication extends IObject {
        //初始化
        Init();
        //卸载
        UnInit();
        /*-----------------------------------------------------------------------------------------
        |   |   |   |   |   |   |   |   |   更新&刷新
        -----------------------------------------------------------------------------------------*/
        //更新
        Update(fElapsedTime: number): void;
        //渲染
        Render(): void;
        //更改大小
        Resize(width?: number, height?: number);
    }

    /*-------------------------------------------------------------------------------------------
    |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
    -------------------------------------------------------------------------------------------*/
    //摄像头管理类
    export interface ICamera extends IObject {

        //摄像头看的位置,看的目标点
        SetLookAt(fX: number, fY: number, fZ: number): void;
        GetLookAt(): IVector3;

        //摄像头距离看的位置的长度,
        SetDistance(fDistance: number): void;
        GetDistance(): number;

        //摄像头pitch的角度,不是弧度。
        SetPitch(fPitch: number): void;
        GetPitch(): number;

        //摄像头yaw的角度,不是弧度。
        SetDirection(fDirection: number): void;
        GetDirection(): number;

        //摄像机抖动
        CameraShake(VibRange: number, StepLen: number, Times: number): void;

        //设置摄像机的fov 在正交模式下 设置 size
        SetSizeOrFov(value: number): void;

        //设置相机的设置横纵比。
        SetAspect(value: number): void;
    }

    /*-------------------------------------------------------------------------------------------
    |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
    -------------------------------------------------------------------------------------------*/
    //场景管理
    export interface ILevel extends IObject {

        //播放场景动画
        PlaySceneAnim(szAniName: string, bLoop: boolean): boolean;

        //加载场景
        Load(level_url: string, preloadRes?: string[]): boolean;
        //场景加载完毕
        OnLoadEnd();
        //卸载场景
        Unload(): void;

        //加载逻辑场景,不是异步加载
        LoadLevelLogic(): boolean;

        //获取地形的高度
        GetTerrainHeight(x: number, y: number): number;

        //是否在trap 中
        InTrap(x: number, y: number): boolean;
        //trap是否触发 引擎内部逻辑处理
        TrapTrigger(begin: boolean): void;
        //是否在障碍中
        Inobstacle(x: number, y: number): boolean;

        //雾效设置
        SetFog(enable: boolean, r: number, g: number, b: number, i: number, fTime?: number): void;
    }

    /*-------------------------------------------------------------------------------------------
    |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
    -------------------------------------------------------------------------------------------*/
    //声音播放接口
    export interface ISound extends IObject {

        //播放背景音乐
        PlayBGM(url: string, volume: number, followDevice?: boolean): void;

        //播放音效
        PlaySound(url: string, volume: number, followDevice?: boolean): void;
    }

    /*-------------------------------------------------------------------------------------------
    |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
    -------------------------------------------------------------------------------------------*/
    export interface IGameObject extends IObject {
        Init();
        UnInit();

        //     /*-----------------------------------------------------------------------------------------
        //    |   |   |   |   |   |   |   |   |   加载资源
        //    -----------------------------------------------------------------------------------------*/
        //     //加载资源
        //     Load(url: string): void;
        //     //异步加载是否完成
        //     OnLoadAsyncEnd(): boolean;

        //     /*-----------------------------------------------------------------------------------------
        //     |   |   |   |   |   |   |   |   |   Transform
        //     -----------------------------------------------------------------------------------------*/
        //     //设置对象的移动距离
        //     Translate(x: number, y: number, z: number): void;
        //     //设置对象的位置
        //     SetPosition(x: number, y: number, z: number): void;
        //     //获取对象的坐标,值为引擎坐标
        //     GetPosition(): Vector3;
        //     //设置该对象的旋转，欧拉角
        //     SetRotation(vRotateX: number, vRotateY: number, vRotateZ: number): void;
        //     GetRotation(): Vector3;
        //     //设置对象的缩放
        //     SetScale(x: number, y: number, z: number, fTime?: number): void;
        //     GetScale(): Vector3;

        //     /*-----------------------------------------------------------------------------------------
        //     |   |   |   |   |   |   |   |   |   鼠标选中
        //     -----------------------------------------------------------------------------------------*/
        //     //设置是否可以被查询到
        //     SetRayQuery(bQuery: boolean): void;
        //     //获取是否可以被查询到
        //     GetRayQuery(): boolean;
        //     //设置查询等级
        //     SetRayQueryLevel(nLevel: RayQueryLevel): void;
        //     //获取查询等级
        //     GetRayQueryLevel(): RayQueryLevel;

        //     /*-----------------------------------------------------------------------------------------
        //     |   |   |   |   |   |   |   |   |   绑定对象
        //     -----------------------------------------------------------------------------------------*/
        //     //绑定对象
        //     AttachObject(pObject: IObject, szBindName: string, bRot?: boolean): void;
        //     //解除绑定，但是不会删除对象，需要自己手动删除
        //     DetachObject(pObject: IObject): void;

        //     //获取绑定点位置
        //     GetLocator(szName: string, fvPosition: Vector3): void;
        //     //取得"头顶点"在屏幕上的位置,如果返回false，表示在屏幕之外,或者没有该点
        //     GetLocatorScreenPoint(locator: string, pvObjPos: Vector3, fObligeHeight?: number): boolean;

        //     //改变动画的播放速度
        //     ChangeActionRate(fAniRate: number): void;
        //     //设置默认播放动画
        //     SetDefaultAnim(aniName?: string): void;

        //     /*-----------------------------------------------------------------------------------------
        //     |   |   |   |   |   |   |   |   |   特殊效果
        //     -----------------------------------------------------------------------------------------*/
        //     //淡入 
        //     FadeIn(fTime: number): void;
        //     //淡出
        //     FadeOut(fTime: number): void;

        //     //设置被鼠标选中状态
        //     SetMouseHover(bHover: boolean, vColor: Vector3, crisperdingWidth?: number): void;
        //     //设置被击中的颜色
        //     SetHitColor(vColor: Vector3, fTime?: number): void
        //     //设置边缘光颜色
        //     SetEdgeColor(vColor: Vector3, fTime: number, power?: number): void;

        //     //改变颜色
        //     ChangeColor(_cp: CharacterPart, r: number, g: number, b: number, power?: number): void;
        //     //改变部件
        //     ChangePart(_cp: CharacterPart, _cp_url: string, textUrl: string): void;
    }

    /*-------------------------------------------------------------------------------------------
    |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
    -------------------------------------------------------------------------------------------*/
    /**
     * 创建游戏
     * 
     * @export
     * @param {number} [width] 宽度
     * @param {number} [height] 高度
     * @returns {IApplication} 
     */
    export function Engine_Init(): IApplication {
        return undefined;
    }

    /**
     * 删除游戏 
     * 
     * @export
     * @param {IApplication} app 
     */
    export function Engine_UnInit(app: IApplication) {
    }
}