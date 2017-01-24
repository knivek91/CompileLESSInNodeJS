var jq = $(document);

function crearHTMLColores(data) {
    var key = Object.keys(data);
    
    if(key.length == 0)
        return 'No se encuntran valores validos para crear los inputs.';
    
    var html = '';
    for(var i = 0; i < key.length; i++ ) {
        html += '<div class="col-sm-3">';
        html += '<div class="input-group">';
        html += '<label for="' + key[i] + '">'+ key[i] +':</label>';
        html += '<input class="form-control" type="color" name="'+ key[i] +'" value="'+ data[key[i]] +'"/>';
        html += '</div>';
        html += '</div>';
    }
    return html;
}

jq.ready(function () {
    
    var result = $.ajax({
       url: '/getVariables'
        , type:'GET'
        , async: false
    }).responseText;
    
    try {
        result = JSON.parse(result);
    } catch(e) { result = []; }
    
    var html = crearHTMLColores(result);
    
    jq.find('#container').html(html);
    
});

jq.find('#btnChange').on('click', function () {
    
    var colors = jq.find('input[type="color"]');
    var modifyVars = { modifyVars: {} };
    for(var i = 0; i < colors.length; i++ ) {
        modifyVars.modifyVars[colors[i].name] = jq.find(colors[i]).val();
    }
    
    var result = $.ajax({
       url: '/compile'
        , type:'POST'
        , data: { data: modifyVars  }
        , async: false
    }).responseText;
   
    if(result == '') {
        window.location.reload();
    }
    
});