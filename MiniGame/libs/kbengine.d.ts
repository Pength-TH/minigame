
declare module KBEngine {

    class Event {
        register(evtName, classinst, strCallback);
        deregister(evtName, classinst);
        fire();
    }
    /*-----------------------------------------------------------------------------------------
                                                    math
    -----------------------------------------------------------------------------------------*/
    class Vector2 {
        ctor(x: number, y: number): boolean;
        distance(pos);
        add(vec3);
        sub(vec3);
        mul(num);
        div(num);
        neg();
    }

    class Vector3 {
        ctor(x: number, y: number, z: number);
        distance(pos);
        add(vec3);
        sub(vec3);
        mul(num);
        div(num);
        neg();
    }

    class Vector4 {
        ctor(x: number, y: number, z: number, w: number);
        distance(pos);
        add(vec4);
        sub(vec4);
        mul(num);
        div(num);
        neg();
    }

    /*-----------------------------------------------------------------------------------------
												entity
-----------------------------------------------------------------------------------------*/
    class Entity {
        ctor();
        __init__n();
        callPropertysSetMethods();
        onDestroy();
        onControlled(bIsControlled);
        isPlayer();
        baseCall();
        cellCall();
        enterWorld();
        onEnterWorld();
        leaveWorld();
        onLeaveWorld();
        enterSpace();
        onEnterSpace();
        leaveSpace();
        onLeaveSpace();
        set_position(old);
        onUpdateVolatileData();
        set_direction(old);
    }

    class EntityCall {
        isBase();
        isCell();
        newCall();
        sendCall(bundle);
    }

    class KBEngineArgs {
        public ip: string;
        public port: number;
        public updateHZ: number;
        public serverHeartbeatTick: number;
        public clientType: number;
        public isOnInitCallPropertysSetMethods: boolean;
    }


    /*-----------------------------------------------------------------------------------------
                                                    entitydef
    -----------------------------------------------------------------------------------------*/
    class DATATYPE_UINT8 {
        bind();
        createFromStream(stream): any;
        addToStream(stream, v);
        parseDefaultValStr(v): number;
        isSameType(v): boolean;
    }
    class DATATYPE_UINT16 {
        bind();
        createFromStream(stream): any;
        addToStream(stream, v);
        parseDefaultValStr(v): number;
        isSameType(v): boolean;
    }
    class DATATYPE_UINT32 {
        bind();
        createFromStream(stream): any;
        addToStream(stream, v);
        parseDefaultValStr(v): number;
        isSameType(v): boolean;
    }
    class DATATYPE_UINT64 {
        bind();
        createFromStream(stream): any;
        addToStream(stream, v);
        parseDefaultValStr(v): number;
        isSameType(v): boolean;
    }
    class DATATYPE_INT8 {
        bind();
        createFromStream(stream): any;
        addToStream(stream, v);
        parseDefaultValStr(v): number;
        isSameType(v): boolean;
    }
    class DATATYPE_INT16 {
        bind();
        createFromStream(stream): any;
        addToStream(stream, v);
        parseDefaultValStr(v): number;
        isSameType(v): boolean;
    }
    class DATATYPE_INT32 {
        bind();
        createFromStream(stream): any;
        addToStream(stream, v);
        parseDefaultValStr(v): number;
        isSameType(v): boolean;
    }
    class DATATYPE_INT64 {
        bind();
        createFromStream(stream): any;
        addToStream(stream, v);
        parseDefaultValStr(v): number;
        isSameType(v): boolean;
    }
    class DATATYPE_FLOAT {
        bind();
        createFromStream(stream): any;
        addToStream(stream, v);
        parseDefaultValStr(v): number;
        isSameType(v): boolean;
    }
    class DATATYPE_DOUBLE {
        bind();
        createFromStream(stream): any;
        addToStream(stream, v);
        parseDefaultValStr(v): number;
        isSameType(v): boolean;
    }
    class DATATYPE_STRING {
        bind();
        createFromStream(stream): any;
        addToStream(stream, v);
        parseDefaultValStr(v): number;
        isSameType(v): boolean;
    }
    class DATATYPE_VECTOR2 {
        bind();
        createFromStream(stream): any;
        addToStream(stream, v);
        parseDefaultValStr(v): number;
        isSameType(v): boolean;
    }
    class DATATYPE_VECTOR3 {
        bind();
        createFromStream(stream): any;
        addToStream(stream, v);
        parseDefaultValStr(v): number;
        isSameType(v): boolean;
    }
    class DATATYPE_VECTOR4 {
        bind();
        createFromStream(stream): any;
        addToStream(stream, v);
        parseDefaultValStr(v): number;
        isSameType(v): boolean;
    }
    class DATATYPE_PYTHON {
        bind();
        createFromStream(stream): any;
        addToStream(stream, v);
        parseDefaultValStr(v): number;
        isSameType(v): boolean;
    }
    class DATATYPE_UNICODE {
        bind();
        createFromStream(stream): any;
        addToStream(stream, v);
        parseDefaultValStr(v): number;
        isSameType(v): boolean;
    }
    class DATATYPE_ENTITYCALL {
        bind();
        createFromStream(stream): any;
        addToStream(stream, v);
        parseDefaultValStr(v): number;
        isSameType(v): boolean;
    }
    class DATATYPE_BLOB {
        bind();
        createFromStream(stream): any;
        addToStream(stream, v);
        parseDefaultValStr(v): number;
        isSameType(v): boolean;
    }
    class DATATYPE_ARRAY {
        bind();
        createFromStream(stream): any;
        addToStream(stream, v);
        parseDefaultValStr(v): number;
        isSameType(v): boolean;
    }
    class DATATYPE_FIXED_DICT {
        bind();
        createFromStream(stream): any;
        addToStream(stream, v);
        parseDefaultValStr(v): number;
        isSameType(v): boolean;
    }

