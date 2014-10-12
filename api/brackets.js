/*global, define*/
define(function (require, exports, module) {
    var PM      =   brackets.getModule("project/ProjectManager"),
        fUtils  =   brackets.getModule("file/FileUtils"),
        EventEmitter = require("api/EventEmitter"),
        Panel       = require("api/panel");


    $(PM).on("projectOpen",function(){
        EventEmitter.emit("DisableCoronaEditor");
        PM.getAllFiles().then(function(list){
            for( var i in list){
                if( fUtils.getBaseName( list[i].fullPath ) == "main.lua"){
                    EventEmitter.emit("EnableCoronaEditor");
                    return;
                }
            }
        });
    });

    $(PM).on("beforeProjectClose",function(){
        Panel.hide();
        EventEmitter.emit("KillCP");
    });
    $(PM).on("beforeAppClose",function(){
        EventEmitter.emit("KillCP");
    });
    /*
    ProjectManager
Description

ProjectManager glues together the project model and file tree view and integrates as needed with other parts of Brackets. It is responsible for creating and updating the project tree when projects are opened and when changes occur to the file tree.

This module dispatches these events:

beforeProjectClose -- before _projectRoot changes, but working set files still open
projectClose -- just before _projectRoot changes; working set already cleared & project root unwatched
beforeAppClose -- before Brackets quits entirely
projectOpen -- after _projectRoot changes and the tree is re-rendered
projectRefresh -- when project tree is re-rendered for a reason other than a project being opened (e.g. from the Refresh command)
    */
});
