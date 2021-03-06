import { fileURLToPath } from 'url';
import { join } from 'path';
import { Server } from '@olefjaerestad/hmr';

new Server({
  hostname: 'localhost',
  port: 3001,
  watch: {
    path: [
      join(fileURLToPath(import.meta.url), '../dev/client'),
      join(fileURLToPath(import.meta.url), '../dev/common'),
    ]
  }
});
