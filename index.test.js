const {sequelize} = require('./db');
const {Band, Musician, Song} = require('./index')


describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });

        band1 = await Band.create({
            name: 'Arctic Monkeys',
            genre: 'Indie',
            showCount: 10000,
        });

        band2 = await Band.create({
            name: 'Imagine Dragons',
            genre: 'Alternative',
            showCount: 1000,
        });

        band3 = await Band.create({
            name: 'The Beatles',
            genre: 'Rock',
            showCount: 20000
        });

        song1 = await Song.create({
            title: 'Do I wanna know',
            year: 2010,
        });

        song2 = await Song.create({
            title: 'Monster',
            year: 2015,
        });

        musician1 = await Musician.create({
            name: 'Michael Jackson',
            instrument: 'Recorder'
          });
        
        musician2 = await Musician.create({
            name: 'Michael Buble',
            instrument: 'Guitar'
        });


    })

    test('can create a Band', async () => {
        expect(band1).toBeInstanceOf(Band);
    })

    test('can create a Musician', async () => {
        expect(musician1).toBeInstanceOf(Musician);
    })

    test('can delete a Band', async () => {
        await Band.destroy({where: {id: band3.id}});
        const deletedBand = await Band.findOne({where: {id: band3.id}})
        expect(deletedBand).toBeNull();
    })

    test('can update a Band', async () => {
        await band1.update({name: 'New Arctic Monkeys'});
        const updatedBand1 = await Band.findOne({where: {id: band1.id}})
        expect(updatedBand1.name).toEqual('New Arctic Monkeys');
    })

    test('a band can have many musicians', async () => {
        await band1.addMember(musician1.id)
        await band1.addMember(musician2.id)
        const musicians = await band1.getMembers();
        expect(musicians.length).toBe(2);
        expect(musicians[0].name).toBe('Michael Jackson');
        expect(musicians[1].name).toBe('Michael Buble');
    })

    
      test('a musician then belongs to a band', async () => {
        await musician1.setBand(band1)
        const result = await musician1.getBand();
        expect(result.name).toBe('New Arctic Monkeys');
      });

      test('band can have many songs', async () => {
        await band1.addSongs([song1, song2])
        const songs = await band1.getSongs()
        expect(songs.length).toBe(2);
        expect(songs[0].title).toBe('Do I wanna know');
        expect(songs[1].title).toBe('Monster');
      })

      test('song can belong to many bands', async () => {
        await band2.addSong(song1)
        const bands = await song1.getBands()
        expect(bands.length).toBe(2);
        expect(bands[0].name).toBe('New Arctic Monkeys');
        expect(bands[1].name).toBe('Imagine Dragons');
      })

      test('allows eager loading', async ()  => {
        const bands_eager = await Band.findAll({
            include: [
                {
                    model: Musician,
                    as: 'members'
                },
                {
                    model: Song,
                    as: 'songs'
                }
            ]
        })

        const eager_band = bands_eager[0]
        
        const eager_members = eager_band.members
        const eager_songs = eager_band.songs

        const eager_member_1 = eager_members[1]
        const eager_song_1 = eager_songs[0]

        expect(eager_member_1.name).toBe('Michael Jackson');
        expect(eager_song_1.title).toBe('Do I wanna know');

      })
});