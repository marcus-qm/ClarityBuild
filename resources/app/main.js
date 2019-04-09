const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs')
path = require('path');
url = require('url');
var moment = require('moment');

require('update-electron-app')({
  repo: 'marcus-qm/claritybuild',
  updateInterval: '5 minutes'
})

let win;

let masterData;

let date = moment().format('DD/MM');;

let file = require(url.format({
  //__dirname is the current working dir
  pathname: path.join(__dirname, 'dist', 'CostitApp', 'assets', 'dummy.json'),
  // protocol: 'file:',
  // slashes: true
}));



ipcMain.on("getFiles", (event, arg) => {
  
      fs.readFile(url.format({
        //__dirname is the current working dir
        pathname: path.join(__dirname, 'dist', 'CostitApp', 'assets', 'dummy.json'),
        // protocol: 'file:',
        // slashes: true
      }), 'utf8', async (err, fileContents) => {
        try {
          // console.log(fileContents);
          masterData = await JSON.parse(fileContents);
          console.log(moment())
          console.log("=========================")
          console.log(masterData)
          // if (fileContents == {}) {
          //   console.log("empty file")
          // }
          win.webContents.send("getFilesResponse", masterData);
        } catch (err) {
          console.error(err)
        }
      })
  }); 

ipcMain.on('modifyBusinessData', (event, data) => {
  if (masterData !== undefined) {
    //masterdata is here
    console.log(data);
    //
    console.log(file);
    //
    console.log(file.user);
    //
    file.business = data;
    //
    fs.writeFile(url.format({
      //__dirname is the current working dir
      pathname: path.join(__dirname, 'dist', 'CostitApp', 'assets', 'dummy.json'),
      // protocol: 'file:',
      // slashes: true
    }), JSON.stringify(file, null, 2), (err, fileContents) => {
      try {
        // console.log(fileContents);
        // masterData = JSON.parse(fileContents);
        win.webContents.send("businessDataModified", true);
      } catch (err) {
        console.error(err)
      }
    });
  }
  //call to read file again
  // Do what you want with data.
  // //console.log(data);
});

ipcMain.on('modifyUserData', (event, data) => {
  if (masterData !== undefined) {
    //masterdata is here
    console.log(data);
    //
    console.log(file);
    //
    console.log(file.user);
    //
    file.user = data;
    //
    fs.writeFile(url.format({
      //__dirname is the current working dir
      pathname: path.join(__dirname, 'dist', 'CostitApp', 'assets', 'dummy.json'),
      // protocol: 'file:',
      // slashes: true
    }), JSON.stringify(file, null, 2), (err, fileContents) => {
      try {
        // console.log(fileContents);
        // masterData = JSON.parse(fileContents);
        win.webContents.send("userDataModified", true);
      } catch (err) {
        console.error(err)
      }
    });
  }
  //call to read file again
  // Do what you want with data.
  // //console.log(data);
});

ipcMain.on('setAccountID', (event, data) => {
  if (masterData !== undefined) {
    //masterdata is here
    console.log(data);
    //
    console.log(file.user)
    file.user['id'] = data;
    //
    fs.writeFile(url.format({
      //__dirname is the current working dir
      pathname: path.join(__dirname, 'dist', 'CostitApp', 'assets', 'dummy.json'),
      // protocol: 'file:',
      // slashes: true
    }), JSON.stringify(file, null, 2), (err, fileContents) => {
      try {
        // console.log(fileContents);
        // masterData = JSON.parse(fileContents);
        win.webContents.send("accountIDSet", true);
      } catch (err) {
        console.error(err)
      }
    });
  }
  //call to read file again
  // Do what you want with data.
  // //console.log(data);
});

ipcMain.on('addEntry', (event, data) => {
  if (masterData !== undefined) {
    //masterdata is here
    //console.log(data);
    //
    file.entry_db[date] = data;
    //
    fs.writeFile(url.format({
      //__dirname is the current working dir
      pathname: path.join(__dirname, 'dist', 'CostitApp', 'assets', 'dummy.json'),
      // protocol: 'file:',
      // slashes: true
    }), JSON.stringify(file, null, 2), (err, fileContents) => {
      try {
        // console.log(fileContents);
        // masterData = JSON.parse(fileContents);
        win.webContents.send("entrySaved", true);
      } catch (err) {
        console.error(err)
      }
    });
  }
  //call to read file again
  // Do what you want with data.
  // //console.log(data);
});

ipcMain.on('addPastEntry', (event, data, entrydate) => {
  if (masterData !== undefined) {
    // console.log("=======================");
    // console.log(data);
    // console.log(entrydate);
    // console.log("=======================");
    //
    file.entry_db[entrydate] = data[`${entrydate}`];
    //
    fs.writeFile(url.format({
      //__dirname is the current working dir
      pathname: path.join(__dirname, 'dist', 'CostitApp', 'assets', 'dummy.json'),
      // protocol: 'file:',
      // slashes: true
    }), JSON.stringify(file, null, 2), (err, fileContents) => {
      try {
        // console.log(fileContents);
        // masterData = JSON.parse(fileContents);
        win.webContents.send("entrySaved", true);
      } catch (err) {
        console.error(err)
      }
    });
  }
  //call to read file again
  // Do what you want with data.
  // //console.log(data);
});

