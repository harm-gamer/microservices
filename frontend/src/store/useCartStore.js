
import { toast } from "react-toastify";
import {create} from "zustand"
import axios from "axios";
import ProductCard from "../components/ProductCard";
export const useCartStore = create((set,get) => ({
   cart : [],
   loading : false,

   addtoCart : async (product) =>{

    try{
        set({loading : true})
        const res = await axios.post(`http://localhost:5001/api/auth/cart`,{ProductId : product._id},{
            headers : localStorage.getItem('token')
        })
        toast.success("Product added to cart");
        set({cart : res.data,loading : false})
        console.log(res.data);
    }catch(error){
    toast.error(error.message);
    }
   },

   removeFromCart  : () =>{

   },
   updateQuantity : () =>{

   }
}))


