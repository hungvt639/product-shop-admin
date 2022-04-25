import { useTranslation } from "react-i18next";
const Home = () => {
    const { t } = useTranslation();

    return (
        <div>
            <div>{t("Home")}</div>
            <div>Đây là trang chủ</div>
            <div>Hết...!</div>
        </div>
    );
};
export default Home;
