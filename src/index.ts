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

abstract class MiniJson {
  private static serializeKeyTransform: (key: string) => string = snakeCase;
  private static deserializeKeyTransform: (key: string) => string = camelCase;

  static serializeKeysTo(transform: (key: string) => string): void {
    this.serializeKeyTransform = transform;
  }

  static seserializeKeysFrom(transform: (key: string) => string): void {
    this.deserializeKeyTransform = transform;
  }

  private static convertKeys<T>(
    data: any,
    transform: (key: string) => string
  ): T {
    if (isArray(data)) {
      return data.map((innerObj: any) =>
        this.convertKeys<any>(innerObj, transform)
      ) as any;
    } else if (isObject(data)) {
      const newObj: { [key: string]: any } = {};
      Object.entries(data).forEach(([key, value]) => {
        const newKey = transform(key);
        newObj[newKey] = this.convertKeys(value, transform);
      });
      return newObj as any;
    } else {
      return data;
    }
  }

  static toJson(value: any): string {
    return JSON.stringify(this.serializerKeys(value));
  }

  private static serializerKeys(value?: any): any {
    if (value) {
      return this.convertKeys<any>(value, this.serializeKeyTransform);
    }
  }

  static fromJson<T>(data: string | object): T {
    if (typeof data === 'string') {
      const json = JSON.parse(data);
      return this.toObject(json);
    } else {
      return this.toObject(data);
    }
  }

  private static toObject<T>(data: any): T {
    if (data) {
      return this.convertKeys<T>(data, this.deserializeKeyTransform);
    } else {
      throw new Error("Can't from json");
    }
  }
}

export default MiniJson;
