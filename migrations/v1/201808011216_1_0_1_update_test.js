const migration = require('./201808011216_1_0_1_update');

describe("migration from 1.0.1", function() {

    beforeAll(function() {
        window.getCurrentProductVersion = function() { return "1.0.1"; }
    });

    describe("simple field renaming", function() {

        var input = {};
        var output = {};

        beforeEach(function() {
            input = changedPropsInput();
            output = migration.migrate(input);
        })

        test("it converts management endpoint", function() {
            expect(output.properties[".properties.broker_management_endpoint"].value)
                .toBe("MANAGEMENT_ENDPOINT");
        });

        test("it converts replication group", function() {
            expect(output.properties[".properties.broker_replication_group"].value)
                .toBe("REPLICATION_GROUP");
        });

        test("it converts namespace", function() {
            expect(output.properties[".properties.broker_namespace"].value)
                .toBe("NAMESPACE");
        });

        test("it converts username", function() {
            expect(output.properties[".properties.broker_username"].value)
                .toBe("USERNAME");
        });

        test("it converts password", function() {
            expect(output.properties[".properties.broker_password"].value.secret)
                .toBe("PASSWORD");
        });

        test("it converts the object endpoint", function() {
            expect(output.properties[".properties.broker_object_endpoint"].value)
                .toBe("OBJECTENDPOINT");
        });

        // TODO: cover other changed_props renames
    });

    describe("renamed catalog service props", function() {

        var input = {};
        var output = {};

        beforeEach(function() {
            input = changedServicePropsInput();
            output = migration.migrate(input);
        })

        test("it converts each service1 guid", function() {
            expect(output.properties[".properties.catalog_services_0_guid"].value)
                .toBe("SERVICE1_GUID");
        });

        test("it converts each service2 guid", function() {
            expect(output.properties[".properties.catalog_services_1_guid"].value)
                .toBe("SERVICE2_GUID");
        });

        test("it converts each service1 active", function() {
            expect(output.properties[".properties.catalog_services_0_active"].value)
                .toBe("SERVICE1_ACTIVE");
        });

        test("it converts each service2 active", function() {
            expect(output.properties[".properties.catalog_services_1_active"].value)
                .toBe("SERVICE2_ACTIVE");
        });

        test("it converts each service1 name", function() {
            expect(output.properties[".properties.catalog_services_0_name"].value)
                .toBe("SERVICE1_NAME");
        });

        test("it converts each service2 name", function() {
            expect(output.properties[".properties.catalog_services_1_name"].value)
                .toBe("SERVICE2_NAME");
        });

    });

    describe("renamed catalog service plans", function() {

        var input = {};
        var output = {};

        beforeEach(function() {
            input = changedServicePlansInput();
            output = migration.migrate(input);
        })

        test("it converts each service1 plan1 guid", function() {
            expect(output.properties[".properties.catalog_plan_collection0"].value[0].id.value)
                .toBe("SERVICE1_PLAN1_GUID");
        });

        test("it converts each service1 plan2 guid", function() {
            expect(output.properties[".properties.catalog_plan_collection0"].value[1].id.value)
                .toBe("SERVICE1_PLAN2_GUID");
        });

        test("it converts each service1 plan1 name", function() {
            expect(output.properties[".properties.catalog_plan_collection0"].value[0].name.value)
                .toBe("SERVICE1_PLAN1_NAME");
        });

        test("it converts each service1 plan2 name", function() {
            expect(output.properties[".properties.catalog_plan_collection0"].value[1].name.value)
                .toBe("SERVICE1_PLAN2_NAME");
        });

        test("it converts each service1 plan1 quota_limit", function() {
            expect(output.properties[".properties.catalog_plan_collection0"].value[0].quota_limit.value)
                .toBe("SERVICE1_PLAN1_QUOTA_LIMIT");
        });

        test("it converts each service1 plan2 quota_limit", function() {
            expect(output.properties[".properties.catalog_plan_collection0"].value[1].quota_limit.value)
                .toBe("SERVICE1_PLAN2_QUOTA_LIMIT");
        });

        test("it converts each service1 plan1 quota_warn", function() {
            expect(output.properties[".properties.catalog_plan_collection0"].value[0].quota_warn.value)
                .toBe("SERVICE1_PLAN1_QUOTA_WARN");
        });

        test("it converts each service1 plan2 quota_warn", function() {
            expect(output.properties[".properties.catalog_plan_collection0"].value[1].quota_warn.value)
                .toBe("SERVICE1_PLAN2_QUOTA_WARN");
        });

        test("it converts each service1 plan1 ado", function() {
            expect(output.properties[".properties.catalog_plan_collection0"].value[0].access_during_outage.value)
                .toBe("SERVICE1_PLAN1_ACCESS_DURING_OUTAGE");
        });

        test("it converts each service1 plan2 ado", function() {
            expect(output.properties[".properties.catalog_plan_collection0"].value[1].access_during_outage.value)
                .toBe("SERVICE1_PLAN2_ACCESS_DURING_OUTAGE");
        });

        // TODO: test multiple services each with multiple plans
        // TODO: test more parameters
    });

    describe("overrides from service settings in plans", function() {

        var input = {};
        var output = {};

        beforeEach(function() {
            input = planOverridesFromServices();
            output = migration.migrate(input);
        });

        test("service1 plan1 quota limit should be overridden", function() {
            expect(output.properties[".properties.catalog_plan_collection0"].value[0].quota_limit.value)
                .toBe("SERVICE1_QUOTA_LIMIT");
        });

        test("service1 plan1 quota warn should be overridden", function() {
            expect(output.properties[".properties.catalog_plan_collection0"].value[0].quota_warn.value)
                .toBe("SERVICE1_QUOTA_WARN");
        });

        test("service1 plan1 ado should be overridden", function() {
            expect(output.properties[".properties.catalog_plan_collection0"].value[0].access_during_outage.value)
                .toBe("SERVICE1_ACCESS_DURING_OUTAGE");
        });

        test("service1 plan2 quota limit should not be overridden", function() {
            expect(output.properties[".properties.catalog_plan_collection0"].value[1].quota_limit.value)
                .toBe("SERVICE1_PLAN2_QUOTA_LIMIT");
        });

        test("service1 plan2 quota warn should not be overridden", function() {
            expect(output.properties[".properties.catalog_plan_collection0"].value[1].quota_warn.value)
                .toBe("SERVICE1_PLAN2_QUOTA_WARN");
        });

        test("service1 plan2 ado should not be overridden", function() {
            expect(output.properties[".properties.catalog_plan_collection0"].value[1].access_during_outage.value)
                .toBe("SERVICE1_PLAN2_ACCESS_DURING_OUTAGE");
        });

    });

    describe("renamed bucket props", function() {

        var input = {};
        var output = {};

        beforeEach(function() {
            input = bucketSelectorProps()
            output = migration.migrate(input);
        });

        test("it renames service1 bucket service_settings", function() {
            expect(output.properties[".properties.catalog_service_settings0"].value).toBe("Bucket");
        });

        test("it sets service1 bucket service_type", function() {
            expect(output.properties[".properties.catalog_service_settings0.bucket_option.service_type"].value)
                .toBe("bucket");
        });

        test("it sets service2 bucket service_type", function() {
            expect(output.properties[".properties.catalog_service_settings1.bucket_option.service_type"].value)
                .toBe("bucket");
        });

        test("it renames service1 bucket head_type", function() {
            expect(output.properties[".properties.catalog_service_settings0.bucket_option.head_type"].value)
                .toBe("SERVICE1_HEAD_TYPE");
        });

        test("it renames service2 bucket head_type", function() {
            expect(output.properties[".properties.catalog_service_settings1.bucket_option.head_type"].value).toBe("SERVICE2_HEAD_TYPE");
        });

        test("it renames service1 bucket file_accessible", function() {
            expect(output.properties[".properties.catalog_service_settings0.bucket_option.file_accessible"].value).toBe("SERVICE1_FILE_ACCESSIBLE");
        });

        test("it renames service2 bucket file_accessible", function() {
            expect(output.properties[".properties.catalog_service_settings1.bucket_option.file_accessible"].value).toBe("SERVICE2_FILE_ACCESSIBLE");
        });

        // TODO test remaining bucket properties

        test("moves the repository_service to main properties", function() {
            expect(output.properties[".properties.catalog_services_0_repository_service"].value).
                toBe("SERVICE1_REPO_SERVICE");
        });

        test("moves service1 encrypted into bucket option", function() {
            expect(output.properties[".properties.catalog_service_settings0.bucket_option.encrypted"].value).
                toBe("SERVICE1_ENCRYPTED");
        });

        test("moves service2 encrypted into bucket option", function() {
            expect(output.properties[".properties.catalog_service_settings1.bucket_option.encrypted"].value).
                toBe("SERVICE2_ENCRYPTED");
        });

    });

    describe("renamed namespace props", function() {

        var input = {};
        var output = {};

        beforeEach(function() {
            input = namespaceSelectorProps();
            output = migration.migrate(input);
        });

        test("renames service1 namespace compliance_enabled", function() {
            expect(output.properties[".properties.catalog_service_settings0.namespace_option.compliance_enabled"].value).
                toBe("SERVICE1_COMPLIANCE_ENABLED");
        });

        test("renames service1 namespace default_bucket_quota", function() {
            expect(output.properties[".properties.catalog_service_settings0.namespace_option.default_bucket_quota"].value).
                toBe("SERVICE1_DEFAULT_BUCKET_QUOTA");
        });

        test("renames service2 namespace compliance_enabled", function() {
            expect(output.properties[".properties.catalog_service_settings1.namespace_option.compliance_enabled"].value).
                toBe("SERVICE2_COMPLIANCE_ENABLED");
        });

        test("moves service1 encrypted into namespace option", function() {
            expect(output.properties[".properties.catalog_service_settings0.namespace_option.encrypted"].value).
                toBe("SERVICE1_ENCRYPTED");
        });

        test("moves service2 encrypted into namespace option", function() {
            expect(output.properties[".properties.catalog_service_settings1.namespace_option.encrypted"].value).
                toBe("SERVICE2_ENCRYPTED");
        });

    });

});

