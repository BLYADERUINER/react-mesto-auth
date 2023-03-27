import PopupWithForm from './PopupWithForm';
import imgTrue from '../images/pop-up_auth-reg/true.svg';
import imgFalse from '../images/pop-up_auth-reg/false.svg'

function InfoTooltip({isOpen, onClose, handleTooltip}) {
  return(
    <PopupWithForm popupName={'info-tooltip'} isOpen={isOpen} onClose={onClose}>
          <img className='pop-up__tooltip-image' src={handleTooltip ? imgTrue : imgFalse} alt='Картинка-подсказка' />
          <h2 className="pop-up__tooltip-text">
            {
            handleTooltip ?
              "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."
            }
          </h2>
    </PopupWithForm>
  )
}

export default InfoTooltip;
