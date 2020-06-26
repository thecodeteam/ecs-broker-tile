exports.migrate = function (input) {
    var current_version = getCurrentProductVersion();

    // prints out all properties as json in the description field
    // input['properties']['.properties.catalog_services_0_long_description']['value'] = JSON.stringify(input['properties']);

    if (current_version.startsWith("1.")) {
        // cost currency field added since 2.0
        console.log('upgrade needed for currency fields in plan definitions');

        addCurrencyDefaults(input['properties']);
    }

    return input;
};

function addCurrencyDefaults(props) {
    for (var plan_collection_index = 0; plan_collection_index < 5; plan_collection_index++) {
        var plan_coll = ".properties.catalog_plan_collection" + plan_collection_index;

        if (typeof props[plan_coll] !== "undefined" && props[plan_coll] !== null) {
            var plans = props[plan_coll]['value'];
            for (let plan of plans) {
                plan['cost_value'] = plan['cost_usd'];
                plan['cost_currency'] = {'value': 'USD', 'type': 'string'};
            }
        }
    }
}
