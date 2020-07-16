import MiniJson from '../src/index';
import { expect } from 'chai';

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
    expect(obj).is.not.null;
    expect(obj.canLoadMore).is.not.null;
    expect(obj.data).is.not.empty;
    expect(obj.data[0].dayOfBirthday).is.not.null;
    console.log('data::', obj);
  });

  it('Object to json success', () => {
    const json = MiniJson.toJson(obj);
    expect(json).is.not.null;
    console.log('json', json);
  });
});
