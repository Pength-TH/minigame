using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;

public static class SkillStyles
{
    public static GUIStyle tickStyleRight;
    public static GUIStyle tickStyleLeft;
    public static GUIStyle tickStyleCenter;

    public static GUIStyle preSlider;
    public static GUIStyle preSliderThumb;
    public static GUIStyle preButton;
    public static GUIStyle preDropdown;

    public static GUIStyle preLabel;
    public static GUIStyle hueCenterCursor;
    public static GUIStyle hueRangeCursor;

    public static GUIStyle centeredBoldLabel;
    public static GUIStyle wheelThumb;
    public static Vector2 wheelThumbSize;

    public static GUIStyle header;
    public static GUIStyle headerCheckbox;
    public static GUIStyle headerFoldout;

    public static Texture2D playIcon;
    public static Texture2D checkerIcon;
    public static Texture2D paneOptionsIcon;
    public static Texture2D addIcon;
    public static Texture2D minusIcon;

    public static GUIStyle centeredMiniLabel;



    static SkillStyles()
    {
        tickStyleRight = new GUIStyle("Label")
        {
            alignment = TextAnchor.MiddleRight,
            fontSize = 9
        };

        tickStyleLeft = new GUIStyle("Label")
        {
            alignment = TextAnchor.MiddleLeft,
            fontSize = 9
        };

        tickStyleCenter = new GUIStyle("Label")
        {
            alignment = TextAnchor.MiddleCenter,
            fontSize = 9
        };

        preSlider = new GUIStyle("PreSlider");
        preSliderThumb = new GUIStyle("PreSliderThumb");
        preButton = new GUIStyle("PreButton");
        preDropdown = new GUIStyle("preDropdown");

        preLabel = new GUIStyle("ShurikenLabel");

        hueCenterCursor = new GUIStyle("ColorPicker2DThumb")
        {
            normal = { background = (Texture2D)EditorGUIUtility.LoadRequired("Builtin Skins/DarkSkin/Images/ShurikenPlus.png") },
            fixedWidth = 6,
            fixedHeight = 6
        };

        hueRangeCursor = new GUIStyle(hueCenterCursor)
        {
            normal = { background = (Texture2D)EditorGUIUtility.LoadRequired("Builtin Skins/DarkSkin/Images/CircularToggle_ON.png") }
        };

        wheelThumb = new GUIStyle("ColorPicker2DThumb");

        centeredBoldLabel = new GUIStyle(GUI.skin.GetStyle("Label"))
        {
            alignment = TextAnchor.UpperCenter,
            fontStyle = FontStyle.Bold
        };

        centeredMiniLabel = new GUIStyle(EditorStyles.centeredGreyMiniLabel)
        {
            alignment = TextAnchor.UpperCenter
        };

        wheelThumbSize = new Vector2(
                !Mathf.Approximately(wheelThumb.fixedWidth, 0f) ? wheelThumb.fixedWidth : wheelThumb.padding.horizontal,
                !Mathf.Approximately(wheelThumb.fixedHeight, 0f) ? wheelThumb.fixedHeight : wheelThumb.padding.vertical
                );

        header = new GUIStyle("ShurikenModuleTitle")
        {
            font = (new GUIStyle("Label")).font,
            border = new RectOffset(15, 7, 4, 4),
            fixedHeight = 22,
            contentOffset = new Vector2(20f, -2f)
        };

        headerCheckbox = new GUIStyle("ShurikenCheckMark");
        headerFoldout = new GUIStyle("Foldout");

        playIcon = (Texture2D)EditorGUIUtility.LoadRequired("Builtin Skins/DarkSkin/Images/IN foldout act.png");
        checkerIcon = (Texture2D)EditorGUIUtility.LoadRequired("Icons/CheckerFloor.png");

        if (EditorGUIUtility.isProSkin)
            paneOptionsIcon = (Texture2D)EditorGUIUtility.LoadRequired("Builtin Skins/DarkSkin/Images/pane options.png");
        else
            paneOptionsIcon = (Texture2D)EditorGUIUtility.LoadRequired("Builtin Skins/LightSkin/Images/pane options.png");

        addIcon = (Texture2D)EditorGUIUtility.LoadRequired("Builtin Skins/DarkSkin/Images/pane options.png");
        minusIcon = (Texture2D)EditorGUIUtility.LoadRequired("Icons/CheckerFloor.png");
    }
}

