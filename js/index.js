(async function () {
  const ncikName = document.querySelector(".written_message .nickname");
  const loginId = document.querySelector(".written_message .loginId");
  const exhibition = document.querySelector(".exhibition");
  const chatContent = document.querySelector(".exhibition .chat_content");
  const importIpt = document.querySelector(".import input");
  const importBut = document.querySelector(".import button");
  const deleteX = document.querySelector(".identity_information > i");
  //初始化

  //当前登录信息处理

  async function atPresentLogin() {
    const loginData = await API.loginMessage();
    if (loginData.code) {
      alert(loginData.msg);
      quitLogin();
    } else {
      ncikName.innerText = loginData.data.nickname;
      loginId.innerText = loginData.data.loginId;
    }
  }

  //获取聊天信息,渲染到页面

  //渲染函数
  function render(classname, src, content, time) {
    const div = document.createElement("div");
    div.classList.add(classname);
    div.innerHTML = ` <img src="./img/${src}" alt="" class="profile_photo" />
                      <div class="netinfo">
                          <div class="message">
                              ${content}
                          </div>
                          <div class="time">${time}</div>
                      </div>`;
    chatContent.appendChild(div);
  }

  async function gainChat() {
    const chatData = await API.acquireChitchat();
    chatData.data.map((item) => {
      const time = new Date(item.createdAt)
        .toLocaleString()
        .replaceAll("/", "-");
      const targetClass = item.from === null ? "robot_left" : "user_right";
      const imgSrc = item.from === null ? "robot-avatar.jpg" : "avatar.png";
      render(targetClass, imgSrc, item.content, time);
      exhibition.scrollTo({
        top: chatContent.offsetHeight,
        left: 0,
        behavior: "instant",
      });
    });
  }
  await atPresentLogin();
  await gainChat();

  //发送聊天信息
  importBut.addEventListener("click", sendChat);
  document.addEventListener("keydown", sendChat);

  async function sendChat(e) {
    const value = importIpt.value;
    if (e.key !== undefined && e.key !== "Enter") {
      return;
    }
    if (value === "") return;
    importIpt.value = "";
    const sendTime = new Date().toLocaleString().replaceAll("/", "-");
    render("user_right", "avatar.png", value, sendTime);
    exhibition.scrollTo(0, chatContent.offsetHeight);
    const replyData = await API.sendChitchat(value);
    const replyTime = new Date(replyData.data.createdAt)
      .toLocaleString()
      .replaceAll("/", "-");
    render("robot_left", "robot-avatar.jpg", replyData.data.content, replyTime);
    exhibition.scrollTo(0, chatContent.offsetHeight);
  }

  //退出登录
  deleteX.addEventListener("click", quitLogin);

  function quitLogin() {
    API.loginIdOut();
    location.href =
      location.href.substring(0, location.href.lastIndexOf) + "/login.html";
  }
})();