function changedPropsInput() {
    return {
        properties: {
            ".properties.management_endpoint": {
                value: "MANAGEMENT_ENDPOINT"
            },
            ".properties.replication_group": {
                value: "REPLICATION_GROUP"
            },
            ".properties.namespace": {
                value: "NAMESPACE"
            },
            ".properties.api_username": {
                value: "USERNAME"
            },
            ".properties.api_password": {
                value: "PASSWORD"
            },
            ".properties.object_endpoint": {
                value: "OBJECTENDPOINT"
            },
            ".properties.catalog_service_settings0": {
                value: "Bucket"
            }
        }
    };
}

function changedServicePropsInput() {
    return {
        properties: {
            ".properties.service1_guid": {
                value: "SERVICE1_GUID"
            },
            ".properties.service1_active": {
                value: "SERVICE1_ACTIVE"
            },
            ".properties.service1_name": {
                value: "SERVICE1_NAME"
            },
            ".properties.service2_guid": {
                value: "SERVICE2_GUID"
            },
            ".properties.service2_active": {
                value: "SERVICE2_ACTIVE"
            },
            ".properties.service2_name": {
                value: "SERVICE2_NAME"
            }
        }
    };
}

function changedServicePlansInput() {
    return {
        properties: {
            ".properties.service1_plans": {
                value: [
                    {
                        plan_guid:            {value: "SERVICE1_PLAN1_GUID"},
                        name:                 {value: "SERVICE1_PLAN1_NAME"},
                        quota_limit:          {value: "SERVICE1_PLAN1_QUOTA_LIMIT"},
                        quota_warn:           {value: "SERVICE1_PLAN1_QUOTA_WARN"},
                        access_during_outage: {value: "SERVICE1_PLAN1_ACCESS_DURING_OUTAGE"}
                    },
                    {
                        plan_guid:            {value: "SERVICE1_PLAN2_GUID"},
                        name:                 {value: "SERVICE1_PLAN2_NAME"},
                        quota_limit:          {value: "SERVICE1_PLAN2_QUOTA_LIMIT"},
                        quota_warn:           {value: "SERVICE1_PLAN2_QUOTA_WARN"},
                        access_during_outage: {value: "SERVICE1_PLAN2_ACCESS_DURING_OUTAGE"}
                    }
                ]
            }
        }
    }
}

