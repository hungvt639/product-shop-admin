import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useState } from "react";
import { BlogLink, CreateBlogLink } from "../../api/repository/blogLinkAPI";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import _env from "../../_env";

type FromCreateProps = {
    create: (data: CreateBlogLink, id: string | undefined) => Promise<void>;
    itemEdit?: BlogLink;
};

const FromCreate = ({ create, itemEdit }: FromCreateProps) => {
    const [name, setName] = useState(itemEdit ? itemEdit.name : "");
    const [content, setContent] = useState(itemEdit ? itemEdit.content : "");

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await create(new CreateBlogLink(name, content), itemEdit?._id);
        setName("");
        setContent("");
    };
    return (
        <form className="px-3" onSubmit={onSubmit}>
            <h1 className="text-center"> Tạo mới Liên kết</h1>
            <div className="">
                <label>Tên</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
            </div>

            <div className="py-5">
                <label>Nội dung</label>
                <CKEditor
                    key="information"
                    editor={ClassicEditor}
                    data={content}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setContent(data);
                    }}
                    config={{
                        ckfinder: {
                            uploadUrl: _env.URL_IMG_UPLOAD_CK,
                        },
                    }}
                />
            </div>
            <div className="flex justify-end">
                <button className="mt-5" type="submit">
                    Tạo mới
                </button>
            </div>
        </form>
    );
};
export default FromCreate;
