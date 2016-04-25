/**
 * Created by root on 2/25/16.
 */
 require(['apps2'], function(apps2) {
       retest();
});

function mytest(){
    console.log("function : mytest()");
    alert("j'suis la et toi non plus");

};

function retest(){
    alert("j'suis pas la");
    var person = {
        firstName: "Christophe",
        lastName: "Coenraets",
        blogURL: "http://coenraets.org"
            };
    var template = "<h1>{{firstName}} {{lastName}} </h1>Blog: {{blogURL}}";
    var html = Mustache.render(template, person);
    $('#content').html(html);
    alert(html);

};

/* require(['apps'],function(apps) {
    apps.mytest();
});


function myfunction() {
    //Grab the inline template
    var template = document.getElementById('template').innerHTML;

    //Parse it (optional, only necessary if template is to be used again)
    Mustache.parse(template);

    //Render the data into the template
    var rendered = Mustache.render(template, {name: "Luke", power: "force"});

    //Overwrite the contents of #target with the rendered HTML
    document.getElementById('content').innerHTML = rendered;
}
    */