[Serializable]
public enum ElementType
{
    et_default = 0,
    et_effect = et_default,
    et_camera,
    et_caster,
    et_mouse_actor,
    et_player,
    et_level,
    et_sound,
    et_target,
    et_end
}
[Serializable]
public class Base
{
    //绑定时间
    public float mBindTime;
    public bool bEnable;
    public int index;
    public string mName;

    public bool bDestory;

    public float updateTime;
    public bool bStop;

    public string waringHelp;
    public bool bShowHelp = false;

    [SerializeField]
    public ElementType mElementType;
    [SerializeField]
    public ControlSystem mSkill;

    public Base()
    {
        mBindTime = 0.0f;
        bEnable = false;
        index = 0;
        mElementType = ElementType.et_default;
        mName = "";
        mSkill = null;
        bDestory = false;
    }

    public virtual string ToJsonString()
    {
        return "";
    }

    //----------------------------------------------------------------
    //----------------------------------------------------------------
    //----------------------------------------------------------------
    protected bool bShowItem = false;
    public virtual void OnInspectorGUI()
    {
        bShowItem = mSkill.Header(mName, bShowItem, ref bEnable, index);
    }

    public virtual void OnLogic()
    {

    }

    public virtual void Play()
    {
        updateTime = 0;
        bStop = false;
    }
    public virtual void Stop()
    {
        updateTime = 0;
        bStop = true;
    }

    public virtual void Update(Transform ts)
    {

    }
}
[Serializable]
public class Effect : Base
{
    //生命周期
    public float mLifeTime = 0;
    //跟随父节点移动
    public bool mFPosition = false;
    //继承父节点旋转
    public bool mFRotation = false;
    //继承父节点缩放
    public bool mFScale = false;
    //绑定位置
    public string mBindPoint = "origin";
    public float mDelayRemove = 0;

    public Vector3 localPosition = new Vector3(0, 0, 0);
    public Vector3 localRotation = new Vector3(0, 0, 0);
    public Vector3 Localscale = new Vector3(1, 1, 1);

    public GameObject particleSystem = null;
    public GameObject bindPoint = null;

    //update logic
    private bool bBinded = false;
    private GameObject cloneGameObject = null;
    private Transform dummyGameObject = null;
    private bool bUpdateOnePos = false;
    private bool bUpdateOneRotation = false;
    private bool bUpdateOneScale = false;
    private float mUpdateLifeTime = 0;

    public Effect()
    {
        mName = "Effect";
        mElementType = ElementType.et_effect;
    }

    public override string ToJsonString()
    {
        string json = "";
        json += "{\n";
        json += "\t\t\t'life time':" + mLifeTime.ToString() + ",\n";
        json += "\t\t\t'bind time':" + mBindTime.ToString() + ",\n";
        json += "\t\t\t'bind point':" + mBindPoint + ",\n";
        json += "\t\t\t'local position':" + mFPosition.ToString() + ",\n";
        json += "\t\t\t'local rotation':" + mFRotation.ToString() + ",\n";
        json += "\t\t\t'local scale':" + mFScale.ToString() + ",\n";
        json += "\t\t\t'url':" + particleSystem == null ? "" : particleSystem.name + "\n";
        json += "}";
        return json;
    }

