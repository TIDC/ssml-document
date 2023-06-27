import ServiceProvider from "../enums/ServiceProvoder";

export default interface IRenderOptions {
    pretty?: boolean;  //是否美化
    headless?: boolean;  //是否无头
    provider?: ServiceProvider | string;  //渲染的SSML服务商
    editable?: boolean;  //是否可编辑
    className?: string;  //类名
    classNamePrefix?: string;  //子类名前缀
    labelMap?: any;  //标签映射
}
