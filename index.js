const child_process = require('child_process');
const fileSys = require('fs');
const hideF = require('hidefile');
const path = require('path');

class AppStart {
    #filePath = null;
    constructor(filePath) {
        this.#filePath = filePath;
    };

    #init() {
        if(!fileSys.existsSync(path.join(__dirname, ".appRun"))) {
            fileSys.mkdirSync(path.join(__dirname, ".appRun"));
            hideF.hideSync(path.join(__dirname, ".appRun"));
        }

        fileSys.writeFileSync(path.join(__dirname, ".appRun", "run.bat"), `start ${this.#filePath} param1\nexit`);
    }

    run() {
        this.#init();
        child_process.exec(`start ${path.join(__dirname, ".appRun", "run.bat")}`, (e, stdout, stderr) => {
            if(e) throw e;
            if(stderr) throw stderr;

            process.exit(0);
        });
    }
};

module.exports = AppStart;