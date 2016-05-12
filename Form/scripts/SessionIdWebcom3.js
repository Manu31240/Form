/**
 * Created by root on 2/16/16.
 */

var myRef = new Webcom('https://webcom.orange.com/base/form'); //creation d'un objet Webcom
//var actionId;
//Fonction  : Verifie credential Cloudwatt - Si Ok poursuit le traitement
function check() {
    var formulaire = document.getElementById("utilisateur");
    if (validateEmail(formulaire.elements[0].value)) { //Format @ mail valide
        if (window.XMLHttpRequest) {// Firefox
            var xhr_object = new XMLHttpRequest(); //Creation objet JSON
            xhr_object.open("POST", "https://identity2.fr1.cloudwatt.com/v2.0/tokens", false); //Creation de la requete POST
            xhr_object.setRequestHeader("Content-Type", "application/json");
            //Creation objet JSON en argument de la requete
            var obj = '{"auth": {"passwordCredentials": {"username": "' + formulaire.elements[0].value + '", "password": "' + formulaire.elements[1].value + '"}}}';
            xhr_object.send(obj);
            if (xhr_object.readyState === 4 && (xhr_object.status === 200 || xhr_object.status === 0)) {//Si tout Ok

                var response = JSON.parse(xhr_object.responseText); //Parsing de la reponse en format JSON
                welcome(response.access.user.name); // Message de bienvenue
                //require(['apps2']);
                selectTenant(response.access.token.id); //Selection du Tenant de l'utilisateur

           }
            else {
                displayForm("P", "BAD credential !!")
            }
        } else { // XMLHttpRequest non supporté par le navigateur
            alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest...");
        }
    } else {
        displayForm("P", "format @ mail invalide");
    }
}
//Verifie format adresse mail
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
//fonction welcome
function welcome(response) {
    bienvenue.innerHTML += "Welcome " + response;
}
//affiche la liste des tenants associés à l'utilisateur
function selectTenant(tokenId) {
    var xhr_tenant = new XMLHttpRequest(); //Creation objet JSON
    xhr_tenant.open("GET", "https://identity2.fr1.cloudwatt.com/v2.0/tenants?", false); //Creation de la requete Get APIV2,0/tenant
    xhr_tenant.setRequestHeader("X-Auth-Token", tokenId);
    xhr_tenant.send();
    var tenantArr = JSON.parse(xhr_tenant.responseText).tenants// Parsing de la reponse
    var myDiv = document.getElementById('tenant'); //Position sur id-tenant dans Form
    var form = document.createElement("form"); //creation d'un formulaire
    form.className="form-horizontal";
    var divGroup = document.createElement("div");
    divGroup.className="form-group";
    var para = document.createElement("label");
    para.htmlFor = "SelectTenant";
    para.className = "control-label col-lg-2";
    var text = document.createTextNode("Select your tenant Id  ");
    myDiv.appendChild(form);
    form.appendChild(divGroup);
    para.appendChild(text);
    divGroup.appendChild(para);
    var selectList = document.createElement("select");
    selectList.id = "mySelect";
    form.appendChild(selectList);
    var option = document.createElement("option");
    option.value = "0";
    selectList.selectedIndex=0;
    option.text = "Select your tenant";

    selectList.appendChild(option);
    for (var i = 0; i < tenantArr.length; i++) {
        //displayForm("P","tenant id= "+tenantArr[i].id);
        //option +='<option value="'+(i+1)+'">'+tenantArr[i].id+'</option>';
        var option = document.createElement("option");
        option.value = tenantArr[i].id;
        option.text = tenantArr[i].id;
        selectList.appendChild(option);
    }
    //pour test plusieurs tenant
    var option = document.createElement("option");
    option.value = "ffffffffffffff";
    option.text = "ffffffffffffff";
    selectList.appendChild(option);

    var selectmenu=document.getElementById("mySelect")
    selectmenu.onchange=function(){ //run some code when "onchange" event fires
        var chosenoption=this.options[this.selectedIndex] //this refers to "selectmenu"
        if (chosenoption.value!="0"){
//           sessionWebCom(tokenId, chosenoption.value); //Enregistrement sur Webcom du choix user
            var actionId = getActionId(tokenId, chosenoption.value);
            console.log("actionId="+actionId);
            displayCommandForm(actionId);

        }
    }

}



function getActionId(tokenId, tenantId) {
    //ajout du choix user dans webcom
    var record = myRef.child("Session");
    var obj = record.push({
        tokenId: tokenId,
        tenantId: tenantId
    });
    return obj.name();
}

//Creation d'une session dans Webcom - retourne l'Uniq Id de l'objet
function displayCommandForm(actionId) {
    var tenant = document.getElementById('tenant');
    tenant.innerHTML+="Session ID Webcom="+actionId; // affichage de l'ID de session Webcom
    console.log ("avant");
    document.getElementById("SSForm").style.display = 'block'; // affichage du sous-formulaire la liste des commandes
    console.log ("apres");
    $('#ValideChose').click(submitLSCommand.bind(null, actionId));//obliger bind(null, pour attendre la saisie du user
}

function submitLSCommand(actionId) {
    var args="";
    var valeurs = getLSArguments();
    console.log("valeurs="+valeurs);
    for (var i = 0; i < valeurs.length; i++){
        loader.innerHTML+='</br>Key: ' + i + '; Valeur: ' + valeurs[i].value;
        args += valeurs[i].value;
        console.log(args);
    }
    var childRef = new Webcom('https://webcom.orange.com/base/form/Session');
    childRef.child(actionId).update({
        args: args
    });
}

function getLSArguments() {
    return $('#toto input[type="checkbox"]:checked').toArray();
    //return $('#toto input[type="checkbox"]:checked').toArray().reduce(function(a, o) {
    //        return a+ o.val();
    //    }, "");
}


/*function choixUser(){ // insere les choix case à cocher dans valeurs

//Creation d'une session dans Webcom - retourne l'Uniq Id de l'objet
function sessionWebCom(tokenId, tenantId) {
    var myRef = new Webcom('https://webcom.orange.com/base/form'); //creation d'un objet Webcom
    //ajout du choix user dans webcom
    var record = myRef.child("Session");
    var newRecord = record.push({
        tokenId: tokenId,
        tenantId: tenantId
    });
    var recordId = newRecord.name();
    tenant.innerHTML+="Session ID Webcom"+recordId; // affichage de l'ID de session Webcom
    document.getElementById("SSForm").style.display = 'block'; // affichage de la liste des commandes
    choixUser();


}



function choixUser(){ // insere les choix case à cocher dans valeurs

    var valeurs = [];
    jQuery(document).ready(function() {
        $('input:checkbox').on('click', function () {
            valeurs.push($(this).val());

        });
        $("#ValideChose").click(function () {
            for (var i = 0; i < valeurs.length; i++){
                loader.innerHTML+='</br>Key: ' + i + '; Valeur: ' + valeurs[i];

            }
        });



    });

    newRecord.update({ls: valeurs});
}
*/








function displayForm(id, recordId) {
    var para = document.createElement(id);
    var value = document.createTextNode(recordId);
    para.appendChild(value);
    document.body.appendChild(para);
}
