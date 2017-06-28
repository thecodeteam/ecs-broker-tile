# EMC ECS Service Broker PCF Tile

## Description

*This Project is in a work in progress state currently relase 0.9 public beta vesion is available under relase branch*

A BOSH release for the [ECS CF service broker](https://github.com/emccode/final/ecs-cf-service-broker).
It is based on [BOSH Generic SB Release](https://github.com/cf-platform-eng/bosh-generic-sb-release),
and along with packages for the CF CLI and the broker itself exposes the following BOSH Errands:

* **deploy-service-broker**:  Deploy the broker as a CF app.
* **register-broker**: Register the deployed broker with CF as service broker.
* **destroy-broker**: Deregister and delete the app from CF.

Upon completion, PCF Tile will support dynamic plans which enables the broker to
be configured from the PCF Ops Manager.

## Current Status

Currently, the Tile version 0.9.0 public beta is availabe to download and deploy ECS Service Broker.

## Requirement

* ECS Cluster configured and runing. If you do not have one please refer to [ECS Test Drive](https://portal.ecstestdrive.com) to create an account
* ECS VIP address for Management and Object 
* Namespace and Replication group
* ECS  SSL cert, to get the ssl cert use ```openssl s_client  -connect <ecsvip>:443 –showcert ``` to get ssl

## Build Tile
* Clone the code to your local bosh machine
* Install [Tile Generator Tool](http://docs.pivotal.io/tiledev/tile-generator.html)
* Run command `tile build`

## Deployment
* Using OpsManager website upload the tile
* Add tile to dashboard
* Configure tile with ECS VIP, namespace, replication group, manangment username password
* Apply Changes
* Run cf service-brokers to check the broker status

### End-user Broker Usage

CLoud Foundry end-users can create and bind services to their applications using the `cf` CLI application.

```
cf create-service ecs-bucket unlimited my_bucket
```

This creates a bucket of the `ecs-bucket` service with the `unlimited` plan and the name: `my-bucket`.  To bind
an application to this bucket:

```
cf bind-service my-app my-bucket
```

The default will give `my-app` "full control" of the bucket.  To give a reduced set of permissions, you can provide
additional configuration parameters with the `-c` flag:

```
cf bind-service my-app my-bucket -c '{"permissions": ["read", "write"]}'
```

Valid permissions include:
 * read
 * read_acl
 * write
 * write_acl
 * execute
 * full_control
 * privileged_write
 * delete
 * none

For more information about the ECS Broker usage please refer to [ECS CF service broker](https://github.com/emccode/final/ecs-cf-service-broker)
