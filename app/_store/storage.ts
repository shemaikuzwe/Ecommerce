function storage() {
      const cart = localStorage.getItem("cart");
      if (cart == null) return [];
      return JSON.parse(cart);
    }
export default storage;