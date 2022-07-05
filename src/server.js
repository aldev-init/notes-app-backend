const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async ()=>{
    const server = Hapi.server({
        port:8080,
        host:'localhost',
        routes:{
            cors:{
                //mengijinkan semua websites yang ingin mengambil/menggunakan resource di web ini
                origin: ['*'],
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log("Server Berjalan pada "+server.info.uri);
}

init();