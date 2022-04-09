import React from "react";
import { useForm } from "react-hook-form";
import useEditProfile from "./hook/useEditProfile";
const EditProfile = () => {
    const { /*register,*/ handleSubmit } = useForm();
    const { editProfile } = useEditProfile();
    return (
        <form
            className="form-edit_profile"
            onSubmit={handleSubmit(editProfile)}
        >
            {/* <div className="flex-row">
                <div
                    className="form-edit-profile-label"
                    style={{ marginRight: "10px" }}
                >
                    <label htmlFor="fullname">Họ-Tên:</label>
                    <input
                        type="text"
                        id="last_name"
                        defaultValue={user?.fullname ?? ""}
                        {...register("fullname", {
                            required: true,
                        })}
                    />
                </div>
                <div
                    className="form-edit-profile-label"
                    style={{ marginLeft: "10px" }}
                >
                   
            </div>

            <div className="form-edit-profile-label">
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    defaultValue={user?.email ?? ""}
                    {...register("email", {
                        required: true,
                    })}
                />
            </div>
            <div className="form-edit-profile-label">
                <label htmlFor="phone">Số điện thoại:</label>
                <input
                    type="number"
                    id="phone"
                    defaultValue={user?.phone ?? ""}
                    {...register("phone")}
                />
            </div>
            <div className="form-edit-profile-label">
                <label htmlFor="address">Địa chỉ:</label>
                <input
                    type="text"
                    id="address"
                    defaultValue={user?.address ?? ""}
                    {...register("address")}
                />
            </div>
            <div className="form-edit-profile-label">
                <label htmlFor="birthday">Ngày sinh:</label>
                <input
                    type="date"
                    id="birthday"
                    defaultValue={user?.birthday ?? ""}
                    {...register("birthday")}
                />
            </div>
            <div className="form-edit-profile-label">
                <label>Giới tính:</label>
                <input
                    type="radio"
                    id="male"
                    value="1"
                    {...register("gender")}
                    defaultChecked={user?.gender === 1 ? true : false}
                />
                <label className="label-radio" htmlFor="male">
                    Nam
                </label>
                <input
                    type="radio"
                    id="female"
                    value="2"
                    {...register("gender")}
                    defaultChecked={user?.gender === 2 ? true : false}
                />
                <label className="label-radio" htmlFor="female">
                    Nữ
                </label>
                <input
                    type="radio"
                    id="other"
                    value="0"
                    {...register("gender")}
                    defaultChecked={user?.gender === 0 ? true : false}
                />
                <label className="label-radio" htmlFor="other">
                    Khác
                </label>
            </div> */}
            <input />
            <div className="btn-submit">
                <button type="submit">Chỉnh sửa</button>
            </div>
        </form>
    );
};
export default EditProfile;
