/**
 * Created by root on 2/25/16.
 */
 require(['apps'], function(apps) {
        mytest();

});







function mytest(){
    console.log("function : mytest()");
    alert("j'suis la");
}

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