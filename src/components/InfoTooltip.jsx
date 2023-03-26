import imgTrue from '../images/pop-up_auth-reg/true.svg';
import imgFalse from '../images/pop-up_auth-reg/false.svg'

function InfoTooltip({isOpen, onClose, handleTooltip}) {
  return(
    <div className={`pop-up pop-up__tooltip ${isOpen ? "pop-up_opened" : ""}`} >
      <div className="pop-up__container">
        <button className="button pop-up__button-close" type="button" onClick={onClose}></button>
        <img className='pop-up__tooltip-image' src={handleTooltip ? imgTrue : imgFalse} alt='Картинка-подсказка' />
        <h2 className="pop-up__tooltip-text">{
          handleTooltip ?
            "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте ещё раз."
        }</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;
