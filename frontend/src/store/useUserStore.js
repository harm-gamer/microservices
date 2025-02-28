import {create} from "zustand"
// import axios from "../lib/axios"
import axios from "axios";
import { toast } from "react-toastify";


export const useUserStore = create((set,get) =>({
    user: null,
	loading: false,
	checkingAuth: true,

	signup : async ({ name, email, password}) => {
		set({ loading: true });
        
        try {
			const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, { name, email, password });
			set({ user: res.data, loading: false });
            localStorage.setItem("token", res.data.token);
            console.log(res.data);
		} catch (error) {
			set({ loading: false });
			toast.error("An error occurred");
		}
	},
	login : async (email, password) => {
		set({ loading: true });
    
		try {
			const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password },
            //   {
            //     headers : {
            //        Authorization: `Bearer ${token}`,  // Attach token
                 
            //     }
            //   }  
            );

			set({ user: res.data, loading: false });
           
            localStorage.setItem('token',res.data.token);
		} catch (error) {
			set({ loading: false });
			toast.error( "An error occurred in login");
		}
	},
    logout: async () => {
		try {
			localStorage.removeItem('token')
			set({ user: null });
		} catch (error) {
			toast.error( "An error occurred during logout");
		}
	},

	checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`,
                {
                    headers : {
                        Authorization: localStorage.getItem("token"),  // Attach token
                    }
                }
            );
            console.log(response)
			set({ user: response.data, checkingAuth: false });
		} catch (error) {
			toast.error("occured in profile")
			set({ checkingAuth: false, user: null });
		}
	},

}))
