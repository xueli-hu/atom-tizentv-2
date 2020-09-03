
var openTerminal = (function() {
    // Import the module and reference it with the alias vscode
    
    var childProcess = require('child_process');
    var path = require('path');
    var os = require('os');
    var fs = require('fs');
    var common = require('./common');
    var logger = require('./logger');
    var tools = require('@tizentv/tools');

    var moduleName = 'SDB Command Prompt';
    var terminalArray = new Array();

    return {
        // Handle 'SDB Command Prompt' commands
        // Can be invoked by other features
        handleCommand:async function() {
            logger.info(moduleName, '==============================SDB Command Prompt start!');

            let sdbExec = await tools.getSdbPath();
            let sdbPath = path.dirname(sdbExec);
            logger.info(moduleName, 'sdbExec =' + sdbExec);
            if(process.platform != 'win32') {
                var terminalCMD = 'gnome-terminal -e \'bash -c \"cd ' + sdbPath + '; exec bash\"\'';
                childProcess.exec(terminalCMD, function (err, stdout, stderr) {
                    if (err) {
                        var launchErrStatus = 'Failed to open terminal!';
                        common.showMsgOnWindow(common.ENUM_WINMSG_LEVEL.ERROR, launchErrStatus);
                        logger.error(moduleName, launchErrStatus);
                        logger.info(moduleName, err.message);
                    }
                });
            }
            else {
                var terminalCMD = 'cmd.exe /c \"cd ' + sdbPath + ' && start"';
                childProcess.exec(terminalCMD, function (err, stdout, stderr) {
                    if (err) {
                        var launchErrStatus = 'Failed to open terminal!';
                        common.showMsgOnWindow(common.ENUM_WINMSG_LEVEL.ERROR, launchErrStatus);
                        logger.error(moduleName, launchErrStatus);
                        logger.info(moduleName, err.message);
                    }
                });
            }
            
            //openTerminal.createTerminal();  
        },
        
        createTerminal:function() {
            /*
            var vscode = require('vscode');
            var rootPath = __dirname;
            if(terminalArray && terminalArray.length >0){
                logger.info(moduleName, 'Show SDB Command Prompt terminal');
                var currentTerminal = terminalArray[terminalArray.length -1];
                currentTerminal.show();
            }else{
                logger.info(moduleName, 'Create SDB Command Prompt terminal');

                //var shellArgs = ['--rcfile',configFilePath];
                var shellArgs;
                var shell = 'cmd.exe';

                if(process.platform  === 'win32' ){
                    var shellCommand = '/K set PATH='+SDB_PATH+';%PATH%';
                    shellArgs = [shellCommand];
                }else{
                    shellArgs = ['--rcfile',configFilePath];
                    shell = 'bash';
                }
                
                var sdbTerminal = vscode.window.createTerminal('SDB Command Prompt',shell,shellArgs);
                sdbTerminal.sendText("echo 'Your environment has been set up for using sdb command'");
                sdbTerminal.show();

                terminalArray.push(sdbTerminal);
            }*/
            
        },

        hideTerminal: function(){
            /*
            if(terminalArray && terminalArray.length>0){
                logger.info(moduleName, 'Hide SDB Command Prompt terminal');
                var currentTerminal = terminalArray[terminalArray.length -1];
                currentTerminal.hide();
            }*/
        },

        setSdbConfig: function(){
            if(process.platform != 'win32'){
                /*
                var setCommand = 'export PATH='+ SDB_PATH +':$PATH';
                logger.debug(moduleName, 'setCommand:'+setCommand);

                // chmod sdb_config.txt 
                var chmodCommand = 'chmod -R 777 '+configFilePath;
                childProcess.execSync(chmodCommand);

                try{        
                    fs.writeFileSync(configFilePath, setCommand, 'utf-8');             
                } catch (ex) {
                    logger.error(moduleName, 'The  '+ configFilePath + ' cannot be written');
                    logger.debug(moduleName, ex.message);
                    throw ex;
                }
                */
            }else{
                // show nothing
                logger.debug(moduleName, 'No need to add sdb executable as environment variables when win OS');
            }
            
        }
    };

})();
module.exports = openTerminal;
