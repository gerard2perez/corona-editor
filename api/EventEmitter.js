define(function (require, exports, module) {
    "use strict";

    // Brackets modules
    var _ = brackets.getModule("thirdparty/lodash");

    // Local modules
    var EventEmitter2 = require("thirdparty/eventemitter2");

    // Module variables

    // Implementation
    var emInstance = new EventEmitter2({
        wildcard: false
    });

    emInstance.emitFactory = function (eventName) {
        if (!eventName) {
            throw new Error("no event has been passed to the factory!");
        }

        var self = this,
            args = _.toArray(arguments);

        return function () {
            self.emit.apply(self, _.union(args, arguments));
        };
    };

    module.exports = emInstance;
});
