using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
public class ControlSystemHelper : MonoBehaviour
{
    Transform caster = null;
    Transform skill = null;

    bool bUpdate = false;
    ControlSystem skillSystem;

    public float r; //半径
    public float w; //角度
    public float speed;
    public Vector3 pos;

    void Awake()
    {
        caster = this.transform.GetChild(0);
        if (caster == null)
            return;

        GameObject _skill = GameObject.Find("Skill");
        if (_skill)
            skill = _skill.transform.GetChild(0);
        if (skill)
        {
            skillSystem = skill.GetComponent<ControlSystem>();
            skillSystem.owner = caster;
        }

        bUpdate = false;

        r = 2;
        w = 0.3f;
        speed = 0.5f;
        pos = caster.position;
    }

    void Play()
    {
        if (skill && caster)
        {
            bUpdate = true;
            skillSystem.play();
        }
    }

    void Stop()
    {

    }

    void Update()
    {
        if (bUpdate)
        {
            skillSystem.OnUpdate();
        }

        if (mMoving && caster)
        {
            w += speed * Time.deltaTime; // 
            pos.x = Mathf.Cos(w) * r;
            pos.z = Mathf.Sin(w) * r;
            caster.transform.position = pos;
        }
    }

    void OnGUI()
    {

        if (GUI.Button(new Rect(100, 100, 50, 30), "Play"))
        {
            Play();
        }

    }

    bool mMoving = false;
    public void OnInspectorGUI()
    {
        EditorGUILayout.HelpBox("Player目录下的第一个节点为:施放主体.\n Enemy目录下的为敌人.\nSkill 目录下的为技能.", MessageType.Info);
        mMoving = EditorGUILayout.Toggle("移动", mMoving);
        speed = EditorGUILayout.Slider(speed, 0, 2);
    }
}
