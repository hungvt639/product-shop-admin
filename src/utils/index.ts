class Utils {
    public objToSearch = (obj: any | undefined) => {
        if (!obj) return "";
        const data = Object.keys(obj).map(function (key) {
            if (!obj[key]) return "";
            return `${key}=${obj[key]}`;
        });
        return "?" + data.filter((d) => d).join("&");
    };

    public toUrl = (url: string, search: any) => {
        return url + this.objToSearch(search);
    };
}
export default new Utils();
