import { faker } from '@faker-js/faker';

class CategorySeeder {
  public static generate = (quantity = 1) => {
    const dataJson = this.dataFaker();
    const dataArray = [];
    for (let index = 0; index < quantity; index++) {
      dataArray.push(this.dataFaker());
    }
    return quantity > 1 ? dataArray : dataJson;
  }

  private static dataFaker = () => {
    return {
      name: faker.word.noun(),
      description: faker.lorem.sentence(),
      created_at: new Date()
    }
  }
}

export { CategorySeeder }
