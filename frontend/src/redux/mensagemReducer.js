import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ESTADO from '../estado';
const urlBase = 'https://backend-bcc-2-b.vercel.app/mensagem';

export const adicionarMensagem = createAsyncThunk('msg/adicionarMensagem', async (msg) => {
    const resposta = await fetch(urlBase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(msg)
    }).catch(erro => {
        return {
            status: false,
            mensagem: 'Ocorreu um erro ao adicionar o mensagem:' + erro.message
        }
    });
    if (resposta.ok) {
        const dados = await resposta.json();
        return {
            status: dados.status,
            mensagem: dados.mensagem,
            msg
        }
    }
    else {
        return {
            status: false,
            mensagem: 'Ocorreu um erro ao adicionar a mensagem.',
            msg
        }
    }
});

export const buscarMensagem = createAsyncThunk('msg/buscarMensagem', async () => {
    try { 
        const resposta = await fetch(urlBase, { method: 'GET' });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: true,
                listaMensagem: dados.listaMensagem,
                mensagem: ''
            }
        }
        else {
            return {
                status: false,
                listaMensagem: [],
                mensagem: 'Ocorreu um erro ao recuperar as mensagens da base de dados.'
            }
        }
    } catch (erro) {
        return {
            status: false,
            listaMensagem: [],
            mensagem: 'Ocorreu um erro ao recuperar as mensagens da base de dados:' + erro.message
        }
    }
});

const initialState = {
    estado: ESTADO.OCIOSO,
    mensagem: "",
    msgs: [],
};

const msgSlice = createSlice({
    name: 'msg',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(buscarMensagem.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Buscando mensagens...";
            })
            .addCase(buscarMensagem.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.msgs = action.payload.listaMensagem;
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(buscarMensagem.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.error.message;
            })
            .addCase(adicionarMensagem.fulfilled, (state, action) => {
                state.estado = ESTADO.OCIOSO;
                state.msgs.push(action.payload.msg);
                state.mensagem = action.payload.mensagem;
            })
            .addCase(adicionarMensagem.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Adicionando mensagem...";
            })
            .addCase(adicionarMensagem.rejected, (state, action) => {
                state.mensagem = "Erro ao adicionar o mensgem: " + action.error.message;
                state.estado = ESTADO.ERRO;
            })
    }
});

export default msgSlice.reducer;