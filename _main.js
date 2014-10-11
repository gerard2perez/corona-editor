/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4,
maxerr: 50, browser: true */
/*global $, define, brackets */

define(function (require, exports, module) {
    "use strict";

    var ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        NodeDomain     = brackets.getModule("utils/NodeDomain");

    var simpleDomain = new NodeDomain("simple", ExtensionUtils.getModulePath(module, "node/SimpleDomain"));

    // Helper function that runs the simple.getMemory command and
    // logs the result to the console
    function logMemory() {
        simpleDomain.exec("getMemory", false)
            .done(function (memory) {
                console.log(
                    "[brackets-simple-node] Memory: %d bytes free",
                    memory
                );
            }).fail(function (err) {
                console.error("[brackets-simple-node] failed to run simple.getMemory", err);
            });
    }

    // Log memory when extension is loaded
    logMemory();
});
