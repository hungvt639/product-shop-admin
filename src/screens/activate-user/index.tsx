import { useState, useEffect, useCallback } from "react";
import { Redirect } from "react-router-dom";
import API from "../../api";
import route from "../../router/route";
import { errorAPI } from "../../components/Error";
import notify from "../../components/notify";

const ActivateUser = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const activate = useCallback(async () => {
    try {
      const active_token: string = window.location.search.split("=")[1];
      const res = await API.user.activateUser({
        active_token: active_token,
      });
      setLoading(false);
      notify.success(res.data.message);
    } catch (err: any) {
      errorAPI(err);
    }
  }, []);

  useEffect(() => {
    activate();
  }, [activate]);

  return loading ? <div>Đang kích hoạt tài khoản...!</div> : <ActivateOK />;
};
export default ActivateUser;

const ActivateOK = () => {
  const [time, setTime] = useState<number>(6);
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  if (time > 0) {
    return (
      <div>
        <p>Kích hoạt tài khoản thành công</p>
        <p>Chuyển tới trang đăng nhập sau {time - 1}s.</p>
      </div>
    );
  } else return <Redirect to={route.LOGIN} />;
};