    public override void OnInspectorGUI()
    {
        base.OnInspectorGUI();

        if (bShowItem == false)
            return;

        EditorGUILayout.BeginVertical();

        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("LifeTime");
        mLifeTime = EditorGUILayout.Slider(mLifeTime, 0, 10);
        EditorGUILayout.EndHorizontal();

        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("BindTime");
        mBindTime = EditorGUILayout.Slider(mBindTime, 0, 10);
        EditorGUILayout.EndHorizontal();

        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("BindPoint");
        bindPoint = (GameObject)EditorGUILayout.ObjectField(bindPoint, typeof(GameObject), true);
        EditorGUILayout.EndHorizontal();

        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("BindPoint");
        mBindPoint = EditorGUILayout.TextField(mBindPoint);
        EditorGUILayout.EndHorizontal();

        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("LocalPosition");
        mFPosition = EditorGUILayout.Toggle(mFPosition);
        EditorGUILayout.EndHorizontal();

        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("LocalRotation");
        mFRotation = EditorGUILayout.Toggle(mFRotation);
        EditorGUILayout.EndHorizontal();

        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("LocalScale");
        mFScale = EditorGUILayout.Toggle(mFScale);
        EditorGUILayout.EndHorizontal();

        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Position");
        localPosition = EditorGUILayout.Vector3Field("", localPosition, null);
        EditorGUILayout.EndHorizontal();

        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Rotation");
        localRotation = EditorGUILayout.Vector3Field("", localRotation, null);
        EditorGUILayout.EndHorizontal();

        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Scale");
        Localscale = EditorGUILayout.Vector3Field("", Localscale, null);
        EditorGUILayout.EndHorizontal();

        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Delay Remove");
        mDelayRemove = EditorGUILayout.Slider(mDelayRemove, 0, 10);
        EditorGUILayout.EndHorizontal();

        EditorGUILayout.Space();

        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Particle System");
        particleSystem = (GameObject)EditorGUILayout.ObjectField(particleSystem, typeof(GameObject), true);
        EditorGUILayout.EndHorizontal();

        if (bShowHelp)
            EditorGUILayout.HelpBox(waringHelp, MessageType.Error);

        EditorGUILayout.EndVertical();

    }
    public override void OnLogic()
    {
        base.OnLogic();

        if (particleSystem && particleSystem.name == mSkill.gameObject.name)
        {
            waringHelp = "名字不能一样.";
            bShowHelp = true;
        }
        else
            bShowHelp = false;

        if (bindPoint != null)
        {
            mBindPoint = bindPoint.name;
        }
    }
    public override void Play()
    {
        base.Play();
        bBinded = false;

        GameObject.DestroyImmediate(cloneGameObject);
        cloneGameObject = null;
        if (mSkill.owner != null)
            dummyGameObject = mSkill.getChild(mBindPoint, mSkill.owner);

        bUpdateOnePos = mFPosition;
        bUpdateOneRotation = mFRotation;
        bUpdateOneScale = mFScale;

        mUpdateLifeTime = 0;
    }
    public override void Update(Transform ts)
    {
        updateTime += UnityEngine.Time.deltaTime;
        if (bBinded)
            mUpdateLifeTime += UnityEngine.Time.deltaTime;

        /** 开始绑定 */
        if (updateTime > mBindTime && bBinded == false)
        {
            bBinded = true;
            cloneGameObject = mSkill.Clone(particleSystem);
        }

        /** 到达生命周期 */
        if (mUpdateLifeTime > mLifeTime && bStop == false)
        {
            GameObject.DestroyImmediate(cloneGameObject);
            cloneGameObject = null;
            bStop = true;
        }

        /** 更新处理 */
        if (bBinded && bStop == false)
        {
            if (dummyGameObject && cloneGameObject)
            {
                if (mFPosition == bUpdateOnePos) /** 保持本地,只会更新一次 */
                {
                    cloneGameObject.transform.localPosition = dummyGameObject.transform.TransformPoint(localPosition);
                    if (bUpdateOnePos == true)
                        bUpdateOnePos = false;
                }
                if (mFRotation == bUpdateOneRotation) /** 保持本地,只会更新一次 */
                {
                    cloneGameObject.transform.localEulerAngles = dummyGameObject.transform.TransformDirection(localRotation);
                    if (bUpdateOneRotation == true)
                        bUpdateOneRotation = false;
                }
                if (mFScale == bUpdateOneScale) /** 保持本地,只会更新一次 */
                {
                    cloneGameObject.transform.localScale = dummyGameObject.transform.localScale;
                    if (bUpdateOneScale == true)
                        bUpdateOneScale = false;
                }
            }
            else
            {
                if (mFPosition == bUpdateOnePos) /** 保持本地,只会更新一次 */
                {
                    cloneGameObject.transform.position = mSkill.owner.transform.TransformPoint(localPosition);
                    if (bUpdateOnePos == true)
                        bUpdateOnePos = false;
                }
                if (mFRotation == bUpdateOneRotation) /** 保持本地,只会更新一次 */
                {
                    cloneGameObject.transform.rotation = mSkill.owner.transform.rotation;
                    if (bUpdateOneRotation == true)
                        bUpdateOneRotation = false;
                }
                if (mFScale == bUpdateOneScale) /** 保持本地,只会更新一次 */
                {
                    cloneGameObject.transform.localScale = mSkill.owner.transform.localScale;
                    if (bUpdateOneScale == true)
                        bUpdateOneScale = false;
                }
            }

            if (mFPosition == true)
            {

            }

        }
    }
}

[Serializable]
public class Cameraer : Base
{
    public float shakeDistance;
    public float shakeRange;
    public int shakeCount;

