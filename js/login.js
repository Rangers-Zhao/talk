const loginIdIpt = document.querySelector(".loginId .loginIdName");
const nickPwdIpt = document.querySelector(".nickPwd .nickPwdValue");
const button = document.querySelector(".login button");
const enrollA = document.querySelector(".enroll a");
const emptyObj = {
  loginIdName: "请填写账号",
  nickPwdValue: "请填写密码",
};
const sumUpemptyArr = [];

loginIdIpt.addEventListener("blur", leaveFocus);
nickPwdIpt.addEventListener("blur", leaveFocus);
button.addEventListener("click", login);
document.addEventListener("keydown", login);
enrollA.addEventListener("click", enroll);

//检查账号 密码是否空着
function leaveFocus() {
  const whetherEmpty = this.value === "";
  sumUpemptyArr.push(whetherEmpty);
  const span = this.nextElementSibling;
  if (whetherEmpty) {
    span.innerText = emptyObj[this.className];
  } else {
    span.innerText = "";
  }
}

//登录

async function login(e) {
  if (e.key !== undefined && e.key !== "Enter") return;
  sumUpemptyArr.splice(0);
  leaveFocus.call(loginIdIpt);
  leaveFocus.call(nickPwdIpt);
  const sumUpempty = sumUpemptyArr.every(function (item) {
    return !item;
  });
  if (sumUpempty) {
    const loginObj = {
      loginId: loginIdIpt.value,
      loginPwd: nickPwdIpt.value,
    };
    const data = await API.login(loginObj);
    if (data.code) {
      loginIdIpt.nextElementSibling.innerText = data.msg;
    } else {
      window.alert("登录成功，点击确定，跳转的首页");
      location.href =
        location.href.substring(0, location.href.lastIndexOf("/")) +
        "/index.html";
    }
  }
}

//注册
function enroll(e) {
  e.preventDefault();
  location.href =
    location.href.substring(0, location.href.lastIndexOf("/")) + "/reg.html";
}
