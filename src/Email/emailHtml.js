export const emailHtml=(otp)=>{
return`<div class="c-email">  
  <div class="c-email__header">
    <h1 class="c-email__header__title">Your Verification Code</h1>
  </div>
  <div class="c-email__content">
    <p class="c-email__content__text text-title">
      Enter this verification code in field:
    </p>
    <div class="c-email__code">
      <span class="c-email__code__text">${otp}</span>
    </div>
    <p class="c-email__content__text text-italic opacity-30 text-title mb-0">Verification code is valid only for 30 minutes</p>
  </div>
  <div class="c-email__footer"></div>
</div>`
}