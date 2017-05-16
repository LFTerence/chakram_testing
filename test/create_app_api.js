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
            elements: [{"component": "urn:livefyre:service=designer:component=chat"}]
        };
        this.timeout(5000)
        newApp = chakram.post("https://api.qa-ext.livefyre.com/"+network+"/apps/v1/", requestData, options)
    }) 
    it("should return 201 on success", function () {
        return expect(newApp).to.have.status(201)
        .then(function (response){
            console.log(response.body)
        })
    });
    it("should return the created app's location in the header", function (){
        var re = /v1\/(.*$)/
        return expect(newApp).to.have.header('location')
        .then(function (response){
            appId = re.exec(response.response.headers.location)[1]
            console.log(response.response.headers.location)
        })
    });
   describe("testing if we can GET the newly created app", function (){
        before(function (){
            getAppResponse = chakram.get("https://api.qa-ext.livefyre.com/"+network+"/apps/v1/"+appId, options)

            return chakram.get("https://api.qa-ext.livefyre.com/"+network+"/apps/v1/"+appId, options)
            // .then(function (response){
            //     console.log(response)
            // })
        });
        it("should return a 200 in the response", function (){
            return expect(getAppResponse).to.have.status(200)
        });
        it("should return link+rel for Embed Code in the headers of the response", function (){
            return expect(getAppResponse).to.have.header('link', function (link){
                expect(link).to.contain(appId+'/details>')
                expect(link).to.contain(rel='urn:livefyre:service=studio:link-rel=embed-code')
                expect(link).to.contain(title='Embed Code')
            })
        });
        it("should return link+rel for View in Studio/App Details in the headers of the response", function (){
            return expect(getAppResponse).to.have.header('link', function (link){
                expect(link).to.contain('</'+network+'/apps/v1/'+appId+'/embed>')
                expect(link).to.contain(rel='urn:livefyre:service=studio:link-rel=app-details')
                expect(link).to.contain(title='View in Livefyre Studio')
            })
        });
        it("should return link+rel for Edit App Settings in the headers of the response", function (){
            return expect(getAppResponse).to.have.header('link', function (link){
                expect(link).to.contain(appId+'/settings>')
                expect(link).to.contain(rel='urn:livefyre:service=studio:link-rel=app-settings')
                expect(link).to.contain(title='Edit App Settings')
            })
        });
        it("should return link+rel for Edit App Design in the headers of the response", function (){
            return expect(getAppResponse).to.have.header('link', function (link){
                expect(link).to.contain(appId+'/designer>')
                expect(link).to.contain(rel='urn:livefyre:service=studio:link-rel=app-designer')
                expect(link).to.contain(title='Edit App Design')
            })
        });
        it("should return link+rel for View App Streams in the headers of the response", function (){
            return expect(getAppResponse).to.have.header('link', function (link){
                expect(link).to.contain(appId+'/stream>')
                expect(link).to.contain(rel='urn:livefyre:service=studio:link-rel=app-streams')
                expect(link).to.contain(title='View App Streams')
            })
        });
        it("should return a response with the expected app name", function (){
            return expect(getAppResponse).to.have.json('title', 'Chakram test')
        });
        it("should return a response withe the expected sites data", function (){
            return expect(getAppResponse).to.have.json('sites', ['urn:livefyre:build-validator-qa-s2.fyre.co:site=291366'])
        });
        it("should return a response with published = true", function (){
            return expect(getAppResponse).to.have.json('published', true)
        });
        it("should return a response with the expected elements field", function (){
            return expect(getAppResponse).to.have.json('elements', function (elements){
                expect(elements[0].component).to.equal('urn:livefyre:service=designer:component=chat')
            })
        });
   })
    
    
});
