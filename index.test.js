const {sequelize} = require('./db');
const {Band, Musician} = require('./index')


describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    });
test('can create a Band', async () => {
        await Band.create({name: 'band name', genre: 'genre', bandMembers: 1})
        testBand = await Band.findOne({where: {name: 'band name'}})
        expect(testBand).toBeInstanceOf(Band);
    })

 
    test('can create a Musician', async () => {
        await Musician.create({name: 'musician name', genre: 'genre'})
        tMusician = await Musician.findOne({where: {name: 'musician name'}})
        expect(tMusician).toBeInstanceOf(Musician);
    })
    });