module MeltEngine {

    export class TCamera extends Base.Camera {

        public static mCamera: THREE.PerspectiveCamera = undefined;

        constructor() { super(); }

        public Awake() {
            //super.Awake();
            Base.Camera.main = this;
            
            TCamera.mCamera = new THREE.PerspectiveCamera(75, 1.48, 0.1, 1000);
            TCamera.mCamera.updateProjectionMatrix();

        }

        public OnDestory() {
            super.OnDestory();

        }

        Resize(aspect: number) {
            super.Resize(aspect);

            TCamera.mCamera.updateProjectionMatrix();
            TCamera.mCamera.aspect = aspect;
        }

        Update() {

            super.Update();

            //TCamera.mCamera.position.set(this.mPosition.x, this.mPosition.y, this.mPosition.z);
            //TCamera.mCamera.lookAt(this.mLookAt.x, this.mLookAt.y, this.mLookAt.z);

        }
    }


}