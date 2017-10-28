exports.migrate = function(input) {
  if (getCurrentProductVersion() === "1.0.0") {
    // rename & remove quotes from apiversion as that issue is corrected now.
    input.properties['.properties.api_version'] = input.properties['.properties.apiversion'];
    delete input.properties['.properties.apiversion'];
    input.properties['.properties.api_version'].value =
      input.properties['.properties.api_version'].value.replace(/"/g, "");

    // rename properties in latest release
    input.properties['.properties.management_endpoint'] = input.properties['.properties.managementendpoint'];
    delete input.properties['.properties.managmentendpoint'];

    input.properties['.properties.object_endpoint'] = input.properties['.properties.objectendpoint'];
    delete input.properties['.properties.objectendpoint'];

    input.properties['.properties.base_url'] = input.properties['.properties.baseurl'];
    delete input.properties['.properties.baseurl'];

    input.properties['.properties.repository_endpoint'] = input.properties['.properties.repositoryendpoint'];
    delete input.properties['.properties.repositoryendpoint'];

    input.properties['.properties.repository_bucket'] = input.properties['.properties.repositorybucket'];
    delete input.properties['.properties.repositorybucket'];

    input.properties['.properties.repositoryuser'] = input.properties['.properties.repositoryuser'];
    delete input.properties['.properties.repositoryuser'];

    input.properties['.properties.replication_group'] = input.properties['.properties.replicationgroup'];
    delete input.properties['.properties.replicationgroup'];

    input.properties['.properties.api_username'] = input.properties['.properties.username'];
    delete input.properties['.properties.username'];

    input.properties['.properties.api_password'] = input.properties['.properties.password'];
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
