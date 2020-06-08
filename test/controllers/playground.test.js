const {expect} = require('chai');

describe('Playground', () => {
    context('when i sum 2 and 4', () =>{
        it('shold return 6', () => {
            expect(2+4).to.be.equal(6);
        })
    });
});