function bucketSelectorProps() {
    return {
        properties: {
            ".properties.service1_encrypted": {
                value: "SERVICE1_ENCRYPTED"
            },
            ".properties.service2_encrypted": {
                value: "SERVICE2_ENCRYPTED"
            },
            ".properties.service1_access_during_outage": {
                value: "SERVICE1_ACCESS_DURING_OUTAGE"
            },
            ".properties.service2_access_during_outage": {
                value: "SERVICE2_ACCESS_DURING_OUTAGE"
            },
            ".properties.service1_service_type": {
                value: "Bucket"
            },
            ".properties.service1_service_type.bucket_option.head_type": {
                value: "SERVICE1_HEAD_TYPE"
            },
            ".properties.service1_service_type.bucket_option.file_accessible": {
                value: "SERVICE1_FILE_ACCESSIBLE"
            },
            ".properties.service1_service_type.bucket_option.default_retention": {
                value: "SERVICE1_DEFAULT_RETENTION"
            },
            ".properties.service1_service_type.bucket_option.default_bucket_quota": {
                value: "SERVICE1_DEFAULT_BUCKE_QUOTA"
            },
            ".properties.service1_service_type.bucket_option.repository_service": {
                value: "SERVICE1_REPO_SERVICE"
            },
            ".properties.service2_service_type": {
                value: "Bucket"
            },
            ".properties.service2_service_type.bucket_option.head_type": {
                value: "SERVICE2_HEAD_TYPE"
            },
            ".properties.service2_service_type.bucket_option.file_accessible": {
                value: "SERVICE2_FILE_ACCESSIBLE"
            },
            ".properties.service2_service_type.bucket_option.default_retention": {
                value: "SERVICE2_DEFAULT_RETENTION"
            },
            ".properties.service2_service_type.bucket_option.repository_service": {
                value: "SERVICE2_REPO_SERVICE"
            },
            ".properties.service2_service_type.bucket_option.default_bucket_quota": {
                value: "SERVICE2_DEFAULT_BUCKE_QUOTA"
            }
        }
    }
}

