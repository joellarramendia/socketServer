import { createServer } from 'http';
import { envs } from './config/envs.js';
import { AppRoutes } from './presentation/routes.js';
import { Server } from './presentation/server.js';
import { WssService } from './presentation/services/wss.service.js';


(async()=> {
  main();
})();


function main() {

  const server = new Server({
    port: envs.PORT,
  });

  const httpServer = createServer(server.app)
  WssService.initWss({server: httpServer})

  server.setRoutes(AppRoutes.routes)

  httpServer.listen(envs.PORT, () => {
    console.log(`Server running on port: ${envs.PORT}`)
  })
}