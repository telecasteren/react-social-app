import { useEffect, useRef, useState } from "react";
import TypeText from "@/components/titles/TypeText";
import TypeTitle from "@/components/titles/TypeTitle";
import { SITE_LOGO_PIZZA, SITE_NAME } from "@/utils/branding/config";
import AuthContainer from "@/features/dashboard/components/AuthContainer";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const Dashboard = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const headerRef = useRef<HTMLElement>(null);
  const subHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.innerHTML = "";
      const title = TypeTitle({ text: SITE_NAME });
      title.classList.add("text-bigger", "md:text-[4.5rem]", "typewriter");
      headerRef.current.appendChild(title);
    }

    setTimeout(() => {
      if (subHeaderRef.current) {
        subHeaderRef.current.innerHTML = "";
        const caption = TypeText();
        caption.classList.add(
          "flex",
          "flex-wrap",
          "break-words",
          "whitespace-normal",
          "max-w-full",
          "text-center",
        );
        subHeaderRef.current.appendChild(caption);
      }
    }, 2000);
  }, []);

  return (
    <div className="dashboard-container justify-items-center min-h-screen p-8 gap-16">
      {!showAuth ? (
        <>
          <header ref={headerRef}></header>
          <img
            className="dark:invert justify-center items-center m-2 h-[150px]"
            src={SITE_LOGO_PIZZA}
            alt="Logo"
          />
          <div ref={subHeaderRef}></div>

          <div className="flex gap-4">
            <PrimaryButton
              text="Log in."
              className="btn-primary"
              onClick={() => {
                setAuthMode("login");
                setShowAuth(true);
              }}
            />
            <PrimaryButton
              text="Sign up."
              className="btn-secondary"
              onClick={() => {
                setAuthMode("signup");
                setShowAuth(true);
              }}
            />
            {/* <button
              className="btn btn-primary"
              onClick={() => {
                setAuthMode("login");
                setShowAuth(true);
              }}
            >
              Log in.
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => {
                setAuthMode("signup");
                setShowAuth(true);
              }}
            >
              Sign up.
            </button> */}
          </div>
        </>
      ) : (
        <AuthContainer initialMode={authMode} />
      )}
    </div>
  );
};
export default Dashboard;
