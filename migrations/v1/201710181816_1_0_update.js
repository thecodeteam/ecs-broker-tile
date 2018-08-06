exports.migrate = function (input) {
    if (getCurrentProductVersion() === "1.0.0") {
        // rename properties in latest release
        input.properties['.properties.broker_management_endpoint'] = input.properties['.properties.managementendpoint'];
        delete input.properties['.properties.managmentendpoint'];

        input.properties['.properties.broker_replication_group'] = input.properties['.properties.replicationgroup'];
        delete input.properties['.properties.replicationgroup'];

        input.properties['.properties.broker_namespace'] = input.properties['.properties.namespace'];
        delete input.properties['.properties.namespace'];

        input.properties['.properties.broker_object_endpoint'] = input.properties['.properties.objectendpoint'];
        delete input.properties['.properties.objectendpoint'];

        input.properties['.properties.broker_base_url'] = input.properties['.properties.baseurl'];
        delete input.properties['.properties.baseurl'];

        input.properties['.properties.broker_prefix'] = input.properties['.properties.prefix'];
        delete input.properties['.properties.prefix'];

        input.properties['.properties.broker_repository_endpoint'] = input.properties['.properties.repositoryendpoint'];
        delete input.properties['.properties.repositoryendpoint'];

        input.properties['.properties.broker_repository_bucket'] = input.properties['.properties.repositorybucket'];
        delete input.properties['.properties.repositorybucket'];

        input.properties['.properties.broker_repository_user'] = input.properties['.properties.repositoryuser'];
        delete input.properties['.properties.repositoryuser'];

        input.properties['.properties.security_user_name'] = input.properties['.properties.securityuser']
        delete input.properties['.properties.securityuser'];

        input.properties['.properties.security_user_password'] = input.properties['.properties.securitypassword']
        delete input.properties['.properties.password'];

        input.properties['.properties.broker_username'] = input.properties['.properties.username']
        delete input.properties['.properties.username'];

        input.properties['.properties.broker_password'] = input.properties['.properties.password']
        delete input.properties['.properties.password'];

        if (input.properties['.properties.certificate']) {
            input.properties['.properties.certificate_selector'] = {value: "No"};
            input.properties['.properties.certificate_selector.untrusted_ssl.certificate'] =
                input.properties['.properties.certificate'];
        }
        delete input.properties['.properties.certificate'];
    }

    return input;
};