    //logic
    bool mStartVib = false;
    bool m_bCurDirIsUp = false;
    float m_fCurBias = 0;
    float m_fBiasStep = 0;
    int mCurrentShakeCount = 0;
    Transform mCamera;
    Vector3 mOldPosition;
    Vector3 mPosition;

    public Cameraer()
    {
        mElementType = ElementType.et_camera;
        mName = "Camera";
    }

    public override void OnInspectorGUI()
    {
        base.OnInspectorGUI();

        if (bShowItem == false)
            return;

        EditorGUILayout.BeginVertical();

        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("BindTime");
        mBindTime = EditorGUILayout.Slider(mBindTime, 0, 10);
        EditorGUILayout.EndHorizontal();

        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Shake Distance");
        shakeDistance = EditorGUILayout.Slider(shakeDistance, 0, 5);
        EditorGUILayout.EndHorizontal();

        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Shake Range");
        shakeRange = EditorGUILayout.Slider(shakeRange, 0.001f, 2.000f);
        EditorGUILayout.EndHorizontal();

        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Shake Count");
        shakeCount = EditorGUILayout.IntSlider(shakeCount, 0, 10);
        EditorGUILayout.EndHorizontal();

        EditorGUILayout.EndVertical();
    }

    public override void Play()
    {
        updateTime = 0;
        mCurrentShakeCount = 0;
        m_fCurBias = 0;
        m_fBiasStep = shakeRange;
        m_bCurDirIsUp = false;
        if (Camera.main)
        {
            if (mCamera)
                mCamera.position = mOldPosition;

            mCamera = Camera.main.transform;
            mPosition = mCamera.position;
            mOldPosition = mPosition;
        }
        else
            mCamera = null;
    }
    public override void Update(Transform ts)
    {
        updateTime += UnityEngine.Time.deltaTime;
        if (updateTime > mBindTime)
            mStartVib = true;

        if (!mStartVib)
            return;

        if (this.mCurrentShakeCount >= shakeCount)
        {
            this.mStartVib = false;
            mCamera.position = mOldPosition;
            return;
        }

        this.m_fCurBias += this.m_fBiasStep;

        if (!this.m_bCurDirIsUp && this.m_fCurBias > shakeDistance / 2)
        {
            this.m_bCurDirIsUp = true;
            this.m_fBiasStep = -shakeRange;

            this.mCurrentShakeCount++;
        }
        else if (this.m_bCurDirIsUp && this.m_fCurBias < -shakeDistance / 2)
        {
            this.m_bCurDirIsUp = false;
            this.m_fBiasStep = shakeRange;
        }

        if (mCamera)
        {
            mPosition.y = mOldPosition.y + this.m_fCurBias;
            mCamera.position = mPosition;
        }

    }
}
[Serializable]
public class Caster : Base
{
    public AnimationClip clip = null;
    public string animationName = "";
    private string _animationName = "";

    public float fadeInTime = 0;
    public float fadeOutTime = 0;
    public float scaleTime = 0;

    public Transform caster = null;
    public Animator animator = null;
    public Animation animation = null;


    //logic
    bool bPlay = false;
    bool bPlayOnce = false;

    public static int bNextCaster = 0;

    float startTime = 0;
    float animLength = 0;
    public Caster()
    {
        mElementType = ElementType.et_caster;
        mName = "Caster";
    }

    public override void OnInspectorGUI()
    {
        base.OnInspectorGUI();

        if (bShowItem == false)
            return;

        EditorGUILayout.BeginVertical();

        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("BindTime");
        mBindTime = EditorGUILayout.Slider(mBindTime, 0, 10);
        EditorGUILayout.EndHorizontal();

        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Animation Name");
        clip = (AnimationClip)EditorGUILayout.ObjectField("", clip, typeof(AnimationClip), true);
        EditorGUILayout.EndHorizontal();

        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Animation Name");
        _animationName = EditorGUILayout.TextField(_animationName);
        EditorGUILayout.EndHorizontal();

        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Animation Name");
        EditorGUILayout.LabelField(animationName);
        EditorGUILayout.EndHorizontal();

        EditorGUILayout.EndVertical();

    }

    public override void OnLogic()
    {
        if (clip != null)
        {
            animationName = clip.name;
            _animationName = animationName;
        }
        else if (_animationName != "")
            animationName = _animationName;

    }

