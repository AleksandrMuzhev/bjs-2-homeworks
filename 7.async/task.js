class AlarmClock {
	constructor() {
		this.alarmCollection = [];
		this.intervalId = null;
	}

	addClock(time, callback) {
		if (!time || !callback) {
			throw new Error('Отсутствуют обязательные аргументы');
		};
		if (this.alarmCollection.some((alarm) => alarm.time === time)) {
			console.warn('Уже присутствует звонок на это же время');
		};
		this.alarmCollection.push({
			time,
			callback,
			canCall: true
		});
	}

	removeClock(timeToDelete) {
		const lengthBeforeDelete = this.alarmCollection.length;
		this.alarmCollection = this.alarmCollection.filter(
			(alarm) => alarm.time !== timeToDelete);
		return lengthBeforeDelete !== this.alarmCollection.length;
	}

	getCurrentFormattedTime() {
		const now = new Date();
		const hours = now.getHours();
		const minutes = now.getMinutes();

		return `${hours < 10 ? `0` + hours : hours}:${
			minutes < 10 ? `0` + minutes : minutes
		}`;
	}

	start() {
		if (this.intervalId) {
			return;
		}

		this.intervalId = setInterval(() => {
			const currentTime = this.getCurrentFormattedTime();

			this.alarmCollection.forEach((alarm) => {
				if (alarm.time === currentTime && alarm.canCall) {
					alarm.canCall = false;
					alarm.callback();
				}
			});
		}, 1000);
	}

	stop() {
		clearInterval(this.intervalId);
		this.intervalId = null;
	};

	resetAllCalls() {
		this.alarmCollection.forEach((alarm) => {
			alarm.canCall = true;
		});
	};

	clearAlarms() {
		this.stop();
		this.alarmCollection = [];
	};
}