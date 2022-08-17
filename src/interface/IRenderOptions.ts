import ServiceProvider from "../enums/ServiceProvoder";

export default interface IRenderOptions {
    pretty?: boolean;  //是否美化
    headless?: boolean;  //是否无头
    provider?: ServiceProvider;  //渲染的SSML服务商
}
