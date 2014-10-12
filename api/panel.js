define(function(require,exports){

    var AppInit         = brackets.getModule("utils/AppInit"),
        WM              = brackets.getModule("view/WorkspaceManager");

    var panel       =   require("text!gui/panel.html");
    var tabitem       =   require("text!gui/tabcontent.html");
    var EventEmitter    = require("api/EventEmitter");
    var $panel = null,
        Panel = null;

    var formatqueu = {
        pre:[],
        after:[]
    };
    function rawlog(message){
        $("#corona-editor-panel article.active>div:last-child").append('\n'+message);
    }
    function log(message){
        message = message.replace(/^.*Corona Simulator.*\](.*)/gm,"$1");
        for( var i in formatqueu.pre){
            message = formatqueu.pre[i](message);
        }
        //will always print to the last page's div
         $("#corona-editor-panel article.active>div:last-child").append('\n'+message);
    }
    function Clean(){
        $("#corona-editor-panel article").html($("<div>"));
    }
    formatqueu.pre.push(function(message){
        if( message.search("C o r o n a   L a b s   I n c") > -1 ){
            Clean();
        }
        if( message.search("Version:") >1 )$("#corona-editor-panel #version").html(message.replace(/.*Version\: (.*)$/gm," $1"));
        if( message.search("Build:") >1 )$("#corona-editor-panel #build").html(message.replace(/.*Build\: (.*)$/gm," $1"));

        return message;
    });
    function init(){
        AppInit.appReady (function(){
            var $icon = $("<a id='corona-toolbar-icon' href='#'></a>").appendTo($("#main-toolbar .buttons"));
            var panelHtml = $( Mustache.render(panel) );
            Panel = WM.createBottomPanel('corona-editor.log.main',panelHtml,200);

            $icon.on('click',function(){
                if( $(this).hasClass('on') == false ){return;}
                if( Panel.isVisible() ){
                    Panel.hide();
                }else{
                    Panel.show();
                }

            });

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
            $panel.on('click',"#launch",function(){
                EventEmitter.emit("LauchProject");
            });
        });
    }
    exports.hide = function(){
        Panel.hide();
    };
    exports.toggle = function(){
        if(Panel === null)return;
        if( Panel.isVisible() ){
            Panel.hide();
        }else{
            Panel.show();
        }
    };
    exports.$panel = $panel;
    exports.Panel = Panel;
    exports.init = init;
    exports.log = log;
    exports.Clean = Clean;
    exports.registerFormat = function(fn,queu){
        formatqueu[queu].push(fn);
    };
});
