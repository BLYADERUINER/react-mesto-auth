import imgTrue from '../images/pop-up_auth-reg/true.svg';
// import imgFalse from '../images/pop-up_auth-reg/false.svg'

function InfoTooltip() {
  return(
    <div className="pop-up pop-up_opened pop-up__tooltip">
      <div className="pop-up__container">
        <button className="button pop-up__button-close" type="button" ></button>
        <img className='pop-up__tooltip-image' src={imgTrue} alt='Картинка-подсказка' />
        <h2 className="pop-up__tooltip-text">Вы успешно зарегистрировались!</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;
