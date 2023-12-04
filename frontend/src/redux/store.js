import {configureStore} from '@reduxjs/toolkit';
import usuarioSlice from './usuarioReducer'
import msgSlice from './mensagemReducer'

const store = configureStore({
    reducer:{
        usuario: usuarioSlice,
        mensagem: msgSlice
    }
});

export default store;