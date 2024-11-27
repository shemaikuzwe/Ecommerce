export function storage(){
    const storedCart = localStorage.getItem("cart");
const initialData = storedCart ? JSON.parse(storedCart) : [];
return initialData;
}