    public override void Play()
    {
        base.Play();
        bPlay = true;

        caster = mSkill.owner;
        if (caster)
        {
            animator = caster.GetComponentInChildren<Animator>();
            if (animator)
            {
                animator.StopPlayback();
            }

            animation = caster.GetComponentInChildren<Animation>();
            if (animation)
                animation.Stop();
        }
        animLength = 0;
        bPlayOnce = true;
    }
    public override void Update(Transform ts)
    {
        if (!bPlay)
            return;

        updateTime += UnityEngine.Time.deltaTime;

        if (animator)
        {
            if (animLength == 0)
            {
                int k = animator.GetCurrentAnimatorClipInfoCount(0);
                for (int i = 0; i < k; i++)
                {
                    AnimatorClipInfo[] acis = animator.GetCurrentAnimatorClipInfo(i);
                    foreach (AnimatorClipInfo aci in acis)
                    {
                        if (aci.clip.name == animationName)
                            animLength = aci.clip.length;
                    }
                }
            }

            if (animLength != 0 && Time.time - startTime > animLength && Caster.bNextCaster == index)
            {
                animator.CrossFade("idle", 0.3f);
                bPlay = false;
            }
        }

        if (!bPlayOnce)
            return;

        if (updateTime > mBindTime && bPlayOnce)
        {
            bNextCaster = index;

            if (animator)
                animator.CrossFade(animationName, 0.3f);
            else if (animation)
                animation.CrossFade(animationName, 0.3f);

            startTime = Time.time;

            bPlayOnce = false;
        }
    }
}
[Serializable]
public class MouseActor : Base
{
    public MouseActor()
    {
        mElementType = ElementType.et_mouse_actor;
        mName = "MouseActor";
    }

    public override void OnInspectorGUI()
    {
        base.OnInspectorGUI();

        if (bShowItem == false)
            return;
    }
}
[Serializable]
public class Player : Base
{
    public Player()
    {
        mElementType = ElementType.et_player;
        mName = "Player";
    }

    public override void OnInspectorGUI()
    {
        base.OnInspectorGUI();

        if (bShowItem == false)
            return;
    }
}
[Serializable]
public class Level : Base
{
    public Level()
    {
        mElementType = ElementType.et_level;
        mName = "Level";
    }

    public override void OnInspectorGUI()
    {
        base.OnInspectorGUI();

        if (bShowItem == false)
            return;


    }
}
[Serializable]
public class Sound : Base
{
    public float volume;
    public string url;

    public AudioClip clipObj;

    GameObject go;
    public AudioSource audioSource;

    public Sound()
    {
        mElementType = ElementType.et_sound;
        mName = "Sound";
    }

    public override void OnInspectorGUI()
    {
        base.OnInspectorGUI();

        if (bShowItem == false)
            return;

        EditorGUILayout.BeginVertical();

        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("BindTime");
        mBindTime = EditorGUILayout.Slider(mBindTime, 0, 10);
        EditorGUILayout.EndHorizontal();

        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("Volume");
        volume = EditorGUILayout.Slider(volume, 0, 1);
        EditorGUILayout.EndHorizontal();

        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("url");
        clipObj = (AudioClip)EditorGUILayout.ObjectField(clipObj, typeof(AudioClip), true);
        EditorGUILayout.EndHorizontal();

        EditorGUILayout.EndVertical();

    }

    public override void Play()
    {
        base.Play();

        if (audioSource == null)
        {
            go = new GameObject("audio");
            go.transform.parent = mSkill.transform;
            audioSource = go.AddComponent<AudioSource>();
        }

        audioSource.Stop();
        audioSource.clip = clipObj;
        audioSource.playOnAwake = false;
        audioSource.volume = volume;
        audioSource.PlayDelayed(mBindTime);
    }
}

[Serializable]
public class Target : Base
{
    public Target()
    {
        mElementType = ElementType.et_target;
        mName = "Target";
    }

    public override void OnInspectorGUI()
    {
        base.OnInspectorGUI();

        if (bShowItem == false)
            return;

    }
}


[Serializable]
public class ControlSystem : MonoBehaviour
{
    //----------------------------------------------------------------
    //----------------------------------------------------------------
    //----------------------------------------------------------------
    //生命周期
    public float mLifeTime = 0;
    //延迟删除
    //public float mDelayRemove = 0;

    ////跟随父节点移动
    //public bool mFPosition = false;
    ////继承父节点旋转
    //public bool mFRotation = false;
    ////继承父节点缩放
    //public bool mFScale = false;

    //绑定位置
    //public string mBindPoint = "origin";
    //绑定时间      
    //public float mBindTime = 0.0f;

    public bool bEnable = true;
    public int index = 0;
    public string json = "";

