const express = require("express");
const path = require('path');
const cors = require("cors");
const Client = require("./config");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", async (req, res) => {
//   const snapshot = await Client.get();
//   const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//   res.send(list);
    res.sendFile(path.join(__dirname, 'public', 'index.html'));  
});

app.get('/cadastro-tag', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastro_tag.html'));  
});

app.post("/create", async (req, res) => {
    const data = req.body;
    try{
        await Client.doc(data.nome_cliente).set(data, { merge: true });
        res.status(202).send({ msg: "Client Added" });
    }
    catch (error) {
        console.error("Erro ao salvar o cliente no Firestore:", error);
        res.status(400).send({ msg: "Erro ao salvar o cliente", error });
    }

});

app.listen(4000, () => console.log("Up & RUnning *4000"));