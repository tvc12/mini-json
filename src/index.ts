const isArray = (value?: any) => value instanceof Array;
const isObject = (value?: any) => value && typeof value === 'object';

const camelCase = (value: string): string => {
  return value.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  );
};

const snakeCase = (value: string): string => {
  return value.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};

type KeyTransform = (key: string) => string;

abstract class MiniJson {
  private static serializeKeyTransform: KeyTransform = snakeCase;
  private static deserializeKeyTransform: KeyTransform = camelCase;

  static serializeKeysTo(transform: KeyTransform): void {
    this.serializeKeyTransform = transform;
  }

  static deserializeKeysFrom(transform: KeyTransform): void {
    this.deserializeKeyTransform = transform;
  }

  private static convertKeys<T>(
    data: any,
    keyTransform: (key: string) => string
  ): T {
    if (isArray(data)) {
      return data.map((innerObj: any) =>
        this.convertKeys<any>(innerObj, keyTransform)
      ) as any;
    } else if (isObject(data)) {
      const newObj: { [key: string]: any } = {};
      Object.entries(data).forEach(([key, value]) => {
        const newKey = keyTransform(key);
        newObj[newKey] = this.convertKeys(value, keyTransform);
      });
      return newObj as any;
    } else {
      return data;
    }
  }

  static toJson(value: any, keyTransform?: KeyTransform): string {
    const transform = keyTransform || this.serializeKeyTransform;
    return JSON.stringify(this.convertKeys<any>(value, transform));
  }

  static fromJson<T>(data: string | object, keyTransform?: KeyTransform): T {
    const transform = keyTransform || this.deserializeKeyTransform;

    if (typeof data === 'string') {
      const json = JSON.parse(data);
      return this.convertKeys<T>(json, transform);
    } else {
      return this.convertKeys<T>(data, transform);
    }
  }
}

export { KeyTransform };
export default MiniJson;
