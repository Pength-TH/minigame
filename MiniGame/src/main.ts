// 程序入口
class Main {

    public engine: MeltEngine.IApplication = undefined;
    private mFrameLoop: any = undefined;

    constructor() {
        //初始化微信小游戏
        //Laya.MiniAdpter.init();
        this.init();
        this._init();

        //窗口变化
        window.addEventListener('resize', this.Resize.bind(this), false);
    }

    //程序入口
    init() {

        //初始化引擎
        this.engine = MeltEngine.Engine_Init();
        this.engine.Resize();

        UI.Instance.init();
        Logic.Instance.init();

    }

    _init() {
        this.mFrameLoop = this.frameLoop.bind(this);
        window.requestAnimationFrame(this.mFrameLoop);
    }

    unInit() {

        MeltEngine.Engine_UnInit(this.engine);
    }

    Resize() {
        this.engine.Resize();
    }

    private frameLoop() {

        UI.Instance.init();
        Logic.Instance.init();

        //逻辑更新操作
        this.engine.Update(0.1);
        //渲染操作
        this.engine.Render();

        window.requestAnimationFrame(this.mFrameLoop);
    }

}

let g_app = new Main();