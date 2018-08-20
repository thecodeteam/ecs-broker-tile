exports.migrate = function (input) {
    var current_version = getCurrentProductVersion();

    if (current_version === "1.0.1" || current_version === "1.0.2") {
        // rename properties in latest release
        moveServiceSettingsToSelector(input)
        renameSimpleProps(input);
        updateCatalogServices(input);
    }

//    if (
//        typeof input.properties[".properties.broker_certificate_selector"] !== "undefined" &&
//        input.properties[".properties.broker_certificate_selector"] !== null &&
//        input.properties[".properties.broker_certificate_selector"] === "No"
//       ) {
//        input.properties[".properties.broker_certificate_selector.untrusted_ssl.certificate"] = input.properties[".properties.certificate_selector.untrusted_ssl.certificate"];
//    }

    return input;
};

function renameSimpleProps(input) {
    var changed_props = {
        ".properties.broker_management_endpoint": ".properties.management_endpoint",
        ".properties.broker_replication_group":   ".properties.replication_group",
        ".properties.broker_namespace": ".properties.namespace",
        ".properties.broker_username": ".properties.api_username",
//        ".properties.broker_password": ".properties.api_password",
//         ".properties.broker_certificate_selector.untrusted_ssl": ".properties.certificate_selector.untrusted_ssl",
        ".properties.broker_object_endpoint": ".properties.object_endpoint",
        ".properties.broker_base_url": ".properties.base_url",
        ".properties.broker_prefix": ".properties.prefix",
        ".properties.broker_repository_endpoint": ".properties.repository_endpoint",
        ".properties.broker_repository_bucket": ".properties.repository_bucket",
        ".properties.broker_repository_user": ".properties.repository_user",
        ".properties.security_user_name": ".properties.broker_credentials.identity",
        ".properties.security_user_password": ".properties.broker_credentials.password",
//        ".properties.catalog_service_settings0": ".properties.service1_service_type",
//        ".properties.catalog_service_settings1": ".properties.service2_service_type",
//        ".properties.catalog_service_settings2": ".properties.service3_service_type",
//        ".properties.catalog_service_settings3": ".properties.service4_service_type",
//        ".properties.catalog_service_settings4": ".properties.service5_service_type"
    };



    // input.properties[".properties.broker_certificate_selector.untrusted_ssl"] =
    //     input.properties[".properties.certificate_selector.untrusted_ssl"];
    // delete input.properties[".properties.certificate_selector.untrusted_ssl"];
    //
    // input.properties[".properties.broker_certificate_selector.trusted_ssl"] =
    //     input.properties[".properties.certificate_selector.trusted_ssl"];
    // delete input.properties[".properties.certificate_selector.trusted_ssl"];


    // if (".properties.certificate_selector.untrusted_ssl.certificate" in input.properties) {
    //     input.properties[".properties.broker_certificate_selector.untrusted_ssl.certificate"] =
    //         input.properties[".properties.certificate_selector.untrusted_ssl.certificate"];
    //     delete input.properties[".properties.certificate_selector.untrusted_ssl.certificate"]
    // }

    // if (typeof input.properties[".properties.broker_certificate_selector"] !== "undefined" &&
    //     input.properties[".properties.broker_certificate_selector"] !== null) {
    //     var broker_certificate = ".properties.broker_certificate_selector";
    // }

    input.properties[".properties.broker_certificate_selector"] = input.properties[".properties.certificate_selector"];


    if (typeof input.properties[".properties.certificate_selector.trusted_ssl"] === "undefined") {
        input.properties[".properties.broker_certificate_selector.untrusted_ssl.certificate"] =
            input.properties[".properties.certificate_selector.untrusted_ssl.certificate"];
    }

    if (
        typeof input.properties[".properties.broker_password"] !== 'undefined' &&
        input.properties[".properties.broker_password"] !== null
    ) {
        input.properties[".properties.broker_password"] = input.properties[".properties.api_password."].toString();
    }

    for (var key in changed_props) {
        var value = changed_props[key];
        if (typeof input.properties[value] !== "undefined" && input.properties[value] !== null) {
            input.properties[key] = input.properties[value];
            delete input.properties[value];
        }
    }
}

function updateCatalogServices(input) {
    var simple_service_props = [
        "guid",
        "active",
        "name",
        "description",
        "display_name",
        "image_url",
        "long_description",
        "provider_display_name",
        "documentation_url",
        "support_url",
        "bindable",
    ];

    // handle complex properties. catalog services and plans
    for (var service_index = 0; service_index < 5; service_index++) {
        renameSimpleServiceProps(simple_service_props, service_index, input);
        renamePlanCollection(service_index, input);
        overridePlanProperties(service_index, input);
//        renameServiceSettings(service_index, input);
    }
}

function renameSimpleServiceProps(simple_service_props, service_index, input) {
    for (var i in simple_service_props) {
        var prop = simple_service_props[i];
        var old_name = ".properties.service" + (service_index + 1) + "_" + prop;
        if (typeof input.properties[old_name] !== "undefined" && input.properties[old_name] !== null) {
            input.properties[".properties.catalog_services_" + service_index + "_" + prop] =
                input.properties[old_name];
            delete input.properties[old_name];
        }
    }
}

function renamePlanCollection(service_index, input) {
    var old_name = ".properties.service" + (service_index + 1) + "_plans";
    if (typeof input.properties[old_name] !== "undefined" && input.properties[old_name] !== null) {
        input.properties[".properties.catalog_plan_collection" + service_index] =
            input.properties[old_name];
        delete input.properties[old_name];
    }
}

