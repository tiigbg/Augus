jest.unmock('../util/time'); // unmock to use the actual implementation of sum
import { secondsToTime } from '../util/time.js';

describe('secondsToTime', () => {
	it('converts seconds to time format with colon delimiters', () => {
		expect(secondsToTime(0)).toBe("00:00");
		expect(secondsToTime(60)).toBe("01:00");
		expect(secondsToTime(4000)).toBe("1:06:40");
	});
	it('it currently subtracts negative second values from one full our', () => {
		expect(secondsToTime(-3660)).toBe("59:00");
		expect(secondsToTime(-7260)).toBe("59:00");
	});
});
