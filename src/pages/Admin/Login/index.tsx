import LoginForm from "./components/LoginForm";
import StandardMain from "@/layouts/StandardMain";

function AdminLogin() {
  return (
    <StandardMain>
      <section
        id="admin-login-section"
        aria-labelledby="admin-login-label"
        className="flex flex-col items-center self-center gap-6 px-4 py-10 mx-4 mt-10 bg-brown-200 rounded-2xl sm:px-12 sm:mx-20 md:gap-8 md:px-20 md:py-12 md:mx-32 lg:gap-10 lg:w-200 lg:px-30 lg:py-15 lg:m-0"
      >
        <div className="flex flex-col items-center gap-2">
          <h4 className="text-headline-4 text-brand-orange">Admin panel</h4>
          <h2 id="admin-login-label" className="text-headline-2 text-brown-600">
            Log in
          </h2>
        </div>
        <LoginForm />
      </section>
    </StandardMain>
  );
}

export default AdminLogin;
