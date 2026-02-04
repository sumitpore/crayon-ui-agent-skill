import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Plugin to serve ~/.crayon/response.json via API
function crayonFileServerPlugin() {
  const responseFilePath = path.join(os.homedir(), '.crayon', 'response.json');

  return {
    name: 'crayon-file-server',
    configureServer(server: any) {
      server.middlewares.use('/api/response', (_req: any, res: any) => {
        try {
          if (fs.existsSync(responseFilePath)) {
            const stat = fs.statSync(responseFilePath);
            const content = fs.readFileSync(responseFilePath, 'utf-8');
            
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Last-Modified', stat.mtime.toUTCString());
            res.setHeader('Cache-Control', 'no-cache');
            res.end(content);
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Response file not found' }));
          }
        } catch (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: String(err) }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), crayonFileServerPlugin()],
  server: {
    port: 5500,
    open: true,
  },
});
