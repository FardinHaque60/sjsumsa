import * as dotenv from 'dotenv';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/* 
 * API endpoints for supabase CRUD operations below 
 */
app.use(express.json());

dotenv.config(); // Load environment variables from .env file

const supabaseUrl = process.env['SUPABASE_URL'];
const supabaseKey = process.env['SUPABASE_KEY'];

// Ensure they are loaded
if (!supabaseUrl || !supabaseKey) {
  console.error('SERVER: Supabase environment variables are missing! Cannot make DB requests.');
  process.exit(1);
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

app.get('/api/getPrayerTimes', async (req, res) => {
  // fetch all prayer times that have date for today
  const { todayDate } = req.query;
  console.log('SERVER: checking db for prayer times today:', todayDate);
  try {
    const { data, error } = await supabase
      .from('prayerTimes')
      .select('*')
      .eq('date', todayDate);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: 'SERVER: error getting prayer times from db' });
  }
});

app.post('/api/postPrayerTimes', async (req, res) => {
  const { prayerTimes } = await req.body;

  console.log('SERVER: writing prayer times to db:', JSON.stringify(prayerTimes));
  try {
    const { data, error } = await supabase
      .from('prayerTimes')
      .insert(prayerTimes);
    if (error) {
      return res.status(500).json({ error: error.message });
    } 
    return res.json("SERVER successfully wrote to db");
  } catch (err) {
    return res.status(500).json({ error: 'SERVER: error writing prayer times to db' });
  } 
});

/* 
 * default ssr handling for angular app below   
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`SERVER: Node Express server listening on http://localhost:${port}`);
  });
} 

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);

export default reqHandler;

// module.exports = app;

/* Vercel serverless function export
export default async function handler(req: any, res: any) {
  // Set up CORS if needed
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Use the existing request handler
  await new Promise<void>((resolve, reject) => {
    app(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
} */
