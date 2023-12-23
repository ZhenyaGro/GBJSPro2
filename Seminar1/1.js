"use strict";

/*
###Задание 1
Создайте обычный объект "Музыкальная коллекция", который можно итерировать. 
Каждая итерация должна возвращать следующий альбом из коллекции. Коллекция 
альбомов - это массив внутри нашего объекта (создать несколько альбомов самому).
Каждый альбом имеет следующую структуру:
{
  title: "Название альбома",
  artist: "Исполнитель",
  year: "Год выпуска"
}
Используйте цикл for...of для перебора альбомов в музыкальной коллекции и 
вывода их в консоль в формате:
"Название альбома - Исполнитель (Год выпуска)"
*/

const musicCollection = {
  name: 'Музыкальная коллекция',
  albums: [
    {
      title: "I Got Love (Single)",
      artist: "Miyagi & Эндшпиль",
      year: "2016"
    },
    {
      title: "Silver Side Up",
      artist: "Nickelback",
      year: "2001"
    },
    {
      title: "Mercury — Act 2",
      artist: "Imagine Dragons",
      year: "2022"
    }],
  *[Symbol.iterator]() {
    for (const album of this.albums) yield `${album.title} - ${album.artist} (${album.year})`;
  }
};

for (const album of musicCollection) console.log(album);