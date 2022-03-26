import "./../pages/index.css"; // добавляем импорт главного файла стилей

import {
  //functions
  openProfilePopup,
  saveProfileData,
  openNewPlacePopup,
  openNewAvatarPopup,
  closePopup,
} from "./modal.js";

import { enableValidation } from "./validate.js";

import { addNewPlaceCard, createElementsArea, addNewAvatar } from "./card.js";

import { getUserProfile, getCardsArray } from "./api.js";

// создаем объект с набором настроек для валидации
export const config = {
  formSelector: ".popup__userdata-input",
  inputSelector: ".popup__input-field",
  submitButtonSelector: '[type = "submit"]',
  inactiveButtonClass: "popup__btn-save_inactive",
  inputErrorClass: "popup__input-field_error",
  errorClass: "popup__input-error_active",
};

//! не нравится как заявлена важная константа - ID владельца страницы. Подумай
export let userID;

// получаем области страницы пользователя с данными Profile для дальнейшего заполнения или изменения
export const userProfileAvatar = document.querySelector(".profile__avatar");
export const userProfileName = document.querySelector(".profile__member-name");
export const userProfileAbout = document.querySelector(".profile__lower-text");

// получаем кнопки для запуска попап
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddPlaceButton = document.querySelector(".profile__add");
const profileNewAvatarButton = document.querySelector(
  ".profile__overlay-avatar"
);
// получаем формы для запуска событий submit
const profileInputForm = document.querySelector('form[name="user-data"]');
const newPlaceInputForm = document.querySelector('form[name="new-place"]');
const newAvatarInputForm = document.querySelector('form[name="new-avatar"]');

// получаем NodeList из попапов для навешивания закрытия форм
const popups = document.querySelectorAll(".popup");

// навешивание слушателей открытия и submit на попапы

profileEditButton.addEventListener("click", () => openProfilePopup(config));
profileInputForm.addEventListener("submit", saveProfileData);

profileAddPlaceButton.addEventListener("click", () =>
  openNewPlacePopup(config)
);
newPlaceInputForm.addEventListener("submit", addNewPlaceCard);

profileNewAvatarButton.addEventListener("click", () =>
  openNewAvatarPopup(config)
);
newAvatarInputForm.addEventListener("submit", addNewAvatar);

// навешивание слушателей на клик на кнопке закрытия и на клик на overlay для закрытия попапов

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__cross-image")) {
      closePopup(popup);
    }
  });
});

//! запуск валидации на все формы в попап окнах

enableValidation(config);

//!!! Запуск скачивания профайла и данных для карточек, создание профайла, создание поля карточек

Promise.all([getUserProfile(), getCardsArray()])
  .then(([userData, cardsData]) => {
    userID = userData._id;
    userProfileName.textContent = userData.name;
    userProfileAbout.textContent = userData.about;
    userProfileAvatar.src = userData.avatar;
    createElementsArea(cardsData);
  })
  .catch((err) => console.log(err));
