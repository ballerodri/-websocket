import { Router } from "express";
import { ProductManager } from "../ProductManager.js";

const productManager = new ProductManager("./productos.txt");

const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", {
      productos: products,
    });
  } catch (error) {
    res.send(error);
  }
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    req.io.on("connection", async (socket) => {
      console.log("Cliente conectado");
      socket.on("mensaje", (info) => {
        console.log(info);
      });
    });
    res.render("realTimeProducts", { productos: products })
  } catch (error) {
    res.send(error);
  }
});

export default viewsRouter;
