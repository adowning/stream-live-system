import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { OrderEntity } from '../../entities/order.entity';

const toLowerCase = item => {
  for (const key in item) {
    if (item.hasOwnProperty(key)) {
      const upper = key.toLowerCase();
      // check if it already wasn't uppercase
      if (upper !== key) {
        item[upper] = item[key];
        delete item[key];
      }
    }
  }
  return item;
};
export default class CreateCountries implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const regions = require('./dumps/ORDERS')
      .REGIONS.map(toLowerCase)
      .map(c => {
        return c;
      });
    await connection
      .createQueryBuilder()
      .insert()
      .into(OrderEntity)
      .values(regions)
      .execute();
  }
}
