interface Obja {
    a: string;
}
interface Objb {
    b: number;
}
declare let A: Obja;
declare let B: Objb;
declare const AB: Obja & Objb;
declare class Disposable {
    isDisposed: boolean;
    dispose(): void;
}
declare class Activatable {
    isActive: boolean;
    activate(): void;
    deactivate(): void;
}
declare class SmartObject implements Disposable, Activatable {
    constructor();
    interact(): void;
    isDisposed: boolean;
    dispose: () => void;
    isActive: boolean;
    activate: () => void;
    deactivate: () => void;
}
declare let smartObj: SmartObject;
declare function applyMixins(derivedCtor: any, baseCtors: any[]): void;
