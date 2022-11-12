const authRouter = require('@routes/auth/auth.controller');
const documentsRouter = require('@routes/document/document.controller')
const routes = (app) => {

app.use('/auth',authRouter);
app.use('/documents',documentsRouter);

}

module.exports = routes;