// Password toggle (shared)
(function () {
  const pwd = document.getElementById("password");
  const toggle = document.getElementById("pwdToggle");
  const eyeIcon = document.getElementById("eyeIcon");
  if (!pwd || !toggle || !eyeIcon) return; // nothing to do if elements missing

  let visible = false;
  const defaultPlaceholder = pwd.getAttribute("placeholder") || "";
  const showingPlaceholder = "ĐANG HIỆN MẬT KHẨU";

  function updatePlaceholder() {
    if (pwd.value.trim() === "") {
      pwd.setAttribute(
        "placeholder",
        visible ? showingPlaceholder : defaultPlaceholder,
      );
    } else {
      pwd.setAttribute("placeholder", "");
    }
  }

  function setIcon(open) {
    eyeIcon.textContent = open ? "visibility" : "visibility_off";
  }

  // `() =>` is the same as `function ()`
  toggle.addEventListener("click", () => {
    visible = !visible;
    pwd.type = visible ? "text" : "password";
    toggle.setAttribute(
      "aria-label",
      visible ? "Hide password" : "Show password",
    );
    setIcon(!visible);
    updatePlaceholder();
  });

  pwd.addEventListener("input", updatePlaceholder);
  updatePlaceholder();
  setIcon(!visible);
})();

// Shared validation + submit handler
(function () {
  // Detect whether it's login or signup form
  const form =
    document.getElementById("loginForm") ||
    document.getElementById("signupForm");
  if (!form) return;

  const isSignup = form.id === "signupForm";

  // `(evt) =>` is the same as `function (evt)`
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const usernameEl = form.username;
    const pwdEl = form.password;
    const username = usernameEl.value.trim();
    const pass = pwdEl.value;
    const usernamePattern = /^[A-Za-z0-9._-]{3,30}$/;

    if (!username) {
      alert("Vui lòng nhập tên đăng nhập.");
      usernameEl.focus();
      return;
    }
    if (!usernamePattern.test(username)) {
      alert(
        'Tên đăng nhập phải có 3–30 kí tự. Được phép dùng chữ cái, số, ".", "_" và "-".',
      );
      usernameEl.focus();
      return;
    }

    if (!pass) {
      alert("Vui lòng nhập mật khẩu.");
      pwdEl.focus();
      return;
    }
    if (pass.length < 6) {
      alert("Mật khẩu phải dài ít nhất 6 kí tự.");
      pwdEl.focus();
      return;
    }

    console.log("form data", {
      type: isSignup ? "signup" : "login",
      username,
      password: pass ? "●●●●● (hidden)" : "",
    });

    alert(
      (isSignup ? "Đăng ký" : "Đăng nhập") +
        " (demo). Replace this handler with your backend call.",
    );
    form.reset();
  });
})();
