module MeltEngine {

    export class TLevel extends Base.Level {

        public static mScene: THREE.Scene = undefined;

        constructor() { super(); }

        public Awake() {
            //super.Awake();
            Base.Level.main = this;

            TLevel.mScene = new THREE.Scene();

            var path = './res/scene/cube/';
            var format = '.jpg';
            var envMap = new THREE.CubeTextureLoader().load([
                path + 'px' + format, path + 'nx' + format,
                path + 'py' + format, path + 'ny' + format,
                path + 'pz' + format, path + 'nz' + format
            ]);
            TLevel.mScene.background = envMap;
        }

        createScene(level_path: string) {
            super.createScene(level_path);

            Base.Loader.main.load(level_path, this, this.onLoaded, [level_path]);
        }

        private onLoaded(level_path: string, gltf: any) {
            if (gltf == undefined) {
                console.error("load level [" + level_path + "] failed.");
                return;
            }

            let obj = gltf.scene as THREE.Object3D;
            TLevel.mScene.add(obj);
        }

        addChild(..._child: any[]) {
            // TLevel.mScene.add();
        }

        // privaet mixer:THREE.AnimationMixer;
        // private _onLoaded(gltf) {
        //     let obj = gltf.scene as THREE.Object3D;

        //     this.mScene.add(obj);

        //     this.mixer = new THREE.AnimationMixer( obj );
        // 	this.mixer.clipAction( gltf.animations[ 0 ] ).play();
        // }


    }
}