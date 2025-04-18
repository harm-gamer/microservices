
import { toast } from "react-toastify";
import {create} from "zustand"
import axios from "axios";
import ProductCard from "../components/ProductCard";
export const useCartStore = create((set,get) => ({
   cart : [],
   loading : false,

   addtoCart : async (product) =>{

    try{
        console.log(product);
        console.log(localStorage.getItem('token'))
        set({loading : true})
        const res = await axios.post(`http://localhost:5000/api/user/cart/cartItem`,{ProductId : product._id},{
            headers : {
                Authorization : localStorage.getItem('token')
            }
        })
        toast.success("Product added to cart");
        set({cart : res.data,loading : false})
        console.log(res.data);
    }catch(error){
    toast.error(error.message);
    }
   },
   getCart : async () =>{
  
    try{
       
        const res = await axios.get(`http://localhost:5000:/product/cart/cartItem`,{
            headers :{
                
                Authorization : localStorage.getItem('token')
            }
        });
        console.log(res.data);
        set({cart : res.data})
        get.calculatetotals();
    }catch(error){
        set({cart : []})
        toast.error(error.message);
    }
      
   },
   removeFromCart  : () =>{

   },
   updateQuantity : () =>{

   },
   calculatetotals : () =>{

     const {cart } = get();

     const subtotals = cart.reduce((sum,item)=> sum + item.price * item.qunatity,0);
   
      const total = subtotals;

      set({total});

   }
}))


