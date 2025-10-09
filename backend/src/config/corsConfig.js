const dominiosPermitidos = [process.env.FRONTEND_URL || "http://localhost:5173"];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || dominiosPermitidos.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
};

export default corsOptions;