ipcMain.on('setIncomeDefaults', (event, data) => {
  if (masterData !== undefined) {
    //masterdata is here
    file.income_presets = data;
    //
    fs.writeFile(url.format({
      //__dirname is the current working dir
      pathname: path.join(__dirname, 'dist', 'CostitApp', 'assets', 'dummy.json'),
      // protocol: 'file:',
      // slashes: true
    }), JSON.stringify(file, null, 2), function (err) {
        try {
          //console.log('in try block: reading json')
          // masterData = JSON.parse(fileContents);
          win.webContents.send("incomeDefaultsSet", true);
        } catch (err) {
          win.webContents.send("error", err);
          console.error(err)
        }
      //console.log(err);
      //console.log(JSON.stringify(file));
      // //console.log('writing to ' + fileName);
    });
  }
  //call to read file again
  // Do what you want with data.
  // //console.log(data);
});

ipcMain.on('setExpenseDefaults', (event, data) => {
  if (masterData !== undefined) {
    //masterdata is here
    file.expenses_presets = data;
    //
    fs.writeFile(url.format({
      //__dirname is the current working dir
      pathname: path.join(__dirname, 'dist', 'CostitApp', 'assets', 'dummy.json'),
      // protocol: 'file:',
      // slashes: true
    }), JSON.stringify(file, null, 2), function (err) {
        try {
          //console.log('in try block: reading json')
          // masterData = JSON.parse(fileContents);
          console.log("we're in")
          win.webContents.send("expenseDefaultsSet", true);
        } catch (err) {
          win.webContents.send("error", err);
          console.error(err)
        }
      //console.log(err);
      //console.log(JSON.stringify(file));
      // //console.log('writing to ' + fileName);
    });
  }
  //call to read file again
  // Do what you want with data.
  // //console.log(data);
});

ipcMain.on('modifiyEmployeeList', (event, data) => {
  if (masterData !== undefined) {
    //masterdata is here
    file.employees = data;
    //
    fs.writeFile(url.format({
      //__dirname is the current working dir
      pathname: path.join(__dirname, 'dist', 'CostitApp', 'assets', 'dummy.json'),
      // protocol: 'file:',
      // slashes: true
    }), JSON.stringify(file, null, 2), function (err) {
        try {
          //console.log('in try block: reading json')
          // masterData = JSON.parse(fileContents);
          // console.log("we're in")
          win.webContents.send("employeeListModified", true);
        } catch (err) {
          win.webContents.send("error", err);
          console.error(err)
        }
      //console.log(err);
      //console.log(JSON.stringify(file));
      // //console.log('writing to ' + fileName);
    });
  }
  //call to read file again
  // Do what you want with data.
  // //console.log(data);
});

ipcMain.on('updateInventory', (event, data) => {
  if (masterData !== undefined) {
    //masterdata is here
    file.inventory = data;
    //
    fs.writeFile(url.format({
      //__dirname is the current working dir
      pathname: path.join(__dirname, 'dist', 'CostitApp', 'assets', 'dummy.json'),
      // protocol: 'file:',
      // slashes: true
    }), JSON.stringify(file, null, 2), function (err) {
        try {
          //console.log('in try block: reading json')
          // masterData = JSON.parse(fileContents);
          // console.log("we're in")
          win.webContents.send("inventoryDataSet", true);
        } catch (err) {
          win.webContents.send("error", err);
          console.error(err)
        }
      //console.log(err);
      //console.log(JSON.stringify(file));
      // //console.log('writing to ' + fileName);
    });
  }
  //call to read file again
  // Do what you want with data.
  // //console.log(data);
});

ipcMain.on('log', (event, data) => {
  if (masterData !== undefined) {
    //masterdata is here
    file.logs = data;
    //
    fs.writeFile(url.format({
      //__dirname is the current working dir
      pathname: path.join(__dirname, 'dist', 'CostitApp', 'assets', 'dummy.json'),
      // protocol: 'file:',
      // slashes: true
    }), JSON.stringify(file, null, 2), function (err) {
        try {
          //console.log('in try block: reading json')
          // masterData = JSON.parse(fileContents);
          win.webContents.send("logSet", true);
        } catch (err) {
          win.webContents.send("error", err);
          console.error(err)
        }
      //console.log(err);
      //console.log(JSON.stringify(file));
      // //console.log('writing to ' + fileName);
    });
  }
  //call to read file again
  // Do what you want with data.
  // //console.log(data);
});




function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 1000,
    backgroundColor: 'grey',
    webPreferences: {
      nodeIntegration: true
    },
    icon: `file://${__dirname}/dist/assets/logo.png`
  })



  // UNCOMMENT FOR PROD BUILD!
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist', 'CostitApp', 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // COMMENT OUT FOR PROD BUILD
  // win.loadURL(`http://localhost:4200`);

  // COMMENT OUT FOR PROD BUILD
  // win.webContents.openDevTools();

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})

