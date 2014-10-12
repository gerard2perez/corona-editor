define(function(require,exports,module){
    var register = require("api/panel").registerFormat;

    //Separator
    register(function(msg){
        var _class = "";
        if(msg.indexOf("...")>-1){_class="dot";}
        else if(msg.indexOf("---")>-1){_class="line";}
        else if(msg.indexOf("+++")>-1){_class="plus";}
        else if(msg.indexOf("***")>-1){_class="asterisc";}
        else if(msg.indexOf(":::")>-1){_class="doubledot";}
        else if(msg.indexOf("···")>-1){_class="middledot";}

        if(_class!==""){
            return '<div class="separator '+_class+'"/>';
        }
        return msg;
    },'pre');

    //LORM
    register(function(output){
        var object = output.match(/ (.*){(\n[\w\W\r\n\t]*) }\n/);
        if( object){
            var definition = object[1];
            var content = object[2];
            content = content.split('\n');
            var name = '<span role="name">';
            var opts = '<span role="opts">';
            var header = '<header>';
            var body = '<article>';
            var data = definition.match(/(.*)\((.*)\).*/);
            object=$('<section role="object">').append(
                $(header).append($(name).html( data[1]), $(opts).html(data[2])),
                $(body)
            );
            object.children('header').click(function(){
                $(this).parent().children('article').toggle();
            });
            var current = object.find('article');
            for( var i in content){
                if(content[i].indexOf("{")>-1){
                    var subobject = $('<section role="subobject"/>');
                    var data = content[i].match(/.*?\[(.*)\] => (.*){/);
                    subobject.append($(header).append(
                        $(name).html( data[1]),
                        $(opts).html(data[2])
                    ),$(body));
                    subobject.children('header').click(function(){
                        $(this).parent().children('article').toggle();
                    });
                    current.append( subobject );
                    current = subobject.find('article');
                }else if(content[i].indexOf("}")>-1){
                    current = current.parent().parent();
                }else{
                    var prop = content[i].match(/.*?\[(.*)\] => (.*)/);
                    if( prop!==null){
                        prop = $('<div role="property"/>').append(
                            $('<span role="name">').html(prop[1]),
                            $('<span role="value">').html(prop[2])

                        );
                        current.prepend(prop);
                    }
                }
            }
            object.find('article').hide();
         return [object,/ (.*){(\n[\w\W\r\n\t]*) }\n/];
        }

        //{([^{}]*)}
    },'after');
});
