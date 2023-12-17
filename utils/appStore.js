import create from "zustand";


const useStore = create((set,get) => ({
    nurseid : '',
    vax_event : {},
    
    setVaxEvent : (vax_event) => set({vax_event}),
    setNurse: (val) => set((state) => ({ isPink: val })),
    getNurse : () => get().nurse,
    setNurseid : (id)=>{
        set(() => ({ nurseid: id }));
      }
   
    

}))


export default useStore;