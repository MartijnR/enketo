/**
 * The common require.js configuration file, to be loaded in the main-xxxx files.
 */

require.config( {
    baseUrl: "/src/js/module",
    paths: {
        "require-config": "../require-config", // for building
        "require-online-config": "../require-online-config", // for building
        "enketo-js": "../../../lib/enketo-core/src/js",
        "enketo-widget": "../../../lib/enketo-core/src/widget",
        "enketo-config": "../config.json", //should move elsewhere
        "text": "../../../lib/enketo-core/lib/text/text",
        "xpath": "../../../lib/enketo-core/lib/xpath/build/enketo-xpathjs",
        "file-manager": "file-manager",
        "file-system": "../../../lib/file-system/src/file-system",
        "jquery.xpath": "../../../lib/enketo-core/lib/jquery-xpath/jquery.xpath",
        "bootstrap": "../../../lib/bower-components/bootstrap-sass-official/assets/javascripts/bootstrap",
        "bootstrap-slider": "../../../lib/enketo-core/lib/bootstrap-slider/js/bootstrap-slider",
        "jquery": "../../../lib/bower-components/jquery/dist/jquery",
        "jquery.touchswipe": "../../../lib/enketo-core/lib/jquery-touchswipe/jquery.touchSwipe",
        "file-saver": "../../../lib/bower-components/file-saver/FileSaver",
        "Blob": "../../../lib/bower-components/blob/Blob",
        "vkbeautify": "../../../lib/vkbeautify/vkbeautify",
        "leaflet": "../../../lib/bower-components/leaflet/dist/leaflet",
        "q": "../../../lib/bower-components/q/q",
        "print": "../../../lib/enketo-core/src/js/print",
        "merge-xml": "../../../lib/bower-components/mergexml/mergexml",
    },
    shim: {
        "xpath": {
            exports: "XPathJS"
        },
        "bootstrap": {
            deps: [ "jquery" ],
            exports: "jQuery.fn.popover"
        },
        "enketo-widget/date/bootstrap3-datepicker/js/bootstrap-datepicker": {
            deps: [ "jquery" ],
            exports: "jQuery.fn.datepicker"
        },
        "enketo-widget/time/bootstrap3-timepicker/js/bootstrap-timepicker": {
            deps: [ "jquery" ],
            exports: "jQuery.fn.timepicker"
        },
        "file-saver": {
            exports: "saveAs"
        },
        "Blob": {
            exports: "Blob"
        },
        "vkbeautify": {
            exports: "vkbeautify"
        },
        "leaflet": {
            exports: "L"
        }
    }
} );
