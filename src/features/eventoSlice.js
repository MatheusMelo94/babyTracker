import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listado: [],
    categorias: []
}

export const eventoSlice = createSlice({
    name: "evento",
    initialState,
    reducers: {
        guardarListado: (state, action) => {
            state.listado = action.payload;
        },
        guardarCategorias: (state, action) => {
            state.categorias = action.payload;
        },
    }
})

export const { guardarListado, guardarCategorias } = eventoSlice.actions;
export default eventoSlice.reducer;