import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import corsOptions from "./src/config/corsConfig.js";
import conectarDB from "./src/config/db.js";

import productsRouter from "./src/routes/productsRouter.js";
import printConsole from "./src/middleware/printConsole.js";
import errorHandler from "./src/helpers/errorHandler.js";
import notFound from "./src/middleware/notFound.js";

const app = express();
app.use(cors(corsOptions));
dotenv.config({ quiet: true });

app.use(express.json());

const PORT = process.env.PORT || 5000;

conectarDB();

app.use("/api/productos", productsRouter);

app.use(printConsole);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
