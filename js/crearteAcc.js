$(function(){
    var $select = $(".1-12");
    for (i=1;i<=12;i++){
        $select.append($('<option></option>').val(i).html(i))
    }
});

$(function(){
    var $select = $(".2019-2030");
    for (i=2019;i<=2030;i++){
        $select.append($('<option></option>').val(i).html(i))
    }
});