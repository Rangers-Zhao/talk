const API = (function () {
  const HOSTURL = "https://study.duyiedu.com";
  const TOKEY = "tokey";

  //网络请求函数
  function get(path) {
    const tokey = localStorage.getItem(TOKEY);
    const headers = {};
    if (tokey) {
      headers.authorization = `Bearer ${tokey}`;
    }
    return fetch(HOSTURL + path, { headers });
  }

  function post(path, body) {
    body = JSON.stringify(body);
    const tokey = localStorage.getItem(TOKEY);
    const headers = {
      "content-type": "application/json",
    };
    if (tokey) {
      headers.authorization = `Bearer ${tokey}`;
    }
    return fetch(HOSTURL + path, { method: "POST", headers, body });
  }

  //注册接口
  async function enroll(obj) {
    const resp = await post("/api/user/reg", obj);
    return await resp.json();
  }

  //登录接口
  async function login(obj) {
    const resp = await post("/api/user/login", obj);
    const body = await resp.json();
    if (!body.code) {
      localStorage.setItem(TOKEY, resp.headers.get("authorization"));
    }
    return body;
  }

  //验证接口
  async function verify(loginId) {
    const resp = await get("/api/user/exists?loginId=" + loginId);
    return await resp.json();
  }

  //登录信息接口
  async function loginMessage() {
    const resp = await get("/api/user/profile");
    return await resp.json();
  }

  //发送聊天信息接口
  async function sendChitchat(content) {
    const resp = await post("/api/chat", { content });
    return await resp.json();
  }

  //获取聊天信息接口
  async function acquireChitchat() {
    const resp = await get("/api/chat/history");
    return await resp.json();
  }

  //退出登录

  function loginIdOut() {
    localStorage.removeItem(TOKEY);
  }
  return {
    enroll,
    login,
    verify,
    loginMessage,
    sendChitchat,
    acquireChitchat,
    loginIdOut,
  };
})();
