//基本结构
                            ---  ICamera  单列 GetCamera
                            |
                            |
                            ---  ILevel  单列 GetLevel()
                            |
                            |
IApplication                ---  ISound  单列 GetSound()
                            |
                            |
                            ---- IObject 多列 CreateObject
                            |       |
                            |       |
                            |       ---- IObjectDynamic 多列 CreateObject
                            |
                            |
                            ---- 扩展




