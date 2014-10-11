/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4,
maxerr: 50, node: true */
/*global */

(function () {
    "use strict";

    var os = require("os");
    var ChildProcess  = require("child_process"),
        constant = require("constants"),
        domainName    = constant.Domain,
        domainManager = null,
        processMap    = {};


    function fixEOL(str) {
        if (str[str.length - 1] === "\n") {
            str = str.slice(0, -1);
        }
        return str;
    }


    function cmdSpawn(cmd) {

        var child = ChildProcess.spawn(cmd, []);
        processMap = child.pid;

        var exitCode, stdout = [], stderr = [];
        child.stdout.addListener("data", function (text) {
            console.log("stdout"+text.toString("utf8"));
            stdout[stdout.length] = text;
        });
        child.stderr.addListener("data", function (text) {
            domainManager.emitEvent("simple", "progress", [
                    processMap,
                    (new Date()).getTime(),
                    fixEOL(text.toString("utf8"))
                ]);
        });
        child.addListener("exit", function (code) {
            exitCode = code;
        });
        child.addListener("close", function () {
            /*delete processMap[opts.cliId];
            callback(exitCode > 0 ? join(stderr) : undefined,
                     exitCode > 0 ? undefined : join(stdout));*/
        });
        child.stdin.end();
    }

    /**
     * Initializes the test domain with several test commands.
     * @param {DomainManager} domainManager The DomainManager for the server
     */
    function init(DM) {
        domainManager = DM;
        if (!domainManager.hasDomain("simple")) {
            domainManager.registerDomain("simple", {major: 0, minor: 1});
        }
        domainManager.registerCommand(
            "simple",       // domain name
            "spawn",    // command name
            cmdSpawn,   // command handler function
            false,          // this command is synchronous in Node
            "Returns the total or free memory on the user's system in bytes",
            [{name: "total", // parameters
                type: "string",
                description: "True to return total memory, false to return free memory"}],
            [{name: "memory", // return values
                type: "number",
                description: "amount of memory in bytes"}]
        );
        domainManager.registerEvent(
            "simple",
            "progress",
            [
                { name: "commandId", type: "number" },
                { name: "time", type: "number" },
                { name: "message", type: "string" }
            ]
        );
    }


    exports.init = init;

}());
