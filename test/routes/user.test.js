const {expect} = require('chai');
const request = require('supertest');
const server = require('../../server');

const DatabaseTest = require('../utils/Database');
const Database = require('../../lib/database');
const mockData = require('../utils/user');

describe('Delete user route', () => {
    context('when I execute a delete to /user/:id with nonexistent id', ()=>{
        before(async () => {
            await Database.init();
            await DatabaseTest.clear();
            await mockData.createSeveralUsers();
          });  
        it('should return status 404', async () => {
        const response = await request(server).delete(`/user/${mockData.invalidId()}`);
        expect(response.status).to.be.equals(404);
        });
    });
    context('when I execute a delete to /user/:id with existent id', ()=>{
        let userDeleted, userDeletedID;

        before(async () => {
            await Database.init();
            await DatabaseTest.clear();
            const userData = await mockData.createSeveralUsers();
            userDeleted = mockData.pickOne(userData);
            userDeletedID = userDeleted.ops[0]._id.toString();
          });  
        it('should return status 200', async () => {
        const response = await request(server).delete(`/user/${userDeletedID}`);
        expect(response.status).to.be.equals(200);
        });
    });

});


describe('Create User route', () => {
    context('when I execute a post to /user with valid body', () => {
        const data = mockData.validData();
        it("Shold return a new user id and status 200", async ()=> {
            const response = await request(server).post('/user').send(data).set('Accept', 'application/json');
            expect(response.status).to.be.equals(200);
            expect(response.body).to.have.property('insertedId');
            expect(response.body.insertedId).to.be.a('string');
           
        });
    });

    context('when i execute a POST to /user with invalid name', () => {
        const data = {
            name: 'Le',
        };
        it('should return status 400', async ()=>{
            const response = await request(server).post('/user').send(data).set('Accept', 'application/json');
            expect(response.status).to.be.equals(400);
            expect(response.body).to.have.property('message');
        });
    });

});