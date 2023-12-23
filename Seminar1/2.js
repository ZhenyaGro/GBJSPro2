"use strict";

console.log('Task 2');
/*
###Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся 
на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.
Необходимо реализовать функцию newOrder. Создавать вспомогательные функции, 
коллекции, не запрещается. Старайтесь использовать коллекции Map/Set, где это 
актуально. Представленный ниже код должен работать.

Повара и их специализации:
Олег - специализация: Пицца.
Андрей - специализация: Суши.
Анна - специализация: Десерты.

Блюда, которые могут заказать посетители:
Пицца "Маргарита"
Пицца "Пепперони"
Пицца "Три сыра"
Суши "Филадельфия"
Суши "Калифорния"
Суши "Чизмаки"
Суши "Сеякемаки"
Десерт Тирамису
Десерт Чизкейк
*/

// Посетитель ресторана.
class Client {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
}

// Блюдо
class Dish {
  static types = { pizza: 'Пицца', sushi: 'Суши', dessert: 'Десерт' };
  #name;
  #type;

  constructor(name, type) {
    this.#name = name;
    this.#type = type;
  }

  getName() { return this.#name }
  getType() { return this.#type }
  toString() { return `${this.#type} "${this.#name}"` }
}

const dishes = [
  new Dish('Маргарита', Dish.types.pizza),
  new Dish('Пепперони', Dish.types.pizza),
  new Dish('Три сыра', Dish.types.pizza),
  new Dish('Филадельфия', Dish.types.sushi),
  new Dish('Калифорния', Dish.types.sushi),
  new Dish('Чизмаки', Dish.types.sushi),
  new Dish('Сеякемаки', Dish.types.sushi),
  new Dish('Тирамису', Dish.types.dessert),
  new Dish('Чизкейк', Dish.types.dessert),
];

const chefs = new Map([
  [Dish.types.pizza, 'Олег'],
  [Dish.types.sushi, 'Андрей'],
  [Dish.types.dessert, 'Анна']
]);

// Вам необходимо реализовать класс, который управляет заказами и поварами.
class Manager {
  orders = new Map();

  newOrder(client, ...orderItems) {
    if (!this.orders.has(client))
      this.orders.set(client, []);

    const clientOrders = this.orders.get(client);

    for (const orderItem of orderItems) {
      try {
        checkDishExists(orderItem);

        const existingOrder = clientOrders.find(item => item.name == orderItem.name);

        if (existingOrder) existingOrder.quantity += orderItem.quantity;
        else clientOrders.push(orderItem);

      } catch (error) { console.log(error.toString()) }
    }

    console.log(this.getOrderInfoByClient(client));
  }

  getOrderInfoByClient(client) {
    const clientOrders = this.orders.get(client);

    if (!clientOrders.length)
      return `У клиента ${client.firstname} отсутствуют действующие заказы`;

    const clientOrdersFormatted = clientOrders.map(item => `${item.type} "${item.name}" - ${item.quantity}; готовит повар ${chefs.get(item.type)}`);

    return `Клиент ${client.firstname} заказал:\n${clientOrdersFormatted.join('\n')}`
  }
}

// Проверка существует ли блюдо
function checkDishExists(orderItem) {
  if (!dishes.find(dish => dish.getName() == orderItem.name)) throw new Error(`${orderItem.type} "${orderItem.name}" - такого блюда не существует`);
}

// Можно передать внутрь конструктора что-либо, если необходимо.
const manager = new Manager();

// Вызовы ниже должны работать верно, менять их нельзя, удалять тоже.
manager.newOrder(
  new Client("Иван", "Иванов"),
  { name: "Маргарита", quantity: 1, type: "Пицца" },
  { name: "Пепперони", quantity: 2, type: "Пицца" },
  { name: "Чизкейк", quantity: 1, type: "Десерт" },
);
// Вывод:
// Клиент Иван заказал: 
// Пицца "Маргарита" - 1; готовит повар Олег
// Пицца "Пепперони" - 2; готовит повар Олег
// Десерт "Чизкейк" - 1; готовит повар Анна

// ---

const clientPavel = new Client("Павел", "Павлов");
manager.newOrder(
  clientPavel,
  { name: "Филадельфия", quantity: 5, type: "Суши" },
  { name: "Калифорния", quantity: 3, type: "Суши" },
);
// Вывод:
// Клиент Павел заказал: 
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 3; готовит повар Андрей

manager.newOrder(
  clientPavel,
  { name: "Калифорния", quantity: 1, type: "Суши" },
  { name: "Тирамису", quantity: 2, type: "Десерт" },
);
// Вывод:
// Клиент Павел заказал: 
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 4; готовит повар Андрей
// Десерт "Тирамису" - 2; готовит повар Анна

manager.newOrder(
  clientPavel,
  { name: "Филадельфия", quantity: 1, type: "Суши" },
  { name: "Трубочка с вареной сгущенкой", quantity: 1, type: "Десерт" },
);
// Ничего не должно быть добавлено, должна быть выброшена ошибка:
// Десерт "Трубочка с вареной сгущенкой" - такого блюда не существует.