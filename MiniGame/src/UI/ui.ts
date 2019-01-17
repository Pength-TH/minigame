class UI {
    public static readonly Instance: UI = new UI();
    constructor() {
    }

    public init() {
        // Laya.init(600, 400);
        // //激活资源版本控制
        // Laya.ResourceVersion.enable("version.json", Laya.Handler.create(null, this.beginLoad), Laya.ResourceVersion.FILENAME_VERSION);
    }

    private beginLoad() {
        Laya.loader.load("res/atlas/comp.atlas", Laya.Handler.create(null, this.onLoaded));
    }

    private onLoaded(): void {
        //实例UI界面
        //var testUI: TestUI = new TestUI();
        //Laya.stage.addChild(testUI);
    }

    public update(fDeltaTime: number) {
    }
}
