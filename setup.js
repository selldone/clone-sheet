#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');
const mysql = require('mysql2/promise');
const express = require('express');

// Create Express app
const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Database configuration form
app.get('/', (req, res) => {
  res.render('setup', {
    title: 'Database Setup',
    error: null,
    config: {
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'selldone',
      appPort: 3010
    }
  });
});

// Handle form submission
app.post('/setup', async (req, res) => {
  const config = {
    host: req.body.host || 'localhost',
    port: parseInt(req.body.port, 10) || 3306,
    user: req.body.username,
    password: req.body.password,
    database: req.body.database,
    appPort: parseInt(req.body.appPort, 10) || 3010
  };

  try {
    // Test connection to MySQL server (without specifying database)
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password
    });

    // Check if database exists
    const [rows] = await connection.query(`SHOW DATABASES LIKE '${config.database}'`);
    const dbExists = rows.length > 0;

    if (!dbExists) {
      console.log(`Creating database '${config.database}'...`);
      await connection.query(`CREATE DATABASE \`${config.database}\``);
      console.log(`Database '${config.database}' created successfully!`);
    } else {
      console.log(`Database '${config.database}' already exists.`);
    }

    await connection.end();

    // Update config files
    updateDbConfig({
      username: config.user,
      password: config.password,
      database: config.database,
      host: config.host,
      port: config.port,
      dialect: 'mysql'
    });

    // Update .env file
    updateEnvFile({
      DB_HOST: config.host,
      DB_PORT: config.port,
      DB_USER: config.user,
      DB_PASSWORD: config.password,
      DB_NAME: config.database,
      PORT: config.appPort // Store app port in env
    });

    // Run migrations
    await runMigrations();

    // Redirect to success page
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Setup Complete</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          line-height: 1.5;
          color: #1d1d1f;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 80vh;
          text-align: center;
        }
        h1 { font-weight: 600; margin-bottom: 1.5rem; }
        p { font-size: 1.1rem; color: #424245; }
        .success-icon {
          width: 80px;
          height: 80px;
          background: #5cc15a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }
        .success-icon::before {
          content: '';
          width: 30px;
          height: 15px;
          border-left: 4px solid white;
          border-bottom: 4px solid white;
          transform: rotate(-45deg);
          margin-top: -5px;
        }
        .button {
          background: #0071e3;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 980px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          margin-top: 1.5rem;
          display: inline-block;
          transition: all 0.2s ease;
        }
        .button:hover {
          background: #0077ed;
        }
        .loading {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
          margin-left: 10px;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
    </head>
    <body>
      <div class="success-icon"></div>
      <h1>Setup Complete</h1>
      <p>Database connection successful and migrations completed.</p>
      <p>Starting application...<span id="loading" class="loading"></span></p>
      <p>You'll be redirected to <strong id="app-url">http://localhost:${config.appPort}</strong> automatically.</p>
      <a id="app-link" href="http://localhost:${config.appPort}" class="button">Go to Application</a>

     <script>
      // Start main app
      fetch('/start-app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appPort: ${config.appPort} })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const actualPort = data.actualPort;
          const appUrl = "http://localhost:" + actualPort;
          
          // Hide loading indicator
          document.getElementById('loading').style.display = 'none';
          
          // Update UI with actual port
          document.getElementById('app-url').textContent = appUrl;
          document.getElementById('app-link').href = appUrl;
          
          // Update redirect
          setTimeout(() => {
            window.location.href = appUrl;
          }, 3000);
        } else {
          throw new Error(data.error || "Unknown error");
        }
      })
      .catch(error => {
        console.error('Error starting application:', error);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('app-url').innerHTML = "<span style='color: #ff3b30;'>Error starting application</span>";
      });
    </script>
    </body>
    </html>
  `);

  } catch (error) {
    res.render('setup', {
      title: 'Database Setup',
      error: `Connection failed: ${error.message}`,
      config: {
        host: req.body.host,
        port: req.body.port,
        username: req.body.username,
        password: req.body.password,
        database: req.body.database,
        appPort: req.body.appPort
      }
    });
  }
});

// Start app endpoint
app.post('/start-app', async (req, res) => {
  const requestedPort = parseInt(req.body.appPort, 10) || 3010;

  try {
    // Start main application
    const result = await startMainApp(requestedPort);
    res.json(result);
  } catch (error) {
    res.json({
      success: false,
      error: error.message
    });
  }
});

// Find available port
async function findAvailablePort(startPort) {
  startPort = parseInt(startPort, 10);

  for (let port = startPort; port < startPort + 100; port++) {
    try {
      const available = await new Promise((resolve) => {
        const testServer = http.createServer();

        testServer.once('error', () => {
          resolve(false);
        });

        testServer.once('listening', () => {
          testServer.close(() => resolve(true));
        });

        testServer.listen(port);
      });

      if (available) {
        console.log(`Found available port: ${port}`);
        return port;
      }
    } catch (err) {
      // Continue to next port
    }
  }

  throw new Error(`No available ports found starting from ${startPort}`);
}

// Update config file
function updateDbConfig(config) {
  const configPath = path.join(process.cwd(), 'config', 'config.json');

  let configData = {
    development: {},
    test: {},
    production: {}
  };

  try {
    if (fs.existsSync(configPath)) {
      configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
  } catch (err) {
    console.log('Creating new config file');
  }

  // Update all environments
  ['development', 'test', 'production'].forEach(env => {
    configData[env] = {
      ...configData[env],
      username: config.username,
      password: config.password,
      database: config.database,
      host: config.host,
      port: config.port,
      dialect: 'mysql'
    };
  });

  // Create config directory if it doesn't exist
  const configDir = path.dirname(configPath);
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  fs.writeFileSync(configPath, JSON.stringify(configData, null, 2));
  console.log('✓ Database configuration updated');
}

// Update .env file
function updateEnvFile(config) {
  const envPath = path.join(process.cwd(), '.env');

  let envContent = '';
  for (const [key, value] of Object.entries(config)) {
    envContent += `${key}=${value}\n`;
  }

  fs.writeFileSync(envPath, envContent);
  console.log('✓ .env file updated');
}

// Run migrations
async function runMigrations() {
  try {
    console.log('Running database migrations...');
    execSync('npx sequelize-cli db:migrate', { stdio: 'inherit' });
    console.log('✓ Database migrations completed');
    return true;
  } catch (error) {
    console.error('✗ Migration failed:', error.message);
    throw error;
  }
}

// Start main application with better port conflict handling
async function startMainApp(requestedPort) {
  try {
    // First ensure setup server is closed
    if (setupServer && setupServer.listening) {
      await new Promise(resolve => setupServer.close(resolve));
      console.log('Setup server closed successfully');
    }

    // Find an available port
    let actualPort;
    try {
      actualPort = await findAvailablePort(requestedPort);
    } catch (error) {
      console.error('Failed to find available port:', error.message);
      return { success: false, error: 'No available ports found' };
    }

    // Set environment for the main app
    process.env.PORT = actualPort;

    return new Promise((resolve) => {
      try {
        const mainApp = require('./index');
        const server = http.createServer(mainApp);

        server.once('error', (err) => {
          console.error('Server error:', err);
          if (err.code === 'EADDRINUSE') {
            console.log(`Port ${actualPort} is already in use, trying ${actualPort + 1}...`);
            // Try next port
            startMainApp(actualPort + 1).then(resolve);
          } else {
            resolve({ success: false, error: err.message });
          }
        });

        server.listen(actualPort, () => {
          console.log(`✓ Application running at http://localhost:${actualPort}`);
          resolve({
            success: true,
            actualPort: actualPort
          });
        });
      } catch (error) {
        console.error('Failed to start application:', error);
        resolve({ success: false, error: error.message });
      }
    });
  } catch (error) {
    console.error('Failed to start application:', error);
    return { success: false, error: error.message };
  }
}