    public List<Effect> effectElement = new List<Effect>();
    public List<Cameraer> cameraerElement = new List<Cameraer>();
    public List<Sound> soundElement = new List<Sound>();
    public List<Caster> casterElement = new List<Caster>();
    public List<MouseActor> mouseActorElement = new List<MouseActor>();
    public List<Player> playerElement = new List<Player>();
    public List<Level> levelElement = new List<Level>();
    public List<Target> targetElement = new List<Target>();

    public Transform owner = null;

    ControlSystem()
    {

    }
    void Awake()
    {
    }

    public Transform getChild(string mBindPoint, Transform ts)
    {
        Transform dummy = null;
        for (int i = 0; i < ts.childCount; i++)
        {
            Transform _ts = ts.GetChild(i);
            if (_ts.name == mBindPoint)
                dummy = _ts;
            else if (_ts.childCount != 0)
            {
                dummy = getChild(mBindPoint, _ts);
            }
            if (dummy != null)
                break;
        }
        return dummy;
    }


    public GameObject Clone(GameObject go)
    {
        GameObject _go = Instantiate(go, this.transform);
        return _go;
    }

    public void play()
    {
        _Play<Effect>(effectElement);
        _Play<Cameraer>(cameraerElement);
        _Play<Sound>(soundElement);
        _Play<Caster>(casterElement);
        _Play<MouseActor>(mouseActorElement);
        _Play<Player>(playerElement);
        _Play<Level>(levelElement);
        _Play<Target>(targetElement);
    }

    /**逻辑更新*/
    public void OnUpdate()
    {
        _Update<Effect>(effectElement);
        _Update<Cameraer>(cameraerElement);
        _Update<Sound>(soundElement);
        _Update<Caster>(casterElement);
        _Update<MouseActor>(mouseActorElement);
        _Update<Player>(playerElement);
        _Update<Level>(levelElement);
        _Update<Target>(targetElement);
    }

    public string ToJsonString()
    {
        json += "{\n";
        json += "\t'skill system':{\n";
        json += "\t'life time':" + mLifeTime.ToString() + ",\n";
        //json += "\t'bind time':" + mBindTime.ToString() + ",\n";
        //json += "\t'bind point':" + mBindPoint + ",\n";
        //json += "\t'delay remove':" + mDelayRemove.ToString() + ",\n";
        //json += "\t'local position':" + mFPosition.ToString() + ",\n";
        //json += "\t'local rotation':" + mFRotation.ToString() + ",\n";
        //json += "\t'local scale':" + mFScale.ToString() + ",\n";
        json += "\t'element': {\n";
        json += "\t\t'effect': [";

        for (int i = 0; i < effectElement.Count; i++)
        {
            Base _baseElement = effectElement[i];
            if (_baseElement.mElementType == ElementType.et_effect)
                json += _baseElement.ToJsonString() + ",\n";
        }
        json = json.Substring(0, json.Length - 1) + "\n]\n";

        json += "\t\t'camera': [";
        for (int i = 0; i < cameraerElement.Count; i++)
        {
            Base _baseElement = cameraerElement[i];
            if (_baseElement.mElementType == ElementType.et_camera)
                json += _baseElement.ToJsonString() + ",\n";
        }
        json = json.Substring(0, json.Length - 1) + "\n]\n";

        json += "\t\t'sound': [";
        for (int i = 0; i < soundElement.Count; i++)
        {
            Base _baseElement = soundElement[i];
            if (_baseElement.mElementType == ElementType.et_sound)
                json += _baseElement.ToJsonString() + ",\n";
        }
        json = json.Substring(0, json.Length - 1) + "\n]\n";

        return "";
    }
    public void ReadJson()
    {

    }

