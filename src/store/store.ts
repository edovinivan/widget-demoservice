import Vuex, {Store} from "vuex";
import {
    LoadMask, MaskModel,
    ModalWindow, State
} from "@/store/model";



class AppState implements State{
    mask : MaskModel;
    constructor() {
        this.mask = new class implements MaskModel {
            loadMask: LoadMask | null = null;
            modalWindow: ModalWindow | null = null;
        };
    }
}

export function createStore() : Store<State>{
    const storeApp = new Vuex.Store({
        state: new AppState(),
        mutations: {

        },
        getters: {

        }
    });
    return storeApp;
}