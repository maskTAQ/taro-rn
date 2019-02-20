const mergeStyle = (target,source=[])=>{
    const result = {...target};
    source.forEach(style=>{
        Object.assign(result,style);
    });
    return result;
};
export default mergeStyle;