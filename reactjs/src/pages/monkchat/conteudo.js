
import { ContainerConteudo } from './conteudo.styled'
import { ChatButton, ChatInput, ChatTextArea } from '../../components/outros/inputs'

import { useState } from 'react';

import Api from '../../service/api';
const api = new Api();


export default function Conteudo() {
    const [chat, setChat] = useState([]);
    const [usuario, setUsuario] = useState('');
    const [sala, setSala] = useState('');
    const [mensagem, setMensagem] = useState('');

    const atualizar = async () => {
        const mensagens = await api.listarMensagens(1);
        console.log(mensagens);
        setChat(mensagens)
    }

    const inserir = async () => {
        const r = await api.inserirMensagem(usuario, sala, mensagem);
        console.log(r);
        alert('Mensagem enviada com sucesso.');

        await atualizar();
    }
    
    return (
        <ContainerConteudo>
            <div className="container-form">
                <div className="box-sala">
                    <div>
                        <div className="label">Sala</div>
                        <ChatInput value={sala} onChange={e => setSala(e.target.value)} />
                    </div>
                    <div>
                        <div className="label">Nick</div>
                        <ChatInput value={usuario} onChange={e => setUsuario(e.target.value)} />
                    </div>
                    <div>
                        <ChatButton> Criar </ChatButton>
                        <ChatButton> Entrar </ChatButton>
                    </div>
                </div>
                <div className="box-mensagem">
                    <div className="label">Mensagem</div>
                    <ChatTextArea value={mensagem} onChange={e => setMensagem(e.target.value)} />
                    <ChatButton onClick={inserir} className="btn-enviar"> Enviar </ChatButton>
                </div>
            </div>
            
            <div className="container-chat">
                
                <img onClick={atualizar}
                   className="chat-atualizar"
                         src="/assets/images/atualizar.png" alt="" />
                
                <div className="chat">
                    {chat.map(x =>
                        <div>
                            <div className="chat-message">
                                <div>({new Date(x.dt_mensagem.replace('Z', '')).toLocaleTimeString()})</div>
                                <div><b>{x.tb_usuario.nm_usuario}</b> fala para <b>Todos</b>:</div>
                                <div> {x.ds_mensagem} </div>
                            </div>
                        </div>
                    )}
                    
                </div>
            </div>
        </ContainerConteudo>
    )
}