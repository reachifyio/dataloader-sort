import { expect } from 'chai';
import { describe, it } from 'mocha';

import { sort } from '../src';

describe('dataloaderHelpers', () => {
  describe('sort', () => {
    it('should sort the data based on id field by default', done => {
      const keys = [1, 2, 3];
      const data = [
        { id: 3, value: 'three' },
        { id: 1, value: 'one' },
        { id: 2, value: 'two' },
      ];
      const sortedData = [
        { id: 1, value: 'one' },
        { id: 2, value: 'two' },
        { id: 3, value: 'three' },
      ];

      const result = sort(keys, data);

      expect(sortedData).to.deep.equal(result);
      done();
    });

    it('should be able to handle repeated keys', done => {
      const keys = [1, 1, 2, 3];
      const data = [
        { id: 3, value: 'three' },
        { id: 1, value: 'one' },
        { id: 2, value: 'two' },
      ];
      const sortedData = [
        { id: 1, value: 'one' },
        { id: 1, value: 'one' },
        { id: 2, value: 'two' },
        { id: 3, value: 'three' },
      ];

      const result = sort(keys, data);

      expect(sortedData).to.deep.equal(result);
      done();
    });

    it('should sort the data based on the the provided prop field', done => {
      const keys = [1, 2, 3];
      const data = [
        { other: 3, value: 'three' },
        { other: 1, value: 'one' },
        { other: 2, value: 'two' },
      ];
      const sortedData = [
        { other: 1, value: 'one' },
        { other: 2, value: 'two' },
        { other: 3, value: 'three' },
      ];

      const result = sort(keys, data, 'other');

      expect(sortedData).to.deep.equal(result);
      done();
    });

    it('should sort and match based on the fields in the keys, if key is an object', done => {
      const keys = [
        { userId: 1, messageId: 3 },
        { userId: 2, messageId: 4 },
        { userId: 3, messageId: 9 },
        { userId: 3, messageId: 7 },
        { userId: 1, messageId: 2 },
      ];

      const data = [
        { userId: 1, messageId: 2, value: 'yayy' },
        { userId: 3, messageId: 7, value: 'ya' },
        { userId: 1, messageId: 3, value: 'woot' },
        { userId: 2, messageId: 4, value: 'blue' },
        { userId: 3, messageId: 9, value: 'green' },
      ];

      const sortedData = [
        { userId: 1, messageId: 3, value: 'woot' },
        { userId: 2, messageId: 4, value: 'blue' },
        { userId: 3, messageId: 9, value: 'green' },
        { userId: 3, messageId: 7, value: 'ya' },
        { userId: 1, messageId: 2, value: 'yayy' },
      ];

      const result = sort(keys, data);

      expect(sortedData).to.deep.equal(result);
      done();
    });

    it('should return null for any keys which don\'t have matching data', done => {
      const keys = [1, 2, 3];
      const data = [
        { id: 3, value: 'three' },
        { id: 1, value: 'one' },
      ];
      const sortedData = [
        { id: 1, value: 'one' },
        null,
        { id: 3, value: 'three' },
      ];

      const result = sort(keys, data);

      expect(sortedData).to.deep.equal(result);
      done();
    });

    it('should return null for all if data is empty', done => {
      const keys = [1, 2, 3];
      const data = [];
      const sortedData = [
        null,
        null,
        null,
      ];

      const result = sort(keys, data);

      expect(sortedData).to.deep.equal(result);
      done();
    });

    it('should return empty array if keys is empty', done => {
      const keys = [];
      const data = [{ id: 1 }];
      const sortedData = [];

      const result = sort(keys, data);

      expect(sortedData).to.deep.equal(result);
      done();
    });

    it('should throw an error if multiple results match a single key', done => {
      const keys = [1, 2, 3];
      const data = [
        { id: 1, value: 'three' },
        { id: 1, value: 'one' },
        { id: 2, value: 'two' },
      ];

      expect(() => sort(keys, data)).to.throw(Error, /Multiple options in data matching key 1/);
      done();
    });

    it('should throw an error if passed another type besides Array for keys', done => {
      const keys = 'test';
      const data = [];

      expect(() => sort(keys, data)).to.throw(Error, /Invalid value "test"/);
      done();
    });

    it('should throw an error if passed another type besides Array for data', done => {
      const keys = [1, 2];
      const data = false;

      expect(() => sort(keys, data)).to.throw(Error, /Invalid value false/);
      done();
    });
  });
});
