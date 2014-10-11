define(function(require,exports){

    var AppInit         = brackets.getModule("utils/AppInit"),
        WM              = brackets.getModule("view/WorkspaceManager");

    var panel       =   require("text!gui/panel.html");
    var tabitem       =   require("text!gui/tabcontent.html");
    var $panel = null,
        Panel = null;

    var formatqueu = [
        pre=[],
        after=[]
    ];
    function log(message){
        message = message.replace(/^[0-9]*.*Corona Simulator.*\] (.*)/g,"$1");
        //will always print to the last page's div
         $("#corona-editor-panel article.active>div:last-child").append('\n'+message);
    }

    function init(){
        AppInit.appReady (function(){
            var panelHtml = $( Mustache.render(panel) );
            Panel = WM.createBottomPanel('corona-editor.log.main',panelHtml,200);
            $panel = Panel.$panel;
            $panel.find("[role=tabipanel]").append($(tabitem));
            $panel.on('click','li',function(){
               $panel.find('[role=tabipanel] *').removeClass('active');
                $panel.find('[role=tabipanel]>article').eq( $(this).index() ).addClass('active');
                $(this).addClass('active');
            });
            $panel.on('click',"#hide",function(){
                Panel.hide();
            });
            Panel.show();
        });
    }

    exports.$panel = $panel;
    exports.Panel = Panel;
    exports.init = init;
    exports.log = log;
    exports.registerFormat = function(fn){

    }
});
