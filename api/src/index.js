import db from './db.js';
import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

app.get('/chat/:salaId', async (req, resp) => {
    try {
        let mensagens = await
            db.tb_chat.findAll({
                where: {
                    id_sala: req.params.salaId
                },
                include: ['tb_usuario', 'tb_sala'],
            });
    
        resp.send(mensagens);
    } catch (e) {
        resp.send(e.toString())
    }
})


app.post('/chat', async (req, resp) => {
    let { sala, usuario, chat } = req.body;

    let salatb = await db.tb_sala.findOne({ where: { nm_sala: sala.nome } })
    let usuariotb = await db.tb_usuario.findOne({ where: { nm_usuario: usuario.nome } })

    let chattb = await db.tb_chat.create({
        id_sala: salatb.id_sala,
        id_usuario: usuariotb.id_usuario,
        ds_mensagem: chat.mensagem,
        dt_mensagem: new Date()
    })

    resp.send(chattb);
})



app.listen(process.env.PORT,
           x => console.log(`>> Server up at port ${process.env.PORT}`))