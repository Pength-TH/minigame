module MeltEngine {
    //基础模块
    export module Base {

        /*-----------------------------------------------------------------------------------------
        |   |   |   |   |   |   |   |   |   |   |   |   |   |   Math
        -----------------------------------------------------------------------------------------*/
        //二维向量
        export class Vector2 implements IVector2 {

            public x: number = 0;
            public y: number = 0;

            public constructor() { }

            ctor(x, y): boolean {
                this.x = x;
                this.y = y;
                return true;
            }

            distance(pos): number {
                var x = pos.x - this.x;
                var y = pos.y - this.y;
                return Math.sqrt(x * x + y * y);
            }

            add(vec3): Vector2 {
                this.x += vec3.x;
                this.y += vec3.y;
                return this;
            }

            sub(vec3): Vector2 {
                this.x -= vec3.x;
                this.y -= vec3.y;
                return this;
            }

            mul(num): Vector2 {
                this.x *= num;
                this.y *= num;
                return this;
            }

            div(num): Vector2 {
                this.x /= num;
                this.y /= num;
                return this;
            }

            neg(): Vector2 {
                this.x = -this.x;
                this.y = -this.y;
                return this;
            }
        }

        //三维向量
        export class Vector3 implements IVector3 {

            public x: number = 0;
            public y: number = 0;
            public z: number = 0;

            public constructor() { }

            ctor(x, y, z): boolean {
                this.x = x;
                this.y = y;
                this.z = z;
                return true;
            }

            distance(pos): number {
                var x = pos.x - this.x;
                var y = pos.y - this.y;
                var z = pos.z - this.z;
                return Math.sqrt(x * x + y * y + z * z);
            }

            //向量加法
            add(vec3): Vector3 {
                this.x += vec3.x;
                this.y += vec3.y;
                this.z += vec3.z;
                return this;
            }

            //向量减法
            sub(vec3): Vector3 {
                this.x -= vec3.x;
                this.y -= vec3.y;
                this.z -= vec3.z;
                return this;
            }

            //向量乘法
            mul(num): Vector3 {
                this.x *= num;
                this.y *= num;
                this.z *= num;
                return this;
            }

            //向量除法
            div(num): Vector3 {
                this.x /= num;
                this.y /= num;
                this.z /= num;
                return this;
            }

            // 向量取反
            neg(): Vector3 {
                this.x = -this.x;
                this.y = -this.y;
                this.z = -this.z;
                return this;
            }
        }

        //四维向量，颜色
        export class Vector4 implements IVector4 {

            public x: number = 0;
            public y: number = 0;
            public z: number = 0;
            public w: number = 0;

            public constructor() { }

            ctor(x, y, z, w): boolean {
                this.x = x;
                this.y = y;
                this.z = z;
                this.w = w;
                return true;
            }

            distance(pos): number {
                var x = pos.x - this.x;
                var y = pos.y - this.y;
                var z = pos.z - this.z;
                var w = pos.w - this.w;
                return Math.sqrt(x * x + y * y + z * z + w * w);
            }

            add(vec4): Vector4 {
                this.x += vec4.x;
                this.y += vec4.y;
                this.z += vec4.z;
                this.w += vec4.w;
                return this;
            }

            sub(vec4): Vector4 {
                this.x -= vec4.x;
                this.y -= vec4.y;
                this.z -= vec4.z;
                this.w -= vec4.w;
                return this;
            }

            mul(num): Vector4 {
                this.x *= num;
                this.y *= num;
                this.z *= num;
                this.w *= num;
                return this;
            }

            div(num): Vector4 {
                this.x /= num;
                this.y /= num;
                this.z /= num;
                this.w /= num;
                return this;
            }

            neg(): Vector4 {
                this.x = -this.x;
                this.y = -this.y;
                this.z = -this.z;
                this.w = -this.w;
                return this;
            }
        }

        //数值限制在一个给定的区间
        export function clampf(value: number, min_inclusive: number, max_inclusive: number): number {
            if (min_inclusive > max_inclusive) {
                var temp = min_inclusive;
                min_inclusive = max_inclusive;
                max_inclusive = temp;
            }
            return value < min_inclusive ? min_inclusive : value < max_inclusive ? value : max_inclusive;
        }

        export function int82angle(angle: number/*int8*/, half: boolean/*bool*/): number {
            return angle * (Math.PI / (half ? 254.0 : 128.0));
        }

        export function angle2int8(v: number/*float*/, half: boolean/*bool*/): number {
            var angle = 0;
            if (!half) {
                angle = Math.floor((v * 128.0) / Math.PI + 0.5);
            }
            else {
                angle = clampf(Math.floor((v * 254.0) / Math.PI + 0.5), -128.0, 127.0);
            }

            return angle;
        }

    }
}