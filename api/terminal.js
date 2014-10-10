define(function (require, exports, module) {

    var ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        NodeDomain     = brackets.getModule("utils/NodeDomain");

    var CoronaEditor = new NodeDomain("corona-editor", ExtensionUtils.getModulePath(module, "api/terminal"));

    $(CoronaEditor).on("progress",function(msg){
        console.log(msg);
    });

});
