const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');  // Importation de electron-updater

let mainWindow;

// Fonction de mise à jour
function checkForUpdates() {
    autoUpdater.checkForUpdatesAndNotify();  // Vérifie et notifie si une mise à jour est disponible
}

app.whenReady().then(() => {
    // Crée la fenêtre principale
    mainWindow = new BrowserWindow({
        width: 1920,  // Largeur de la fenêtre
        height: 1080, // Hauteur de la fenêtre
        webPreferences: {
            nodeIntegration: true, // Pour activer Node.js dans le renderer process
        },
        icon: path.join(__dirname, 'assets/Appoule.png'), // Icône de la fenêtre
    });

    // Charge le fichier HTML principal
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    // Supprime la barre de menu par défaut d'Electron
    Menu.setApplicationMenu(null);

    // Vérifier les mises à jour dès le démarrage
    checkForUpdates();

    // Ferme l'application lorsqu'elle est fermée (utile pour macOS)
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Événements de mise à jour
    autoUpdater.on('update-available', () => {
        console.log('Mise à jour disponible');
    });

    autoUpdater.on('update-downloaded', () => {
        console.log('Mise à jour téléchargée, redémarrage pour appliquer');
        autoUpdater.quitAndInstall();  // Applique la mise à jour et redémarre l'application
    });

    // Ajoutez des événements pour gérer les erreurs ou autres états
    autoUpdater.on('error', (err) => {
        console.error('Erreur de mise à jour:', err);
    });
});

// Quitter l'application quand toutes les fenêtres sont fermées (utile pour Windows et Linux)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
