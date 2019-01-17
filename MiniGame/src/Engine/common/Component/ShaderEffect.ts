module MeltEngine {

    export class ShaderEffect extends Base.Component {
      /*-----------------------------------------------------------------------------------------
        |   |   |   |   |   |   |   |   |   Shader 实现的效果
        -----------------------------------------------------------------------------------------*/
        
        /**
         * 淡入
         * @param {number} fTime 
         * @memberof ShaderEffect
         */
        FadeIn(fTime: number): void  {

        }
        
        /**
         * 淡出
         * @param {number} fTime 
         * @memberof ShaderEffect
         */
        FadeOut(fTime: number): void  {

        }

        /**
         * 被鼠标选中状态
         * @param {boolean} bHover 
         * @param {Vector3} vColor 
         * @param {number} [crisperdingWidth] 
         * @memberof ShaderEffect
         */
        SetMouseHover(bHover: boolean, vColor: Base.Vector3, crisperdingWidth?: number): void  {

        }
        
        /**
         * 被击中的颜色
         * @param {Vector3} vColor 
         * @param {number} [fTime] 
         * @memberof ShaderEffect
         */
        SetHitColor(vColor: Base.Vector3, fTime?: number): void  {

        }

        /**
         * 边缘光颜色
         * @param {Vector3} vColor 
         * @param {number} fTime 
         * @param {number} [power] 
         * @memberof ShaderEffect
         */
        SetEdgeColor(vColor: Base.Vector3, fTime: number, power?: number): void  {

        }
    }
}