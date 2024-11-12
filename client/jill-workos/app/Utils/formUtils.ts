export const makeChangeListener = (setter: (val:string)=>void) => {
   return (e: { target: { value: string; }; }) => {
        const val = e.target.value;
        setter(val);
    };
};