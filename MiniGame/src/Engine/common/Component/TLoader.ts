module MeltEngine {

    export class TLoader extends Base.Loader {

        private gltfLoader: THREE.GLTFLoader = undefined;

        constructor() { 
            super(); 
        }

        public Awake() {
            //super.Awake();
            Base.Loader.main = this;

            this.gltfLoader = new THREE.GLTFLoader();
        }

        load(url: string, call?: any, method?: Function, arg?: any[]) {

            super.load(url, call, method, arg);
            if (this.gltfLoader == undefined)
                return;

            this.gltfLoader.load(url,
                /** onLoad */
                function (data) {

                    if (arg == undefined)
                        arg = [];

                    arg.push(data);
                    if (method != undefined)
                        method.apply(call, arg);

                },
                /** onProgress */
                undefined,
                /** onError */
                function () {
                    method.apply(call);
                });

        }

    }

}