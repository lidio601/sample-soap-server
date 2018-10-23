/**
 * @see https://www.tutorialspoint.com/wsdl/wsdl_example.htm
 */
const soap = require('soap');
const http = require('http');
const fs = require('fs');

const MyTestService = {
    Hello_Service: {
        Hello_Port: {
            sayHello: function(args, callback) {
                callback({
                    greeting: "Hi " + args.firstName
                });
            }
        }
    }
};

var xml = fs.readFileSync('./service.xml', 'utf8');

var server = http.createServer(function(request,response) {
    response.end('404: Not Found: ' + request.url);
});
server.listen(1337);
const soapServer = soap.listen(server, {
    suppressStack: false,
    // Server options.
    path: '/service',
    services: MyTestService,
    xml: xml,

    // WSDL options.
//    attributesKey: 'theAttrs',
//    valueKey: 'theVal',
//    xmlKey: 'theXml'
});

soapServer.log = function(type, data) {
    // type is 'received' or 'replied'
    console.log(type, data);
};

console.log("The WSDL should be available at http://127.0.0.1:1337/service?wsdl");
