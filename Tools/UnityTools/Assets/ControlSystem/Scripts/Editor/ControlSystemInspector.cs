using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;

namespace DigitGameApp.EarthEditor
{
    [CustomEditor(typeof(ControlSystem))]
    public class ControlSystemInspector : Editor
    {
        ControlSystem _skill_component = null;

        void OnEnable()
        {
            _skill_component = target as ControlSystem;

        }
        bool skill_system_click = false;
        bool skill_effect_click = false;

        public override void OnInspectorGUI()
        {
            if (_skill_component)
                _skill_component.OnInspectorGUI();
        }
    }
}