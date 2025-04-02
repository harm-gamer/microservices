import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

export const useProductStore =  create((set) =>({
     loading : false,
     products : [],
     setProducts: (products) => set({ products }),
	createProduct: async (productData) => {
		set({ loading: true });
		try {
			const res = await axios.post("http://localhost:5000/api/products", productData,{
                headers : {
                    "Authorization" : localStorage.getItem("token")
                }
            });
			set((prevState) => ({
				products: [...prevState.products, res.data],
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},

	getAllProducts : async () =>{
		set({loading : true});
		try{
           const res = await axios.get("http://localhost:5000/api/products");
		   console.log(res.data);
		   set({products : res.data.products,loading : false})
		}catch(error){
           set({error : "Failed to fetch error",loading: false})
		   toast.error(error.res.data.error || "Failed to fetch products");
		}
	},

	getProductByCategory : async (category) =>{
      set({loading : true});
	  try {
		const res = await axios.get(`http://localhost:5000/api/products/category/${category}`)
		
		set({products : res.data.product, loading : false})
	  }catch(err){
		set({err : "Failed to fetch category",loading : false})
		toast.error("Failed to fetch product")
	  }
	},
	deleteProduct : async (productId) =>{
		set({loading: true});
		try{
          const res = await axios.delete(`http://localhost:5000/api/products/${productId}`);
		  set((prevState) => ({
			products : prevState.products.filter((product) => productId !== product._id ),
			loading : false
		  }))
		}catch(error){
			set({error : "Failed to delete Product",loading : false})
			toast.error(error.res.data.error || "Failed to fetch product")
		}
	}
}))