    class KBEngineApp {
        getSingleton();
        ServerErr();
        resetSocket();
        reset();
        installEvents();
        uninstallEvents();
        hello();
        player();
        findEntity(entityID);
        connect(addr);
        disconnect();
        onopen();
        onerror_before_onopen(evt);
        onerror_after_onopen(evt);
        onmessage(msg);
        onclose();
        send(msg);
        close();
        update();
        Client_onAppActiveTickCB();
        serverErr(id);
        Client_onImportServerErrorsDescr(stream);
        onOpenLoginapp_login();
        onOpenLoginapp_createAccount();
        onImportClientMessagesCompleted();
        createDataTypeFromStreams(stream, canprint);
        createDataTypeFromStream(stream, canprint);
        Client_onImportClientEntityDef(stream);
        Client_onVersionNotMatch(stream);
        Client_onScriptVersionNotMatch(stream);
        onImportEntityDefCompleted();
        Client_onImportClientMessages(msg);
        createAccount(username, password, datas);
        createAccount_loginapp(noconnect);
        bindAccountEmail(emailAddress);
        newPassword(old_password, new_password);
        login(username, password, datas);
        logout();
        login_loginapp(noconnect);
        onOpenLoginapp_resetpassword();
        reset_password(username);
        resetpassword_loginapp(noconnect);
        onOpenBaseapp();
        login_baseapp(noconnect);
        reloginBaseapp();
        onReOpenBaseapp();
        Client_onHelloCB(args);
        Client_onLoginFailed(args);
        Client_onLoginSuccessfully(args);
        Client_onLoginBaseappFailed(failedcode);
        Client_onReloginBaseappFailed(failedcode);
        Client_onReloginBaseappSuccessfully(stream);
        getentityclass(entityType);
        Client_onCreatedProxies(rndUUID, eid, entityType);
        getViewEntityIDFromStream(stream);
        onUpdatePropertys_(eid, stream);
        Client_onUpdatePropertysOptimized(stream);
        Client_onUpdatePropertys(stream);
        onRemoteMethodCall_(eid, stream);
        Client_onRemoteMethodCallOptimized(stream);
        Client_onRemoteMethodCall(stream);
        Client_onEntityEnterWorld(stream);
        Client_onEntityLeaveWorldOptimized(stream);
        Client_onEntityLeaveWorld(eid);
        Client_onEntityDestroyed(eid);
        Client_onEntityEnterSpace(stream);
        Client_onEntityLeaveSpace(eid);
        Client_onKicked(failedcode);
        Client_onCreateAccountResult(stream);
        Client_onControlEntity(eid, isControlled);
        updatePlayerToServer();
        addSpaceGeometryMapping(spaceID, respath);
        clearSpace(isAll);
        clearEntities(isAll);
        Client_initSpaceData(stream);
        Client_setSpaceData(spaceID, key, value);
        Client_delSpaceData(spaceID, key);
        Client_getSpaceData(spaceID, key);
        Client_onUpdateBasePos(x, y, z);
        Client_onUpdateBasePosXZ(x, z);
        Client_onUpdateData(stream);
        Client_onSetEntityPosAndDir(stream);
        Client_onUpdateData_ypr(stream);
        Client_onUpdateData_yp(stream);
        Client_onUpdateData_yr(stream);
        Client_onUpdateData_pr(stream);
        Client_onUpdateData_y(stream);
        Client_onUpdateData_p(stream);
        Client_onUpdateData_r(stream);
        Client_onUpdateData_xz(stream);
        Client_onUpdateData_xz_ypr(stream);
        Client_onUpdateData_xz_yp(stream);
        Client_onUpdateData_xz_yr(stream);
        Client_onUpdateData_xz_pr(stream);
        Client_onUpdateData_xz_y(stream);
        Client_onUpdateData_xz_p(stream);
        Client_onUpdateData_xz_r(stream);
        Client_onUpdateData_xyz(stream);
        Client_onUpdateData_xyz_ypr(stream);
        Client_onUpdateData_xyz_yp(stream);
        Client_onUpdateData_xyz_yr(stream);
        Client_onUpdateData_xyz_pr(stream);
        Client_onUpdateData_xyz_y(stream);
        Client_onUpdateData_xyz_p(stream);
        Client_onUpdateData_xyz_r(stream);
        _updateVolatileData(entityID, x, y, z, yaw, pitch, roll, isOnGround);
        Client_onStreamDataStarted(id, datasize, descr);
        Client_onStreamDataRecv(stream);
        Client_onStreamDataCompleted(id);
        Client_onReqAccountResetPasswordCB(failedcode);
        Client_onReqAccountBindEmailCB(failedcode);
        Client_onReqAccountNewPasswordCB(failedcode);
    }

