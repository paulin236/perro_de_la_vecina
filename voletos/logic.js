var db = firebase.database();

/*var update = document.getElementById('update');
update.disabled = true;*/

function value(request){
    return  document.getElementById(request).value;
}
function asignation(request,response){
    return  document.getElementById(request).value=response;
}
function printHTML(request,response){
    return document.getElementById(request).innerHTML+=response;
}
function inHTML(request,response){
    return document.getElementById(request).innerHTML=response;
}
function dateActuality(){
    var fh = new Date();
    return fh.getFullYear()+"-"+(fh.getMonth()+1)+"-"+fh.getDate()+" "+fh.getHours()+":"+fh.getMinutes();
}
function insertTask(name,description){
    db.ref('voleto/').push({
        name:name,
        description:description,
        date:dateActuality()
    });
}
function onClickInsert(){
    var name = value("name");
    var description = value("desc");
    if(name.length==0 || description.length==0){ 
        alert("empty field"); 
    }else{ 
        inHTML("loadTable","");
        insertTask(name,description); 
        asignation("name","");
        asignation("desc","");
        alert("saved successfully");
    }
}
function updateTask(name,description,key){
    db.ref('voleto/'+key).update({
        name:name,
        description:description,
        date:dateActuality()
    });
}
function onClickUpdate(){
    var name = value("nameEdit");
    var description = value("descEdit");
    var key = value("key"); 
    if(name.length==0 || description.length==0){ 
        alert("empty field"); 
    }else{ 
        inHTML("loadTable","");
        updateTask(name,description,key); 
        inHTML("editData","");
        alert("modify successfully");
        update.disabled = true;
    }
}
function removeTask(key){
    if(confirm("¿you want to delete task?")){
        inHTML("loadTable","");
        db.ref('voleto/'+key).remove();
    }
}
function table(name,description,date,key){
    return '<tr><td>'+name+'</td><td>'+description+'</td><td>'+date+'</td>';
}
/*function viewDataUpdate(name,description,key){
    var response = '<div class="form-group"><input type="hidden" value='+key+' id="key">' +
    '<input type="text" id="nameEdit" class="form-control" placeholder="Name" value='+name+'>'+
    '</div>'+
    '<div class="form-group">'+
    '<textarea placeholder="DescriptionEdit" class="form-control" id="descEdit">'+description+'</textarea>'+
    '</div>';
    inHTML('editData',response);
    update.disabled = false;
}*/
var reference = db.ref('voleto/');    
reference.on('value',function(datas){
    var data = datas.val();
    $.each(data, function(nodo, value) {
            var sendData = table(value.name,value.description,value.date,nodo);
            printHTML('loadTable',sendData);
    });       
});



