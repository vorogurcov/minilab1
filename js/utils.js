const first_name_id = 'first_name'
const last_name_id = 'last_name'
const password_id = 'password'
const email_id = 'email'
const password_repeat_id = 'password-repeat'

const but_sign_in_id = "sign_in_btn"
const but_sign_up_id = "sign_up_btn"

const sign_up_form_id = 'sign_up_form'
const sign_in_form_id = 'sign_in_form'
const sign_in_email_id = 'email_sign_in'
const sign_in_pass_id = "password_sign_in"
// Сюда пишутся значения формы (Object как в Java, или dict из Python)
const formValues = {[first_name_id]: '',[last_name_id]:'',
                    [password_id]:'',[email_id]:'',[password_repeat_id]:'' }

// Сюда пишутся статусы валидации каждого поля. Если поле ни разу не валидировалось,
// то при обращении к Object вернётся undefined, который при логическом сравнении обрабатывается как false
const formValidation = {[password_id]:undefined,[email_id]:undefined, [last_name_id]:undefined,
                        [password_repeat_id]:undefined, [first_name_id]:undefined }

const signFormValidation = {[sign_in_email_id]: undefined, [sign_in_pass_id]: undefined}

// Объявляется и инициализируется константная переменная
// Инициализация функцией, заданной в стрелочном виде
export const validatePassword = (pass_id, password) => {
  const regExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  // Напишите код валидации здесь и присвойте true/false в объект(словарь) formValidation
  // formValidation.password = ...  // formValidation['password'] = ... - то же самое, но другой синтаксис

  let result = regExp.test(password)
  if(pass_id === password_repeat_id && formValues[password_id] !== password) {
    result = false
    document.getElementById(pass_id).setCustomValidity("Repeated password does not match the password itself!");
  }


  if(Object.getOwnPropertyNames(formValidation).includes(pass_id))
    formValidation[pass_id] = result;
  else
    signFormValidation[pass_id] = result
  return result
}


export const validateEmail = (em_id,email) => {
  // Создадим шаблон регулярного выражения. В нём применяются шаблонные строки
  // Гуглить по тегам: "шаблонные строки js", "регулярные выражения"
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  let result = regExp.test(email.toLowerCase())
  if(Object.getOwnPropertyNames(formValidation).includes(em_id))
    formValidation[em_id] = result
  else
    signFormValidation[em_id] = result
  return result

}


// Функция возвращающая true если все валидации пройдены, и false если хотя бы одна не пройдена
export const getValidationStatus = () => {
  // Происходит функциональная мгаия, читай строчку кода ниже как:
  // Получить значения (не ключи) из объекта, затем применить к каждому значению функцию двойного логического отрицания
  // (преобразование к булевому типу) и результаты всех применений это true, то вернуть true, иначе - false
  return Object.values(formValidation).every((validationStatus) => !!validationStatus)
}

export const getSignInValidationStatus = () => {
  return Object.values(signFormValidation).every((validationStatus) => !!validationStatus)
}
// Функция, которая ставит значение поля в форме по ключу
export const setFormValue = (valueKey, newValue, validator) => {
  formValues[valueKey] = newValue
  let validationForm;
  if (Object.getOwnPropertyNames(formValidation).includes(valueKey))
    validationForm = formValidation;
  else
    validationForm = signFormValidation;


  if (validator !== undefined) {
    validator(valueKey, newValue)

    console.log(Object.getOwnPropertyNames(formValidation))

    if (validationForm[valueKey] == true) {
      document.getElementById(valueKey).classList.remove("invalid");
      document.getElementById(valueKey).classList.add("valid");
    } else {
      document.getElementById(valueKey).classList.remove("valid");
      document.getElementById(valueKey).classList.add("invalid");
    }
  }
  else
  {
    if(newValue === '') {
      document.getElementById(valueKey).classList.remove("valid");
      document.getElementById(valueKey).classList.add("invalid");
      validationForm[valueKey] = false;
    }
    else
    {
      document.getElementById(valueKey).classList.remove("invalid");
      document.getElementById(valueKey).classList.add("valid");
      validationForm[valueKey] = true;
    }
  }

  if (!getValidationStatus())
  {
    document.getElementById(but_sign_up_id).disabled = true
  }
  else
    document.getElementById(but_sign_up_id).disabled = false

  if(!getSignInValidationStatus())
  {
    document.getElementById(but_sign_in_id).disabled = true
  }
  else
    document.getElementById(but_sign_in_id).disabled = false

}

export const returnClick = () => {
  document.getElementById(sign_up_form_id).style.display = ""
  document.getElementById(sign_in_form_id).style.display = "none"
}

// Функция для обработки отправки формы регистрации
// В этой функции должен быть http запрос на сервер для регистрации пользователя (сейчас просто демонстрация)
export const submitSignUpForm = () => {
  if (!getValidationStatus()) {
    console.log("FORM IS INCORRECT")
    return false
  }
  console.log("FORM IS FINE")
  console.log(formValues)
  return true
}
