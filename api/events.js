define(function(require,exports,module){

    var CoronaPanel = require("api/panel");

    var EventEmitter = require("api/EventEmitter");
    var ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        NodeDomain     = brackets.getModule("utils/NodeDomain");
    var PM      =   brackets.getModule("project/ProjectManager");

    var simpleDomain = new NodeDomain( "simple" , ExtensionUtils.getModulePath(module, "CoronaEditorDomain"));
        $(simpleDomain).on("progress",function(event,pid,time,message){
            if(message.search('\n')>-1)
            {
                message = message.split('\n');
            }else{
                message = [message];
            }
            for(var i in message){
                CoronaPanel.log(message[i]+'\n');
            }
        });
    var IsCoronable = false;

    EventEmitter.on("EnableCoronaEditor",function(){
        IsCoronable = true;
        $("#corona-toolbar-icon").addClass('on');
    });
    EventEmitter.on("DisableCoronaEditor",function(){
        IsCoronable = false;
        $("#corona-toolbar-icon").removeClass('on');
        //CoronaPanel.hide();
    });
    EventEmitter.on("KillCP",function(){
        simpleDomain.exec("kill");
    });

    EventEmitter.on("LauchProject",function(){

        CoronaPanel.log(PM.getInitialProjectPath());
        //IsCoronable
        if(IsCoronable){
            CoronaPanel.Clean();
            CoronaPanel.show();
            /*simpleDomain.exec("kill").done(function(){
                CoronaPanel.log("DONE");
            }).fail(function(){
                CoronaPanel.log("FAIL");
            });*/
                simpleDomain.exec("spawn", "/Applications/CoronaSDK/Corona Simulator.app/Contents/MacOS/Corona Simulator",
                              //["/Users/gerard2p/Google Drive/EntityCorona"]
                              [PM.getInitialProjectPath()+"main.lua"]
                             );
            //}).fail(function(){CoronaPanel.log("FAIL");});
        }
    });

});
