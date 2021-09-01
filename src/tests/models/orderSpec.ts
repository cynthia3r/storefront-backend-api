import { OrderStore } from '../../models/order';

const store = new OrderStore();

describe('Order Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('index method should return a list of orders', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });
});

// it('create method should add an order', async () => {
//   const result = await store.create({
//     user_id: '1',
//     status: 'active'
//   });
//   expect(result).toEqual({
//     id: 1,
//     user_id: '1',
//     status: 'active'
//   });
// });

// it('index method should return a list of orders', async () => {
//   const result = await store.index();
//   expect(result).toEqual([
//     {
//       id: 1,
//       user_id: '1',
//       status: 'active'
//     }
//   ]);
// });

// it('show method should return the correct order', async () => {
//   const result = await store.show(1);
//   expect(result).toEqual({
//     id: 1,
//     user_id: '1',
//     status: 'active'
//   });
// });

// it('delete method should remove the order', async () => {
//   store.delete(1);
//   const result = await store.index();
//   expect(result).toEqual([]);
// });