    public int AddElement(ElementType et)
    {
        index++;

        if (et == ElementType.et_effect)
        {
            Effect _effect = new Effect();
            _effect.index = index;
            _effect.mSkill = this;

            effectElement.Add(_effect);
        }

        if (et == ElementType.et_camera)
        {
            Cameraer _effect = new Cameraer();
            _effect.index = index;
            _effect.mSkill = this;

            cameraerElement.Add(_effect);
        }
        if (et == ElementType.et_caster)
        {
            Caster _effect = new Caster();
            _effect.index = index;
            _effect.mSkill = this;

            casterElement.Add(_effect);
        }
        if (et == ElementType.et_mouse_actor)
        {
            MouseActor _effect = new MouseActor();
            _effect.index = index;
            _effect.mSkill = this;

            mouseActorElement.Add(_effect);
        }
        if (et == ElementType.et_player)
        {
            Player _effect = new Player();
            _effect.index = index;
            _effect.mSkill = this;

            playerElement.Add(_effect);
        }
        if (et == ElementType.et_level)
        {
            Level _effect = new Level();
            _effect.index = index;
            _effect.mSkill = this;

            levelElement.Add(_effect);
        }
        if (et == ElementType.et_sound)
        {
            Sound _effect = new Sound();
            _effect.index = index;
            _effect.mSkill = this;

            soundElement.Add(_effect);
        }
        if (et == ElementType.et_target)
        {
            Target _effect = new Target();
            _effect.index = index;
            _effect.mSkill = this;

            targetElement.Add(_effect);
        }

        return index;
    }
    void RemoveElement(int __index)
    {
        _RemoveElement<Effect>(effectElement, __index);
        _RemoveElement<Cameraer>(cameraerElement, __index);
        _RemoveElement<Sound>(soundElement, __index);
        _RemoveElement<Caster>(casterElement, __index);
        _RemoveElement<MouseActor>(mouseActorElement, __index);
        _RemoveElement<Player>(playerElement, __index);
        _RemoveElement<Level>(levelElement, __index);
        _RemoveElement<Target>(targetElement, __index);
    }
    void _RemoveElement<T>(List<T> lists, int __index) where T : Base
    {
        for (int i = 0; i < lists.Count; i++)
        {
            T _base = lists[i];

            if (_base != null && _base.index == __index)
            {
                _base.bDestory = true;
            }
        }
    }

    //------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------
    bool mSystemFlag = false;
    Dictionary<string, GUIContent> s_GUIContentCache = new Dictionary<string, GUIContent>();
    public GUIContent GetContent(string textAndTooltip)
    {
        if (string.IsNullOrEmpty(textAndTooltip))
            return GUIContent.none;

        GUIContent content;

        if (!s_GUIContentCache.TryGetValue(textAndTooltip, out content))
        {
            var s = textAndTooltip.Split('|');
            content = new GUIContent(s[0]);

            if (s.Length > 1 && !string.IsNullOrEmpty(s[1]))
                content.tooltip = s[1];

            s_GUIContentCache.Add(textAndTooltip, content);
        }

        return content;
    }
    public bool Header(string title, bool flag, ref bool bEnable, int index, bool bTop = false)
    {
        EditorGUILayout.Space();

        var rect = GUILayoutUtility.GetRect(16f, 22f, SkillStyles.header);
        GUI.Box(rect, title, SkillStyles.header);

        var toggleRect = new Rect(rect.x + 4f, rect.y + 4f, 13f, 13f);
        var e = Event.current;

        var display = flag;
        var addRect = new Rect(rect.x + rect.width - SkillStyles.addIcon.width - 5f, rect.y + SkillStyles.addIcon.height / 2f + 1f, SkillStyles.addIcon.width, SkillStyles.addIcon.height);
        //if (bTop)
        GUI.DrawTexture(addRect, SkillStyles.paneOptionsIcon);

        if (e.type == EventType.Repaint && bTop == false)
            SkillStyles.headerCheckbox.Draw(toggleRect, false, false, bEnable, false);

        if (e.type == EventType.MouseDown)
        {
            const float kOffset = 2f;
            toggleRect.x -= kOffset;
            toggleRect.y -= kOffset;
            toggleRect.width += kOffset * 2f;
            toggleRect.height += kOffset * 2f;

            if (toggleRect.Contains(e.mousePosition) && bTop == false)
            {
                bEnable = !bEnable;

                e.Use();
            }
            else if (addRect.Contains(e.mousePosition))
            {
                var popup = new GenericMenu();
                if (bTop)
                {
                    popup.AddItem(GetContent("Effect"), false, () => OnMenu(ElementType.et_effect));
                    popup.AddItem(GetContent("Camera"), false, () => OnMenu(ElementType.et_camera));
                    popup.AddItem(GetContent("Caster"), false, () => OnMenu(ElementType.et_caster));
                    popup.AddItem(GetContent("MouseActor"), false, () => OnMenu(ElementType.et_mouse_actor));
                    popup.AddItem(GetContent("Player"), false, () => OnMenu(ElementType.et_player));
                    popup.AddItem(GetContent("Level"), false, () => OnMenu(ElementType.et_level));
                    popup.AddItem(GetContent("Sound"), false, () => OnMenu(ElementType.et_sound));
                    popup.AddItem(GetContent("Target"), false, () => OnMenu(ElementType.et_target));

                }
                else
                {
                    popup.AddItem(GetContent("Remove"), false, () => RemoveElement(index));
                }

                popup.ShowAsContext();
            }
            else if (rect.Contains(e.mousePosition))
            {
                display = !display;

                e.Use();
            }
        }
        return display;
    }
    void OnMenu(ElementType et)
    {
        AddElement(et);
    }
    public void OnInspectorGUI()
    {
        mSystemFlag = Header(this.gameObject.name, mSystemFlag, ref bEnable, 0, true);

        if (mSystemFlag)
        {
            EditorGUILayout.BeginVertical();

            EditorGUILayout.BeginHorizontal();
            EditorGUILayout.LabelField("LifeTime");
            mLifeTime = EditorGUILayout.Slider(mLifeTime, 0, 10);
            EditorGUILayout.EndHorizontal();

            //EditorGUILayout.BeginHorizontal();
            //EditorGUILayout.LabelField("BindTime");
            //mBindTime = EditorGUILayout.Slider(mBindTime, 0, 10);
            //EditorGUILayout.EndHorizontal();

            //EditorGUILayout.BeginHorizontal();
            //EditorGUILayout.LabelField("BindPoint");
            //mBindPoint = EditorGUILayout.TextField(mBindPoint);
            //EditorGUILayout.EndHorizontal();

            //EditorGUILayout.BeginHorizontal();
            //EditorGUILayout.LabelField("DelayRemove");
            //mDelayRemove = EditorGUILayout.Slider(mDelayRemove, 0, 10);
            //EditorGUILayout.EndHorizontal();

            //EditorGUILayout.BeginHorizontal();
            //EditorGUILayout.LabelField("LocalPosition");
            //mFPosition = EditorGUILayout.Toggle(mFPosition);
            //EditorGUILayout.EndHorizontal();

            //EditorGUILayout.BeginHorizontal();
            //EditorGUILayout.LabelField("LocalRotation");
            //mFRotation = EditorGUILayout.Toggle(mFRotation);
            //EditorGUILayout.EndHorizontal();

            //EditorGUILayout.BeginHorizontal();
            //EditorGUILayout.LabelField("LocalScale");
            //mFScale = EditorGUILayout.Toggle(mFScale);
            //EditorGUILayout.EndHorizontal();

            EditorGUILayout.EndVertical();
        }

        UpdateElement();
        DestoryElement();
    }

