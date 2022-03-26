const elementsArea = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;
const newPlaceSubmitButton = document.querySelector(
  ".popup__btn-save_new-place-input"
);
const newAvatarSubmitButton = document.querySelector(
  ".popup__btn-save_avatar-input"
);

import {
  closePopup,
  openPictureFullView,
  popupNewPlaceInput,
  inputsPlaceNameNewPlacePopup,
  inputsPictureLinkNewPlacePopup,
  popupNewAvatarInput,
  inputsAvatarLinkNewAvatarPopup,
} from "./modal.js";

import {
  setNewCard,
  deleteCard,
  setLike,
  deleteLike,
  loadNewAvatar,
} from "./api.js";

import {
  userProfileAvatar,
  userProfileName,
  userProfileAbout,
  userID,
} from "./index.js";
//! функция проверки есть ли у карточки лайк поставленный текущим пользователем ранее и сохраненный в массиве на сервере
function findUserLike(likeData, myUserId) {
  return likeData.some(function (likerData) {
    return myUserId === likerData._id;
  });
}
//! функция удаления и добавления лайка от текущего пользователя с окрашиванием сердечка
function likeButtonHandler(evt) {
  const cardID = evt.target.closest(".element").dataset.cardId;
  const likeCounter = evt.target.nextElementSibling;

  if (evt.target.classList.contains("element__like-btn_liked")) {
    deleteLike(cardID)
      .then((res) => {
        likeCounter.textContent = res.likes.length;
        evt.target.classList.toggle("element__like-btn_liked");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    setLike(cardID)
      .then((res) => {
        likeCounter.textContent = res.likes.length;
        evt.target.classList.toggle("element__like-btn_liked");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
//! функция создания карточки из объекта с набором данных для карточки
function createCard(source, title, rating, ownerID, cardID, likes) {
  const newCardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardImage = newCardElement.querySelector(".element__mask");
  cardImage.src = source;
  cardImage.alt = title;
  newCardElement.querySelector(".element__card-name").textContent = title;
  newCardElement.querySelector(".element__rating").textContent = rating;

  // проверяем наличие лайка на карточке от нашего пользователя
  if (findUserLike(likes, userID)) {
    newCardElement
      .querySelector(".element__like-btn")
      .classList.add("element__like-btn_liked");
  }

  // скрываем кнопку удаления карточки если карта создана другим пользователем
  if (userID != ownerID) {
    newCardElement
      .querySelector(".element__delete")
      .classList.add("element__delete_hidden");
  }
  // устанавливаем пользовательский атрибут ID на карточку из полученного набора данных с сервера
  newCardElement.dataset.cardId = cardID;
  // далее устанавливаете 3 обработчика(открытие, лайк, удаление)
  cardImage.addEventListener("click", function (evt) {
    openPictureFullView(evt.target);
  });
  newCardElement
    .querySelector(".element__like-btn")
    .addEventListener("click", function (evt) {
      likeButtonHandler(evt);
    });
  newCardElement
    .querySelector(".element__delete")
    .addEventListener("click", function (evt) {
      const deletingCard = evt.target.closest(".element");
      deleteCard(deletingCard.dataset.cardId)
        .then((res) => {
          //! аргумент надо задействовать или убрать

          deletingCard.remove();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  // возвращаем готовую карточку
  return newCardElement;
}
//! функция создания поля с карточками из массива
export function createElementsArea(array) {
  elementsArea.innerHTML = "";
  array.forEach(function (item) {
    const newElement = createCard(
      item.link,
      item.name,
      item.likes.length,
      item.owner._id,
      item._id,
      item.likes
    );
    elementsArea.prepend(newElement);
  });
}
//! функция выгрузки на сервер данных о новой карточке и далее загрузки массива с данными карточек из сервера
//! и формирования из него нового поля карточек
export function addNewPlaceCard(evt) {
  evt.preventDefault();
  newPlaceSubmitButton.textContent = "Сохранение...";

  setNewCard(
    inputsPlaceNameNewPlacePopup.value,
    inputsPictureLinkNewPlacePopup.value
  )
    .then((res) => {
      const newElement = createCard(
        res.link,
        res.name,
        res.likes.length,
        res.owner._id,
        res._id,
        res.likes
      );
      elementsArea.prepend(newElement);
      closePopup(popupNewPlaceInput);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      newPlaceSubmitButton.textContent = "Создать";
    });
}
//! функция загрузки картинки нового аватара
export function addNewAvatar(evt) {
  evt.preventDefault();

  newAvatarSubmitButton.textContent = "Сохранение...";

  const url = inputsAvatarLinkNewAvatarPopup.value;

  loadNewAvatar(url)
    .then((res) => {
      userProfileName.textContent = res.name;
      userProfileAbout.textContent = res.about;
      userProfileAvatar.src = res.avatar;
      closePopup(popupNewAvatarInput);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      newAvatarSubmitButton.textContent = "Сохранить";
    });
}
