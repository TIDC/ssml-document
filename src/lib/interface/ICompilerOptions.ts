export default interface ICompilerOptions {
    compile?: boolean;  //是否强制编译
    dataset?: any;  //数据集
    functions?: any;  //扩展函数
    script?: string;  //扩展脚本内容
    debug?: boolean;  //是否开启调试
};
