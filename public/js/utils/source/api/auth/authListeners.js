import { register } from "../users/registerUser";
import { login } from "../users/loginUser";

export async function onAuthEvent(event) {
  event.preventDefault();

  const name = event.target.name.value;
  const email = event.target.email.value;
  const password = event.target.password.value;

  if (event.submitter.dataset.auth === "login") {
    await login(email, password);
  } else {
    await register(name, email, password);
    await login(email, password);
  }

  // const posts = getPosts();
  // console.log(posts);
}

export function setAuthEvents() {
  document.forms.auth.addEventlistener("submit", onAuthEvent);
}

// setAuthEvents();
