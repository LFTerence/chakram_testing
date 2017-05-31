var chakram = require('../node_modules/chakram/lib/chakram.js'),
expect = chakram.expect;
var a;
before("Initialize new comment app for api creation ", function(){
    network = 'build-validator-qa-s2.fyre.co';
    env = 'qa';
    var rand = Math.floor(Math.random()*1000);
    options = {
        headers: {
        'Authorization' : 'lftoken eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJidWlsZC12YWxpZGF0b3ItcWEtczIuZnlyZS5jbyIsImV4cGlyZXMiOjE2MjYyNzA5MjYuNzQwMTkzLCJ1c2VyX2lkIjoib3duZXIxIiwiZGlzcGxheV9uYW1lIjoib3duZXIxIn0.GTbEHT_75TCcYd87b3EJtaWlCSZdKImvnwAmZsRhCtQ'
      }
    };
    requestData = {
        title: "monChakramTest"+rand,
        sites: ["urn:livefyre:build-validator-qa-s2.fyre.co:site=291366"],
        published: true,
        elements: [{"component": "urn:livefyre:service=designer:component=comments"}]
    };
    //Creat new app using API
    newApp = chakram.post("https://api.qa-ext.livefyre.com/"+network+"/apps/v1", requestData, options);
});

describe("My API Test for Get App Embed", function () {
    before(function () {
        apiResponse = chakram.get('https://api.qa-ext.livefyre.com/build-validator-qa-s2.fyre.co/apps/v1/aca22030-698f-4838-a356-4d3eb3524a70/embed', options);
         // return apiResponse;    
    });    
        
    it("1] should return 200 on success response for URL/embed", function () {
        this.timeout(10000);
        expect(apiResponse).to.have.status(200);
        return chakram.wait();
    });

    it("2] should return content type", function () {
         this.timeout(10000);
        expect(apiResponse).to.have.header("content-type", /text/);
        expect(apiResponse).to.have.header('content-type', function(contentType){
            console.log('         Print contentType: '+contentType);
        });
        return chakram.wait();
    });

    it("X] should get and print embed code for an app", function () {
        var request = require('request');
        request('https://api.qa-ext.livefyre.com/build-validator-qa-s2.fyre.co/apps/v1/aca22030-698f-4838-a356-4d3eb3524a70/embed', options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
        });
    });        
});
describe("My API Test for Get App Oembed", function () {
    before(function () {
        newApiResponse = chakram.get('https://api.qa-ext.livefyre.com/build-validator-qa-s2.fyre.co/apps/v1/aca22030-698f-4838-a356-4d3eb3524a70/embed.json', options);
         // return apiResponse;    
    });    
        
    it("3] should return 200 on success response for URL/embed.json", function () {
        this.timeout(10000);
        expect(newApiResponse).to.have.status(200);
        return chakram.wait();
    });

    it("4] should allow checking of JSON", function () {
        this.timeout(10000);
        expect(newApiResponse).to.have.json("version", "1.0");
        expect(newApiResponse).to.have.json("provider_name", "Livefyre");
        return chakram.wait();
    });
});

describe("My API Test for Search App", function () {
    before(function () {
        searchApiResponse = chakram.get("https://api.qa-ext.livefyre.com/app-service/v4/"+network+"/apps/search?query="+requestData.title, options);
        //searchApiResponse = chakram.get("https://api.qa-ext.livefyre.com/app-service/v4/"+network+"/apps/search?query="+'monChakramTest413', options);
         return searchApiResponse;    
    });    
        
    it("5] should return 200 on success response for app search", function () {
        this.timeout(1000);
        expect(searchApiResponse).to.have.status(200);
        return chakram.wait();
    });
    //Currently this does not work
    // it("6] should match app title after success response for app search", function () {
    //     this.timeout(1000);
    //     return chakram.all(searchApiResponse).then(function(responses){
    //         console.log('App Name: '+responses.body.apps[0].title);
    //         expect(responses.body.apps[0].title).to.be.equal(requestData.title);
    //     });
    //     return chakram.wait();
    // }); 
});