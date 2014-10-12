/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4,
maxerr: 50, browser: true */
/*global $, define, brackets */

/** Simple extension that adds a "File > Hello World" menu item */
define(function (require, exports, module) {
    "use strict";

    require("api/brackets");
    require("api/events");

    var CoronaPanel = require("api/panel");

    var CommandManager = brackets.getModule("command/CommandManager"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        Menus          = brackets.getModule("command/Menus");
    var constant        = require("api/constants");
    var EventEmitter = require("api/EventEmitter");


    ExtensionUtils.loadStyleSheet(module, "gui/css/panel.css");

    CommandManager.register("Lauch Project",constant.cmdLaunch,function(){
        EventEmitter.emit("LauchProject");
    });

    var launch = Menus.addMenu(constant.project, constant.cmdLaunch+".menu"  );
    launch.addMenuItem(constant.cmdLaunch);
    CoronaPanel.init();
});
