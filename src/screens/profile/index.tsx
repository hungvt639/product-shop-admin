import "./style.scss";
import { useSelector } from "react-redux";
import { AppState } from "../../interface/redux";
import Avatar from "./Avatar";
import Modal from "../../components/modal";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import useProfile from "./hook/useProfile";
import useEditProfile from "./hook/useEditProfile";

const Profile = (props: any) => {
    const idUser = useSelector((state: AppState) => state.userState.user?._id);

    const { profile } = useProfile(idUser);
    const { showEdit, setShowEdit } = useEditProfile();

    return (
        <div className="_profile">
            <div className="show-profile flex">
                <div className="left flex justify-center items-center">
                    <Avatar user={profile} />
                </div>
                <div className="right">
                    <div className="right-top">
                        <div className="flex">
                            <p className="laber-profile">Họ và Tên: </p>
                            <p>{profile?.fullname}</p>
                        </div>
                        <div className="flex">
                            <p className="laber-profile">Email: </p>
                            <p>{profile?.email}</p>
                        </div>
                        {/* <div className="flex">
                            <p className="laber-profile">Số điện thoại: </p>
                            <p>{user?.phone}</p>
                        </div> */}
                        <div className="flex">
                            <p className="laber-profile">Địa chỉ: </p>
                            <p>{profile?.address}</p>
                        </div>
                        <div className="flex">
                            <p className="laber-profile">ngày sinh: </p>
                            <p>{profile?.birthday}</p>
                        </div>
                        {/* <div className="flex">
                            <p className="laber-profile">Giới tính: </p>
                            <p>
                                {user?.gender === 1
                                    ? "Nam"
                                    : user?.gender === 2
                                    ? "Nữ"
                                    : "Khác"}
                            </p>
                        </div> */}
                        <div className="btn-edit-profile">
                            <button onClick={() => setShowEdit(true)}>
                                Chỉnh sửa thông tin
                            </button>
                        </div>
                    </div>
                    <div className="right-bottom flex-1">
                        <ChangePassword />
                    </div>
                </div>
            </div>
            <Modal show={showEdit} onClose={() => setShowEdit(false)}>
                <EditProfile />
            </Modal>
        </div>
    );
};
export default Profile;
