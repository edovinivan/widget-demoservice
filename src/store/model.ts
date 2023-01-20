export interface State{
    mask : MaskModel
}

export interface ModalWindow{
    message: string | null,
    show: boolean
}

export interface MaskModel {
    modalWindow : ModalWindow | null
    loadMask : LoadMask | null
}

export interface LoadMask{
    show: boolean
}
