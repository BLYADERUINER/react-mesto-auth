import React from 'react';
import { Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import { CurrentUserContext } from '../context/CurrentUserContext.jsx';
import { api } from '../utils/api.js';
import * as auth from '../utils/auth.js';
import Login from './Login.jsx';
import Register from './Register.jsx';
import ProtectedRouteElement from './ProtectedRoute.jsx';
import InfoTooltip from './InfoTooltip.jsx';



function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userMail, setUserMail] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltip, setInfoTooltip] = React.useState(false);
  const [isToggleInfoTooltip, setToggleInfoTooltip] = React.useState(false);
  const navigate = useNavigate();

  // ручка отправки регистрации
  const handleRegister = (password, email) => {
    auth.register(password, email)
    .then(() => {
      setToggleInfoTooltip(true);
      setTimeout(() => navigate('/sign-in', {replace: true}), 1000);
    })
    .catch((err) => {
      console.log(err);
      setToggleInfoTooltip(false);
    })
    .finally(() => {
      handleInfoTooltip();
    });
  };

  const handleLogin = ((password, email) => {
    auth.login(password, email)
    .then((data) => {
      if (data.token) {
        setUserMail(email);
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        setTimeout(() => navigate('/', {replace: true}), 1000);
      }
    })
    .catch((response) =>  console.log(response.error));
  });

  // открытие попов используя Хук состояния
  function handleEditProfileOnClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddCardPopupOnClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarPopupOnClick() {
    setEditAvatarPopupOpen(true);
  }

  // функция открытия подсказки
  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  // функция закрытия всех попапов
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setInfoTooltip(false);
    setSelectedCard(null);
  }

  // получение инфы о юзере через хук эффекта
  React.useEffect(() => {
    api.getUserInfo()
    .then((name) => setCurrentUser(name))
    .catch((error) => console.log(error));
  }, []);

  // получение карточек через хук эффекта
  React.useEffect(() => {
    api.getCards()
    .then((cards) => {
      setCards(cards);
    })
    .catch((error) => console.log(error));
  }, []);

  // функция лайка карточки
  function handleCardClick(card) {
    // проверка на поставленный лайк определенного юзера
    const isLiked  =  card.likes.some((item) => item._id === currentUser._id);

    // запрос на лайк/дизлайк
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
    })
    .catch((error) => console.log(error));
  }

  // запрос на обновление имени и статуса юзера
  function handleUpdateUser({name, about}) {
    api.patchProfileEdit(name, about)
    .then((response) => setCurrentUser(response))
    .then(() => closeAllPopups())
    .catch((error) => console.log(error));
  }

  // запрос на обновление аватара юзера
  function handleUpdateUserAvatar(avatarLink) {
    api.patchAvatar(avatarLink)
    .then((response) => setCurrentUser(response))
    .then(() => closeAllPopups())
    .catch((error) => console.log(error));
  }

  // запрос на добавление новой карточки
  function handleAddPlaceSubmit(place) {
    api.postNewCard(place)
    .then((newCard) => setCards([newCard, ...cards]))
    .then(() => closeAllPopups())
    .catch((error) => console.log(error));
  }

  // запрос на удаление карточки юзера
  function handleCardDelete(cardId) {
    api.deleteUserCard(cardId)
    .then(() => {
      setCards((state) => state.filter((item) => item._id !== cardId))
    })
    .catch((error) => console.log(error));
  }

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <Header userMail={userMail} />
      <Routes>
        <Route path="/" element={
          <ProtectedRouteElement
            Component={Main}
            loggedIn={loggedIn}
            userName={currentUser.name}
            userDescription={currentUser.about}
            userAvatar={currentUser.avatar}
            cardsData={cards}
            onCardLike={handleCardClick}
            onCardClick={setSelectedCard}
            onCardDelete={handleCardDelete}
            handleEditAvatarCLick={handleEditAvatarPopupOnClick}
            handleEditProfileClick={handleEditProfileOnClick}
            handleAddPlaceClick={handleAddCardPopupOnClick}
          />}
        />
        <Route path="/sign-up" element={<Register handleRegister={handleRegister} />} />
        <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
        {/* Popup edit profile */}
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
        {/* Popup Add card */}
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
        {/* Popup edit avatar */}
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateUserAvatar}
      />
        {/* Image popup */}
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
        {/* Popup delete card  */}
      <PopupWithForm
        popupName="delete-card"
        popupTitle="Вы уверены ?"
        popupTextButton="Да"
      />
      <InfoTooltip
        isOpen={isInfoTooltip}
        onClose={closeAllPopups}
        handleTooltip={isToggleInfoTooltip}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
