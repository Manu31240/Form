require.config({
    baseUrl: 'scripts',
    paths: {
        'jquery': 'components/jquery/jquery'
    }
});
/*//require.config({
//    baseUrl: 'scripts',
//    paths: {
//        'jquery': 'components/jquery/jquery'
//    }
    //,
    //shim:{
    //    'apps2':['SessionIdWebcom']
    //}

    // config options
});
//
//
//
//require(['jquery'],function() {});
// main.js est chargé automatiquement grâce à
// l'attribut data-main dans la balise script de require.js
//require([
//    'apps2', // scripts/app2.js
//], function(App) {
    // Callback executé une fois app.js chargé
//    App.initialize();
//});

*/
requirejs([
"text!SS-Form.html" // app/templates/module.html
]);

/*    , function(SS-Form, html) {
    // vous retrouvez ici votre template
    // que vous pouvez compiler par exemple avec underscore
    //var compiledTemplate = _.template(html);
});

*/
