interface Obja {
    a: string
}
interface Objb {
    b: number
}
let A: Obja = {
    a: "1"
}
let B: Objb = {b: 2}
// let AB:Obja&Objb=Object.assign(A,B)
// console.log(AB,A,B)
const AB: Obja & Objb = Object.assign( A, B)
console.log(AB, A, B)

// Disposable Mixin
class Disposable {
    isDisposed!: boolean;
    dispose() {
        this.isDisposed = true;
    }

}

// Activatable Mixin
class Activatable {
    isActive!: boolean;
    activate() {
        this.isActive = true;
    }
    deactivate() {
        this.isActive = false;
    }
}

class SmartObject implements Disposable, Activatable {
    constructor() {
        // setInterval(() => console.log(this.isActive + " : " + this.isDisposed), 500);
    }

    interact() {
        this.activate();
    }
    // Disposable
    isDisposed: boolean = false;
    dispose!: () => void;
    // Activatable
    isActive: boolean = false;
    activate!: () => void;
    deactivate!: () => void;
}
applyMixins(SmartObject, [Disposable, Activatable]);

let smartObj = new SmartObject();
// setTimeout(() => smartObj.interact(), 1000);
console.log(smartObj, 'smartObj')
////////////////////////////////////////
// In your runtime library somewhere
////////////////////////////////////////

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}