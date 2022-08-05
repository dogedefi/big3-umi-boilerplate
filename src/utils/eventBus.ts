class _EventBus {
    bus: any;

    constructor() {
        this.bus = {};
    }

    $off(id: string) {
        delete this.bus[id];
    }

    $on(id: string, callback) {
        this.bus[id] = callback;
    }

    $emit(id: string, ...params) {
        if (this.bus[id]) return this.bus[id](...params);
    }
}

export const eventBus = new _EventBus();
