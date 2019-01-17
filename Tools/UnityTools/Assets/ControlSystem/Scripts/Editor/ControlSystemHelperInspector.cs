using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;

namespace DigitGameApp.EarthEditor
{
    [CustomEditor(typeof(ControlSystemHelper))]
    public class ControlSystemHelperInspector : Editor
    {
        ControlSystemHelper _skill_component = null;

        void OnEnable()
        {
            _skill_component = target as ControlSystemHelper;

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