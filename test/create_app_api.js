var chakram = require('chakram'),
    expect = chakram.expect;

describe("Apps API", function() {
    
    var newApp, headers, requestBody, network
    
    // it("Initialize a new comments app for the tests", function () {
    //     network = 'build-validator-qa-s2.fyre.co';
    //     headers = {
    //         headers: {
    //         'Authorization': 'lftoken eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJidWlsZC12YWxpZGF0b3ItcWEtczIuZnlyZS5jbyIsImV4cGlyZXMiOjE2MjYyNzA5MjYuNzQwMTkzLCJ1c2VyX2lkIjoib3duZXIyIiwiZGlzcGxheV9uYW1lIjoib3duZXIyIn0.lfNfzsgt2XRAUnn0SVM_ioaIslQ7bEo3BRXQGdVRIw8',
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //         }
    //     };
    //     requestBody = {
    //         title: "Chakram test",
    //         sites: ["urn:livefyre:build-validator-qa-s2.fyre.co:site=291366"],
    //         published: true,
    //         elements: [{"component": "urn:livefyre:service=designer:component=storify2"}]
    //     };
    //     return chakram.post("https://api.qa-ext.livefyre.com/"+network+"/apps/v1/", requestBody, headers)
    //     // console.log(newApp)
    //     .then(function (response){
    //         console.log(response)
    //     })
    // })
    before("Initialize a new comments app for the tests", function () {
        network = 'build-validator-qa-s2.fyre.co';
        options = {
            headers: {
            'Authorization': 'lftoken eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJidWlsZC12YWxpZGF0b3ItcWEtczIuZnlyZS5jbyIsImV4cGlyZXMiOjE2MjYyNzA5MjYuNzQwMTkzLCJ1c2VyX2lkIjoib3duZXIyIiwiZGlzcGxheV9uYW1lIjoib3duZXIyIn0.lfNfzsgt2XRAUnn0SVM_ioaIslQ7bEo3BRXQGdVRIw8',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        };
        requestData = {
            title: "Chakram test",
            sites: ["urn:livefyre:build-validator-qa-s2.fyre.co:site=291366"],
            published: true,
            elements: [{"component": "urn:livefyre:service=designer:component=comments"}]
        };
        newApp = chakram.post("https://api.qa-ext.livefyre.com/"+network+"/apps/v1/", requestData, options)
    }) 
    it("should return 201 on success", function () {
        return expect(newApp).to.have.status(201)
        .then(function (response){
            console.log(response.body)
        })
    });
    
    it("should return the created app's location in the header", function (){
        return expect(newApp).to.have.header('location')
        .then(function (response){
            console.log(response.response.headers.location)
        })
    })
   
    
    
});
