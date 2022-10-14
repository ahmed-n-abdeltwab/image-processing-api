import array from '../../utilties/array';

describe('Find match of String "fo" in array ["nah", "foo"]', () => {
	it('should return foo', () => {
		expect(array.findString(['nah', 'foo'], 'fo')).toBe('foo');
	});
});
