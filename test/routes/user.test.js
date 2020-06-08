const {expect} = require('chai');
const request = require('supertest');
const server = require('../../server');

describe('Create User rout', () => {
    context('when I execute a post to /user with valid body', () => {
        const data = {
            name: 'Letícia',
        };
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
            expect(response.body.insertedId).to.be.a('string');
        });
    });

});