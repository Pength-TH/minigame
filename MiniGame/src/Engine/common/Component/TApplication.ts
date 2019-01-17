module MeltEngine {

    /**
     * 游戏总类
     * @export
     * @class TApplication
     * @extends {BaseApplication}
     */
    export class TApplication extends Base.Application {

        private mRender: THREE.WebGLRenderer = undefined;
        private mLight: THREE.HemisphereLight = undefined;

        constructor() { super(); }

        Register() {
            super.Register();

            Base.RegisterClass[Base.ObjectType.OT_CAMERA] = TCamera;
            Base.RegisterClass[Base.ObjectType.OT_LEVEL] = TLevel;
            Base.RegisterClass[Base.ObjectType.OT_LOADER] = TLoader;


        }

        public Init() {

            if (this.mInitFlag == true)
                return;

            this.Register();
            super.Init();

            this.mRender = new THREE.WebGLRenderer();
            document.body.appendChild(this.mRender.domElement);

            this.mLight = new THREE.HemisphereLight(0xbbbbff, 0x444422);
            this.mLight.position.set(0, 1, 0);
            Base.Level.main.addChild(this.mLight);

            TLevel.main.createScene("res/scene/scene02/scence.gltf");
            
            this.mInitFlag = true;
        }

        public UnInit() {

            if (this.mInitFlag == false)
                return;

            super.UnInit();
            this.mInitFlag = false;
        }

        public Resize(width: number, height: number) {
            super.Resize(width, height);

            if (this.mRender)
                this.mRender.setSize(this.width, this.height);
        }

        public Update(fDeltaTime: number) {

            super.Update(fDeltaTime);

        }

        Render(): void {

            this.mRender.render(TLevel.mScene, TCamera.mCamera);
        }
    }
}

MeltEngine.Engine_Init = function (): MeltEngine.IApplication {
    let app = new MeltEngine.TApplication();
    app.Init();
    return app;
}

MeltEngine.Engine_UnInit = function (app: MeltEngine.IApplication) {
    app.UnInit();
    app = undefined;
}

