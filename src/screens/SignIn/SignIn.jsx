import SignInForm from "../../components/Log/SignInForm";

const SignIn = ({ onLoggin }) => {
  return (
    <>
      <div className="p-4 sm:p-16 h-fit">
        <SignInForm onLoggin={onLoggin} />
      </div>
    </>
  );
};

export default SignIn;
