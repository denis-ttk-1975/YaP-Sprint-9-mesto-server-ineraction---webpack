// ФУНКЦИЯ ДЛЯ ЗАПУСКА В ТЕРМИНАЛЕ С ЦЕЛЬЮ ОБНОВЛЕНИЯ 30 КАРТОЧЕК СРАЗУ
// ЧАСТО СТУДЕНТЫ ЗАГРУЖАЛИ КАРТОЧКИ С БИТЫМИ ССЫЛКАМИ И ЭТО ВЫЗЫВАЛО ОШИБКИ В КОНСОЛИ

const link = "https://nomoreparties.co/v1/plus-cohort7/"; //ВСТАВИТЬ ССЫЛКУ
const token = "62256703-4f1c-4e78-bfd6-410f01323be3"; //ВСТАВИТЬ ТОКЕН
let id = "";
fetch(`${link}users/me`, {
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
})
  .then((token) => token.json())
  .then((token) => (id = token._id));
const delCard = (o) => {
  fetch(`${link}cards/${o}`, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  });
};
fetch(`${link}cards`, {
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
})
  .then((token) => token.json())
  .then((token) => {
    token.forEach((token) => {
      token.owner._id === id && delCard(token._id);
    });
  });

const cardsArr = [
  { name: "Байкал", link: "https://clck.ru/YpQms" },
  { name: "Ленские столбы", link: "https://clck.ru/YpQuK" },
  { name: "Кунгурская пещера", link: "https://clck.ru/YpRzq" },
  { name: "Озеро Баскунчак", link: "https://clck.ru/YpRD2" },
  { name: "Рускеала", link: "https://clck.ru/YpRmt" },
  { name: "Саяны", link: "https://clck.ru/YpSWY" },
  { name: "Горы Шиханы", link: "https://clck.ru/YpRsY" },
  { name: "Вулкан Тятя", link: "https://clck.ru/YpRvy" },
  { name: "Озеро Джека Лондона", link: "https://clck.ru/dZQTv" },
  { name: "Голубые озёра", link: "https://clck.ru/YpRNH" },
  { name: "Сейдозеро", link: "https://clck.ru/YpRQF" },
  { name: "Озеро Зюраткуль", link: "https://clck.ru/YpRUV" },
  { name: "Эльбрус", link: "https://clck.ru/YpRVa" },
  { name: "Алтайские горы", link: "https://clck.ru/YpRYF" },
  { name: "Плато «Дивногорье»", link: "https://clck.ru/YpRZe" },
  { name: "Домбай-Ульген", link: "https://clck.ru/YpRfe" },
  { name: "Плато Путорана", link: "https://clck.ru/YpSUe" },
  { name: "Озеро Эльтон", link: "https://clck.ru/YpRLf" },
  { name: "Долина Гейзеров", link: "https://clck.ru/YpQwX" },
  { name: "Столбы выветривания", link: "https://clck.ru/YpQzr" },
  // { name: "Ординская пещера", link: "https://clck.ru/YpRyJ" },
  { name: "Озеро Селигер", link: "https://clck.ru/YpR9n" },
  { name: "Иволгинский дацан", link: "https://clck.ru/YpS3H" },
  { name: "Ласточкино гнездо", link: "https://clck.ru/YpS8i" },
  { name: "Чарские пески", link: "https://clck.ru/YpSAN" },
  { name: "Командорские острова", link: "https://clck.ru/YpSDM" },
  // { name: "Куршская коса", link: "https://clck.ru/YpR7U" },
  { name: "Озеро Кезеной-ам", link: "https://clck.ru/YpRBG" },
  { name: "Авачинская бухта", link: "https://clck.ru/YpSBq" },
  { name: "Вулкан Креницына", link: "https://clck.ru/YpRuQ" },
];
cardsArr.forEach((item) => {
  fetch(`${link}cards`, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: item.name,
      link: item.link,
    }),
  });
}),
  setTimeout(() => {
    location.reload();
  }, 60000);
