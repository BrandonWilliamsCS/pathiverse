import { app, BrowserWindow } from "electron";
import path from "path";
import startServer from "pathiverse-server";
import { URL } from "url";

const isDevelopment = process.env.NODE_ENV !== "production";
const serverPort = 3001;

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

function createMainWindow() {
  const window = new BrowserWindow({ show: false });
  window.maximize();
  window.show();

  if (isDevelopment) {
    window.webContents.openDevTools();
  }

  const targetUrl = new URL("http://localhost");
  targetUrl.port = serverPort;
  window.loadURL(targetUrl.toString());

  window.on("closed", () => {
    mainWindow = null;
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

// quit application when all windows are closed
app.on("window-all-closed", () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on("ready", () => {
  // Serve static files from the app source dir.
  // Technically this allows you to access main process files too, but it's all on the local FS anyway.
  const staticDir = __dirname;
  // Use a subdir of the user's data dir for storing/accessing api data
  const apiAccessRoot = path.join(app.getPath("userData"), "/pathiverse");
  startServer(staticDir, apiAccessRoot, serverPort);
  mainWindow = createMainWindow();
});
