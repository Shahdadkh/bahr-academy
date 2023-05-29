import * as Yup from "yup";

const emailValidation = Yup.string().required("لطفا فیلد را پر کنید.");

const passwordValidation = Yup.string()
  .required("لطفا فیلد را پر کنید.")
  .min(8, "رمز عبور باید حداقل دارای 8 کاراکتر باشد !")
  .max(30, "رمز عبور باید حداکثر دارای 30 کاراکتر باشد !")
  .matches(
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/,
    "رمزعبور باید دارای عدد، حروف کوچک و بزرگ انگلیسی و علامت خاص باشد."
  );

// const usernameValidatoin = Yup.string()
//   .required("لطفا فیلد را پر کنید")
//   .min(4, "نام کاربری باید بیشتر از 4 کارکتر باشد")
//   .matches(
//     /^\w{3,30}$/,
//     "نام کاربری باید انگلیسی باشد"
//   );

const phoneValidation = Yup.string()
  .required("لطفا فیلد را پر کنید")
  .matches(
    /^09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$/,
    "شماره باید 11 رقم باشد و با 09 شروع شود"
  );

const IdnumValidation = Yup.string()
  .required("لطفا فیلد را پر کنید")
  .matches(/^[0-9]{10}$/, "کد ملی فقط باید شامل اعداد باشد");

const nameValidation = Yup.string()
  .required("لطفا فیلد را پر کنید")
  .min(4, "نام کوتاه است")
  .max(30, "نام طولانی است")
  .matches(
    /^[\u0600-\u06FF]{3}|([\u0600-\u06FF]+\s?){5,30}$/,
    "نام باید فارسی باشد"
  );

//const birthdayValidation = Yup.string().required();

export const ForgetPasswordValidation = Yup.object({ email: emailValidation });

// export const SignInValidation = Yup.object({
//   email: emailValidation,
//   password: passwordValidation,
// });

export const SignUpValidation = Yup.object({
  fullName: nameValidation,
  email: emailValidation,
  password: passwordValidation,
  phoneNumber: phoneValidation,
  nationalId: IdnumValidation,
});

export const ResetPasswordValidation = Yup.object({
  password1: passwordValidation,
  password2: passwordValidation,
});

export const PanelPasswordChangeValidation = Yup.object({
  Password: passwordValidation,
  NewPassword: passwordValidation,
  RepeatNewPassword: passwordValidation,
});

export const PanelProfileEditValidation = Yup.object({
  fullName: nameValidation,
  email: emailValidation,
  phoneNumber: phoneValidation,
  nationalId: IdnumValidation,
});
