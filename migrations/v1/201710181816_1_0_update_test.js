const migration = require("./201710181816_1_0_update")

describe("migration from 1.0.0", function() {
    beforeAll(function() {
        window.getCurrentProductVersion = function() { return "1.0.0"; }
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

        test("it converts objectj endpoint", function() {
            expect(output.properties[".properties.broker_object_endpoint"].value)
                .toBe("OBJECTENDPOINT");
        });

        // TODO: cover other changed_props renames
        // TODO: test catalog selector

    });
});

function changedPropsInput() {
    return {
        properties: {
            ".properties.managementendpoint": {
                value: "MANAGEMENT_ENDPOINT"
            },
            ".properties.replication_group": {
                value: "REPLICATIONGROUP"
            },
            ".properties.username": {
                value: "USERNAME"
            },
            ".properties.password": {
                value: "PASSWORD"
            },
            ".properties.objectendpoint": {
                value: "OBJECTENDPOINT"
            }
        }
    };
}

