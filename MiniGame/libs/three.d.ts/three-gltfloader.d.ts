// https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/GLTFLoader.js

import { LoadingManager } from "./three-core";
import {Group} from "./three-core";

export class GLTFLoader {

    constructor(manager?: LoadingManager);
    manager: LoadingManager;

    load(url: string, onLoad: (group: Group) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;
    parse(FBXText: string, resourceDirectory: string) : Group;

}