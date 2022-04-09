import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setOpenEditProfile] = React.useState(false);
  const [isAddPlacePopupOpen, setOpenAddPlace] = React.useState(false);
  const [isEditAvatarPopupOpen, setOpenEditAvatar] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setOpenEditAvatar(true);
  }

  function handleEditProfileClick() {
    setOpenEditProfile(true);
  }

  function handleAddPlaceClick() {
    setOpenAddPlace(true);
  }

  function closeAllPopups() {
    setOpenEditAvatar(false);
    setOpenEditProfile(false);
    setOpenAddPlace(false);
    setSelectedCard({});
  }

  return (
    <div className="App">
      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}      
      />

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        name="profile"
        title="Редактировать профиль"
        buttonText="Сохранить"
      >
        <input
          type="text"
          name="name"
          className="popup__form-input popup__form-input_info_name"
          defaultValue=""
          minLength="2"
          maxLength="40"
          id="profile-title"
          required
        />
        <span className="popup__error profile-title-error"></span>
        <input
          type="text"
          name="about"
          className="popup__form-input popup__form-input_info_about"
          defaultValue=""
          minLength="2"
          maxLength="200"
          id="profile-about"
          required
        />
        <span className="popup__error profile-about-error"></span>
      </PopupWithForm>

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        name="card"
        title="Новое место"
        buttonText="Создать"
      >
        <input
          type="text"
          name="name"
          className="popup__form-input popup__form-input_info_title"
          defaultValue=""
          placeholder="Название"
          minLength="2"
          maxLength="30"
          id="card-title"
          required
        />
        <span className="popup__error card-title-error"></span>

        <input
          type="url"
          name="link"
          className="popup__form-input popup__form-input_info_link"
          defaultValue=""
          placeholder="Ссылка на картинку"
          id="card-link"
          required
        />
        <span className="popup__error card-link-error"></span>
      </PopupWithForm>

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
      >
        <input
          type="url"
          name="link"
          className="popup__form-input popup__form-input_avatar_link"
          defaultValue=""
          placeholder="Ссылка на аватар"
          id="avatar-link"
          required
        />
        <span className="popup__error avatar-link-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        buttonText="Да"
      ></PopupWithForm>

      <ImagePopup
      onClose={closeAllPopups}
      card={selectedCard}
      />

      <Footer />
    </div>
  );
}

export default App;
