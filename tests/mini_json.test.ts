import MiniJson from '../src/index';
import { expect } from 'chai';
import { camelCase, kebabCase, snakeCase } from 'lodash';

describe('Mini json test', () => {
  let obj: any;
  it('Parse to object success', () => {
    const json = `{
      "success": true,
      "can_load_more": true,
      "data": [
        {
          "day_of_birthday": "16/10/2020",
          "ids": [1, 2, 3]
        },
        {
          "day_of_birthday": "17/10/2020",
          "ids": [4, 5, 6]
        }
      ]
      }
    `;
    obj = MiniJson.fromJson<any>(json);
    expect(obj).to.not.be.null;
    expect(obj.canLoadMore).is.not.be.null;
    expect(obj.data).to.not.be.empty;
    expect(obj.data[0].dayOfBirthday).to.not.be.null;
    console.log('data::', obj);
  });

  it('Object to json success', () => {
    const json = MiniJson.toJson(obj);
    expect(json).to.not.null;
    console.log('json', json);
  });
});

describe('Custom global naming convention', () => {
  MiniJson.serializeKeysTo(camelCase);
  MiniJson.deserializeKeysFrom(kebabCase);

  let obj: any;
  it('Parse json to object success with kebabCase', () => {
    const json = `{
      "success": true,
      "can_load_more": true,
      "data": [
        {
          "day_of_birthday": "16/10/2020",
          "ids": [1, 2, 3]
        },
        {
          "day_of_birthday": "17/10/2020",
          "ids": [4, 5, 6]
        }
      ]
      }
    `;
    obj = MiniJson.fromJson<any>(json);
    expect(obj).to.not.be.null;
    expect(obj['can-load-more']).is.not.be.null;
    expect(obj.data).to.not.be.empty;
    expect(obj.data[0]['day-of-birthday']).to.not.be.null;
    console.log('data::', obj);
  });

  it('Object to json success with camelCase', () => {
    const json = MiniJson.toJson(obj);
    expect(json).is.not.null;
    console.log('json', json);
  });
});

describe('Custom local naming convention', () => {
  let obj: any;
  it('Parse json to object success with kebabCase', () => {
    const json = `{
      "success": true,
      "can_load_more": true,
      "data": [
        {
          "day_of_birthday": "16/10/2020",
          "ids": [1, 2, 3]
        },
        {
          "day_of_birthday": "17/10/2020",
          "ids": [4, 5, 6]
        }
      ]
      }
    `;
    obj = MiniJson.fromJson<any>(json, kebabCase);
    expect(obj).to.not.be.null;
    expect(obj['can-load-more']).is.not.be.null;
    expect(obj.data).to.not.be.empty;
    expect(obj.data[0]['day-of-birthday']).to.not.be.null;
    console.log('data::', obj);
  });

  it('Object to json success with snakeCase', () => {
    const json = MiniJson.toJson(obj, snakeCase);
    expect(json).is.not.null;
    console.log('json', json);
  });
});