    class Message {
        ctor(id, name, length, argstype, args, handler);
        createFromStream(msgstream);
        handleMessage(msgstream);
    }

    class KBEngine {
        /*-----------------------------------------------------------------------------------------
                                                        global
        -----------------------------------------------------------------------------------------*/
        static PACKET_MAX_SIZE;
        static PACKET_MAX_SIZE_TCP;
        static PACKET_MAX_SIZE_UDP;
        static MESSAGE_ID_LENGTH;
        static MESSAGE_LENGTH_LENGTH;
        static CLIENT_NO_FLOAT;
        static KBE_FLT_MAX;

        /*-----------------------------------------------------------------------------------------
                                                    number64bits
        -----------------------------------------------------------------------------------------*/
        static INT64(lo, hi);
        static UINT64(lo, hi);

        /*-----------------------------------------------------------------------------------------
                                                    debug
        -----------------------------------------------------------------------------------------*/
        static INFO_MSG(s);
        static DEBUG_MSG(s);
        static ERROR_MSG(s);
        static WARNING_MSG(s);
        /*-----------------------------------------------------------------------------------------
                                                    string
    -----------------------------------------------------------------------------------------*/
        static utf8ArrayToString(array);
        static stringToUTF8Bytes(str);
        /*-----------------------------------------------------------------------------------------
                                                    event
    -----------------------------------------------------------------------------------------*/
        static EventInfo(classinst, callbackfn);
        /*-----------------------------------------------------------------------------------------
                                                    memorystream
    -----------------------------------------------------------------------------------------*/
        static MemoryStream(size_or_buffer);
        /*-----------------------------------------------------------------------------------------
                                                        bundle
        -----------------------------------------------------------------------------------------*/
        static Bundle();
        /*-----------------------------------------------------------------------------------------
                                                        messages
        -----------------------------------------------------------------------------------------*/
        static mappingDataType(writer, argType);
        static bindwriter(writer, argType);
        static bindReader(argType);
        static clampf(value, min_inclusive, max_inclusive);
        static int82angle(angle/*int8*/, half/*bool*/);
        static angle2int8(v/*float*/, half/*bool*/);

        /*-----------------------------------------------------------------------------------------
                                                        EntityCall
        -----------------------------------------------------------------------------------------*/
        static ENTITYCALL_TYPE_CELL;
        static ENTITYCALL_TYPE_BASE;

        static create(kbengineArgs: KBEngineArgs);
        static destroy();

    }
}