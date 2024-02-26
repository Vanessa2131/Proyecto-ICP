import { Server } from 'azle';
import express, { NextFunction, Request, Response } from 'express';

type Agroquimicos = {
    id: number;
    articulo: string;
    cantidad: string;
    proveedor: string;
    precio: string
}

let agroquim: Agroquimicos[] = [{
    id: 1,
    articulo: 'herbicida',
    cantidad: '200 L',
    proveedor: 'bayer',
    precio: '$50 000'
}]

function logger(req: Request, res: Response, next: NextFunction) {
    console.log("Producto agregado correctamente");
    next();
}

export default Server(() => {
    const app = express();

    app.use(express.json());

    app.use(logger);

    //GET
    app.get('/agro', (req, res) => {
        res.json(agroquim);
    });

    //POST
    app.post("/agro/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const Agro = req.body;
        const productoExistente = agroquim.find((agroquim) => agroquim.id === id);
    
        if (productoExistente) {
            res.status(404).send("");
            return;
        }
        agroquim.push({ ...Agro, id });
    
        res.send("OK");
    });

    //PUT
    app.put("/agro/:id", (req, res) =>{
        const id = parseInt(req.params.id);
        const producto = agroquim.find((book) => book.id === id);

        if (!producto) {
            res.status(404).send("Error Id repetido");
            return;
        }

        const updateAgro = { ...producto, ...req.body };

        agroquim = agroquim.map((b) => b.id === updateAgro.id ? updateAgro : b);

        res.send("ok");

    })

    //DELETE
    app.delete("/agro/:id", (req, res) =>{
        const id = parseInt(req.params.id);
        agroquim = agroquim.filter((book) => book.id !== id);
        res.send("ok")
    });

    return app.listen();
});

