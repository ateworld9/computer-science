class UnitOfWork {
	newObjects;
	dirtyObjects;
	removedObjects;
	constructor() {
		this.newObjects = [];
		this.dirtyObjects = [];
		this.removedObjects = [];
	}

	registerNew() {}

	registerDirty() {}

	registerRemoved() {}

	registerClean() {}

	commit() {}

	insertNew() {}
}