function overridePlanProperties(service_index, input) {
    var plan_key = ".properties.catalog_plan_collection" + service_index;
    var overridables = [
        "quota_limit",
        "quota_warn",
        "access_during_outage"
    ];
    if (typeof input.properties[plan_key] !== "undefined" && input.properties[plan_key] !== null) {
        for (var plan_index in input.properties[plan_key].value) {
            var plan = input.properties[plan_key].value[plan_index];
            for(var overridable_index in overridables) {
                var o = overridables[overridable_index];
                var old_key = ".properties.service" + (service_index + 1) + "_" + o;
                if (
                    typeof plan.value === "undefined" ||
                    plan.value === null ||
                    plan.value === ""
                ) {
                    if (typeof input.properties[old_key] !== "undefined" && input.properties[old_key] !== null) {
                        input.properties[plan_key].value[plan_index][o] = input.properties[old_key];
                    }
                }
                delete input.properties[old_key];

            }
        }
    }
}

function renameServiceSettings(service_index, input) {
    if (input.properties[".properties.catalog_service_settings" + service_index]) {
        if (input.properties[".properties.catalog_service_settings" + service_index].value === "Bucket") {
           reformatBucketSelector(service_index, input);
        } else if (input.properties[".properties.catalog_service_settings" + service_index].value === "Namespace") {
           reformatNamespaceSelector(service_index, input);
        } else {
            console.log("ERR: Unable to reformat service instance");
            console.log(input);
            exit(1);
        }
    }
}

function reformatBucketSelector(service_index, input) {
    var bucket_props = [
        "head_type",
        "file_accessible",
        "default_retention",
        "default_bucket_quota"
    ];

    input.properties[".properties.catalog_service_settings" + service_index + ".bucket_option.service_type"] = {
        value: "bucket"
    };

    for (var i in bucket_props) {
        var prop = bucket_props[i];
        var old_name = ".properties.service" + (service_index + 1) + "_service_type.bucket_option." + prop;
        if (typeof input.properties[old_name] !== "undefined" && input.properties[old_name] !== null) {
            input.properties[".properties.catalog_service_settings" + service_index + ".bucket_option." + prop] =
                input.properties[old_name];
            delete input.properties[old_name];
        }
    }

    // move repository service to main properties
    var old_repo_name = ".properties.service" + (service_index + 1) + "_service_type.bucket_option.repository_service";
    if (
        typeof input.properties[old_repo_name] !== "undefined" &&
        input.properties[old_repo_name] !== null
    ) {
        input.properties[".properties.catalog_services_" + service_index + "_" + "repository_service"] =
            input.properties[old_repo_name];
         delete input.properties[old_repo_name];
    }

    moveServiceSettingsToSelector(service_index, "bucket", input, "encrypted");
    moveServiceSettingsToSelector(service_index, "bucket", input, "access_during_outage");
}

function reformatNamespaceSelector(service_index, input) {

    var namespace_props = [
        "compliance_enabled",
        "default_bucket_quota"
    ];

    for (var i in namespace_props) {
        var prop = namespace_props[i];
        var old_name = ".properties.service" + (service_index + 1) + "_service_type.namespace_option." + prop;
        if (typeof input.properties[old_name] !== "undefined" && input.properties[old_name] !== null) {
            input.properties[".properties.catalog_service_settings" + service_index + ".namespace_option." + prop] =
                input.properties[old_name];
            delete input.properties[old_name];
        }
    }

    moveServiceSettingsToSelector(service_index, "namespace", input, "encrypted");
    moveServiceSettingsToSelector(service_index, "namespace", input, "access_during_outage");
}

// function moveServiceSettingsToSelector(service_index, option, input, prop) {
//     var old_name = ".properties.service" + (service_index + 1) + "_" + prop;
//     var new_name = ".properties.catalog_service_settings" + service_index + "." + option + "_option." + prop;
//     if (typeof input.properties[old_name] !== "undefined" && input.properties[old_name] !== null) {
//         input.properties[new_name] = input.properties[old_name];
//         delete input.properties[old_name];
//     }
// }

function moveServiceSettingsToSelector(input) {
    for (var i = 0; i < 5; i++) {
        // Bucket stuff
        input.properties[(".properties.catalog_service_settings" + i)] =
            input.properties[(".properties.service" + (i+1) +"_service_type")];

        input.properties[(".properties.catalog_service_settings" + i +".bucket_option.file_accessible")] =
            input.properties[(".properties.service" + (i+1) +"_service_type.bucket_option.file_accessible")];

        input.properties[(".properties.catalog_service_settings" + i + ".bucket_option.encrypted")] =
            input.properties[(".properties.service" + (i+1) +"_encrypted")];

        input.properties[(".properties.catalog_service_settings" + i + ".bucket_option.default_retention")] =
            input.properties[(".properties.service" + (i+1) +"_service_type.bucket_option.default_retention")];

        // Namespace stuff
        input.properties[(".properties.catalog_service_settings" + i + ".namespace_option.compliance_enabled")] =
            input.properties[(".properties.service" + (i+1) +"_service_type.namespace_option.compliance_enabled")];

        input.properties[(".properties.catalog_service_settings" + i + ".namespace_option.default_bucket_quota")] =
            input.properties[(".properties.service" + (i+1) +"_service_type.namespace_option.default_bucket_quota")];

        input.properties[(".properties.catalog_service_settings" + i + ".namespace_option.encrypted")] =
            input.properties[(".properties.service" + (i+1) +"_encrypted")];
    }
}
