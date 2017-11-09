class Listener {
	constructor(connectors, disconnectors) {
		if (!Array.isArray(connectors) || !Array.isArray(disconnectors)) {
			throw new Error('connectors must be provided within an array');
		}

		Object.assign(this, { connectors, disconnectors, active: false });
	}

	connect(eventEmitter) {
		if (this.active === true) throw new Error('listener is already active!');
		this.connectors.forEach(connector => connector(eventEmitter));
		this.active = true;
	}

	disconnect() {
		if (this.active === false) throw new Error('listener is not active!');
		this.disconnectors.forEach(disconnector => disconnector());
		this.active = false;
	}
}

export default Listener;