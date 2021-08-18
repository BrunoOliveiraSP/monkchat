import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:3030'
})

export default class Api {
    async listarMensagens(idSala) {
        let r = await api.get(`/chat/${idSala}`);
        return r.data;
    }

    async inserirMensagem(usuario, sala, mensagem) {
        let chat = {
            usuario: { nome: usuario },
            sala: { nome: sala },
            chat: { mensagem: mensagem }
        }
        
        let r = await api.post(`/chat`, chat);
        return r.data;
    }
}