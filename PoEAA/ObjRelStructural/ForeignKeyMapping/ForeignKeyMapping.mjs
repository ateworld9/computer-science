import { SQLException } from '../../errors/SQLException.mjs';

export class Artist {
	#artistId;
	#name;
	constructor(artistId, name) {
		this.#artistId = artistId;
		this.#name = name;
	}
	get name() {
		return this.#name;
	}
	set name(name) {
		this.#name = name;
	}
}

export class Album {
	#albumId;
	#title;
	#artist;
	constructor(albumId, title, artist) {
		this.#albumId = albumId;
		this.#title = title;
		this.#artist = artist;
	}
	get title() {
		return this.#title;
	}
	set title(title) {
		this.#title = title;
	}

	get artist() {
		return this.#artist;
	}
	set artist(artist) {
		this.#artist = artist;
	}
}

class AbstractMapper {
	constructor(connection) {
		this.loadedMap = new Map();
		this.connection = connection;
	}
	load(personDB) {
		const id = personDB.person_id;
		if (this.loadedMap.has(id)) return this.loadedMap.get(id);
		let result = this.doLoad(personDB);
		this.loadedMap.set(id, result);
		return result;
	}

	loadAll(resultSet) {
		return resultSet.map((row) => this.load(row));
	}

	async findById(id) {
		let result = this.loadedMap.get(id);
		if (result !== undefined) return result;
		let findStatement = this.findByIdStatement();
		try {
			result = await this.connection.get(findStatement, [id]);
		} catch (error) {
			throw new SQLException(error.message, findStatement);
		}
		return this.load(result);
	}
	insert() {}
}

class MapperRegistry {}

export class AlbumMapper extends AbstractMapper {
	constructor(connection) {
		super(connection);
	}
	findByIdStatement() {
		return 'SELECT album_id, title, artist_id FROM albums WHERE album_id = ?';
	}

	doLoad(id, resultRow) {
		const artist = MapperRegistry.artist().find(resultRow.artist_id);
		const album = new Album(id, resultRow.title, artist);
	}
}
