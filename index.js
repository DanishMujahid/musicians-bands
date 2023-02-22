const {Musician} = require('./Musician')
const {Band} = require('./Band')
const {Song} = require('./Song')

Band.hasMany(Musician, {as: 'members'})
Musician.belongsTo(Band)

Band.belongsToMany(Song, {through: 'BandSongs', as: 'songs'})
Song.belongsToMany(Band, {through: 'BandSongs', as: 'bands'})



module.exports = {
    Band,
    Musician,
    Song
};
