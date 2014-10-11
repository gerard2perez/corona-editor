/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4,
maxerr: 50, browser: true */
/*global $, define, brackets */

/** Simple extension that adds a "File > Hello World" menu item */
define(function (require, exports, module) {
    "use strict";
    var CoronaPanel = require("api/panel");

    var ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        NodeDomain     = brackets.getModule("utils/NodeDomain"),
        CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus");

    var constant        = require("api/constants");
    var simpleDomain = new NodeDomain( "simple" , ExtensionUtils.getModulePath(module, "api/CoronaEditorDomain"));
    $(simpleDomain).on("progress",function(event,pid,time,message){
       CoronaPanel.log(message);
    });

    ExtensionUtils.loadStyleSheet(module, "gui/css/panel.css");


    CommandManager.register("Lauch Project",constant.cmdLaunch,function(){
        simpleDomain.exec("spawn", "/Applications/CoronaSDK/Corona Simulator.app/Contents/MacOS/Corona Simulator");
    });
    var launch = Menus.addMenu(constant.project, constant.cmdLaunch+".menu"  );
    launch.addMenuItem(constant.cmdLaunch);
    CoronaPanel.init();
});