function namespaceSelectorProps() {
    return {
        properties: {
            ".properties.service1_encrypted": {
                value: "SERVICE1_ENCRYPTED"
            },
            ".properties.service2_encrypted": {
                value: "SERVICE2_ENCRYPTED"
            },
            ".properties.service1_access_during_outage": {
                value: "SERVICE1_ACCESS_DURING_OUTAGE"
            },
            ".properties.service2_access_during_outage": {
                value: "SERVICE2_ACCESS_DURING_OUTAGE"
            },
            ".properties.service1_service_type": {
                value: "Namespace"
            },
            ".properties.service2_service_type": {
                value: "Namespace"
            },
            ".properties.service1_service_type.namespace_option.compliance_enabled": {
                value: "SERVICE1_COMPLIANCE_ENABLED"
            },
            ".properties.service2_service_type.namespace_option.compliance_enabled": {
                value: "SERVICE2_COMPLIANCE_ENABLED"
            },
            ".properties.service1_service_type.namespace_option.default_bucket_quota": {
                value: "SERVICE1_DEFAULT_BUCKET_QUOTA"
            },
            ".properties.service2_service_type.namespace_option.default_bucket_quota": {
                value: "SERVICE2_DEFAULT_BUCKET_QUOTA"
            }
        }
    }
}

function planOverridesFromServices() {
    return {
        properties: {
            ".properties.service1_quota_limit": {
                value: "SERVICE1_QUOTA_LIMIT"
            },
            ".properties.service2_quota_limit": {
                value: "SERVICE2_QUOTA_LIMIT"
            },
            ".properties.service1_quota_warn": {
                value: "SERVICE1_QUOTA_WARN"
            },
            ".properties.service2_quota_warn": {
                value: "SERVICE2_QUOTA_LIMIT"
            },
            ".properties.service1_access_during_outage": {
                value: "SERVICE1_ACCESS_DURING_OUTAGE"
            },
            ".properties.service2_access_during_outage": {
                value: "SERVICE2_ACCESS_DURING_OUTAGE"
            },
            ".properties.service1_plans": {
                value: [
                    {
                        guid:                 {value: "SERVICE1_PLAN1_GUID"},
                        name:                 {value: "SERVICE1_PLAN1_NAME"},
                        quota_limit:          {value: ""},
                        quota_warn:           {value: null},
                    },
                    {
                        guid:                 {value: "SERVICE1_PLAN2_GUID"},
                        name:                 {value: "SERVICE1_PLAN2_NAME"},
                        quota_limit:          {value: "SERVICE1_PLAN2_QUOTA_LIMIT"},
                        quota_warn:           {value: "SERVICE1_PLAN2_QUOTA_WARN"},
                        access_during_outage: {value: "SERVICE1_PLAN2_ACCESS_DURING_OUTAGE"}
                    }
                ]
            }
        }
    };
}
