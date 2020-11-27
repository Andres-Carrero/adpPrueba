//puerto
PORT = process.env.PORT || 3000;

//base de datos
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlbd;
if (process.env.NODE_ENV === 'dev') {
    urlbd = 'mongodb://localhost:27017/apdPrueba';
} else {
    urlbd = 'mongodb+srv://andres:andres.com@adp.eilwf.mongodb.net/adp'
}
process.env.URLM = urlbd