    public void UpdateElement()
    {
        _UpdateElement<Effect>(effectElement);
        _UpdateElement<Cameraer>(cameraerElement);
        _UpdateElement<Sound>(soundElement);
        _UpdateElement<Caster>(casterElement);
        _UpdateElement<MouseActor>(mouseActorElement);
        _UpdateElement<Player>(playerElement);
        _UpdateElement<Level>(levelElement);
        _UpdateElement<Target>(targetElement);
    }
    void _UpdateElement<T>(List<T> lists) where T : Base
    {
        for (int i = 0; i < lists.Count; i++)
        {
            T _base = lists[i];
            if (_base != null)
            {
                _base.OnInspectorGUI();
                _base.OnLogic();
            }
        }
    }

    void _Play<T>(List<T> lists) where T : Base
    {
        for (int i = 0; i < lists.Count; i++)
        {
            T _base = lists[i];
            if (_base != null && _base.bEnable == true)
            {
                _base.Play();
            }
        }
    }

    public void DestoryElement()
    {
        _DestoryElement<Effect>(effectElement);
        _DestoryElement<Cameraer>(cameraerElement);
        _DestoryElement<Sound>(soundElement);
        _DestoryElement<Caster>(casterElement);
        _DestoryElement<MouseActor>(mouseActorElement);
        _DestoryElement<Player>(playerElement);
        _DestoryElement<Level>(levelElement);
        _DestoryElement<Target>(targetElement);

    }
    void _DestoryElement<T>(List<T> lists) where T : Base
    {
        for (int i = lists.Count; i > 0;)
        {
            i--;
            T _base = lists[i];
            if (_base != null && _base.bDestory == true)
            {
                lists.RemoveAt(i);
                break;
            }
        }
    }
    void _Update<T>(List<T> lists) where T : Base
    {
        for (int i = 0; i < lists.Count; i++)
        {
            T _base = lists[i];
            if (_base != null && _base.bEnable == true)
            {
                _base.Update(this.transform);
            }
        }
    }
}