// Create setup view
const setupDir = path.join(process.cwd(), 'views');
if (!fs.existsSync(setupDir)) {
  fs.mkdirSync(setupDir, { recursive: true });
}

fs.writeFileSync(path.join(setupDir, 'setup.ejs'), `
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; 
      max-width: 750px; 
      margin: 0 auto; 
      padding: 3rem 2rem;
      color: #1d1d1f;
      line-height: 1.5;
      background-color: #fafafa;
    }
    
    h1 { 
      font-size: 2.5rem;
      font-weight: 600;
      margin-bottom: 2rem;
      text-align: center;
    }
    
    .form-container {
      background: white;
      border-radius: 18px;
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
      padding: 2rem;
    }
    
    .form-group { 
      margin-bottom: 1.5rem; 
    }
    
    label { 
      display: block; 
      margin-bottom: 0.5rem; 
      font-weight: 500;
      color: #1d1d1f;
      font-size: 0.95rem;
    }
    
    input[type="text"], input[type="password"], input[type="number"] { 
      width: 100%; 
      padding: 12px 15px; 
      border: 1px solid #d2d2d7; 
      border-radius: 12px; 
      font-size: 1rem;
      color: #1d1d1f;
      transition: border-color 0.2s ease;
      box-sizing: border-box;
    }
    
    input:focus {
      outline: none;
      border-color: #0071e3;
      box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.15);
    }
    
    button { 
      background: #0071e3; 
      color: white; 
      border: none; 
      padding: 12px;
      border-radius: 980px; 
      cursor: pointer;
      font-size: 1.05rem;
      font-weight: 500;
      width: 100%;
      margin-top: 0.5rem;
      transition: all 0.2s ease;
    }
    
    button:hover {
      background: #0077ed;
      transform: translateY(-1px);
    }
    
    .section {
      margin-bottom: 2rem;
      border-bottom: 1px solid #d2d2d7;
      padding-bottom: 1rem;
    }
    
    .section-title {
      font-weight: 600;
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
      color: #1d1d1f;
    }
    
    .form-row {
      display: flex;
      gap: 1rem;
    }
    
    .form-row .form-group {
      flex: 1;
    }
    
    .error { 
      background: #fef1f2; 
      border-left: 4px solid #ef4444; 
      padding: 1rem; 
      border-radius: 8px; 
      margin-bottom: 1.5rem;
      color: #b91c1c;
    }
    
    .note {
      margin-top: 1.5rem;
      padding: 1rem;
      background: #f5f5f7;
      border-radius: 10px;
      font-size: 0.9rem;
      color: #6e6e73;
    }
  </style>
</head>
<body>
  <h1><%= title %></h1>

  <% if (error) { %>
    <div class="error">
      <%= error %>
    </div>
  <% } %>

  <form method="post" action="/setup">
    <div class="form-container">
      <div class="section">
        <div class="section-title">Database Configuration</div>
        <div class="form-row">
          <div class="form-group">
            <label for="host">Host</label>
            <input type="text" id="host" name="host" value="<%= config.host %>" required>
          </div>
          <div class="form-group">
            <label for="port">Port</label>
            <input type="number" id="port" name="port" value="<%= config.port %>" required>
          </div>
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" value="<%= config.username %>" required>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" value="<%= config.password %>">
        </div>

        <div class="form-group">
          <label for="database">Database Name</label>
          <input type="text" id="database" name="database" value="<%= config.database %>" required>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Application Settings</div>
        <div class="form-group">
          <label for="appPort">Application Port</label>
          <input type="number" id="appPort" name="appPort" value="<%= config.appPort %>" required>
        </div>
      </div>

      <button type="submit">Connect & Initialize</button>
    </div>
    
    <div class="note">
      This setup will connect to your database, create it if needed, and run migrations before starting the application.
    </div>
  </form>
</body>
</html>
`);

// Start setup server
let port;
let setupServer;

(async () => {
  port = await findAvailablePort(3000);
  setupServer = app.listen(port, () => {
    console.log(`Setup server running at http://localhost:${port}`);
    console.log('Open this URL in your browser to configure database connection');
  });
})();