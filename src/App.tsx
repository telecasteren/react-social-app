import { useState } from "react";
import Footer from "@/components/footer/Footer";
import { SITE_LOGO_NAME, SITE_NAME } from "@/utils/general/config";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main>
        <a>
          <img src={SITE_LOGO_NAME} className="logo" alt="app logo" />
        </a>
        <h1 className="sr-only">{SITE_NAME}</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            Click to count {count}
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
export default App;
