import Comment from '../api/comment'
import User from '@/api/user'
import Auth from '@/api/auth'
import Product from '@/api/product'
import Cart from '@/api/cart'
import Order from '@/api/order'
import WishList from '@/api/wishlist'
import Statistical from '@/api/statistical'
import Contact from '@/api/contact'
export default (context, inject) => {
  // Initialize API factories
  const factories = {
    auth: Auth(context.$axios),
    product: Product(context.$axios),
    comment: Comment(context.$axios),
    cart: Cart(context.$axios),
    order: Order(context.$axios),
    wishlist: WishList(context.$axios),
    user: User(context.$axios),
    statistical: Statistical(context.$axios),
    contact: Contact(context.$axios)
  }

  // Inject $api
  inject('api', factories)
}
