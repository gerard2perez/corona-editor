/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4,
maxerr: 50, browser: true */
/*global $, define, brackets */

/** Simple extension that adds a "File > Hello World" menu item */
define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus"),
        NodeDomain = brackets.getModule("utils/NodeDomain"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils");

    //var constant = require("api/constants");
    //var simpleDomain = new NodeDomain("brackets-coronaeditor", ExtensionUtils.getModulePath(module, "api/domain"));

    //var simpleDomain = new NodeDomain("simple", ExtensionUtils.getModulePath(module, "node/SimpleDomain"));
    //var cmd = require("api/terminal");
    // Function to run when the menu item is clicked
    function handleHelloWorld() {
        window.alert("Hello, world!");
    }

/*
    // First, register a command - a UI-less object associating an id to a handler
    var MY_COMMAND_ID = "helloworld.sayhello";   // package-style naming to avoid collisions
    CommandManager.register("Hello World", MY_COMMAND_ID, handleHelloWorld);
    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)

    CommandManager.register("Lauch Project",constant.COMMANDLAUNCH,function(){
        console.log(simpleDomain);
        simpleDomain.exec("test").fail(function(a,b,c){
            console.log(a,b,c);
        });
        simpleDomain.exec("spawn", "pwd",[],{}).fail(function(err){
            console.log(err);
        });
        console.log("-");
    });


    var coronamenu = Menus.addMenu(constant.NAMESPACE, "menu."+constant.COMMANDLAUNCH  );
    coronamenu.addMenuItem(MY_COMMAND_ID);
    coronamenu.addMenuItem(constant.COMMANDLAUNCH);



    var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    //menu.addMenuItem(MY_COMMAND_ID);

    // We could also add a key binding at the same time:
    //menu.addMenuItem(MY_COMMAND_ID, "Ctrl-Alt-H");
    // (Note: "Ctrl" is automatically mapped to "Cmd" on Mac)
    */
});
