/**
 * Created by root on 2/16/16.
 */
//Fonction globale : Verifie credential Cloudwatt - Si Ok poursuit le traitement
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
                require(['apps2'])
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
    var divGroup = document.createElement(div);
    divGroup.className="form-group";
    var para = document.createElement("label");
    para.htmlFor="SelectTenant";
    para.className="control-label";
    var text = document.createTextNode("Select your tenant Id  ");
    myDiv.appendChild(form);
    form.appendChild(divGroup);
    para.appendChild(text);
    divGroup.appendChild(para);
    var selectList = document.createElement("select");
    selectList.id = "mySelect";
    form.appendChild(selectList);
    for (var i = 0; i < tenantArr.length; i++) {
        //displayForm("P","tenant id= "+tenantArr[i].id);
        //option +='<option value="'+(i+1)+'">'+tenantArr[i].id+'</option>';
        var option = document.createElement("option");
        option.value = i;
        option.text = tenantArr[i].id;
        selectList.appendChild(option);
    }
    ;

};


//Creation d'une session dans Webcom - retourne l'Uniq Id de l'objet
function sessionWebCom(tokenId, tenantId) {
    var myRef = new Webcom('https://webcom.orange.com/base/form'); //creation d'un objet Webcom
    var record = myRef.child("Session"); //creation d'un fils Session
    var newRecord = record.push({ //ajout des valeurs Cloudwatt
        tokenId: tokenId,
        tenantId: tenantId
    });

    var recordId = newRecord.name();
    return (recordId);
}
function displayForm(id, recordId) {
    var para = document.createElement(id);
    var value = document.createTextNode(recordId);
    para.appendChild(value);
    document.body.appendChild(para);
}
