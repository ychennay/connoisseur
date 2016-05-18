#!~/node
var SimpleDeployment = require("codedeploy-scrip ts").SimpleDeployment;
var deployment = new SimpleDeployment({
    appName: "connoisser",
    nodePort: "3000",
    serverScript: "start_server.sh",
    domains: "deploytest.example.com",
    buildFolder: "build",
    staticFolder: "static"
});
deployment.run();