const loginIdIpt = document.querySelector(".loginId .loginIdName");
const nickNameIpt = document.querySelector(".nickName .nickNameValue");
const nickPwdIpt = document.querySelector(".nickPwd .nickPwdValue");
const nickPwdTwoIpt = document.querySelector(".nickPwdTwo .nickPwdTwoValue");
const enrollA = document.querySelector(".enroll a");
const registerBut = document.querySelector(".login button");
const emptyObj = {
  loginIdName: "请填写账号",
  nickNameValue: "请填写昵称",
  nickPwdValue: "请填写密码",
  nickPwdTwoValue: "请填写确认密码",
};
const sumUpemptyArr = [];
loginIdIpt.addEventListener("blur", accountInspect);
nickNameIpt.addEventListener("blur", leaveFocus);
nickPwdIpt.addEventListener("blur", leaveFocus);
nickPwdTwoIpt.addEventListener("blur", twoCipherInspect);
document.addEventListener("keydown", register);
registerBut.addEventListener("click", register);
enrollA.addEventListener("click", login);

//检查账号 昵称 密码 再次密码是否空着
function leaveFocus() {
  const whetherEmpty = this.value === "";
  const span = this.nextElementSibling;
  if (whetherEmpty) {
    span.innerText = emptyObj[this.className];
  } else {
    span.innerText = "";
  }
  sumUpemptyArr.push(whetherEmpty);
  return whetherEmpty;
}
/**
 *
 * @return
 */
// 检查账号
async function accountInspect() {
  const result = leaveFocus.call(this);
  if (result) return;
  const loginIdData = await API.verify(this.value);
  if (loginIdData.data) {
    this.nextElementSibling.innerText = "该账号已被占用，请重新选择一个账号名";
  }
  sumUpemptyArr.push(loginIdData.data);
}

//检查再次密码
function twoCipherInspect() {
  const result = leaveFocus.call(this);
  if (result) return;
  const equivalence = this.value !== nickPwdIpt.value;
  if (equivalence) {
    this.nextElementSibling.innerText = "两次密码不一致";
  }
  sumUpemptyArr.push(equivalence);
}

//注册

async function register(e) {
  if (e.key !== undefined && e.key !== "Enter") return;
  sumUpemptyArr.splice(0);
  accountInspect.call(loginIdIpt);
  leaveFocus.call(nickNameIpt);
  leaveFocus.call(nickPwdIpt);
  twoCipherInspect.call(nickPwdTwoIpt);
  const sumUpempty = sumUpemptyArr.every(function (item) {
    return !item;
  });
  if (sumUpempty) {
    const registerObj = {
      loginId: loginIdIpt.value,
      loginPwd: nickPwdIpt.value,
      nickname: nickNameIpt.value,
    };
    const data = await API.enroll(registerObj);
    if (data.code) {
      loginIdIpt.nextElementSibling.innerText = data.msg;
    } else {
      window.alert("注册成功，点击确定，跳转到登录页");
      location.href =
        location.href.substring(0, location.href.lastIndexOf("/")) +
        "/login.html";
    }
  }
}

//跳转到登录

function login(e) {
  e.preventDefault();
  location.href =
    location.href.substring(0, location.href.lastIndexOf("/")) + "/login.html";
}
