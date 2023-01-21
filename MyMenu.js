class Song {
    constructor (name, duration) {
        this.name = name;
        this.duration = duration;
    }

    describe() {
        return `${this.name} is ${this.duration} in length.`;
    }
}


class Album {
    constructor(name)  {
        this.name = name;
        this.songs = [];
    }


    addSong(song) {
        if (song instanceof Song) {
            this.songs.push(song);
        }
        else {
            throw new Error (`You can only add a song. Arguement is not a song: ${song}`);
        }
    }

    describe() {
        return `${this.name} has ${this.songs.length} songs`;
    }
}


class Menu {
    constructor() {
        this.albums = [];
        this.selectedAlbum = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection !=0) {
            switch (selection) {
                case '1':
                    this.createAlbum();
                    break;
                    case '2':
                        this.viewAlbum();
                        break;
                        case '3':
                            this.deleteAlbum();
                            break;
                            case '4':
                                this.displayAlbums();
                                break;
                                default:
                                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Thanks for listening!');
    }

    showMainMenuOptions() {
        return prompt(`
       0----------EXIT
       1----------CREATE NEW ALBUM
       2----------VIEW ALBUM
       3----------DELETE ALBUM
       4----------DISPLAY ALBUMS
       -----------------------------------
        `);
    }


    showAlbumMenuOptions(albumInfo) {
        return prompt(`
        0----------BACK
        1----------CREATE SONG
        2----------DELETE SONG
        -----------------------------------
        ${albumInfo}
        `);
    }


    displayAlbums() {
        let albumString = '';
        for (let i = 0; i < this.albums.length; i++) {
            albumString += i + '----------' + this.albums[i].name + '\n';

        }
        alert(albumString);
    }

    createAlbum() {
        let name = prompt('Enter name of the new album:');
        this.albums.push(new Album(name));
    }

    viewAlbum() {
        let index = prompt('Enter the index of the album you want to see:');
        if (index > -1 && index < this.albums.length) {
            this.selectedAlbum = this.albums[index];
            let description = 'Album name: ' + this.selectedAlbum.name + '\n';

            for (let i = 0; i < this.selectedAlbum.songs.length; i++) {
                description += i + '----------' + this.selectedAlbum.songs[i].name + ' - ' + this.selectedAlbum.songs[i].duration + '\n';
            }

            let selection = this.showAlbumMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createSong();
                    break;
                    case '2':
                        this.deleteSong();
            }
        }
    }

    deleteAlbum() {
        let index = prompt('Enter the index of the album you want to erase:');
        if (index > -1 && index < this.albums.length) {
            this.albums.splice(index, 1);
        }
    }

    createSong() {
        let name = prompt('Enter the name of the new song:');
        let duration = prompt('Enter duration of song:');
        this.selectedAlbum.songs.push(new Song(name, duration));
    }

    deleteSong() {
        let index = prompt('Enter the index of the song you want to erase:');
        if (index > -1 && index < this.selectedAlbum.songs.length) {
            this.selectedAlbum.songs.splice(index, 1);
        }
    }
}


let menu = new Menu();
menu.start();