/**
 * Created by root on 2/25/16.
 */
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