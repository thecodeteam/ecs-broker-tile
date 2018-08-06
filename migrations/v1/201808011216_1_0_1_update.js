exports.migrate = function (input) {
    var current_version = getCurrentProductVersion();

    if (current_version === "1.0.1" || current_version == "1.0.2") {
        // rename properties in latest release
        var changed_props = {
            ".properties.broker_management_endpoint": ".properties.management_endpoint",
            ".properties.broker_replication_group": ".properties.replication_group",
            ".properties.broker_namespace": ".properties.namespace",
            ".properties.broker_username": ".properties.api_username",
            ".properties.broker_password": ".properties.api_password",
            ".properties.broker_object_endpoint": ".properties.object_endpoint",
            ".properties.broker_base_url": ".properties.base_url",
            ".properties.broker_prefix": ".properties.prefix",
            ".properties.broker_repository_endpoint": ".properties.repository_endpoint",
            ".properties.broker_repository_bucket": ".properties.repository_bucket",
            ".properties.broker_repository_user": ".properties.repository_user",
            ".properties.security_user_name": ".properties.broker_credentials.identity",
            ".properties.security_user_password": ".properties.broker_credentials.password"
            ".properties.catalog_service_settings0": ".properties.service1_service_type",
        };

        for (var k, v in changed_props) {
            input.properties[k] = input.properties[v];
            delete input.properties[v];
        }

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
            "bindable"
        ]

        for (var i = 0; i < 5; i++) {
            // simple rename of props
            for (var p in simple_service_props) {
                var old_name = ".properties.service" + (i + 1) + "_" + p;
                input.properties[".properties.catalog_services_" + i + "_" + p] =
                    input.properties[old_name];
                delete input.properties[old_name];
            }

            // handle service-settings collector
            // TODO: copy repostiroy service from service-settings into main properties...
            if (input.properties[".propereties.service" + (i + 1) + "_service_settings"].value === "Bucket") {
                input.properties[".properties.service_settings" + i + ".bucket_option.service_type"] = "bucket";
                input.properties[".properties.service_settings" + i + ".bucket_option.encrypted"] =
                    input.properties[".properties.service" + (i + 1) + "_encrypted"];

                if (typeof input.properties[".properties.service_settings" + i + ])
            } else {
                input.properties[".properties.service_settings" + i + ".namespace_option.service_type"] = "namespace";
            }
        }

        // TODO: copy "service1_quota_limit" and "service1_quota_warn" to plan, if these values are undefined in the plans
        // TODO: copy "service1_encrypted" to plan, if undefined in the plans.prop
        // TODO: copy "service1_access_during_outage" to plan, if undefined in the plans

    }

    return input;
};
